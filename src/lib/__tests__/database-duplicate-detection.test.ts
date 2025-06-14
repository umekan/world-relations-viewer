import { describe, it, expect, vi } from 'vitest';

/**
 * 今回発生したような重複データエラーを検出するためのテスト
 * 実際のgetSpecificRelation関数の動作をシミュレート
 */

interface MockRelation {
  id: number;
  country_a: string;
  country_b: string;
  overall_level: number;
  overall_description: string;
}

// getSpecificRelationと同じロジックを持つテスト関数
const simulateGetSpecificRelation = async (
  countryA: string, 
  countryB: string, 
  mockData: MockRelation[]
) => {
  // 実際のクエリと同じフィルタリング
  const filteredData = mockData.filter(relation => 
    (relation.country_a === countryA && relation.country_b === countryB) ||
    (relation.country_a === countryB && relation.country_b === countryA)
  );

  if (filteredData.length === 0) {
    return { data: null, error: null };
  }

  // 複数の行がある場合は最初の行を返す（修正後の動作）
  if (filteredData.length > 1) {
    console.warn(`Multiple relations found for ${countryA}-${countryB}:`, filteredData);
  }

  return { data: filteredData[0], error: null };
};

describe('データベース重複検出テスト', () => {
  it('今回のイスラエル-ヨルダンのような双方向重複データを検出する', async () => {
    const mockData: MockRelation[] = [
      {
        id: 26,
        country_a: 'IL',
        country_b: 'JO',
        overall_level: 3,
        overall_description: '1994年平和条約締結...'
      },
      {
        id: 75,
        country_a: 'JO',
        country_b: 'IL',
        overall_level: 3,
        overall_description: 'ヨルダンとイスラエルは1994年...'
      }
    ];

    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    const result = await simulateGetSpecificRelation('IL', 'JO', mockData);

    // 修正後は正常にデータを返すはず
    expect(result.data).not.toBeNull();
    expect(result.error).toBeNull();
    expect(result.data?.country_a).toBe('IL');
    expect(result.data?.country_b).toBe('JO');

    // 重複警告が出力されることを確認
    expect(consoleSpy).toHaveBeenCalledWith(
      'Multiple relations found for IL-JO:',
      expect.arrayContaining([
        expect.objectContaining({ country_a: 'IL', country_b: 'JO' }),
        expect.objectContaining({ country_a: 'JO', country_b: 'IL' })
      ])
    );

    consoleSpy.mockRestore();
  });

  it('正常な単一データの場合は警告が出ない', async () => {
    const mockData: MockRelation[] = [
      {
        id: 26,
        country_a: 'IL',
        country_b: 'JO',
        overall_level: 3,
        overall_description: '1994年平和条約締結...'
      }
    ];

    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    const result = await simulateGetSpecificRelation('IL', 'JO', mockData);

    expect(result.data).not.toBeNull();
    expect(result.error).toBeNull();
    expect(consoleSpy).not.toHaveBeenCalled();

    consoleSpy.mockRestore();
  });

  it('データが存在しない場合はnullを返す', async () => {
    const mockData: MockRelation[] = [];

    const result = await simulateGetSpecificRelation('IL', 'XX', mockData);

    expect(result.data).toBeNull();
    expect(result.error).toBeNull();
  });

  it('3つ以上の重複がある場合でも最初の1件を返す', async () => {
    const mockData: MockRelation[] = [
      {
        id: 1,
        country_a: 'US',
        country_b: 'CA',
        overall_level: 5,
        overall_description: 'First relation'
      },
      {
        id: 2,
        country_a: 'CA',
        country_b: 'US',
        overall_level: 5,
        overall_description: 'Second relation'
      },
      {
        id: 3,
        country_a: 'US',
        country_b: 'CA',
        overall_level: 4,
        overall_description: 'Third relation'
      }
    ];

    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    const result = await simulateGetSpecificRelation('US', 'CA', mockData);

    expect(result.data).not.toBeNull();
    expect(result.data?.id).toBe(1); // 最初のレコードが返される
    expect(consoleSpy).toHaveBeenCalled();

    consoleSpy.mockRestore();
  });
});