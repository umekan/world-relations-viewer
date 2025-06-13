import { getCountries, getCountryRelations, getSpecificRelation } from '../lib/supabase';
import type { Country as DbCountry, Relation as DbRelation } from '../lib/supabase';
import type { Country, Relation } from '../types';
import { RelationLevel } from '../types';

// キャッシュオブジェクト
let countriesCache: Country[] | null = null;
let relationsCache: Map<string, Relation[]> = new Map();

export class DataService {
  // 数値から関係レベルにマッピング
  private static mapRelationLevel(level: number | null): RelationLevel {
    switch (level) {
      case 1: return RelationLevel.VERY_TENSE;
      case 2: return RelationLevel.TENSE;
      case 3: return RelationLevel.NEUTRAL;
      case 4: return RelationLevel.FRIENDLY;
      case 5: return RelationLevel.VERY_FRIENDLY;
      default: return RelationLevel.NEUTRAL;
    }
  }
  // 全ての国を取得
  static async getAllCountries(): Promise<Country[]> {
    if (countriesCache) {
      return countriesCache;
    }

    try {
      const { data, error } = await getCountries();
      
      if (error) {
        console.error('Error fetching countries:', error);
        return [];
      }

      countriesCache = data?.map((country: DbCountry) => ({
        code: country.code,
        name: country.name_en,
        nameJa: country.name_ja || country.name_en,
        capital: country.capital || '',
        region: country.region || '',
        latlng: [0, 0] as [number, number] // TODO: 座標データを追加
      })) || [];

      return countriesCache;
    } catch (error) {
      console.error('Failed to fetch countries:', error);
      return [];
    }
  }

  // 特定の国の関係性を取得
  static async getCountryRelations(countryCode: string): Promise<Map<string, RelationLevel>> {
    const cacheKey = countryCode;
    
    if (relationsCache.has(cacheKey)) {
      const cached = relationsCache.get(cacheKey)!;
      const relationMap = new Map<string, RelationLevel>();
      cached.forEach(relation => {
        const otherCountry = relation.fromCountry === countryCode 
          ? relation.toCountry 
          : relation.fromCountry;
        relationMap.set(otherCountry, relation.level);
      });
      return relationMap;
    }

    try {
      const { data, error } = await getCountryRelations(countryCode);
      
      if (error) {
        console.error('Error fetching country relations:', error);
        return new Map();
      }

      const relations = data.map((row: DbRelation) => ({
        fromCountry: row.country_a || '',
        toCountry: row.country_b || '',
        level: this.mapRelationLevel(row.overall_level),
        overallDescription: row.overall_description,
        politicalMilitaryDescription: row.political_military_description || undefined,
        economicDescription: row.economic_description || undefined,
        culturalDescription: row.cultural_description || undefined,
        lastUpdated: row.last_updated || new Date().toISOString()
      }));

      relationsCache.set(cacheKey, relations);

      const relationMap = new Map<string, RelationLevel>();
      relations.forEach((relation: Relation) => {
        const otherCountry = relation.fromCountry === countryCode 
          ? relation.toCountry 
          : relation.fromCountry;
        relationMap.set(otherCountry, relation.level);
      });

      return relationMap;
    } catch (error) {
      console.error('Failed to fetch country relations:', error);
      return new Map();
    }
  }

  // 2国間の関係を取得
  static async getRelation(countryA: string, countryB: string): Promise<Relation | null> {
    try {
      const { data, error } = await getSpecificRelation(countryA, countryB);
      
      if (error || !data) {
        return null;
      }

      return {
        fromCountry: data.country_a || '',
        toCountry: data.country_b || '',
        level: this.mapRelationLevel(data.overall_level),
        overallDescription: data.overall_description,
        politicalMilitaryDescription: data.political_military_description || undefined,
        economicDescription: data.economic_description || undefined,
        culturalDescription: data.cultural_description || undefined,
        lastUpdated: data.last_updated || new Date().toISOString()
      };
    } catch (error) {
      console.error('Failed to fetch specific relation:', error);
      return null;
    }
  }

  // キャッシュをクリア
  static clearCache(): void {
    countriesCache = null;
    relationsCache.clear();
  }
}