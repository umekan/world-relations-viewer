import { createClient } from '@supabase/supabase-js';
import type { Database } from '../src/types/database';

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://rzsbezgovdebnrmtvtwh.supabase.co';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6c2JlemdvdmRlYm5ybXR2dHdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk4Mjg4NzQsImV4cCI6MjA2NTQwNDg3NH0.ks3zHdJkCnDvDiriwyxAIOJMxUwuGeU1B2_aG91u1BY';

const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// 地域別の国々
const regions = {
  'アジア太平洋': ['JP', 'CN', 'KR', 'IN', 'ID', 'TH', 'VN', 'SG', 'PH', 'MY', 'AU', 'NZ'],
  '中東': ['SA', 'AE', 'IR', 'IL', 'TR', 'EG', 'IQ', 'SY', 'JO', 'LB'],
  'アフリカ': ['ZA', 'NG', 'EG', 'ET', 'KE', 'GH', 'MA', 'DZ', 'TN'],
  '中南米': ['BR', 'AR', 'MX', 'CL', 'CO', 'PE', 'UY', 'PY', 'VE', 'EC'],
  '北米': ['US', 'CA', 'MX'],
  '西ヨーロッパ': ['DE', 'FR', 'GB', 'IT', 'ES', 'NL', 'BE', 'PT', 'AT', 'CH', 'SE', 'NO', 'DK', 'FI', 'IE'],
  '東ヨーロッパ': ['PL', 'CZ', 'HU', 'SK', 'SI', 'HR', 'BG', 'RO', 'EE', 'LV', 'LT', 'AL', 'MK', 'RS', 'BA', 'ME', 'MD', 'UA', 'BY', 'GE', 'AM', 'AZ']
};

async function analyzeCoverageGaps() {
  console.log('=== データカバレッジ分析 ===\n');

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

  // 関係データがある国のセット
  const countriesWithRelations = new Set<string>();
  relations.forEach(rel => {
    if (rel.country_a) countriesWithRelations.add(rel.country_a);
    if (rel.country_b) countriesWithRelations.add(rel.country_b);
  });

  console.log(`総関係データ数: ${relations.length}件`);
  console.log(`関係データがある国数: ${countriesWithRelations.size}国 / ${countries.length}国\n`);

  // 地域別分析
  console.log('=== 地域別カバレッジ ===');
  const regionAnalysis: { region: string; total: number; covered: number; percentage: number; missing: string[] }[] = [];

  for (const [regionName, regionCountries] of Object.entries(regions)) {
    const existingInRegion = regionCountries.filter(code => countries.some(c => c.code === code));
    const coveredInRegion = existingInRegion.filter(code => countriesWithRelations.has(code));
    const missingInRegion = existingInRegion.filter(code => !countriesWithRelations.has(code));
    
    const percentage = existingInRegion.length > 0 ? (coveredInRegion.length / existingInRegion.length) * 100 : 0;
    
    regionAnalysis.push({
      region: regionName,
      total: existingInRegion.length,
      covered: coveredInRegion.length,
      percentage,
      missing: missingInRegion
    });

    console.log(`${regionName}: ${coveredInRegion.length}/${existingInRegion.length}国 (${percentage.toFixed(1)}%)`);
    if (missingInRegion.length > 0) {
      const missingNames = missingInRegion.map(code => {
        const country = countries.find(c => c.code === code);
        return `${code}(${country?.name_ja || country?.name_en || '未登録'})`;
      });
      console.log(`  不足: ${missingNames.join(', ')}`);
    }
    console.log();
  }

  // 優先度分析
  console.log('=== 優先度分析 ===\n');

  // 1. カバレッジが低い地域
  const lowCoverageRegions = regionAnalysis
    .filter(r => r.percentage < 80 && r.total >= 5)
    .sort((a, b) => a.percentage - b.percentage);

  console.log('📈 カバレッジが低い地域（優先度高）:');
  lowCoverageRegions.forEach(region => {
    console.log(`  ${region.region}: ${region.percentage.toFixed(1)}% (${region.covered}/${region.total}国)`);
  });
  console.log();

  // 2. 主要国で関係データがない国
  const majorCountries = ['CN', 'IN', 'BR', 'ID', 'NG', 'MX', 'TR', 'SA', 'ZA', 'EG', 'IR', 'TH', 'AR', 'PH', 'VN'];
  const majorCountriesWithoutData = majorCountries.filter(code => !countriesWithRelations.has(code));
  
  if (majorCountriesWithoutData.length > 0) {
    console.log('🌍 関係データがない主要国:');
    majorCountriesWithoutData.forEach(code => {
      const country = countries.find(c => c.code === code);
      console.log(`  ${code}: ${country?.name_ja || country?.name_en || '未登録'}`);
    });
    console.log();
  }

  // 3. 地域内関係の分析
  console.log('=== 地域内関係の充実度 ===');
  for (const [regionName, regionCountries] of Object.entries(regions)) {
    const existingInRegion = regionCountries.filter(code => countries.some(c => c.code === code));
    if (existingInRegion.length < 3) continue; // 小さすぎる地域はスキップ

    let intraRegionRelations = 0;
    let possibleRelations = (existingInRegion.length * (existingInRegion.length - 1)) / 2;

    relations.forEach(rel => {
      if (existingInRegion.includes(rel.country_a!) && existingInRegion.includes(rel.country_b!)) {
        intraRegionRelations++;
      }
    });

    const intraRegionPercentage = possibleRelations > 0 ? (intraRegionRelations / possibleRelations) * 100 : 0;
    console.log(`${regionName}: ${intraRegionRelations}/${possibleRelations}件 (${intraRegionPercentage.toFixed(1)}%)`);
  }
  console.log();

  // 4. 推奨優先順位
  console.log('=== 推奨優先順位 ===\n');

  console.log('🥇 最高優先（すぐに着手すべき）:');
  console.log('  1. 中東地域 - 重要な地政学的地域だが関係データが少ない');
  console.log('  2. アジア太平洋の主要国間関係 - 中国・インド・東南アジアの関係');
  console.log('  3. アフリカの主要国 - ナイジェリア・南アフリカ・エジプトなど');
  console.log();

  console.log('🥈 高優先:');
  console.log('  1. 中南米の地域内関係 - ブラジル・アルゼンチン・メキシコ中心');
  console.log('  2. 東南アジア諸国間の関係充実');
  console.log('  3. 主要国と地域大国の関係（例：米中印、EU-アジア等）');
  console.log();

  console.log('🥉 中優先:');
  console.log('  1. オセアニア地域');
  console.log('  2. 中央アジア・コーカサス地域');
  console.log('  3. 小規模だが戦略的に重要な国々');
  console.log();

  // 具体的な次のステップ提案
  console.log('=== 次のステップ提案 ===\n');
  console.log('💡 次に取り組むべき具体的なデータ追加:');
  console.log('  1. 中東主要国（サウジアラビア、UAE、イラン、イスラエル、エジプト）の関係');
  console.log('  2. 中国と東南アジア諸国の関係');
  console.log('  3. インドとその周辺国の関係');
  console.log('  4. ブラジルと南米諸国の関係');
  console.log('  5. アフリカの地域大国間の関係');
}

analyzeCoverageGaps().catch(console.error);