import { createClient } from '@supabase/supabase-js';
import type { Database } from '../src/types/database';

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://rzsbezgovdebnrmtvtwh.supabase.co';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseAnonKey) {
  console.error('❌ VITE_SUPABASE_ANON_KEY environment variable is required');
  process.exit(1);
}

const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// 西ヨーロッパ諸国間の主要関係データ
const westernEuropeRelations = [
  // ドイツを中心とした関係
  {
    country_a: 'DE',
    country_b: 'IT',
    overall_level: 4,
    overall_description: 'ドイツとイタリアは、EU創設国同士として密接な協力関係にあり、経済・政治の両面で重要なパートナーです。',
    political_military_description: 'EU統合の推進で協力し、ユーロ圏の安定化でも連携。NATO加盟国として安全保障でも協力しています。',
    economic_description: 'ドイツはイタリアの最大の貿易相手国。自動車、機械、化学製品での協力が深く、相互投資も活発です。',
    cultural_description: '多くのドイツ人がイタリアを観光で訪れ、文化交流が盛ん。学術・芸術分野での協力も活発です。'
  },
  {
    country_a: 'DE',
    country_b: 'ES',
    overall_level: 4,
    overall_description: 'ドイツとスペインは、EU統合と経済協力において重要なパートナーシップを築いています。',
    political_military_description: 'EU政策の調整で協力し、移民問題や気候変動対策で共通の立場。NATO加盟国として安全保障でも連携。',
    economic_description: 'ドイツはスペインの主要な貿易・投資相手国。再生可能エネルギー分野での協力が特に活発です。',
    cultural_description: '多くのドイツ人がスペインに居住・観光。教育・文化交流プログラムも充実しています。'
  },
  {
    country_a: 'DE',
    country_b: 'AT',
    overall_level: 5,
    overall_description: 'ドイツとオーストリアは、言語・文化を共有する特別な関係にあり、あらゆる分野で最も密接な協力を行っています。',
    political_military_description: 'EU政策で緊密に協調。オーストリアの中立政策に配慮しつつ、安全保障でも実質的に協力しています。',
    economic_description: '経済統合が非常に深く、労働市場も実質的に統合。多くのドイツ企業がオーストリアに進出しています。',
    cultural_description: '同じドイツ語圏として文化的一体性が強い。メディア空間も共有し、人的交流が極めて活発です。'
  },
  {
    country_a: 'DE',
    country_b: 'CH',
    overall_level: 4,
    overall_description: 'ドイツとスイスは、地理的近接性と経済的相互依存により、非常に密接な関係を維持しています。',
    political_military_description: 'スイスのEU非加盟にもかかわらず、実務的な協力関係を維持。二国間協定により様々な分野で協力しています。',
    economic_description: 'ドイツはスイスの最大の貿易相手国。金融、製薬、精密機械での協力が深く、国境を越えた労働移動も活発です。',
    cultural_description: 'ドイツ語を共有し、文化的つながりが深い。バーゼルやチューリッヒには多くのドイツ人が居住・通勤しています。'
  },
  {
    country_a: 'DE',
    country_b: 'DK',
    overall_level: 4,
    overall_description: 'ドイツとデンマークは、隣国として歴史的つながりと現代の緊密な協力関係を持っています。',
    political_military_description: 'EU・NATO加盟国として安全保障・政治政策で協力。バルト海地域の安定化でも連携しています。',
    economic_description: '活発な貿易関係と相互投資。エネルギー転換や環境技術での協力が特に重要です。',
    cultural_description: 'シュレースヴィヒ＝ホルシュタイン地域を中心に歴史的つながりがあり、少数民族の権利保護でも協力しています。'
  },

  // フランスを中心とした関係
  {
    country_a: 'FR',
    country_b: 'BE',
    overall_level: 5,
    overall_description: 'フランスとベルギーは、言語・文化の共有と地理的近接性により、極めて密接な関係にあります。',
    political_military_description: 'EU・NATO創設国として政策協調が緊密。欧州統合の推進で常に協力しています。',
    economic_description: '経済統合が深く、多くのフランス企業がベルギーに進出。ブリュッセルにはフランス系国際機関職員も多数います。',
    cultural_description: 'フランス語を共有し、文化的一体性が強い。教育・メディアでの交流も極めて活発です。'
  },
  {
    country_a: 'FR',
    country_b: 'NL',
    overall_level: 4,
    overall_description: 'フランスとオランダは、EU創設国として、また重要な経済パートナーとして協力関係を発展させています。',
    political_military_description: 'EU統合の推進で協力し、農業政策や環境政策で時に調整が必要ながらも、基本的には協調路線です。',
    economic_description: '重要な貿易・投資相手国。農業、化学、物流分野での協力が活発です。',
    cultural_description: 'アムステルダムやロッテルダムには多くのフランス人が居住。芸術・文化交流も盛んです。'
  },
  {
    country_a: 'FR',
    country_b: 'CH',
    overall_level: 4,
    overall_description: 'フランスとスイスは、言語的つながりと地理的近接性により、密接な協力関係を維持しています。',
    political_military_description: 'スイスのEU非加盟にもかかわらず、実務的な協力を維持。国境管理や環境問題で協力しています。',
    economic_description: 'フランスはスイスの重要な貿易相手国。ジュネーブ・レマン湖地域では経済統合が進んでいます。',
    cultural_description: 'フランス語圏スイスとの文化的つながりが深い。国境を越えた通勤・居住が日常的です。'
  },
  {
    country_a: 'FR',
    country_b: 'PT',
    overall_level: 4,
    overall_description: 'フランスとポルトガルは、EU加盟国として、また歴史的つながりにより良好な関係を維持しています。',
    political_military_description: 'EU・NATO加盟国として政策協調。アフリカ政策では経験と利益を共有しています。',
    economic_description: '観光、農業、投資の分野で協力。多くのポルトガル人がフランスで働いています。',
    cultural_description: '大規模なポルトガル系コミュニティがフランスに存在。文化・言語交流も活発です。'
  },

  // イギリスを中心とした関係
  {
    country_a: 'GB',
    country_b: 'NL',
    overall_level: 4,
    overall_description: 'イギリスとオランダは、Brexit後も、歴史的つながりと経済的利益により重要な関係を維持しています。',
    political_military_description: 'NATO同盟国として安全保障で協力。Brexit後の新たな関係枠組みを構築中です。',
    economic_description: 'ロンドンとアムステルダム間の金融協力。北海油田開発や海運でも協力しています。',
    cultural_description: '歴史的に深いつながり（オラニエ朝等）。英語圏としての文化的親近性もあります。'
  },
  {
    country_a: 'GB',
    country_b: 'ES',
    overall_level: 3,
    overall_description: 'イギリスとスペインは、Brexit以降関係が複雑化していますが、重要な協力関係を維持しています。',
    political_military_description: 'ジブラルタル問題で対立があるものの、NATO同盟国として安全保障では協力しています。',
    economic_description: '観光業での深い関係。多くの英国人がスペインに居住し、投資関係も重要です。',
    cultural_description: 'コスタ・デル・ソルなどに大きな英国人コミュニティ。しかし、Brexit により関係は変化しています。'
  },
  {
    country_a: 'GB',
    country_b: 'IT',
    overall_level: 4,
    overall_description: 'イギリスとイタリアは、Brexit後も、G7パートナーとして、また文化的つながりにより重要な関係を維持しています。',
    political_military_description: 'NATO・G7加盟国として安全保障・経済政策で協力。地中海問題でも連携しています。',
    economic_description: '金融、ファッション、観光での協力。ロンドンはイタリア企業にとって重要な金融センターです。',
    cultural_description: '芸術・文化での深いつながり。多くの英国人がイタリアを観光・居住先として選んでいます。'
  },
  {
    country_a: 'GB',
    country_b: 'SE',
    overall_level: 4,
    overall_description: 'イギリスとスウェーデンは、Brexit後も、価値観の共有と経済協力により良好な関係を維持しています。',
    political_military_description: 'NATO新規加盟国として安全保障で協力強化。環境・人権政策でも価値観を共有しています。',
    economic_description: 'イケアやH&M、ボルボなどスウェーデン企業の英国市場での存在感。金融・技術分野でも協力。',
    cultural_description: '社会民主主義的価値観の共有。環境意識や社会政策で類似の取り組みを行っています。'
  },
  {
    country_a: 'GB',
    country_b: 'NO',
    overall_level: 4,
    overall_description: 'イギリスとノルウェーは、北海での協力とEU非加盟国として、特別な関係を持っています。',
    political_military_description: 'NATO創設国として長年の安全保障協力。北極地域の戦略でも協力しています。',
    economic_description: '北海での石油・ガス共同開発。漁業権問題はあるものの、エネルギー協力は重要です。',
    cultural_description: '北欧系移民の歴史的つながり。環境・社会政策で価値観を共有しています。'
  },
  {
    country_a: 'GB',
    country_b: 'DK',
    overall_level: 4,
    overall_description: 'イギリスとデンマークは、王室のつながりと価値観の共有により、緊密な関係を維持しています。',
    political_military_description: 'NATO加盟国として安全保障で協力。バルト海・北極地域でも戦略的利益を共有しています。',
    economic_description: '金融、エネルギー、農業での協力。デンマーク企業の英国進出も活発です。',
    cultural_description: '王室間のつながり（フィリップ殿下はデンマーク系）。社会政策や環境政策で類似のアプローチを取っています。'
  },

  // イタリアを中心とした関係
  {
    country_a: 'IT',
    country_b: 'ES',
    overall_level: 5,
    overall_description: 'イタリアとスペインは、地中海地域の隣国として、文化・言語の近さと経済協力により非常に密接な関係にあります。',
    political_military_description: 'EU・NATO加盟国として政策協調が緊密。移民問題や地中海政策で特に協力しています。',
    economic_description: '観光、農業、製造業での協力。両国間の投資・貿易関係は年々深まっています。',
    cultural_description: 'ラテン系文化の共有により非常に近い関係。言語的類似性もあり、文化交流が極めて活発です。'
  },
  {
    country_a: 'IT',
    country_b: 'AT',
    overall_level: 4,
    overall_description: 'イタリアとオーストリアは、歴史的複雑さを乗り越えて、隣国として重要な協力関係を築いています。',
    political_military_description: 'EU加盟国として政策協調。南チロル問題は解決済みで、現在は地域協力のモデルとなっています。',
    economic_description: 'アルプス越えの重要な貿易ルート。観光業、製造業での協力が活発です。',
    cultural_description: '南チロル地域でのドイツ語・イタリア語二言語制度が成功例。文化的多様性を尊重する協力関係です。'
  },
  {
    country_a: 'IT',
    country_b: 'CH',
    overall_level: 4,
    overall_description: 'イタリアとスイスは、国境を接する隣国として、経済・文化の両面で密接な関係を持っています。',
    political_military_description: 'スイスのEU非加盟にもかかわらず、実務的な協力を維持。国境管理や環境問題で協力しています。',
    economic_description: 'スイスはイタリアの重要な貿易・投資相手国。ミラノ＝チューリッヒ間の経済回廊が重要です。',
    cultural_description: 'イタリア語圏スイス（ティチーノ州）との文化的つながり。国境を越えた通勤・居住が日常的です。'
  },
  {
    country_a: 'IT',
    country_b: 'PT',
    overall_level: 4,
    overall_description: 'イタリアとポルトガルは、地中海と大西洋の海洋国として、文化的親近性と共通の課題を共有しています。',
    political_military_description: 'EU・NATO加盟国として政策協調。南欧諸国として経済政策でも協力しています。',
    economic_description: '観光業、農業、海洋産業での協力。ワイン、オリーブオイルなど競合もありますが、協力も進んでいます。',
    cultural_description: 'ラテン系文化とカトリック教の共有。芸術・文化交流も活発です。'
  },

  // スペインを中心とした関係
  {
    country_a: 'ES',
    country_b: 'PT',
    overall_level: 5,
    overall_description: 'スペインとポルトガルは、イベリア半島を共有する隣国として、歴史を超えて極めて密接な関係を築いています。',
    political_military_description: 'EU・NATO加盟国として完全に協調。イベリア半島の統合的発展を推進しています。',
    economic_description: '経済統合が進み、エネルギー、水資源管理、交通インフラで共同プロジェクトを実施。相互投資も活発です。',
    cultural_description: '言語的・文化的類似性により非常に近い関係。国境地域では日常的な交流があります。'
  },
  {
    country_a: 'ES',
    country_b: 'NL',
    overall_level: 3,
    overall_description: 'スペインとオランダは、歴史的な複雑さを乗り越えて、EU枠組みでの協力関係を発展させています。',
    political_military_description: 'EU・NATO加盟国として協力。農業政策やユーロ圏政策で時に意見が分かれることもあります。',
    economic_description: '農業、観光、物流での協力。オランダ企業のスペイン進出も活発です。',
    cultural_description: '歴史的対立の記憶は残るものの、現在は観光・文化交流が盛んです。'
  },
  {
    country_a: 'ES',
    country_b: 'BE',
    overall_level: 4,
    overall_description: 'スペインとベルギーは、EU加盟国として、また歴史的つながりにより良好な関係を維持しています。',
    political_military_description: 'EU・NATO加盟国として政策協調。欧州統合の推進で協力しています。',
    economic_description: '貿易・投資関係が活発。ベルギー企業のスペイン進出も進んでいます。',
    cultural_description: 'ハプスブルク朝時代の歴史的つながり。現在は文化・教育交流が活発です。'
  },

  // 北欧諸国間の関係
  {
    country_a: 'SE',
    country_b: 'NO',
    overall_level: 5,
    overall_description: 'スウェーデンとノルウェーは、スカンディナヴィア兄弟国として、あらゆる分野で極めて密接な協力関係にあります。',
    political_military_description: '北欧協力会議での協調。NATO加盟により安全保障でもさらに協力が深まっています。',
    economic_description: '経済統合が深く、労働市場も統合。エネルギー分野での協力も重要です。',
    cultural_description: '言語的・文化的に極めて近く、メディア空間も共有。人的交流が非常に活発です。'
  },
  {
    country_a: 'SE',
    country_b: 'FI',
    overall_level: 5,
    overall_description: 'スウェーデンとフィンランドは、長い共通の歴史と現代の密接な協力により、特別な関係にあります。',
    political_military_description: 'NATO同時加盟により安全保障政策が完全に統合。バルト海地域の安定化で協力しています。',
    economic_description: '経済統合が非常に深く、多くの企業が両国で事業展開。森林・IT産業での協力が特に重要です。',
    cultural_description: 'フィンランドにはスウェーデン語話者が存在。文化的つながりが深く、教育・社会制度も類似しています。'
  },
  {
    country_a: 'NO',
    country_b: 'FI',
    overall_level: 5,
    overall_description: 'ノルウェーとフィンランドは、北欧協力と北極地域政策において、緊密なパートナーシップを築いています。',
    political_military_description: 'NATO加盟国として安全保障で協力。北極評議会での協調も重要です。',
    economic_description: 'エネルギー、林業、IT分野での協力。北極海航路開発でも協力しています。',
    cultural_description: '北欧の価値観と社会制度を共有。サーミ人の権利保護でも協力しています。'
  },
  {
    country_a: 'DK',
    country_b: 'FI',
    overall_level: 5,
    overall_description: 'デンマークとフィンランドは、バルト海を挟んだ北欧協力のパートナーとして、密接な関係を維持しています。',
    political_military_description: 'NATO加盟国としてバルト海の安全保障で協力。北欧防衛協力でも重要な役割を果たしています。',
    economic_description: 'グリーンエネルギー、デジタル技術、デザイン分野での協力。相互投資も活発です。',
    cultural_description: '北欧デザインや社会福祉制度など、価値観と文化的アプローチを共有しています。'
  },

  // 中立国との関係
  {
    country_a: 'AT',
    country_b: 'CH',
    overall_level: 5,
    overall_description: 'オーストリアとスイスは、ドイツ語圏の隣国として、また中立政策の経験を共有する特別な関係にあります。',
    political_military_description: '両国とも軍事的中立を維持し、平和政策で協力。EU加盟状況は異なりますが、実務的な協力を維持しています。',
    economic_description: '経済統合が非常に深く、国境を越えた労働移動も活発。金融・観光分野での協力が重要です。',
    cultural_description: 'ドイツ語と文化を共有し、メディア空間も統合的。アルプス地域の文化的アイデンティティを共有しています。'
  },

  // その他の重要な関係
  {
    country_a: 'NL',
    country_b: 'DK',
    overall_level: 4,
    overall_description: 'オランダとデンマークは、北海に面する隣国として、海洋政策と環境協力で密接な関係を築いています。',
    political_military_description: 'EU・NATO加盟国として政策協調。北海の環境保護と資源管理で協力しています。',
    economic_description: '海運、エネルギー、農業での協力。両国とも環境技術で世界をリードしています。',
    cultural_description: 'プロテスタント文化と海洋国家としての共通性。環境・社会政策で類似のアプローチを取っています。'
  },
  {
    country_a: 'NL',
    country_b: 'SE',
    overall_level: 4,
    overall_description: 'オランダとスウェーデンは、環境政策と社会制度の先進性において、価値観を共有する重要なパートナーです。',
    political_military_description: 'EU・NATO加盟国として協力。環境・人権政策で国際社会をリードしています。',
    economic_description: 'グリーンテクノロジー、デジタル技術での協力。両国とも革新的な企業文化を持っています。',
    cultural_description: 'プロテスタント的価値観と社会民主主義的制度。環境意識や社会的平等への取り組みで協力しています。'
  },
  {
    country_a: 'NL',
    country_b: 'NO',
    overall_level: 4,
    overall_description: 'オランダとノルウェーは、北海での協力と環境政策において、重要なパートナーシップを築いています。',
    political_military_description: 'NATO加盟国として安全保障で協力。北海・北極地域の戦略でも協力しています。',
    economic_description: '北海での石油・ガス開発協力。再生可能エネルギーや海洋技術での協力も重要です。',
    cultural_description: '海洋国家としての共通性と環境意識。社会制度や価値観でも多くの類似点があります。'
  }
];

async function addWesternEuropeRelations() {
  console.log('西ヨーロッパ諸国間の関係データを追加開始...\n');

  let successCount = 0;
  let errorCount = 0;

  for (const relation of westernEuropeRelations) {
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
          data_source: 'Western Europe Relations Update 2025'
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
  console.log(`スキップ: ${westernEuropeRelations.length - successCount - errorCount}件（既存データ）`);
}

addWesternEuropeRelations().catch(console.error);