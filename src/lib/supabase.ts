import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/database';

// 環境変数からSupabaseの設定を取得（トリム処理）
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();

// 環境変数の検証とデバッグ情報
console.log('Supabase URL:', supabaseUrl ? `Set (${supabaseUrl.length} chars)` : 'Missing');
console.log('Supabase Anon Key:', supabaseAnonKey ? `Set (${supabaseAnonKey.length} chars)` : 'Missing');

// 不正な文字をチェック
if (supabaseUrl) {
  const hasInvalidChars = /[\n\r\t]/.test(supabaseUrl);
  if (hasInvalidChars) {
    console.error('URL contains invalid characters (newlines/tabs)');
  }
}

if (supabaseAnonKey) {
  const hasInvalidChars = /[\n\r\t]/.test(supabaseAnonKey);
  if (hasInvalidChars) {
    console.error('Anon key contains invalid characters (newlines/tabs)');
  }
}

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

export const getSpecificRelation = async (countryA: string, countryB: string) => {
  const { data, error } = await supabase
    .from('relations')
    .select('*')
    .or(`and(country_a.eq.${countryA},country_b.eq.${countryB}),and(country_a.eq.${countryB},country_b.eq.${countryA})`);
  
  if (error) {
    return { data: null, error };
  }
  
  if (!data || data.length === 0) {
    return { data: null, error: null };
  }
  
  // 複数の行がある場合は最初の行を返す（ログで警告）
  if (data.length > 1) {
    console.warn(`Multiple relations found for ${countryA}-${countryB}:`, data);
  }
  
  return { data: data[0], error: null };
};

