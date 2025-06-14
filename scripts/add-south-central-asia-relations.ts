import { createClient } from '@supabase/supabase-js';
import type { Database } from '../src/types/database';

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://rzsbezgovdebnrmtvtwh.supabase.co';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6c2JlemdvdmRlYm5ybXR2dHdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk4Mjg4NzQsImV4cCI6MjA2NTQwNDg3NH0.ks3zHdJkCnDvDiriwyxAIOJMxUwuGeU1B2_aG91u1BY';

const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// 南アジア・中央アジアの関係データ
const southCentralAsiaRelations = [
  // 南アジア地域協力連合（SAARC）の関係
  {
    country_a: 'IN',
    country_b: 'BD',
    overall_level: 3,
    overall_description: 'インドとバングラデシュは、隣国として複雑な歴史を持ちながら、経済協力と地域安定化で重要な関係にあります。',
    political_military_description: '1971年独立戦争でインドが支援した歴史。現在は国境管理、テロ対策、水資源管理で協力しています。',
    economic_description: 'インドはバングラデシュの最大貿易相手国。エネルギー供給、インフラ投資、繊維産業での協力が拡大しています。',
    cultural_description: 'ベンガル文化を共有し、言語的つながりも深い。しかし、宗教的違い（ヒンドゥー教vs イスラム教）による複雑さもあります。'
  },
  {
    country_a: 'IN',
    country_b: 'LK',
    overall_level: 3,
    overall_description: 'インドとスリランカは、インド洋の戦略的パートナーとして、タミル問題の複雑な歴史を乗り越えて協力を深めています。',
    political_military_description: 'スリランカ内戦でのインドの関与の歴史。現在は海洋安全保障、テロ対策で協力。中国の影響力拡大への懸念も共有。',
    economic_description: 'インドはスリランカの最大貿易相手国。観光、IT、インフラ投資での協力が活発です。',
    cultural_description: 'タミル民族の存在により複雑な関係。しかし、仏教・ヒンドゥー教の宗教的つながりや文化的共通性もあります。'
  },
  {
    country_a: 'PK',
    country_b: 'AF',
    overall_level: 3,
    overall_description: 'パキスタンとアフガニスタンは、長い国境を共有し、民族的つながりがありながら、安全保障問題で複雑な関係にあります。',
    political_military_description: 'パシュトゥン民族の存在、タリバン問題、テロ対策で複雑な関係。難民問題も長期間の課題となっています。',
    economic_description: 'アフガニスタンの貿易の多くがパキスタン経由。しかし、安全保障問題により経済協力は制約されています。',
    cultural_description: 'パシュトゥン民族とイスラム教スンニ派の共通性。しかし、部族社会の複雑さと政治的不安定により関係は困難です。'
  },
  {
    country_a: 'BD',
    country_b: 'PK',
    overall_level: 2,
    overall_description: 'バングラデシュとパキスタンは、分離独立の複雑な歴史により、現在も緊張を含む関係にあります。',
    political_military_description: '1971年独立戦争の遺恨が残存。戦争犯罪裁判問題などで政治的緊張が継続しています。',
    economic_description: 'SAARC枠組みでの限定的な経済協力。しかし、政治的緊張により経済関係は最小限にとどまっています。',
    cultural_description: 'イスラム教とベンガル文化の共通性はありますが、独立戦争の記憶が文化交流も制約しています。'
  },

  // 中央アジア諸国間の関係
  {
    country_a: 'KZ',
    country_b: 'UZ',
    overall_level: 4,
    overall_description: 'カザフスタンとウズベキスタンは、中央アジアの地域大国として、エネルギー協力と地域統合で重要な関係にあります。',
    political_military_description: '上海協力機構（SCO）、集団安全保障条約機構（CSTO）での協力。国境画定も完了し、安定した関係です。',
    economic_description: 'エネルギー輸送、農業協力、貿易関係が拡大。カザフスタンの石油とウズベキスタンの天然ガスで相互補完しています。',
    cultural_description: 'テュルク系民族とイスラム教の共通性。ソビエト連邦時代の共通体験と、現在の世俗的イスラム政策を共有しています。'
  },
  {
    country_a: 'KZ',
    country_b: 'KG',
    overall_level: 4,
    overall_description: 'カザフスタンとキルギスは、中央アジアの隣国として、遊牧民文化の共通性と現代の協力関係を築いています。',
    political_military_description: 'CSTO、SCO、ユーラシア経済連合（EAEU）での協力。国境問題も平和的に解決されています。',
    economic_description: 'EAEU統合により経済関係が深化。エネルギー供給、労働移民の受け入れでも協力しています。',
    cultural_description: 'テュルク系遊牧民族の共通文化。イスラム教とロシア語の使用という共通性もあります。'
  },
  {
    country_a: 'UZ',
    country_b: 'TJ',
    overall_level: 3,
    overall_description: 'ウズベキスタンとタジキスタンは、隣国として水資源と国境問題で時に緊張しながらも、経済協力を進めています。',
    political_military_description: 'SCOでの協力。国境画定、水資源管理で時に緊張もありますが、近年は関係改善が進んでいます。',
    economic_description: 'エネルギー協力、貿易関係の拡大。ウズベキスタンがタジキスタンのエネルギー需要を一部支援しています。',
    cultural_description: 'ペルシャ系（タジク）とテュルク系（ウズベク）の民族的違いはありますが、イスラム教とソビエト時代の共通体験があります。'
  },
  {
    country_a: 'TM',
    country_b: 'UZ',
    overall_level: 3,
    overall_description: 'トルクメニスタンとウズベキスタンは、中央アジアの隣国として、エネルギー協力と限定的な地域協力を行っています。',
    political_military_description: 'トルクメニスタンの永世中立政策により、多国間機構での協力は限定的。しかし、二国間では安定した関係です。',
    economic_description: '天然ガス分野での協力、貿易関係。両国ともエネルギー輸出国として経験を共有しています。',
    cultural_description: 'テュルク系民族とイスラム教の共通性。伝統的な遊牧文化の要素も共有しています。'
  },

  // 中央アジアと南アジアの関係
  {
    country_a: 'AF',
    country_b: 'UZ',
    overall_level: 3,
    overall_description: 'アフガニスタンとウズベキスタンは、長い国境を共有し、エネルギー協力と安全保障で重要な関係にあります。',
    political_military_description: 'タリバン政権に対してウズベキスタンは実用主義的アプローチ。国境安全保障とテロ対策で協力しています。',
    economic_description: 'アフガニスタンの電力需要の一部をウズベキスタンが供給。貿易関係も限定的ながら存在します。',
    cultural_description: 'ウズベク民族がアフガニスタン北部に存在。イスラム教とテュルク系文化の共通性があります。'
  },
  {
    country_a: 'AF',
    country_b: 'TJ',
    overall_level: 3,
    overall_description: 'アフガニスタンとタジキスタンは、タジク民族の存在により文化的つながりがありながら、安全保障懸念も抱える関係です。',
    political_military_description: 'タジキスタンはタリバン政権を懸念。難民受け入れと国境警備強化で複雑な関係にあります。',
    economic_description: '限定的な貿易関係。アフガニスタンの不安定により経済協力は制約されています。',
    cultural_description: 'タジク民族とペルシャ語の共通性。イスラム教スンニ派の共有もあります。'
  },

  // 南アジアと中央アジアの戦略的関係
  {
    country_a: 'IN',
    country_b: 'KZ',
    overall_level: 4,
    overall_description: 'インドとカザフスタンは、エネルギー協力と中央アジア戦略により、戦略的パートナーシップを強化しています。',
    political_military_description: 'SCOでの協力、テロ対策での情報共有。インドの中央アジア進出の重要なパートナーです。',
    economic_description: 'ウラン協力、石油・ガス投資、IT協力。インド企業のカザフスタン進出も拡大しています。',
    cultural_description: 'ソビエト時代にインド文化（ボリウッド映画等）が人気。現在も文化交流が活発です。'
  },
  {
    country_a: 'IN',
    country_b: 'UZ',
    overall_level: 4,
    overall_description: 'インドとウズベキスタンは、中央アジア協力とアフガニスタン安定化で重要なパートナーシップを築いています。',
    political_military_description: 'アフガニスタン問題、テロ対策で協力。インドのアフガニスタン政策でウズベキスタンが重要な役割を果たしています。',
    economic_description: 'IT協力、医薬品投資、インフラ開発での協力。チャバハール港プロジェクトでも連携しています。',
    cultural_description: 'ムガル帝国時代の歴史的つながり。サマルカンド、ブハラなどの文化遺産への関心も高いです。'
  },

  // 追加の重要な関係
  {
    country_a: 'PK',
    country_b: 'BD',
    overall_level: 2,
    overall_description: 'パキスタンとバングラデシュは、1971年の分離独立以来、複雑で困難な関係が続いています。',
    political_military_description: '独立戦争の遺恨、戦争犯罪問題で政治的緊張が継続。外交関係は最小限にとどまっています。',
    economic_description: 'SAARC枠組みでの限定的協力のみ。貿易関係も政治的緊張により発展していません。',
    cultural_description: 'イスラム教の共通性はありますが、ベンガル文化とパンジャブ文化の違い、独立戦争の記憶が交流を阻害しています。'
  },
  {
    country_a: 'IR',
    country_b: 'AF',
    overall_level: 3,
    overall_description: 'イランとアフガニスタンは、長い国境を共有し、シーア派とペルシャ文化のつながりがありながら、複雑な関係にあります。',
    political_military_description: 'タリバン政権に対してイランは警戒的。ハザラ民族（シーア派）の保護や水資源問題で緊張もあります。',
    economic_description: 'エネルギー供給、貿易関係が存在。アフガニスタンの経済危機に対してイランが限定的支援を提供しています。',
    cultural_description: 'ペルシャ語（ダリ語）とシーア派文化の共通性。しかし、スンニ派多数のアフガニスタンとの宗教的緊張もあります。'
  },
  {
    country_a: 'PK',
    country_b: 'IR',
    overall_level: 3,
    overall_description: 'パキスタンとイランは、隣国として協力の必要性がありながら、宗派的違いと地政学的競争で複雑な関係にあります。',
    political_military_description: 'スンニ・シーア派の宗教的緊張、バルーチスタン問題、アフガニスタン政策での相違により時に緊張が生じます。',
    economic_description: 'エネルギー協力の可能性はありますが、米国制裁とスンニ・シーア対立により関係は制約されています。',
    cultural_description: 'イスラム教とペルシャ文化の影響という共通性はありますが、スンニ・シーア派の宗教的違いが大きな要因です。'
  },
  {
    country_a: 'IN',
    country_b: 'AF',
    overall_level: 3,
    overall_description: 'インドとアフガニスタンは、歴史的つながりと開発協力により重要な関係にありますが、パキスタンとの関係により複雑です。',
    political_military_description: 'インドはアフガニスタンの民主化と安定化を支援してきましたが、タリバン復権により関係は不透明になっています。',
    economic_description: 'インフラ開発、教育、医療分野での援助を提供。チャバハール港によりパキスタンを迂回したアクセスを模索しています。',
    cultural_description: 'ヒンドゥー教・仏教の歴史的影響地であり、ボリウッド映画の人気もありました。しかし現在は文化交流が制約されています。'
  }
];

async function addSouthCentralAsiaRelations() {
  console.log('南アジア・中央アジアの関係データを追加開始...\n');

  let successCount = 0;
  let errorCount = 0;

  for (const relation of southCentralAsiaRelations) {
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
          data_source: 'South Central Asia Relations Update 2025'
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
  console.log(`スキップ: ${southCentralAsiaRelations.length - successCount - errorCount}件（既存データ）`);
}

addSouthCentralAsiaRelations().catch(console.error);