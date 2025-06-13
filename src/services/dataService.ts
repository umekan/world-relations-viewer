import { supabase, getCountries, getCountryRelations, getSpecificRelation } from '../lib/supabase';
import type { Country, Relation } from '../types';
import { RelationLevel } from '../types';

// キャッシュオブジェクト
let countriesCache: Country[] | null = null;
let relationsCache: Map<string, Relation[]> = new Map();

export class DataService {
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

      countriesCache = data.map(country => ({
        code: country.code,
        name: country.name_en,
        nameJa: country.name_ja || country.name_en,
        capital: country.capital || '',
        region: country.region || '',
        latlng: [0, 0] as [number, number] // TODO: 座標データを追加
      }));

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

      const relations = data.map(row => ({
        fromCountry: row.country_a,
        toCountry: row.country_b,
        level: row.relation_level as RelationLevel,
        description: row.description,
        lastUpdated: row.last_updated
      }));

      relationsCache.set(cacheKey, relations);

      const relationMap = new Map<string, RelationLevel>();
      relations.forEach(relation => {
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
        fromCountry: data.country_a,
        toCountry: data.country_b,
        level: data.relation_level as RelationLevel,
        description: data.description,
        lastUpdated: data.last_updated
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