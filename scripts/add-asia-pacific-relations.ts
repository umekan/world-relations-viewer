import { createClient } from '@supabase/supabase-js';
import type { Database } from '../src/types/database';

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://rzsbezgovdebnrmtvtwh.supabase.co';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6c2JlemdvdmRlYm5ybXR2dHdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk4Mjg4NzQsImV4cCI6MjA2NTQwNDg3NH0.ks3zHdJkCnDvDiriwyxAIOJMxUwuGeU1B2_aG91u1BY';

const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// アジア太平洋地域の重要な関係データ
const asiaPacificRelations = [
  // 中国と東南アジア諸国
  {
    country_a: 'CN',
    country_b: 'VN',
    overall_level: 3,
    overall_description: '中国とベトナムは、南シナ海問題により緊張を抱えながらも、経済面では密接な関係にある複雑なパートナーです。',
    political_military_description: '南シナ海の領有権争いで対立。しかし、共産党同士の関係や地域安定では協力も見られます。',
    economic_description: '中国はベトナムの最大貿易相手国。一帯一路プロジェクトや製造業投資が活発です。',
    cultural_description: '儒教文化圏と長い歴史的つながり。ベトナム戦争時の中国支援の記憶もありますが、1979年の中越戦争の影響も残ります。'
  },
  {
    country_a: 'CN',
    country_b: 'TH',
    overall_level: 4,
    overall_description: '中国とタイは、「一帯一路」構想と経済協力により、極めて密接な戦略的パートナーシップを築いています。',
    political_military_description: 'タイの軍事政権と中国の実用主義的関係。人権問題では相互不干渉の原則を維持しています。',
    economic_description: '高速鉄道建設、デジタル経済、農業協力など大規模プロジェクトを推進。中国はタイの最大投資国の一つです。',
    cultural_description: '華僑の歴史的存在により中華文化が根付いています。仏教という共通の宗教的基盤もあります。'
  },
  {
    country_a: 'CN',
    country_b: 'SG',
    overall_level: 4,
    overall_description: '中国とシンガポールは、華人国家としての特別な関係と地域金融ハブとしての協力により、非常に密接な関係にあります。',
    political_military_description: 'シンガポールは米中間でバランス外交を維持。中国との軍事交流もありますが、米軍基地も受け入れています。',
    economic_description: 'シンガポールは中国企業の東南アジア進出の拠点。金融、物流、技術革新での協力が深いです。',
    cultural_description: '人口の約74%が華系のシンガポール。中華文化の伝統を維持しつつ、多文化社会を実現しています。'
  },
  {
    country_a: 'CN',
    country_b: 'MY',
    overall_level: 4,
    overall_description: '中国とマレーシアは、一帯一路構想の重要なパートナーとして、インフラ投資と貿易で密接な関係を築いています。',
    political_military_description: 'マレーシアの「東方政策」の一環として中国との関係を重視。南シナ海では慎重な立場を維持しています。',
    economic_description: '東海岸鉄道プロジェクトなど大規模インフラ投資。パーム油、電子機器での貿易が活発です。',
    cultural_description: 'マレーシアの華人コミュニティ（約23%）が架け橋の役割。中華系の文化的影響が強いです。'
  },
  {
    country_a: 'CN',
    country_b: 'PH',
    overall_level: 3,
    overall_description: '中国とフィリピンは、南シナ海問題で深刻な対立を抱えながらも、経済的必要性から実用的な協力を模索しています。',
    political_military_description: '南シナ海での領有権争いが最大の争点。しかし、ドゥテルテ政権以降は実用主義的なアプローチを取っています。',
    economic_description: '中国はフィリピンの主要貿易相手国。インフラ投資（Build Build Build）での協力もあります。',
    cultural_description: 'フィリピンの華人コミュニティの存在。しかし、領海問題により民族感情は複雑です。'
  },

  // インドと周辺国・地域大国
  {
    country_a: 'IN',
    country_b: 'CN',
    overall_level: 2,
    overall_description: 'インドと中国は、国境問題と地政学的競争により緊張関係にありながら、経済的相互依存も深い複雑な関係です。',
    political_military_description: 'ラダック地域での国境紛争、パキスタンとの関係を巡る対立。軍事的緊張が継続しています。',
    economic_description: '中国はインドの最大貿易相手国ですが、貿易赤字が大きな問題。技術分野では競争が激化しています。',
    cultural_description: '古代からの文明交流の歴史がありますが、現在は政治的対立が文化交流にも影響を与えています。'
  },
  {
    country_a: 'IN',
    country_b: 'VN',
    overall_level: 4,
    overall_description: 'インドとベトナムは、「アクト・イースト政策」の重要なパートナーとして、海洋安全保障と経済協力で密接な関係にあります。',
    political_military_description: '南シナ海問題で共通の懸念を持ち、海洋安全保障で協力。インドはベトナムに軍事訓練を提供しています。',
    economic_description: '石油・ガス開発、IT、製薬分野での協力。インドのベトナム投資が急拡大しています。',
    cultural_description: '仏教という共通の宗教的基盤。インドの文化的影響がベトナムにも残っています。'
  },
  {
    country_a: 'IN',
    country_b: 'TH',
    overall_level: 4,
    overall_description: 'インドとタイは、歴史的文化的つながりと現代の戦略的協力により、「アクト・イースト」政策の要となっています。',
    political_military_description: 'ASEAN諸国との関係強化の一環として重視。軍事演習や防衛協力も実施しています。',
    economic_description: '自動車、IT、医薬品での協力。タイはインド企業の東南アジア進出の拠点となっています。',
    cultural_description: 'ヒンドゥー教・仏教の文化的つながり。タイの王室文化にもインドの影響が見られます。'
  },
  {
    country_a: 'IN',
    country_b: 'SG',
    overall_level: 5,
    overall_description: 'インドとシンガポールは、戦略的パートナーシップと経済協力において、インドの東南アジア政策の中核を成しています。',
    political_military_description: '包括的戦略的パートナーシップを締結。海軍協力や軍事演習を定期的に実施しています。',
    economic_description: 'シンガポールはインドへの最大投資国の一つ。金融、IT、物流での協力が深化しています。',
    cultural_description: 'シンガポールのインド系住民（約9%）が架け橋の役割。多文化主義のモデルとしても協力しています。'
  },
  {
    country_a: 'IN',
    country_b: 'MY',
    overall_level: 4,
    overall_description: 'インドとマレーシアは、「ルック・イースト政策」のパートナーとして、多分野での協力を拡大しています。',
    political_military_description: 'マレーシアの東方政策とインドのアクト・イースト政策が合致。海洋安全保障でも協力しています。',
    economic_description: 'パーム油・電子機器貿易、IT投資での協力。インド系企業のマレーシア進出も活発です。',
    cultural_description: 'マレーシアのインド系住民（約7%）との文化的つながり。ヒンドゥー教寺院や文化行事が盛んです。'
  },

  // ASEAN諸国間の関係
  {
    country_a: 'TH',
    country_b: 'VN',
    overall_level: 4,
    overall_description: 'タイとベトナムは、ASEANの主要国として、メコン川流域協力と経済統合で密接な関係にあります。',
    political_military_description: 'ASEAN+3、メコン川委員会での協力。カンボジア・ラオス問題では協調することが多いです。',
    economic_description: '自動車産業、農業、観光業での協力。メコン川流域開発プロジェクトも推進しています。',
    cultural_description: '仏教文化圏と東南アジア文化の共有。歴史的には王朝間の複雑な関係もありました。'
  },
  {
    country_a: 'TH',
    country_b: 'SG',
    overall_level: 4,
    overall_description: 'タイとシンガポールは、ASEAN創設国として、地域統合と経済協力の推進役を担っています。',
    political_military_description: 'ASEAN統合の推進で完全に協調。地域安全保障でも緊密に連携しています。',
    economic_description: 'シンガポールはタイへの主要投資国。金融、物流、製造業での協力が深いです。',
    cultural_description: 'ASEAN文化としてのアイデンティティを共有。シンガポールにはタイ系住民も存在します。'
  },
  {
    country_a: 'SG',
    country_b: 'MY',
    overall_level: 3,
    overall_description: 'シンガポールとマレーシアは、最も密接な隣国関係にありながら、水資源や領土問題で時に緊張も生じる複雑な関係です。',
    political_military_description: '水供給協定や領海問題で時に対立。しかし、安全保障では基本的に協力関係にあります。',
    economic_description: '極めて密接な経済関係。多くのマレーシア人がシンガポールで働き、相互投資も活発です。',
    cultural_description: '共通のマレー文化圏でありながら、シンガポールの多文化主義とマレーシアのマレー優遇政策で差異があります。'
  },
  {
    country_a: 'VN',
    country_b: 'PH',
    overall_level: 3,
    overall_description: 'ベトナムとフィリピンは、南シナ海問題で共通の懸念を持ちながら、ASEAN統合で協力する関係です。',
    political_military_description: '南シナ海での中国の行動に対して共通の懸念を持っています。ASEAN内での連携も重要です。',
    economic_description: '貿易・投資関係が拡大中。ベトナムの製造業とフィリピンのサービス業での補完関係があります。',
    cultural_description: '東南アジア文化圏として共通性がありますが、ベトナムの儒教的影響とフィリピンのキリスト教的影響で違いもあります。'
  },

  // 東アジアの関係
  {
    country_a: 'CN',
    country_b: 'KR',
    overall_level: 3,
    overall_description: '中国と韓国は、経済的に密接でありながら、北朝鮮問題やTHAAD配備を巡って政治的緊張も抱える複雑な関係です。',
    political_military_description: 'THAAD配備問題で関係が悪化した経験あり。北朝鮮問題では協力と競争が混在しています。',
    economic_description: '中国は韓国の最大貿易相手国。しかし、技術覇権競争や供給網の多角化により関係が変化しています。',
    cultural_description: '韓流文化の中国での人気と、儒教文化圏としての共通性。しかし、歴史認識や文化起源を巡る対立もあります。'
  },
  {
    country_a: 'JP',
    country_b: 'VN',
    overall_level: 4,
    overall_description: '日本とベトナムは、「自由で開かれたインド太平洋」構想のパートナーとして、極めて密接な協力関係にあります。',
    political_military_description: '海洋安全保障、海上保安能力向上で協力。中国の海洋進出に対する共通の懸念があります。',
    economic_description: '日本はベトナムの最大のODA供与国。製造業投資、インフラ開発で主導的役割を果たしています。',
    cultural_description: '日本の技術・品質への信頼が高く、日本語学習も盛んです。ベトナム人労働者の日本での就労も増加しています。'
  },
  {
    country_a: 'JP',
    country_b: 'TH',
    overall_level: 5,
    overall_description: '日本とタイは、皇室・王室の親密な関係と経済協力により、東南アジアで最も特別な二国間関係を築いています。',
    political_military_description: '包括的戦略的パートナーシップを締結。防衛装備品協力や軍事交流も実施しています。',
    economic_description: '日本企業の東南アジア進出の最重要拠点。自動車産業を中心に製造業の一大集積地となっています。',
    cultural_description: '皇室・王室の深い親交。日本文化（アニメ、食文化等）の人気も高く、文化交流が非常に活発です。'
  },
  {
    country_a: 'JP',
    country_b: 'SG',
    overall_level: 5,
    overall_description: '日本とシンガポールは、「戦略的パートナーシップ協定」に基づき、金融・技術・安全保障で極めて密接な関係にあります。',
    political_military_description: '海洋安全保障、サイバーセキュリティ、宇宙協力など先端分野での協力が深化しています。',
    economic_description: 'シンガポールは日本企業のアジア本部機能の拠点。金融、物流、スタートアップ投資での協力が活発です。',
    cultural_description: '日本文化への高い関心と、シンガポールの多文化主義に対する日本の評価。教育・研究交流も盛んです。'
  },
  {
    country_a: 'JP',
    country_b: 'ID',
    overall_level: 5,
    overall_description: '日本とインドネシアは、「戦略的パートナーシップ」に基づき、ASEANの盟主インドネシアとの協力を重視しています。',
    political_military_description: '海洋安全保障、災害管理、平和構築での協力。インドネシアの中等国外交を日本が支持しています。',
    economic_description: '自動車、資源開発、インフラ投資での協力。日本はインドネシアの主要投資国です。',
    cultural_description: 'インドネシアでの日本文化の人気と、技能実習生・研修生制度を通じた人的交流の拡大。'
  },

  // オセアニア・太平洋
  {
    country_a: 'AU',
    country_b: 'NZ',
    overall_level: 5,
    overall_description: 'オーストラリアとニュージーランドは、ANZUS条約に基づく同盟国として、あらゆる分野で極めて密接な協力関係にあります。',
    political_military_description: '共通の防衛政策と軍事協力。太平洋島嶼国支援、対中政策でも協調しています。',
    economic_description: 'オーストラリア・ニュージーランド経済関係緊密化協定（CER）により、実質的に単一市場を形成。',
    cultural_description: 'アングロサクソン文化とマオリ・アボリジニ文化の共存。スポーツ、映画、音楽での交流が盛んです。'
  },
  {
    country_a: 'AU',
    country_b: 'CN',
    overall_level: 2,
    overall_description: 'オーストラリアと中国は、かつては密接な経済関係にありましたが、人権問題や安全保障懸念により関係が悪化しています。',
    political_military_description: 'ウイグル問題、香港問題、台湾問題での対立。AUKUS結成により軍事的緊張が高まっています。',
    economic_description: '中国はオーストラリアの最大貿易相手国ですが、石炭・ワイン等の輸入停止により経済関係が悪化。',
    cultural_description: '多くの中国系住民が存在しますが、政治的対立により文化交流にも影響が出ています。'
  },
  {
    country_a: 'AU',
    country_b: 'IN',
    overall_level: 5,
    overall_description: 'オーストラリアとインドは、「インド太平洋」地域の民主主義国として、Quadの一員として極めて密接な戦略的パートナーです。',
    political_military_description: 'Quad（日米豪印）の一員として中国の台頭に対処。軍事演習や技術協力を実施しています。',
    economic_description: '包括的経済協力協定を締結。資源、教育、IT分野での協力が拡大しています。',
    cultural_description: '大規模なインド系コミュニティの存在。クリケット、映画、料理を通じた文化交流が盛んです。'
  }
];

async function addAsiaPacificRelations() {
  console.log('アジア太平洋地域の関係データを追加開始...\n');

  let successCount = 0;
  let errorCount = 0;

  for (const relation of asiaPacificRelations) {
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
          data_source: 'Asia Pacific Relations Update 2025'
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
  console.log(`スキップ: ${asiaPacificRelations.length - successCount - errorCount}件（既存データ）`);
}

addAsiaPacificRelations().catch(console.error);