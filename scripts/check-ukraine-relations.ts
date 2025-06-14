import { createClient } from '@supabase/supabase-js';
import type { Database } from '../src/types/database';

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://rzsbezgovdebnrmtvtwh.supabase.co';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6c2JlemdvdmRlYm5ybXR2dHdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk4Mjg4NzQsImV4cCI6MjA2NTQwNDg3NH0.ks3zHdJkCnDvDiriwyxAIOJMxUwuGeU1B2_aG91u1BY';

const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

async function checkUkraineRelations() {
  console.log('=== ウクライナの関係データ確認 ===\n');

  // ウクライナの関係データを取得
  const { data: relations, error } = await supabase
    .from('relations')
    .select('*')
    .or(`country_a.eq.UA,country_b.eq.UA`);

  if (error) {
    console.error('エラー:', error);
    return;
  }

  console.log(`ウクライナの関係データ: ${relations?.length || 0}件\n`);

  // 全ての国を取得
  const { data: countries } = await supabase
    .from('countries')
    .select('*')
    .order('code');

  if (relations && relations.length > 0) {
    console.log('既存の関係:');
    relations.forEach(rel => {
      const otherCountry = rel.country_a === 'UA' ? rel.country_b : rel.country_a;
      const country = countries?.find(c => c.code === otherCountry);
      console.log(`- ${otherCountry} (${country?.name_ja || country?.name_en || '未登録'}): レベル${rel.overall_level}`);
    });
  }

  // ウクライナと関係データがない主要国をリストアップ
  const majorCountries = [
    'US', 'GB', 'FR', 'DE', 'IT', 'ES', 'NL', 'BE', 'NO', 'SE', 'FI', 'DK',
    'JP', 'KR', 'AU', 'CA', 'TR', 'IL', 'CN', 'IN', 'BR', 'ZA'
  ];

  const existingRelations = new Set<string>();
  relations?.forEach(rel => {
    if (rel.country_a === 'UA') existingRelations.add(rel.country_b!);
    if (rel.country_b === 'UA') existingRelations.add(rel.country_a!);
  });

  const missingRelations = majorCountries.filter(code => !existingRelations.has(code));

  if (missingRelations.length > 0) {
    console.log('\n\nウクライナとの関係データがない主要国:');
    missingRelations.forEach(code => {
      const country = countries?.find(c => c.code === code);
      console.log(`- ${code}: ${country?.name_ja || country?.name_en || '未登録'}`);
    });
  }
}

checkUkraineRelations().catch(console.error);