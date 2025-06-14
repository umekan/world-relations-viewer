import { createClient } from '@supabase/supabase-js';
import type { Database } from '../src/types/database';

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://rzsbezgovdebnrmtvtwh.supabase.co';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6c2JlemdvdmRlYm5ybXR2dHdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk4Mjg4NzQsImV4cCI6MjA2NTQwNDg3NH0.ks3zHdJkCnDvDiriwyxAIOJMxUwuGeU1B2_aG91u1BY';

const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

async function checkWesternEuropeRelations() {
  console.log('=== 西ヨーロッパ諸国の関係データ確認 ===\n');

  // 西ヨーロッパの主要国
  const westernEuropeCountries = [
    'DE', 'FR', 'GB', 'IT', 'ES', 'NL', 'BE', 'PT', 'AT', 'CH', 
    'SE', 'NO', 'DK', 'FI', 'IE', 'LU', 'IS'
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

  // 西ヨーロッパ諸国間の既存関係をマッピング
  const westernEuropeRelations = new Map<string, number>();
  
  relations?.forEach(rel => {
    if (westernEuropeCountries.includes(rel.country_a!) && westernEuropeCountries.includes(rel.country_b!)) {
      const key = [rel.country_a, rel.country_b].sort().join('-');
      westernEuropeRelations.set(key, rel.overall_level!);
    }
  });

  console.log(`西ヨーロッパ諸国間の既存関係: ${westernEuropeRelations.size}件\n`);

  // 既存の関係を表示
  if (westernEuropeRelations.size > 0) {
    console.log('既存の西ヨーロッパ諸国間関係:');
    for (const [pair, level] of westernEuropeRelations.entries()) {
      const [country1, country2] = pair.split('-');
      const country1Name = countries?.find(c => c.code === country1)?.name_ja || country1;
      const country2Name = countries?.find(c => c.code === country2)?.name_ja || country2;
      console.log(`- ${country1} (${country1Name}) - ${country2} (${country2Name}): レベル${level}`);
    }
  }

  // 不足している関係を特定
  const missingRelations: string[] = [];
  const totalPossibleRelations = (westernEuropeCountries.length * (westernEuropeCountries.length - 1)) / 2;

  for (let i = 0; i < westernEuropeCountries.length; i++) {
    for (let j = i + 1; j < westernEuropeCountries.length; j++) {
      const country1 = westernEuropeCountries[i];
      const country2 = westernEuropeCountries[j];
      const key = [country1, country2].sort().join('-');
      
      if (!westernEuropeRelations.has(key)) {
        const country1Name = countries?.find(c => c.code === country1)?.name_ja || country1;
        const country2Name = countries?.find(c => c.code === country2)?.name_ja || country2;
        missingRelations.push(`${country1} (${country1Name}) - ${country2} (${country2Name})`);
      }
    }
  }

  console.log(`\n不足している西ヨーロッパ諸国間関係: ${missingRelations.length}件 / ${totalPossibleRelations}件\n`);

  // 特に重要と思われる不足関係
  const importantMissing = [
    'DE-IT', 'DE-ES', 'DE-AT', 'DE-CH', 'DE-SE', 'DE-DK', 'DE-NO',
    'FR-IT', 'FR-ES', 'FR-BE', 'FR-NL', 'FR-CH', 'FR-PT',
    'GB-IE', 'GB-NL', 'GB-ES', 'GB-IT', 'GB-SE', 'GB-NO', 'GB-DK',
    'IT-ES', 'IT-AT', 'IT-CH', 'IT-PT',
    'ES-PT', 'ES-NL', 'ES-BE',
    'NL-BE', 'NL-DE', 'NL-DK', 'NL-NO', 'NL-SE',
    'SE-NO', 'SE-DK', 'SE-FI',
    'NO-DK', 'NO-FI',
    'DK-FI',
    'AT-CH', 'AT-IT',
    'CH-IT', 'CH-FR'
  ];

  console.log('特に重要と思われる不足関係（既存データがあるかチェック）:');
  importantMissing.forEach(pair => {
    const [country1, country2] = pair.split('-');
    const key = [country1, country2].sort().join('-');
    if (!westernEuropeRelations.has(key)) {
      const country1Name = countries?.find(c => c.code === country1)?.name_ja || country1;
      const country2Name = countries?.find(c => c.code === country2)?.name_ja || country2;
      console.log(`- ${country1} (${country1Name}) - ${country2} (${country2Name})`);
    }
  });

  // 各国の関係数をカウント
  console.log('\n\n各国の西ヨーロッパ内での関係数:');
  westernEuropeCountries.forEach(country => {
    let count = 0;
    westernEuropeRelations.forEach((level, pair) => {
      if (pair.includes(country)) count++;
    });
    const countryName = countries?.find(c => c.code === country)?.name_ja || country;
    console.log(`${country} (${countryName}): ${count}件`);
  });
}

checkWesternEuropeRelations().catch(console.error);