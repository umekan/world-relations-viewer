import { createClient } from '@supabase/supabase-js';
import type { Database } from '../src/types/database';

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://rzsbezgovdebnrmtvtwh.supabase.co';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseAnonKey) {
  console.error('❌ VITE_SUPABASE_ANON_KEY environment variable is required');
  process.exit(1);
}

const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// アフリカ諸国間の追加関係データ
const africaAdditionalRelations = [
  // 西アフリカ地域機構の強化
  {
    country_a: 'SN',
    country_b: 'ML',
    overall_level: 4,
    overall_description: 'セネガルとマリは、西アフリカの隣国として、ECOWAS協力と地域安全保障で密接な関係にあります。',
    political_military_description: 'ECOWAS平和維持、テロ対策（AQMI、JNIM等）で協力。マリ危機でセネガルが調停役を果たしました。',
    economic_description: 'セネガル川流域開発、農業協力、国境貿易が活発。ダカール港がマリの重要な貿易ルートです。',
    cultural_description: 'イスラム教（スーフィズム）の深いつながり。フラニ族、ウォロフ族など共通の民族グループが存在します。'
  },
  {
    country_a: 'SN',
    country_b: 'BF',
    overall_level: 4,
    overall_description: 'セネガルとブルキナファソは、西アフリカ仏語圏の協力と地域統合で重要な関係にあります。',
    political_military_description: 'ECOWAS、西アフリカ経済通貨同盟（UEMOA）での協力。近年のテロ脅威に対して共同対処しています。',
    economic_description: 'CFA フラン共通通貨圏、関税同盟による経済統合。農業、牧畜業での協力が活発です。',
    cultural_description: 'フランス語圏とイスラム・アニミズムの宗教的多様性を共有。モシ族など共通民族もあります。'
  },
  {
    country_a: 'GH',
    country_b: 'BF',
    overall_level: 4,
    overall_description: 'ガーナとブルキナファソは、隣国として経済協力と移民の相互移動により密接な関係にあります。',
    political_military_description: 'ECOWAS平和維持での協力。ブルキナファソの政情不安に対してガーナが安定化役割を果たしています。',
    economic_description: 'ガーナのカカオ農園で多くのブルキナファソ人が働く。金鉱業でも協力関係があります。',
    cultural_description: 'モシ族、グルマ族など国境を越えた共通民族。英語圏・フランス語圏の違いはありますが交流は活発です。'
  },

  // 中部アフリカの関係
  {
    country_a: 'CM',
    country_b: 'TD',
    overall_level: 3,
    overall_description: 'カメルーンとチャドは、中部アフリカの隣国として、安全保障と石油資源管理で協力しています。',
    political_military_description: 'ボコ・ハラム対策、中央アフリカ共和国危機への対応で軍事協力。チャド湖委員会でも連携しています。',
    economic_description: 'チャド・カメルーン石油パイプラインプロジェクト。カメルーンの港湾がチャドの貿易ルートとして重要です。',
    cultural_description: 'フランス語圏として文化的つながり。サラ族など共通の民族グループも存在します。'
  },
  {
    country_a: 'GA',
    country_b: 'CG',
    overall_level: 4,
    overall_description: 'ガボンとコンゴ共和国は、中部アフリカの石油産出国として、経済協力と地域統合で密接な関係にあります。',
    political_military_description: '中部アフリカ関税経済同盟（CEMAC）での協力。両国とも相対的に安定した政治体制を維持しています。',
    economic_description: '石油・ガス産業での協力、共通通貨（CFAフラン）。材木産業でも競争と協力があります。',
    cultural_Description: 'フランス語圏文化とバンツー系民族文化を共有。宗教的にもキリスト教が多数を占めます。'
  },

  // 東アフリカ共同体の関係強化
  {
    country_a: 'TZ',
    country_b: 'RW',
    overall_level: 4,
    overall_description: 'タンザニアとルワンダは、東アフリカ共同体の重要メンバーとして、地域統合と開発で協力しています。',
    political_military_description: 'EAC統合の推進、コンゴ民主共和国東部安定化での協力。ルワンダ大虐殺後の関係正常化も図られました。',
    economic_description: 'EAC共通市場、関税同盟での協力。ダルエスサラーム港がルワンダの重要な貿易ルートです。',
    cultural_description: 'スワヒリ語の普及、バンツー系民族文化を共有。キリスト教とイスラム教の共存も類似しています。'
  },
  {
    country_a: 'KE',
    country_b: 'RW',
    overall_level: 4,
    overall_description: 'ケニアとルワンダは、東アフリカの経済先進国として、技術革新と地域リーダーシップで協力しています。',
    political_military_description: 'EAC統合推進、南スーダン平和プロセスでの協力。両国とも地域の安定勢力として連携しています。',
    economic_description: 'IT・フィンテック分野での協力、航空業（ケニア航空・RwandAir）での競争と協力。観光業でも連携しています。',
    cultural_description: '英語とスワヒリ語を共有。起業家精神と技術革新への取り組みでも類似しています。'
  },

  // 南部アフリカ開発共同体（SADC）の関係
  {
    country_a: 'BW',
    country_b: 'ZA',
    overall_level: 4,
    overall_description: 'ボツワナと南アフリカは、SADC の主要国として、民主主義とガバナンスの模範例となる関係を築いています。',
    political_military_description: 'SADC地域統合の推進、ジンバブエ問題などでの政策調整。両国とも民主主義の安定性で協力しています。',
    economic_description: '南部アフリカ関税同盟（SACU）のメンバー。ダイヤモンド産業、観光業での協力があります。',
    cultural_description: 'ツワナ族が両国に存在。英語圏としての共通性と、民主主義文化を共有しています。'
  },
  {
    country_a: 'NA',
    country_b: 'ZA',
    overall_level: 4,
    overall_description: 'ナミビアと南アフリカは、隣国として独立支援の歴史と現代の経済協力により密接な関係にあります。',
    political_military_description: '南アフリカがナミビア独立を支援した歴史。SADC平和維持、アンゴラ・ジンバブエ問題でも協力しています。',
    economic_description: 'SACU加盟により関税同盟を形成。鉱業、観光業、農業での協力が活発です。',
    cultural_description: 'アフリカーンス語を共有する住民が存在。多民族・多言語国家としての共通課題もあります。'
  },

  // 北アフリカ・マグレブ地域の関係
  {
    country_a: 'DZ',
    country_b: 'LY',
    overall_level: 3,
    overall_description: 'アルジェリアとリビアは、隣国として石油・ガス協力を行いつつ、リビア内戦により複雑な関係にあります。',
    political_military_description: 'リビア内戦でアルジェリアは中立を維持しつつ、難民受け入れと調停努力を継続。国境安全保障でも協力。',
    economic_description: '石油・ガス産業での技術協力、貿易関係。しかし内戦により経済関係は制約されています。',
    cultural_description: 'アラブ・ベルベル文化を共有。歴史的にも深いつながりがありますが、政治情勢により交流は限定的です。'
  },
  {
    country_a: 'MA',
    country_b: 'DZ',
    overall_level: 2,
    overall_description: 'モロッコとアルジェリアは、マグレブ地域の大国として、西サハラ問題により長期間緊張関係にあります。',
    political_military_description: '西サハラ問題、ポリサリオ戦線支援を巡って対立。国境は1994年以来閉鎖状態が続いています。',
    economic_description: '本来なら重要な貿易相手国ですが、政治対立により経済関係は最小限。ガスパイプライン問題もあります。',
    cultural_description: 'マグレブ・アラブ文化を共有するにもかかわらず、政治対立が文化交流も阻害しています。'
  },

  // 島嶼国との関係
  {
    country_a: 'ZA',
    country_b: 'MU',
    overall_level: 4,
    overall_description: '南アフリカとモーリシャスは、インド洋地域の協力と投資関係で重要なパートナーです。',
    political_military_description: 'インド洋委員会、SADC（準加盟）での協力。海洋安全保障や違法漁業対策でも連携しています。',
    economic_description: '南アフリカ企業のモーリシャス投資が活発。金融ハブとしてのモーリシャスを南アが活用しています。',
    cultural_description: 'インド系、アフリカ系住民の存在により多文化社会としての共通性。英語とフランス語の使用もあります。'
  },

  // 宗教・文化圏での関係
  {
    country_a: 'EG',
    country_b: 'NG',
    overall_level: 3,
    overall_description: 'エジプトとナイジェリアは、アフリカの大国として、宗教的多様性と地域リーダーシップで重要な関係にあります。',
    political_military_description: 'アフリカ連合での協力、テロ対策（ISIS、ボコ・ハラム）での情報共有。両国とも地域の安定勢力として連携。',
    economic_description: '石油・ガス産業での協力、エジプト企業のナイジェリア進出。アフリカ大陸自由貿易圏でも協力しています。',
    cultural_description: 'イスラム教とキリスト教の共存という共通課題。アラブ・アフリカ文化の融合という類似性もあります。'
  },

  // 追加の地域間関係
  {
    country_a: 'ET',
    country_b: 'UG',
    overall_level: 4,
    overall_description: 'エチオピアとウガンダは、東アフリカの内陸国として、地域協力と経済統合で重要な関係にあります。',
    political_military_description: 'IGAD、EAC（エチオピアはオブザーバー）での協力。南スーダン平和プロセスでも連携しています。',
    economic_description: 'コーヒー生産国として国際市場での協力。EAC統合によりエチオピアの市場アクセス拡大の可能性があります。',
    cultural_description: 'キリスト教国としての共通性、英語使用の拡大。コーヒー文化も共有しています。'
  },
  {
    country_a: 'ZM',
    country_b: 'MW',
    overall_level: 4,
    overall_description: 'ザンビアとマラウイは、隣国として英語圏の共通性と経済協力により密接な関係にあります。',
    political_military_description: 'SADC加盟国として地域統合推進。両国とも相対的に政治的安定を維持し、民主主義を共有しています。',
    economic_description: 'ザンビアの銅とマラウイの農業による補完関係。国境貿易と労働移動も活発です。',
    cultural_description: '英語とバンツー語族言語を共有。キリスト教が多数を占める宗教構成も類似しています。'
  },
  {
    country_a: 'CI',
    country_b: 'ML',
    overall_level: 3,
    overall_description: 'コートジボワールとマリは、西アフリカ仏語圏として文化的つながりがありながら、政治情勢により複雑な関係にあります。',
    political_military_description: 'ECOWAS、UEMOA での協力。しかし、マリのクーデターと治安悪化により関係は制約されています。',
    economic_description: 'CFA フランスタンプ圏として経済統合。アビジャン港がマリの重要な貿易ルートです。',
    cultural_description: 'フランス語圏とイスラム文化を共有。マンデ族など共通の民族グループも存在します。'
  }
];

async function addAfricaAdditionalRelations() {
  console.log('アフリカ諸国間の追加関係データを追加開始...\n');

  let successCount = 0;
  let errorCount = 0;

  for (const relation of africaAdditionalRelations) {
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
          cultural_description: relation.cultural_description || relation.cultural_Description, // typo対応
          last_updated: new Date().toISOString(),
          data_source: 'Africa Additional Relations Update 2025'
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
  console.log(`スキップ: ${africaAdditionalRelations.length - successCount - errorCount}件（既存データ）`);
}

addAfricaAdditionalRelations().catch(console.error);