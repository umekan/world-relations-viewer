import { createClient } from '@supabase/supabase-js';
import type { Database } from '../src/types/database';

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://rzsbezgovdebnrmtvtwh.supabase.co';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseAnonKey) {
  console.error('❌ VITE_SUPABASE_ANON_KEY environment variable is required');
  process.exit(1);
}

const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

async function checkAfricaRelations() {
  console.log('=== アフリカ地域の関係データ確認 ===\n');

  // アフリカの主要国
  const africaCountries = [
    'ZA', 'NG', 'EG', 'ET', 'KE', 'GH', 'MA', 'DZ', 'TN', 'AO', 'CI', 'CM', 'SN', 'MW', 'MZ', 'ZM', 'ZW', 'SD', 'LY'
  ];

  // 全ての関係データを取得
  const { data: relations, error } = await supabase
    .from('relations')
    .select('*');

  if (error) {
    console.error('エラー:', error);
    return;
  }

  // 全ての国を取得
  const { data: countries } = await supabase
    .from('countries')
    .select('*')
    .order('code');

  if (!countries || !relations) return;

  // アフリカ諸国の関係データを抽出
  const africaRelations = relations.filter(rel => 
    africaCountries.includes(rel.country_a!) && africaCountries.includes(rel.country_b!)
  );

  console.log(`アフリカ地域内の関係データ: ${africaRelations.length}件\n`);

  // 既存の関係を表示
  if (africaRelations.length > 0) {
    console.log('既存のアフリカ地域内関係:');
    africaRelations.forEach(rel => {
      const country1 = countries.find(c => c.code === rel.country_a);
      const country2 = countries.find(c => c.code === rel.country_b);
      console.log(`- ${rel.country_a} (${country1?.name_ja || country1?.name_en}) - ${rel.country_b} (${country2?.name_ja || country2?.name_en}): レベル${rel.overall_level}`);
    });
    console.log();
  }

  // アフリカ各国の関係数をカウント
  console.log('各アフリカ諸国の関係データ数:');
  const relationCounts = new Map<string, number>();
  
  africaCountries.forEach(country => {
    let count = 0;
    relations.forEach(rel => {
      if (rel.country_a === country || rel.country_b === country) {
        count++;
      }
    });
    relationCounts.set(country, count);
  });

  // 関係数でソート
  const sortedCounts = Array.from(relationCounts.entries())
    .sort(([,a], [,b]) => b - a);

  sortedCounts.forEach(([code, count]) => {
    const country = countries.find(c => c.code === code);
    console.log(`${code} (${country?.name_ja || country?.name_en || '未登録'}): ${count}件`);
  });

  // 重要だが関係データが不足している国を特定
  const majorAfricaCountries = ['NG', 'ZA', 'EG', 'ET', 'KE', 'GH', 'MA', 'DZ'];
  console.log('\n重要なアフリカ諸国の関係データ状況:');
  
  majorAfricaCountries.forEach(code => {
    const count = relationCounts.get(code) || 0;
    const country = countries.find(c => c.code === code);
    const status = count >= 5 ? '✅' : count >= 2 ? '⚠️' : '❌';
    console.log(`${status} ${code} (${country?.name_ja || country?.name_en}): ${count}件`);
  });

  // 地域機構による分類
  console.log('\n=== 地域機構別分析 ===');
  
  const ecowas = ['NG', 'GH', 'SN', 'CI', 'ML', 'BF', 'NE', 'GN']; // 西アフリカ諸国経済共同体
  const eac = ['KE', 'TZ', 'UG', 'RW', 'BI', 'SS']; // 東アフリカ共同体
  const sadc = ['ZA', 'ZW', 'ZM', 'MW', 'MZ', 'AO', 'NA', 'BW']; // 南部アフリカ開発共同体
  const northAfrica = ['EG', 'LY', 'TN', 'DZ', 'MA', 'SD']; // 北アフリカ

  const regionalBlocs = {
    'ECOWAS (西アフリカ)': ecowas,
    'EAC (東アフリカ)': eac,
    'SADC (南部アフリカ)': sadc,
    '北アフリカ': northAfrica
  };

  Object.entries(regionalBlocs).forEach(([blocName, blocCountries]) => {
    const existingCountries = blocCountries.filter(code => countries.some(c => c.code === code));
    let internalRelations = 0;
    const possibleRelations = (existingCountries.length * (existingCountries.length - 1)) / 2;

    relations.forEach(rel => {
      if (existingCountries.includes(rel.country_a!) && existingCountries.includes(rel.country_b!)) {
        internalRelations++;
      }
    });

    const percentage = possibleRelations > 0 ? (internalRelations / possibleRelations) * 100 : 0;
    console.log(`${blocName}: ${internalRelations}/${possibleRelations}件 (${percentage.toFixed(1)}%)`);
  });

  console.log('\n=== 優先すべき関係 ===');
  console.log('🥇 最高優先:');
  console.log('  - ナイジェリア・南アフリカ (アフリカ2大経済大国)');
  console.log('  - エジプト・エチオピア (ナイル川・地域大国)');
  console.log('  - ケニア・エチオピア (東アフリカの要)');
  console.log('  - 南アフリカ・ジンバブエ (南部アフリカ)');
  
  console.log('\n🥈 高優先:');
  console.log('  - ECOWAS諸国間 (ナイジェリア・ガーナ・セネガル等)');
  console.log('  - 北アフリカ諸国間 (エジプト・リビア・アルジェリア・モロッコ)');
  console.log('  - 東アフリカ諸国間 (ケニア・エチオピア周辺)');
}

checkAfricaRelations().catch(console.error);