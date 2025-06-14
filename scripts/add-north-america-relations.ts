import { createClient } from '@supabase/supabase-js';
import type { Database } from '../src/types/database';

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://rzsbezgovdebnrmtvtwh.supabase.co';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6c2JlemdvdmRlYm5ybXR2dHdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk4Mjg4NzQsImV4cCI6MjA2NTQwNDg3NH0.ks3zHdJkCnDvDiriwyxAIOJMxUwuGeU1B2_aG91u1BY';

const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// 北米・カナダと主要国の関係データ
const northAmericaRelations = [
  // カナダと主要国の関係
  {
    country_a: 'CA',
    country_b: 'GB',
    overall_level: 5,
    overall_description: 'カナダとイギリスは、コモンウェルスの一員として歴史的・制度的に極めて密接な関係にあり、君主制を共有しています。',
    political_military_description: 'エリザベス女王を共通の君主とし、議会制民主主義の伝統を共有。NATO、G7での協力も緊密です。',
    economic_description: '伝統的な貿易関係に加え、金融、エネルギー、技術分野での協力が深化。英連邦特恵貿易も継続しています。',
    cultural_description: '英語とフランス語の二言語制度や、イギリス系住民の存在により文化的つながりが深い。教育制度も類似しています。'
  },
  {
    country_a: 'CA',
    country_b: 'FR',
    overall_level: 5,
    overall_description: 'カナダとフランスは、ケベック州のフランス系住民を通じた特別な関係と、フランコフォニーでの協力により密接な関係にあります。',
    political_military_description: 'フランコフォニー、G7、NATOでの協力。フランスはケベック州の言語・文化政策を支持しています。',
    economic_description: 'CETA（包括的経済貿易協定）により貿易・投資が拡大。航空宇宙、エネルギー、農業分野での協力が活発です。',
    cultural_description: 'ケベック州の580万人のフランス系住民が両国の文化的架け橋。フランス語教育や文化交流が盛んです。'
  },
  {
    country_a: 'CA',
    country_b: 'DE',
    overall_level: 4,
    overall_description: 'カナダとドイツは、G7パートナーとして民主主義価値観を共有し、経済・環境政策で密接に協力しています。',
    political_military_description: 'G7、NATO、国連での協力。気候変動、多国間主義、人権問題で共通の立場を取っています。',
    economic_description: 'CETAによりEUとの貿易が拡大。自動車、機械、化学分野での協力とドイツ企業のカナダ投資が増加しています。',
    cultural_description: 'ドイツ系カナダ人コミュニティの存在。教育・研究交流、環境技術での協力が活発です。'
  },
  {
    country_a: 'CA',
    country_b: 'AU',
    overall_level: 5,
    overall_description: 'カナダとオーストラリアは、コモンウェルスの主要国として、価値観と制度を共有する極めて密接なパートナーです。',
    political_military_description: 'Five Eyes情報共有、ANZUS-like協力。インド太平洋戦略でも連携し、中国の台頭に共同対処しています。',
    economic_description: '資源国同士として競争と協力が混在。しかし、投資協定や技術協力により経済関係は深化しています。',
    cultural_description: 'アングロサクソン文化と多文化主義政策の共有。スポーツ、教育交流が盛んで、ワーキングホリデー制度もあります。'
  },
  {
    country_a: 'CA',
    country_b: 'MX',
    overall_level: 4,
    overall_description: 'カナダとメキシコは、USMCA（旧NAFTA）のパートナーとして、経済統合と地域協力を深めています。',
    political_military_description: 'USMCA枠組みでの協力と、ラテンアメリカ政策での連携。移民・麻薬問題でも協力しています。',
    economic_description: 'USMCA により貿易・投資が大幅拡大。エネルギー、農業、製造業での協力が進んでいます。',
    cultural_description: 'メキシコ系カナダ人の増加と、多文化主義政策による文化交流の促進。スペイン語教育も普及しています。'
  },
  {
    country_a: 'CA',
    country_b: 'CN',
    overall_level: 2,
    overall_description: 'カナダと中国は、かつて密接な関係にありましたが、人権問題と安全保障懸念により関係が悪化しています。',
    political_military_description: 'ウイグル問題、香港問題、ファーウェイ問題で対立。Meng Wanzhou事件により外交関係が冷却化しました。',
    economic_description: 'かつて中国はカナダの第2位貿易相手国でしたが、政治的緊張により経済関係も制約されています。',
    cultural_description: '大規模な中国系カナダ人コミュニティが存在しますが、政治的対立により文化交流にも影響が出ています。'
  },
  {
    country_a: 'CA',
    country_b: 'RU',
    overall_level: 1,
    overall_description: 'カナダとロシアは、ウクライナ侵攻により関係が極度に悪化し、北極圏での競争も激化しています。',
    political_military_description: 'ウクライナ侵攻への制裁措置で完全に対立。北極圏での軍事的緊張も高まっています。',
    economic_description: 'エネルギー分野での競争関係に加え、制裁により経済関係は最小限に縮小しています。',
    cultural_description: 'ウクライナ系カナダ人の存在により、反ロシア感情が強い。文化交流は事実上停止状態です。'
  },
  {
    country_a: 'CA',
    country_b: 'BR',
    overall_level: 4,
    overall_description: 'カナダとブラジルは、G20パートナーとして、多国間協力と環境保護で重要な関係を築いています。',
    political_military_description: 'G20、国連、OASでの協力。アマゾン保護とカナダの森林保護政策で環境分野の連携があります。',
    economic_description: '鉱業、エネルギー、農業分野での協力。カナダ企業のブラジル投資も増加しています。',
    cultural_description: 'ブラジル系カナダ人コミュニティの成長。ポルトガル語教育や文化イベントも増加しています。'
  },
  {
    country_a: 'CA',
    country_b: 'NO',
    overall_level: 5,
    overall_description: 'カナダとノルウェーは、北極圏国家として、環境保護と資源管理で極めて密接な協力関係にあります。',
    political_military_description: 'NATO、北極評議会での協力。気候変動対策と北極圏の持続可能な開発で共通政策を推進しています。',
    economic_description: '石油・ガス技術、海洋資源管理、再生可能エネルギーでの協力。北海とカナダ沖での技術共有があります。',
    cultural_description: 'ノルウェー系カナダ人の歴史的存在。冬季スポーツ、環境意識の高さなど価値観を共有しています。'
  },
  {
    country_a: 'CA',
    country_b: 'KR',
    overall_level: 4,
    overall_description: 'カナダと韓国は、包括的戦略的パートナーシップに基づき、経済・安全保障で協力を深めています。',
    political_military_description: 'インド太平洋戦略での協力、朝鮮半島平和への貢献。G20での政策調整も行っています。',
    economic_description: 'FTA締結により貿易が大幅拡大。IT、自動車、エネルギー分野での協力が活発です。',
    cultural_description: '大規模な韓国系カナダ人コミュニティ。K-pop、韓国料理の人気により文化交流が急拡大しています。'
  },

  // 米国・カナダ・メキシコの三角関係強化
  {
    country_a: 'US',
    country_b: 'MX',
    overall_level: 3,
    overall_description: 'アメリカとメキシコは、USMCAのパートナーとして経済的に密接でありながら、移民・国境問題で複雑な関係にあります。',
    political_military_description: '移民・国境管理、麻薬対策で協力しつつ緊張も抱える。USMCAにより政策調整が制度化されています。',
    economic_description: 'USMCAにより北米最大の貿易関係。製造業、農業、エネルギー分野で深い統合が進んでいます。',
    cultural_description: '4000万人のメキシコ系アメリカ人の存在により、文化的つながりが極めて深い。しかし、移民問題により政治的緊張もあります。'
  },

  // その他の重要な北米関係
  {
    country_a: 'CA',
    country_b: 'IL',
    overall_level: 4,
    overall_description: 'カナダとイスラエルは、民主主義価値観と技術革新により、戦略的パートナーシップを強化しています。',
    political_military_description: 'テロ対策、サイバーセキュリティでの協力。中東和平への関与とイランの脅威に対する共通認識があります。',
    economic_description: 'FTA締結により貿易拡大。IT、医療技術、農業技術での協力が活発です。',
    cultural_description: '40万人のユダヤ系カナダ人コミュニティが両国の架け橋となっています。'
  },
  {
    country_a: 'CA',
    country_b: 'SA',
    overall_level: 2,
    overall_description: 'カナダとサウジアラビアは、人権問題を巡る外交対立により、緊張を含む関係にあります。',
    political_military_description: '2018年の人権活動家問題で外交関係が悪化。大使召還など深刻な対立を経験しました。',
    economic_description: '武器輸出問題と人権懸念により経済関係も制約。しかし、エネルギー分野では限定的な協力もあります。',
    cultural_description: 'サウジ系カナダ人コミュニティの存在にもかかわらず、人権問題により文化交流も制約されています。'
  },
  {
    country_a: 'CA',
    country_b: 'UA',
    overall_level: 5,
    overall_description: 'カナダとウクライナは、大規模なウクライナ系カナダ人コミュニティにより、極めて特別な関係にあります。',
    political_military_description: 'ウクライナ侵攻への全面支援。軍事訓練、武器供与、経済制裁でリーダーシップを発揮しています。',
    economic_description: 'FTA締結による経済関係強化に加え、戦後復興支援での大規模コミットメントを表明しています。',
    cultural_description: '130万人のウクライナ系カナダ人が両国関係の基盤。文化・教育交流が極めて活発です。'
  },
  {
    country_a: 'CA',
    country_b: 'ID',
    overall_level: 4,
    overall_description: 'カナダとインドネシアは、G20パートナーとして、経済協力と地域安定化で重要な関係を築いています。',
    political_military_description: 'ASEAN対話パートナーとしての関係、海洋安全保障での協力。平和維持活動でも連携しています。',
    economic_description: '包括的経済パートナーシップ交渉中。資源、パーム油、製造業での貿易が拡大しています。',
    cultural_description: 'インドネシア系カナダ人コミュニティの成長と、多文化主義政策による文化交流の促進。'
  },
  {
    country_a: 'CA',
    country_b: 'VN',
    overall_level: 4,
    overall_description: 'カナダとベトナムは、TPP11（CPTPP）パートナーとして、経済統合と地域協力を深めています。',
    political_military_description: 'CPTPP、ASEAN+での協力。南シナ海問題では国際法の重要性で一致しています。',
    economic_description: 'CPTPP により貿易・投資が拡大。農業、IT、教育分野での協力が活発です。',
    cultural_description: '30万人のベトナム系カナダ人コミュニティ。ベトナム戦争後の難民受け入れの歴史があります。'
  },
  {
    country_a: 'CA',
    country_b: 'PH',
    overall_level: 4,
    overall_description: 'カナダとフィリピンは、歴史的つながりと大規模なフィリピン系住民により、密接な関係にあります。',
    political_military_description: 'ASEAN対話パートナーシップ、平和維持活動での協力。海洋安全保障でも連携しています。',
    economic_description: '鉱業、農業、IT分野での協力。フィリピン人労働者の受け入れも拡大しています。',
    cultural_description: '90万人のフィリピン系カナダ人が最大のアジア系コミュニティを形成。文化交流が極めて活発です。'
  }
];

async function addNorthAmericaRelations() {
  console.log('北米・カナダと主要国の関係データを追加開始...\n');

  let successCount = 0;
  let errorCount = 0;

  for (const relation of northAmericaRelations) {
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
          data_source: 'North America Relations Update 2025'
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
  console.log(`スキップ: ${northAmericaRelations.length - successCount - errorCount}件（既存データ）`);
}

addNorthAmericaRelations().catch(console.error);