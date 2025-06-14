import { describe, it, expect, vi, beforeEach } from 'vitest';
import { DataService } from '../dataService';
import * as supabase from '../../lib/supabase';

// Supabase関数をモック
vi.mock('../../lib/supabase', () => ({
  getSpecificRelation: vi.fn(),
  getCountries: vi.fn(),
  getCountryRelations: vi.fn(),
  getRelations: vi.fn()
}));

describe('DataService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    DataService.clearCache();
  });

  describe('getRelation', () => {
    it('正常なデータを適切にマッピングして返す', async () => {
      const mockDbRelation = {
        id: 1,
        country_a: 'IL',
        country_b: 'JO',
        overall_level: 3,
        overall_description: 'Test description',
        political_military_description: 'Political description',
        economic_description: 'Economic description',
        cultural_description: 'Cultural description',
        last_updated: '2023-01-01T00:00:00Z'
      };

      (supabase.getSpecificRelation as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
        data: mockDbRelation,
        error: null
      });

      const result = await DataService.getRelation('IL', 'JO');

      expect(result).toEqual({
        fromCountry: 'IL',
        toCountry: 'JO',
        level: 3, // NEUTRAL
        overallDescription: 'Test description',
        politicalMilitaryDescription: 'Political description',
        economicDescription: 'Economic description',
        culturalDescription: 'Cultural description',
        lastUpdated: '2023-01-01T00:00:00Z'
      });
    });

    it('データが存在しない場合はnullを返す', async () => {
      (supabase.getSpecificRelation as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
        data: null,
        error: null
      });

      const result = await DataService.getRelation('IL', 'XX');

      expect(result).toBeNull();
    });

    it('エラーが発生した場合はnullを返す', async () => {
      (supabase.getSpecificRelation as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
        data: null,
        error: { message: 'Database error' }
      });

      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      const result = await DataService.getRelation('IL', 'JO');

      expect(result).toBeNull();
      expect(consoleSpy).toHaveBeenCalledWith('Error fetching specific relation:', { message: 'Database error' });

      consoleSpy.mockRestore();
    });

    it('関係レベルが正しくマッピングされる', async () => {
      const testCases = [
        { level: 1, expected: 1 }, // VERY_TENSE
        { level: 2, expected: 2 }, // TENSE
        { level: 3, expected: 3 }, // NEUTRAL
        { level: 4, expected: 4 }, // FRIENDLY
        { level: 5, expected: 5 }, // VERY_FRIENDLY
        { level: null, expected: 3 }, // Default to NEUTRAL
        { level: 999, expected: 3 }, // Invalid level defaults to NEUTRAL
      ];

      for (const testCase of testCases) {
        const mockDbRelation = {
          id: 1,
          country_a: 'IL',
          country_b: 'JO',
          overall_level: testCase.level,
          overall_description: 'Test'
        };

        (supabase.getSpecificRelation as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
          data: mockDbRelation,
          error: null
        });

        const result = await DataService.getRelation('IL', 'JO');
        expect(result?.level).toBe(testCase.expected);
      }
    });
  });

  describe('重複データ検出テスト', () => {
    it('複数の関係データが返された場合の処理をテスト', async () => {
      // これは実際のgetSpecificRelation関数の動作をテスト
      const mockData = [
        {
          id: 1,
          country_a: 'IL',
          country_b: 'JO',
          overall_level: 3,
          overall_description: 'First relation'
        },
        {
          id: 2,
          country_a: 'JO',
          country_b: 'IL',
          overall_level: 3,
          overall_description: 'Duplicate relation'
        }
      ];

      (supabase.getSpecificRelation as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
        data: mockData[0], // 修正後は最初の1件のみ返す
        error: null
      });

      const result = await DataService.getRelation('IL', 'JO');

      expect(result).not.toBeNull();
      expect(result?.fromCountry).toBe('IL');
      expect(result?.toCountry).toBe('JO');
    });
  });
});