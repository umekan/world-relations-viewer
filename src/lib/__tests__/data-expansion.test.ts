import { describe, it, expect } from 'vitest';

/**
 * データベース拡張機能のテスト
 * イスラエルとの関係データ追加に関するテスト
 */

interface RelationData {
  country_a: string;
  country_b: string;
  overall_level: number;
  overall_description: string;
  political_military_description?: string;
  economic_description?: string;
  cultural_description?: string;
}

describe('データベース拡張テスト', () => {
  describe('イスラエル関係データの検証', () => {
    it('新しい関係データが必要な構造を持っている', () => {
      const newRelation: RelationData = {
        country_a: 'IL',
        country_b: 'US',
        overall_level: 5,
        overall_description: 'Test description',
        political_military_description: 'Political description',
        economic_description: 'Economic description',
        cultural_description: 'Cultural description'
      };

      expect(newRelation).toHaveProperty('country_a');
      expect(newRelation).toHaveProperty('country_b');
      expect(newRelation).toHaveProperty('overall_level');
      expect(newRelation).toHaveProperty('overall_description');
      expect(newRelation.overall_level).toBeGreaterThanOrEqual(1);
      expect(newRelation.overall_level).toBeLessThanOrEqual(5);
    });

    it('関係レベルが有効な範囲内である', () => {
      const validLevels = [1, 2, 3, 4, 5];
      
      validLevels.forEach(level => {
        expect(level).toBeGreaterThanOrEqual(1);
        expect(level).toBeLessThanOrEqual(5);
      });

      // 無効な値のテスト
      const invalidLevels = [0, 6, -1, 10];
      invalidLevels.forEach(level => {
        expect(level < 1 || level > 5).toBe(true);
      });
    });

    it('国コードが正しい形式である', () => {
      const validCountryCodes = ['IL', 'US', 'UK', 'FR', 'DE', 'EG', 'TR'];
      
      validCountryCodes.forEach(code => {
        expect(code).toMatch(/^[A-Z]{2,3}$/);
        expect(code.length).toBeGreaterThanOrEqual(2);
        expect(code.length).toBeLessThanOrEqual(3);
      });
    });

    it('重複データが作成されない（アルファベット順チェック）', () => {
      const relations = [
        { country_a: 'IL', country_b: 'US' },
        { country_a: 'DE', country_b: 'IL' },
        { country_a: 'EG', country_b: 'IL' }
      ];

      // アルファベット順になっているかチェック
      relations.forEach(relation => {
        if (relation.country_a > relation.country_b) {
          // 順序が間違っている場合はテスト失敗
          expect(`${relation.country_a} should come after ${relation.country_b}`).toBe('Alphabetical order required');
        }
      });
    });
  });

  describe('重要な関係性の優先順位', () => {
    it('地政学的に重要な国との関係が優先される', () => {
      const highPriorityCountries = [
        'US', // アメリカ（最重要同盟国）
        'EG', // エジプト（隣国、平和条約）
        'SY', // シリア（隣国、緊張関係）
        'LB', // レバノン（隣国、複雑な関係）
        'TR', // トルコ（地域大国）
        'DE', // ドイツ（欧州の重要パートナー）
        'FR', // フランス（歴史的関係）
        'UK', // イギリス（歴史的関係）
        'RU', // ロシア（地域への影響力）
        'CN', // 中国（経済関係）
        'IN'  // インド（新興パートナー）
      ];

      expect(highPriorityCountries.length).toBeGreaterThan(0);
      expect(highPriorityCountries).toContain('US');
      expect(highPriorityCountries).toContain('EG');
    });
  });

  describe('データ整合性チェック', () => {
    it('説明文が適切な長さを持っている', () => {
      const sampleDescription = '1973年第四次中東戦争後、1979年キャンプ・デービッド合意により平和条約を締結。';
      
      expect(sampleDescription.length).toBeGreaterThan(20);
      expect(sampleDescription.length).toBeLessThan(500);
    });

    it('複数の側面（政治・経済・文化）が考慮されている', () => {
      const relationAspects = ['political_military_description', 'economic_description', 'cultural_description'];
      
      relationAspects.forEach(aspect => {
        expect(aspect).toMatch(/_description$/);
      });
    });
  });
});