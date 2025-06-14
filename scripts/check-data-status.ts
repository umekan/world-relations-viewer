import { createClient } from '@supabase/supabase-js';
import type { Database } from '../src/types/database';

// 環境変数の読み込み
const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://rzsbezgovdebnrmtvtwh.supabase.co';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseAnonKey) {
  console.error('❌ VITE_SUPABASE_ANON_KEY environment variable is required');
  process.exit(1);
}

const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

async function checkDataStatus() {
  console.log('=== Supabase データ登録状況確認 ===\n');

  // 国データの確認
  const { data: countries, error: countriesError } = await supabase
    .from('countries')
    .select('*')
    .order('code');

  if (countriesError) {
    console.error('国データの取得エラー:', countriesError);
    return;
  }

  console.log(`登録国数: ${countries?.length || 0}国\n`);

  // 関係データの確認
  const { data: relations, error: relationsError } = await supabase
    .from('relations')
    .select('*');

  if (relationsError) {
    console.error('関係データの取得エラー:', relationsError);
    return;
  }

  console.log(`登録関係数: ${relations?.length || 0}件\n`);

  // 関係データがある国のリスト
  const countriesWithRelations = new Set<string>();
  relations?.forEach(rel => {
    if (rel.country_a) countriesWithRelations.add(rel.country_a);
    if (rel.country_b) countriesWithRelations.add(rel.country_b);
  });

  console.log(`関係データがある国: ${countriesWithRelations.size}国`);

  // 関係データがない国のリスト
  const countriesWithoutRelations = countries?.filter(
    country => !countriesWithRelations.has(country.code)
  );

  if (countriesWithoutRelations && countriesWithoutRelations.length > 0) {
    console.log('\n関係データがない国:');
    countriesWithoutRelations.forEach(country => {
      console.log(`- ${country.code}: ${country.name_ja || country.name_en}`);
    });
  }

  // 主要国の関係データ確認
  const majorCountries = ['US', 'CN', 'JP', 'RU', 'GB', 'DE', 'FR', 'IN', 'BR', 'KR'];
  console.log('\n=== 主要国の関係データ状況 ===');

  for (const countryCode of majorCountries) {
    const { data: countryRelations } = await supabase
      .from('relations')
      .select('*')
      .or(`country_a.eq.${countryCode},country_b.eq.${countryCode}`);

    const country = countries?.find(c => c.code === countryCode);
    console.log(`\n${countryCode} (${country?.name_ja || country?.name_en || '未登録'}): ${countryRelations?.length || 0}件の関係`);
    
    if (countryRelations && countryRelations.length > 0) {
      countryRelations.forEach(rel => {
        const otherCountry = rel.country_a === countryCode ? rel.country_b : rel.country_a;
        const otherCountryData = countries?.find(c => c.code === otherCountry);
        console.log(`  - ${otherCountry} (${otherCountryData?.name_ja || otherCountryData?.name_en || '未登録'}): レベル${rel.overall_level}`);
      });
    }
  }

  // 統計情報
  console.log('\n=== 統計情報 ===');
  const levelCounts: Record<number, number> = {};
  relations?.forEach(rel => {
    if (rel.overall_level !== null) {
      levelCounts[rel.overall_level] = (levelCounts[rel.overall_level] || 0) + 1;
    }
  });

  console.log('関係レベル別の件数:');
  Object.entries(levelCounts).sort(([a], [b]) => Number(b) - Number(a)).forEach(([level, count]) => {
    const levelText = {
      5: '非常に友好的',
      4: '友好的',
      3: '中立的',
      2: 'やや緊張',
      1: '緊張関係'
    }[level] || `レベル${level}`;
    console.log(`  ${levelText}: ${count}件`);
  });
}

checkDataStatus().catch(console.error);