import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/database';

// 環境変数からSupabaseの設定を取得
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.');
}

// Supabaseクライアントを作成
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// 型安全なヘルパー関数
export const getCountries = () => supabase.from('countries').select('*');

export const getRelations = () => supabase.from('relations').select('*');

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