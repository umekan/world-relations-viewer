import { createClient } from '@supabase/supabase-js';
import type { Database } from '../src/types/database';

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://rzsbezgovdebnrmtvtwh.supabase.co';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseAnonKey) {
  console.error('❌ VITE_SUPABASE_ANON_KEY environment variable is required');
  process.exit(1);
}

const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// 中南米地域の重要な関係データ
const latinAmericaRelations = [
  // メルコスール諸国間の関係
  {
    country_a: 'BR',
    country_b: 'AR',
    overall_level: 4,
    overall_description: 'ブラジルとアルゼンチンは、南米の二大国として、メルコスールを通じた経済統合と地域協力を推進する重要なパートナーです。',
    political_military_description: 'メルコスールの共同創設国として地域統合を主導。国際的な場でも協調することが多く、平和的な競争関係です。',
    economic_description: '南米最大の貿易関係。自動車産業、農業、エネルギー分野での協力が深く、経済統合が進んでいます。',
    cultural_description: 'サッカー文化やラテン文化を共有。ポルトガル語とスペイン語の違いはありますが、文化的親近性は高いです。'
  },
  {
    country_a: 'BR',
    country_b: 'UY',
    overall_level: 4,
    overall_description: 'ブラジルとウルグアイは、メルコスールの創設国として、小国ウルグアイにとってブラジルは最重要のパートナーです。',
    political_military_description: 'メルコスール統合でブラジルがウルグアイの利益に配慮。地域平和維持でも協力しています。',
    economic_description: 'ブラジルはウルグアイの最大貿易相手国。農業、物流、金融分野での協力が活発です。',
    cultural_description: '国境地域では混在した文化圏を形成。ウルグアイの牛肉文化にブラジルの影響も大きいです。'
  },
  {
    country_a: 'BR',
    country_b: 'PY',
    overall_level: 3,
    overall_description: 'ブラジルとパラグアイは、イタイプダムという巨大プロジェクトで結ばれた特別な関係にありますが、政治的には複雑です。',
    political_military_description: 'イタイプダム建設以来のパートナーシップ。しかし、パラグアイは中国接近など独自外交も展開しています。',
    economic_description: 'イタイプダムによる電力供給関係が基盤。農業投資や国境貿易も活発です。',
    cultural_description: 'ブラジル系住民がパラグアイに多数存在。ポルトガル語話者も増加しています。'
  },
  {
    country_a: 'AR',
    country_b: 'CL',
    overall_level: 4,
    overall_description: 'アルゼンチンとチリは、アンデス山脈を挟んだ隣国として、過去の対立を乗り越えて協力関係を構築しています。',
    political_military_description: '歴史的な国境紛争は解決済み。現在は地域協力と民主主義価値観の共有で連携しています。',
    economic_description: 'アンデス山脈を越えた貿易とエネルギー協力。チリの港湾がアルゼンチンの太平洋アクセスを提供。',
    cultural_description: '共通のスペイン語圏文化とワイン文化。アンデス山脈の両側で類似した文化を発達させています。'
  },
  {
    country_a: 'AR',
    country_b: 'UY',
    overall_level: 4,
    overall_description: 'アルゼンチンとウルグアイは、ラプラタ川流域を共有する隣国として、歴史的・文化的に極めて近い関係にあります。',
    political_military_description: 'メルコスール協力と地域平和維持。ウルグアイの中立的な立場をアルゼンチンが尊重しています。',
    economic_description: '農業、畜産業、観光業での協力。多くのアルゼンチン人がウルグアイのリゾート地を利用しています。',
    cultural_description: 'タンゴ文化やガウチョ文化を共有。ブエノスアイレス・モンテビデオ間の文化的つながりが深いです。'
  },

  // 太平洋同盟とアンデス諸国
  {
    country_a: 'CL',
    country_b: 'PE',
    overall_level: 4,
    overall_description: 'チリとペルーは、太平洋同盟の創設国として、経済統合と太平洋地域との貿易拡大で協力しています。',
    political_military_description: '太平洋同盟（PA）での協力。歴史的な戦争の記憶はありますが、現在は実用的な協力関係です。',
    economic_description: '鉱業、農業、漁業での協力と競争。太平洋同盟により貿易・投資が活発化しています。',
    cultural_description: 'アンデス文化とスペイン植民地文化を共有。先住民文化の保護でも協力しています。'
  },
  {
    country_a: 'CL',
    country_b: 'CO',
    overall_level: 4,
    overall_description: 'チリとコロンビアは、太平洋同盟のパートナーとして、政治的安定と経済発展で協力する重要な関係です。',
    political_military_description: '太平洋同盟での協力と民主主義価値観の共有。麻薬対策でも情報共有しています。',
    economic_description: '投資協定に基づく貿易拡大。エネルギー、鉱業、農業での協力が進んでいます。',
    cultural_description: 'スペイン語圏としての文化的つながり。両国とも音楽・芸術分野での交流が活発です。'
  },
  {
    country_a: 'PE',
    country_b: 'CO',
    overall_level: 4,
    overall_description: 'ペルーとコロンビアは、アンデス共同体と太平洋同盟の両方に加盟し、地域統合を推進する重要なパートナーです。',
    political_military_description: 'アンデス共同体（CAN）と太平洋同盟での協力。国境警備や麻薬対策でも連携しています。',
    economic_description: '活発な貿易関係と投資協力。エネルギー、鉱業、農業分野での協力が拡大しています。',
    cultural_description: 'アンデス文化とスペイン植民地文化を共有。先住民文化（ケチュア語等）でもつながりがあります。'
  },

  // メキシコと中米・南米
  {
    country_a: 'MX',
    country_b: 'BR',
    overall_level: 3,
    overall_description: 'メキシコとブラジルは、ラテンアメリカの二大国として、地域のリーダーシップを巡って競争しつつも協力する関係です。',
    political_military_description: 'G20、国連での協力。しかし、地域のリーダーシップや対米関係では異なるアプローチを取ることもあります。',
    economic_description: '限定的な貿易関係ですが、投資や技術協力は拡大傾向。自動車産業での協力もあります。',
    cultural_description: 'ラテンアメリカ文化の共有。映画、音楽、文学での文化交流が活発です。'
  },
  {
    country_a: 'MX',
    country_b: 'CO',
    overall_level: 4,
    overall_description: 'メキシコとコロンビアは、太平洋同盟の創設国として、経済統合と対外開放政策で密接に協力しています。',
    political_military_description: '太平洋同盟での協力と民主主義価値観の共有。麻薬対策での経験共有も行っています。',
    economic_description: '太平洋同盟により貿易・投資が大幅に拡大。エネルギー、製造業での協力が進んでいます。',
    cultural_description: 'スペイン語圏文化と音楽（特にロック、ポップ）での交流。テレビ・映画産業での協力もあります。'
  },

  // ベネズエラとの関係
  {
    country_a: 'VE',
    country_b: 'CO',
    overall_level: 2,
    overall_description: 'ベネズエラとコロンビアは、政治体制の違いと大量の移民流出により、緊張を含む困難な関係にあります。',
    political_military_description: 'ベネズエラ危機により数百万人がコロンビアに避難。国境管理や治安維持で緊張が継続しています。',
    economic_description: 'かつての重要な貿易関係は政治危機により大幅に縮小。国境貿易も不安定な状況です。',
    cultural_description: '共通のスペイン語圏文化と音楽文化。しかし、政治対立が文化交流にも影響を与えています。'
  },
  {
    country_a: 'BR',
    country_b: 'VE',
    overall_level: 2,
    overall_description: 'ブラジルとベネズエラは、国境を接する隣国として複雑な関係にあり、ベネズエラ危機への対応で課題を抱えています。',
    political_military_description: 'ベネズエラ難民の受け入れで人道的配慮を示していますが、政治的にはマドゥロ政権に批判的です。',
    economic_description: 'かつてのエネルギー協力は縮小。国境貿易も政情不安により制約されています。',
    cultural_description: 'ポルトガル語・スペイン語の違いはありますが、ラテンアメリカ文化圏として共通性があります。'
  },

  // 中米・カリブ海
  {
    country_a: 'MX',
    country_b: 'GT',
    overall_level: 3,
    overall_description: 'メキシコとグアテマラは、隣国として移民問題と経済協力で複雑な関係にありますが、協力も進めています。',
    political_military_description: '移民問題での協力。グアテマラからの移民流入の管理と、米国への移民の通過点としての課題を共有。',
    economic_description: 'メソアメリカ統合・開発プロジェクトでの協力。エネルギー、インフラ、農業分野での投資。',
    cultural_description: 'マヤ文化の共有と、スペイン語圏としての文化的つながり。多くのグアテマラ人がメキシコで働いています。'
  },

  // 地域機構での協力
  {
    country_a: 'CO',
    country_b: 'PE',
    overall_level: 4,
    overall_description: 'コロンビアとペルーは、アンデス共同体と太平洋同盟の両方で協力し、地域統合を推進する重要なパートナーです。',
    political_military_description: '麻薬対策、国境管理、テロ対策で密接に協力。アンデス地域の安定化で共通の利益があります。',
    economic_description: 'エネルギー統合、インフラ接続、貿易促進で協力。太平洋同盟により経済関係が深化しています。',
    cultural_description: 'アンデス文化とスペイン植民地文化を共有。音楽、文学、芸術での交流が盛んです。'
  },

  // その他の重要な関係
  {
    country_a: 'BR',
    country_b: 'CO',
    overall_level: 3,
    overall_description: 'ブラジルとコロンビアは、南米の地域大国として、アマゾン保護と地域安定化で協力する重要な関係です。',
    political_military_description: 'アマゾン協力条約機構（ACTO）での協力。コロンビアの和平プロセスをブラジルが支援してきました。',
    economic_description: 'エネルギー、インフラ、農業での協力。ブラジル企業のコロンビア投資も増加しています。',
    cultural_description: 'ポルトガル語・スペイン語の違いはありますが、アマゾン文化圏とラテンアメリカ文化を共有。'
  },
  {
    country_a: 'AR',
    country_b: 'PE',
    overall_level: 3,
    overall_description: 'アルゼンチンとペルーは、南米統合と地域協力において、実用的な協力関係を発展させています。',
    political_military_description: 'UNASUR、南米諸国連合での協力。地域平和維持と民主主義価値観の共有で連携。',
    economic_description: '農業、鉱業、製造業での協力。アルゼンチンの技術とペルーの資源を組み合わせた協力もあります。',
    cultural_description: 'スペイン語圏文化とタンゴ音楽の共有。ペルー系住民がアルゼンチンにも存在します。'
  },
  {
    country_a: 'CL',
    country_b: 'UY',
    overall_level: 4,
    overall_description: 'チリとウルグアイは、南米の安定した民主主義国として、政治的価値観と経済政策で協力しています。',
    political_military_description: '民主主義と人権の価値観を共有。国際機関での協力も多く、地域の安定勢力として連携。',
    economic_description: '自由貿易協定により経済関係を強化。農業、ワイン、IT分野での協力が活発。',
    cultural_description: 'スペイン語圏文化とワイン文化を共有。両国とも教育水準が高く、文化交流も盛んです。'
  }
];

async function addLatinAmericaRelations() {
  console.log('中南米地域の関係データを追加開始...\n');

  let successCount = 0;
  let errorCount = 0;

  for (const relation of latinAmericaRelations) {
    try {
      // 既存のデータがないか確認
      const { data: existing } = await supabase
        .from('relations')
        .select('*')
        .or(`and(country_a.eq.${relation.country_a},country_b.eq.${relation.country_b}),and(country_a.eq.${relation.country_b},country_b.eq.${relation.country_a})`);

      if (existing && existing.length > 0) {
        console.log(`既存: ${relation.country_a} - ${relation.country_b}`);
        continue;
      }

      // 新規データを挿入
      const { error } = await supabase
        .from('relations')
        .insert({
          country_a: relation.country_a,
          country_b: relation.country_b,
          overall_level: relation.overall_level,
          overall_description: relation.overall_description,
          political_military_description: relation.political_military_description,
          economic_description: relation.economic_description,
          cultural_description: relation.cultural_description,
          last_updated: new Date().toISOString(),
          data_source: 'Latin America Relations Update 2025'
        });

      if (error) {
        console.error(`エラー: ${relation.country_a} - ${relation.country_b}:`, error.message);
        errorCount++;
      } else {
        console.log(`追加成功: ${relation.country_a} - ${relation.country_b} (レベル: ${relation.overall_level})`);
        successCount++;
      }
    } catch (error) {
      console.error(`予期しないエラー: ${relation.country_a} - ${relation.country_b}:`, error);
      errorCount++;
    }
  }

  console.log(`\n=== 完了 ===`);
  console.log(`成功: ${successCount}件`);
  console.log(`エラー: ${errorCount}件`);
  console.log(`スキップ: ${latinAmericaRelations.length - successCount - errorCount}件（既存データ）`);
}

addLatinAmericaRelations().catch(console.error);