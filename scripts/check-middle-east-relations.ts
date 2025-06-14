import { createClient } from '@supabase/supabase-js';
import type { Database } from '../src/types/database';

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://rzsbezgovdebnrmtvtwh.supabase.co';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseAnonKey) {
  console.error('❌ VITE_SUPABASE_ANON_KEY environment variable is required');
  process.exit(1);
}

const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

async function checkMiddleEastRelations() {
  console.log('=== 中東地域の関係データ確認 ===\n');

  // 中東の主要国
  const middleEastCountries = [
    'SA', 'IR', 'TR', 'IL', 'AE', 'EG', 'IQ', 'SY', 'JO', 'LB', 'YE', 'OM', 'QA', 'KW', 'BH'
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

  // 中東諸国の関係データを抽出
  const middleEastRelations = relations.filter(rel => 
    middleEastCountries.includes(rel.country_a!) && middleEastCountries.includes(rel.country_b!)
  );

  console.log(`中東地域内の関係データ: ${middleEastRelations.length}件\n`);

  // 既存の関係を表示
  if (middleEastRelations.length > 0) {
    console.log('既存の中東地域内関係:');
    middleEastRelations.forEach(rel => {
      const country1 = countries.find(c => c.code === rel.country_a);
      const country2 = countries.find(c => c.code === rel.country_b);
      console.log(`- ${rel.country_a} (${country1?.name_ja || country1?.name_en}) - ${rel.country_b} (${country2?.name_ja || country2?.name_en}): レベル${rel.overall_level}`);
    });
    console.log();
  }

  // 中東各国の関係数をカウント
  console.log('各中東諸国の関係データ数:');
  const relationCounts = new Map<string, number>();
  
  middleEastCountries.forEach(country => {
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
  const majorMiddleEastCountries = ['SA', 'IR', 'TR', 'IL', 'AE', 'EG', 'IQ'];
  console.log('\n重要な中東諸国の関係データ状況:');
  
  majorMiddleEastCountries.forEach(code => {
    const count = relationCounts.get(code) || 0;
    const country = countries.find(c => c.code === code);
    const status = count >= 8 ? '✅' : count >= 4 ? '⚠️' : '❌';
    console.log(`${status} ${code} (${country?.name_ja || country?.name_en}): ${count}件`);
  });

  // 地政学的分析
  console.log('\n=== 地政学的分析 ===');
  
  const gccCountries = ['SA', 'AE', 'QA', 'KW', 'BH', 'OM']; // 湾岸協力会議
  const shiaInfluence = ['IR', 'IQ', 'SY', 'LB']; // シーア派影響圏
  const sunniAllies = ['SA', 'AE', 'EG', 'JO']; // スンニ派同盟
  const levantCountries = ['SY', 'LB', 'JO', 'IL']; // レバント地域

  const geopoliticalBlocs = {
    'GCC (湾岸協力会議)': gccCountries,
    'シーア派影響圏': shiaInfluence,
    'スンニ派同盟': sunniAllies,
    'レバント地域': levantCountries
  };

  Object.entries(geopoliticalBlocs).forEach(([blocName, blocCountries]) => {
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
  console.log('🥇 最高優先 (宗教・地政学対立):');
  console.log('  - サウジアラビア・イラン (スンニ・シーア対立の核心)');
  console.log('  - イスラエル・パレスチナ周辺国 (中東和平の核心)');
  console.log('  - トルコ・シリア、トルコ・イラク (地域介入と影響力)');
  console.log('  - UAE・カタール (GCC内部対立)');
  
  console.log('\n🥈 高優先 (地域機構・同盟):');
  console.log('  - GCC諸国間 (サウジ・UAE・カタール・クウェート等)');
  console.log('  - イラン・イラク・シリア (シーア派枢軸)');
  console.log('  - エジプト・ヨルダン・サウジ (スンニ派穏健同盟)');
  
  console.log('\n🥉 中優先 (経済・実務協力):');
  console.log('  - レバント諸国間の関係');
  console.log('  - 石油・ガス協力関係');
  console.log('  - 経済多角化パートナーシップ');

  console.log('\n=== 宗教・宗派別分析 ===');
  console.log('スンニ派主導国: SA, AE, EG, JO, TR');
  console.log('シーア派主導/影響: IR, IQ (政府), SY (政府), LB (ヒズボラ)');
  console.log('世俗主義: TR (名目上), SY (バース党)');
  console.log('ユダヤ教: IL');
  console.log('多宗教: LB (キリスト教・イスラム教)');
}

checkMiddleEastRelations().catch(console.error);