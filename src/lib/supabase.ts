import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/database';

// 環境変数からSupabaseの設定を取得
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// 環境変数の検証とデバッグ情報
console.log('Supabase URL:', supabaseUrl ? 'Set' : 'Missing');
console.log('Supabase Anon Key:', supabaseAnonKey ? 'Set' : 'Missing');

if (!supabaseUrl || !supabaseAnonKey) {
  const errorMsg = `Missing Supabase environment variables:
    VITE_SUPABASE_URL: ${supabaseUrl ? 'Set' : 'Missing'}
    VITE_SUPABASE_ANON_KEY: ${supabaseAnonKey ? 'Set' : 'Missing'}`;
  console.error(errorMsg);
  throw new Error(errorMsg);
}

// 値の形式チェック
if (!supabaseUrl.startsWith('https://')) {
  throw new Error(`Invalid VITE_SUPABASE_URL format: ${supabaseUrl}`);
}

if (!supabaseAnonKey.startsWith('eyJ')) {
  throw new Error(`Invalid VITE_SUPABASE_ANON_KEY format (should start with 'eyJ')`);
}

// Supabaseクライアントを作成
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// 型安全なヘルパー関数
export const getCountries = () => supabase.from('countries').select('*');

export const getRelations = () => supabase.from('relations').select('*');

// 型定義をエクスポート
export type Country = Database['public']['Tables']['countries']['Row'];
export type Relation = Database['public']['Tables']['relations']['Row'];

export const getCountryRelations = (countryCode: string) =>
  supabase
    .from('relations')
    .select('*')
    .or(`country_a.eq.${countryCode},country_b.eq.${countryCode}`);

export const getSpecificRelation = (countryA: string, countryB: string) =>
  supabase
    .from('relations')
    .select('*')
    .or(`and(country_a.eq.${countryA},country_b.eq.${countryB}),and(country_a.eq.${countryB},country_b.eq.${countryA})`)
    .single();

