import { createClient } from '@supabase/supabase-js';
import type { Database } from '../src/types/database';

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://rzsbezgovdebnrmtvtwh.supabase.co';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseAnonKey) {
  console.error('❌ VITE_SUPABASE_ANON_KEY environment variable is required');
  process.exit(1);
}

const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// ヨーロッパ内部の未登録関係データ
const europeInternalRelations = [
  // 北欧諸国間の関係
  {
    country_a: 'SE',
    country_b: 'NO',
    overall_level: 5,
    overall_description: 'スウェーデンとノルウェーは、スカンジナビア兄弟国として、歴史的・文化的つながりと現代の協力により極めて密接な関係にあります。',
    political_military_description: '北欧協力評議会、EU・NATO連携での協力。防衛産業協力や平和維持活動でも緊密に連携しています。',
    economic_description: '北欧単一市場により人・物・サービスの自由移動を実現。エネルギー、IT、製造業での協力が深いです。',
    cultural_description: 'スカンジナビア語族として言語が類似。共通の価値観（社会民主主義、男女平等）と文化を共有しています。'
  },
  {
    country_a: 'SE',
    country_b: 'DK',
    overall_level: 5,
    overall_description: 'スウェーデンとデンマークは、歴史的な競争を乗り越え、現在は北欧協力の中核として極めて密接な関係にあります。',
    political_military_description: '北欧協力評議会での協力、EU政策の調整。オーレスン橋により物理的にも結ばれた関係です。',
    economic_description: 'オーレスン地域として事実上の統合経済圏を形成。多くのスウェーデン人がデンマークで働いています。',
    cultural_description: 'バイキング時代からの共通歴史。現在は言語的近似性と共通の価値観により文化的一体感が強いです。'
  },
  {
    country_a: 'NO',
    country_b: 'DK',
    overall_level: 5,
    overall_description: 'ノルウェーとデンマークは、歴史的な同君連合から現代のパートナーシップまで、極めて特別な関係にあります。',
    political_military_description: 'NATO創設国同士として軍事協力が深い。北極圏政策や漁業権でも協力しています。',
    economic_description: '北海油田開発での協力、海運業での競争と協力。グリーンエネルギー転換でも連携しています。',
    cultural_description: 'デンマーク語とノルウェー語の高い類似性。ヴァイキング文化や現代の民主主義文化を共有しています。'
  },
  {
    country_a: 'FI',
    country_b: 'SE',
    overall_level: 5,
    overall_description: 'フィンランドとスウェーデンは、600年の共通歴史と現代の北欧協力により、極めて密接な関係にあります。',
    political_military_description: 'EU加盟、NATO加盟申請での連携。フィンランドの中立政策をスウェーデンが支持してきました。',
    economic_description: 'バルト海地域で最も統合された経済関係。フィンランド企業の多くがスウェーデンに本社機能を置いています。',
    cultural_description: 'スウェーデン語がフィンランドの公用語。文化的価値観（サウナ、森林文化、社会保障）を共有しています。'
  },
  {
    country_a: 'FI',
    country_b: 'EE',
    overall_level: 5,
    overall_description: 'フィンランドとエストニアは、フィン・ウゴル語族として言語的につながり、現代では最も密接なバルト・北欧関係を築いています。',
    political_military_description: 'EU、NATO（協力国）での連携。エストニアの独立回復をフィンランドが全面支援しました。',
    economic_description: 'バルト海を挟んだ経済統合が進行。フィンランド企業のエストニア投資は最大規模です。',
    cultural_description: 'フィン語とエストニア語が言語系統として最も近い関係。文化交流が極めて活発です。'
  },

  // 中欧・東欧の関係強化
  {
    country_a: 'AT',
    country_b: 'CH',
    overall_level: 5,
    overall_description: 'オーストリアとスイスは、ドイツ語圏として文化的に極めて近く、EU・非EU間の重要な協力関係にあります。',
    political_military_description: '両国とも永世中立国として類似の外交政策。欧州統合では異なるアプローチを取りつつも協力しています。',
    economic_description: '密接な貿易・投資関係。スイス企業のオーストリア進出、金融・観光分野での協力が活発です。',
    cultural_description: 'ドイツ語とアルプス文化を共有。音楽、芸術、冬季スポーツでの交流が盛んです。'
  },
  {
    country_a: 'CZ',
    country_b: 'SK',
    overall_level: 5,
    overall_description: 'チェコとスロバキアは、チェコスロバキアとして共通の歴史を持ち、「ビロード離婚」後も極めて密接な関係を維持しています。',
    political_military_description: 'ヴィシェグラード4の中核として完全に協調。EU、NATO政策でも歩調を合わせています。',
    economic_description: '経済統合が最も進んだ関係。多くのチェコ企業がスロバキアに進出し、サプライチェーンが統合されています。',
    cultural_description: 'チェコ語とスロバキア語の高い類似性。共通の歴史と文化的価値観を保持しています。'
  },
  {
    country_a: 'HU',
    country_b: 'SK',
    overall_level: 4,
    overall_description: 'ハンガリーとスロバキアは、オーストリア・ハンガリー帝国の共通歴史と現代のV4協力により密接な関係にあります。',
    political_military_description: 'ヴィシェグラード4での協力。移民問題、EU改革で共通の立場を取ることが多いです。',
    economic_description: 'ドナウ川流域での経済協力。自動車産業、エネルギー分野での協力が拡大しています。',
    cultural_description: 'ハンガリー系住民がスロバキアに存在。オーストリア・ハンガリー時代の共通文化遺産があります。'
  },
  {
    country_a: 'PL',
    country_b: 'LT',
    overall_level: 5,
    overall_description: 'ポーランドとリトアニアは、ポーランド・リトアニア共和国の歴史的絆と現代の戦略的パートナーシップにより特別な関係にあります。',
    political_military_description: '対ロシア政策で完全に一致。NATO東方防衛、ベラルーシ問題で緊密に協力しています。',
    economic_description: 'バルト・ポーランド経済協力の拡大。エネルギー安全保障（LNG、電力）での協力が重要です。',
    cultural_description: 'ポーランド・リトアニア共和国時代の共通歴史。カトリック信仰と反ロシア感情を共有しています。'
  },

  // 南欧の関係
  {
    country_a: 'ES',
    country_b: 'PT',
    overall_level: 5,
    overall_description: 'スペインとポルトガルは、イベリア半島を共有し、EU統合の成功例として極めて密接な関係にあります。',
    political_military_description: 'EU、NATO、イベロアメリカ共同体での協力。国境開放により実質的に統合された関係です。',
    economic_description: 'イベリア電力市場統合、共同インフラプロジェクト。ポルトガル企業のスペイン進出も活発です。',
    cultural_description: 'イベリア文化とカトリック信仰を共有。言語も類似しており、文化交流が極めて盛んです。'
  },
  {
    country_a: 'IT',
    country_b: 'GR',
    overall_level: 4,
    overall_description: 'イタリアとギリシャは、古代からの文明交流と現代の地中海協力により、重要な関係を築いています。',
    political_military_description: 'EU、NATO南東欧政策での協力。移民・難民問題で共通課題を抱えています。',
    economic_description: '海運業、観光業での協力と競争。EU債務危機を共に経験した連帯感があります。',
    cultural_description: '古代ギリシャ・ローマ文明の継承者として文化的つながりが深い。正教会とカトリックの宗教対話も活発です。'
  },

  // ベネルクス三国の完全な関係
  {
    country_a: 'NL',
    country_b: 'LU',
    overall_level: 5,
    overall_description: 'オランダとルクセンブルクは、ベネルクス統合の一環として、小国間の協力モデルを築いています。',
    political_military_description: 'ベネルクス、EU創設国として完全に協調。ルクセンブルクの中立性をオランダが支持しています。',
    economic_description: 'ベネルクス経済同盟により高度に統合された経済関係。金融業での協力が特に密接です。',
    cultural_description: '多言語国家同士として言語政策で協力。小国としての共通課題を共有しています。'
  },
  {
    country_a: 'BE',
    country_b: 'LU',
    overall_level: 5,
    overall_description: 'ベルギーとルクセンブルクは、ベネルクス統合と言語的近似性により、極めて密接な関係にあります。',
    political_military_description: 'ベネルクス、EU創設国として政策を完全に調整。両国ともEU機関の本部を置いています。',
    economic_description: 'ベネルクス関税同盟以来の深い経済統合。金融業、EU機関関連ビジネスでの協力があります。',
    cultural_description: 'フランス語を共有し、小国としての共通アイデンティティを持っています。'
  },

  // バルカン諸国の関係
  {
    country_a: 'SI',
    country_b: 'HR',
    overall_level: 4,
    overall_description: 'スロベニアとクロアチアは、旧ユーゴスラビア諸国として共通歴史を持ちながら、EU統合で協力しています。',
    political_military_description: 'EU、NATO加盟で協力。国境問題は国際仲裁により解決。西バルカン統合政策で連携しています。',
    economic_description: 'アドリア海沿岸での観光協力、エネルギー分野での協力。クロアチアのEU加盟をスロベニアが支援しました。',
    cultural_description: '南スラブ文化を共有。言語も類似しており、文化交流が活発です。'
  },
  {
    country_a: 'GR',
    country_b: 'CY',
    overall_level: 5,
    overall_description: 'ギリシャとキプロスは、ギリシャ系住民と正教会により、極めて特別な関係にあります。',
    political_military_description: 'キプロス問題でギリシャが全面支援。トルコとの関係では完全に歩調を合わせています。',
    economic_description: 'ユーロ圏として金融政策を共有。ギリシャ企業のキプロス進出、海運業での協力があります。',
    cultural_description: 'ギリシャ正教と共通言語により文化的に一体化した関係。キプロスをギリシャの一部と見る人も多いです。'
  },

  // 追加の重要な関係
  {
    country_a: 'IE',
    country_b: 'MT',
    overall_level: 4,
    overall_description: 'アイルランドとマルタは、小島国として共通課題を持ち、EU内で協力する関係にあります。',
    political_military_description: '両国とも軍事的中立を維持。EU小国連合として政策調整を行っています。',
    economic_description: 'タックスヘイブン政策の類似性。金融サービス、IT分野での競争と協力があります。',
    cultural_description: 'カトリック信仰と小島国としてのアイデンティティを共有。観光業での経験共有もあります。'
  }
];

async function addEuropeInternalRelations() {
  console.log('ヨーロッパ内部の関係データを追加開始...\n');

  let successCount = 0;
  let errorCount = 0;

  for (const relation of europeInternalRelations) {
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
          data_source: 'Europe Internal Relations Update 2025'
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
  console.log(`スキップ: ${europeInternalRelations.length - successCount - errorCount}件（既存データ）`);
}

addEuropeInternalRelations().catch(console.error);