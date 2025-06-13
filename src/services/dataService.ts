import { getCountries, getCountryRelations, getSpecificRelation, getRelations } from '../lib/supabase';
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
      console.log('Fetching countries from Supabase...');
      const { data, error } = await getCountries();
      
      if (error) {
        console.error('Error fetching countries:', error);
        console.error('Error details:', JSON.stringify(error, null, 2));
        return [];
      }
      
      console.log('Countries fetched successfully:', data?.length || 0, 'records');

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
      console.log('Fetching relations for country:', countryCode);
      const { data, error } = await getCountryRelations(countryCode);
      
      if (error) {
        console.error('Error fetching country relations:', error);
        console.error('Error details:', JSON.stringify(error, null, 2));
        return new Map();
      }
      
      console.log('Relations fetched successfully:', data?.length || 0, 'records');

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
      console.log('Fetching specific relation between:', countryA, 'and', countryB);
      const { data, error } = await getSpecificRelation(countryA, countryB);
      
      if (error) {
        console.error('Error fetching specific relation:', error);
        console.error('Error details:', JSON.stringify(error, null, 2));
        return null;
      }
      
      if (!data) {
        console.log('No relation found between:', countryA, 'and', countryB);
        return null;
      }
      
      console.log('Specific relation found:', data.country_a, '->', data.country_b);

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

  // 関係性データが存在する国のセットを取得
  static async getCountriesWithRelations(): Promise<Set<string>> {
    try {
      const relations = await this.getAllRelations();
      const countriesWithData = new Set<string>();
      
      relations.forEach((relation: Relation) => {
        countriesWithData.add(relation.fromCountry);
        countriesWithData.add(relation.toCountry);
      });
      
      console.log('Countries with relation data:', Array.from(countriesWithData));
      return countriesWithData;
    } catch (error) {
      console.error('Failed to fetch countries with relations:', error);
      return new Set();
    }
  }

  // 全ての関係を取得
  static async getAllRelations(): Promise<Relation[]> {
    if (relationsCache.size > 0) {
      // キャッシュから全ての関係を収集
      const allRelations: Relation[] = [];
      relationsCache.forEach(relations => {
        allRelations.push(...relations);
      });
      return allRelations;
    }

    try {
      console.log('Fetching all relations from Supabase...');
      const { data, error } = await getRelations();
      
      if (error) {
        console.error('Error fetching all relations:', error);
        return [];
      }
      
      const relations = data?.map((row: DbRelation) => ({
        fromCountry: row.country_a || '',
        toCountry: row.country_b || '',
        level: this.mapRelationLevel(row.overall_level),
        overallDescription: row.overall_description,
        politicalMilitaryDescription: row.political_military_description || undefined,
        economicDescription: row.economic_description || undefined,
        culturalDescription: row.cultural_description || undefined,
        lastUpdated: row.last_updated || new Date().toISOString()
      })) || [];
      
      console.log('All relations fetched successfully:', relations.length, 'records');
      return relations;
    } catch (error) {
      console.error('Failed to fetch all relations:', error);
      return [];
    }
  }

  // キャッシュをクリア
  static clearCache(): void {
    countriesCache = null;
    relationsCache.clear();
  }
}