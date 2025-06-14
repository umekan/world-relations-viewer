import { createClient } from '@supabase/supabase-js';
import type { Database } from '../src/types/database';

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://rzsbezgovdebnrmtvtwh.supabase.co';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6c2JlemdvdmRlYm5ybXR2dHdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk4Mjg4NzQsImV4cCI6MjA2NTQwNDg3NH0.ks3zHdJkCnDvDiriwyxAIOJMxUwuGeU1B2_aG91u1BY';

const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// 東ヨーロッパの関係データ
const easternEuropeRelations = [
  // ポーランドの関係
  {
    country_a: 'PL',
    country_b: 'DE',
    overall_level: 4,
    overall_description: 'ポーランドとドイツは、歴史的な困難を乗り越えて現在は良好な関係を築いています。両国はEUとNATOの同盟国であり、緊密な経済関係を持っています。',
    political_military_description: 'NATO同盟国として安全保障面で協力。EU内での政策調整も行っていますが、司法改革やエネルギー政策で時に意見の相違があります。',
    economic_description: 'ドイツはポーランドの最大の貿易相手国。多くのドイツ企業がポーランドに投資し、サプライチェーンで深く結びついています。',
    cultural_description: 'ポーランドには大きなドイツ系少数民族が存在。文化交流や学術協力が活発で、多くのポーランド人がドイツで働いています。'
  },
  {
    country_a: 'PL',
    country_b: 'CZ',
    overall_level: 4,
    overall_description: 'ポーランドとチェコは、ヴィシェグラード・グループの一員として地域協力を推進する良好な隣国関係を維持しています。',
    political_military_description: 'V4（ヴィシェグラード・グループ）での協力、NATO・EU加盟国として共通の立場。移民政策などで協調することが多いです。',
    economic_description: '活発な国境貿易と投資。両国間の経済協力は年々深まっており、特に製造業とサービス業で協力関係があります。',
    cultural_description: '言語的・文化的な類似性があり、観光交流も盛ん。歴史的にも深いつながりがあります。'
  },
  {
    country_a: 'PL',
    country_b: 'HU',
    overall_level: 4,
    overall_description: 'ポーランドとハンガリーは、歴史的に友好関係にあり、現在もV4協力を通じて緊密な関係を維持しています。',
    political_military_description: 'EU内での立場が近く、特に移民政策や主権問題で協調。V4枠組みでの協力が活発です。',
    economic_description: '相互投資と貿易が拡大。エネルギー分野での協力も進んでいます。',
    cultural_description: '「ポーランド人とハンガリー人は兄弟」という言い回しがあるほど、歴史的に友好的な関係です。'
  },
  {
    country_a: 'PL',
    country_b: 'SK',
    overall_level: 4,
    overall_description: 'ポーランドとスロバキアは、V4協力の枠組みで緊密に連携する友好的な隣国です。',
    political_military_description: 'V4での協力、NATO・EU加盟国として共通の利益を共有。地域問題で協調することが多いです。',
    economic_description: '国境地域での経済協力が活発。観光業や製造業での協力が進んでいます。',
    cultural_description: 'スラヴ系の文化的つながり、カトリック教国としての共通性があります。'
  },
  {
    country_a: 'PL',
    country_b: 'LT',
    overall_level: 5,
    overall_description: 'ポーランドとリトアニアは、歴史的な絆と現代の戦略的パートナーシップに基づく非常に強固な関係を持っています。',
    political_military_description: 'NATO東方防衛の要として協力。ベラルーシ情勢やロシアへの対応で完全に一致した立場を取っています。',
    economic_description: 'エネルギー・インフラプロジェクトでの協力。ポーランドはリトアニアの重要な貿易相手国です。',
    cultural_description: 'ポーランド・リトアニア共和国の歴史的遺産。リトアニアにはポーランド系少数民族が存在します。'
  },

  // ブルガリアの関係
  {
    country_a: 'BG',
    country_b: 'RO',
    overall_level: 4,
    overall_description: 'ブルガリアとルーマニアは、バルカン地域の隣国として、EU加盟国同士の協力関係を深めています。',
    political_military_description: 'EU・NATO加盟国として協力。黒海地域の安全保障で共通の利益を持ち、シェンゲン圏加入を目指しています。',
    economic_description: 'ドナウ川を挟んだ経済協力。エネルギーや観光分野での協力が進んでいます。',
    cultural_description: 'バルカン文化圏として共通性があり、正教会の伝統を共有しています。'
  },
  {
    country_a: 'BG',
    country_b: 'GR',
    overall_level: 4,
    overall_description: 'ブルガリアとギリシャは、歴史的・文化的つながりの深い友好的な隣国関係にあります。',
    political_military_description: 'NATO・EU同盟国として協力。地域の安定化で共通の利益を持っています。',
    economic_description: 'ギリシャはブルガリアへの主要投資国の一つ。観光業や貿易で深い関係があります。',
    cultural_description: '正教会の伝統を共有し、古代からの文化的つながりがあります。多くのブルガリア人がギリシャで働いています。'
  },
  {
    country_a: 'BG',
    country_b: 'TR',
    overall_level: 3,
    overall_description: 'ブルガリアとトルコは、複雑な歴史を持ちながらも、現在は実用的な協力関係を維持しています。',
    political_military_description: 'NATO同盟国として安全保障協力。しかし、トルコの少数民族政策への関与など、時に緊張が生じます。',
    economic_description: '活発な貿易関係とエネルギー協力。トルコはブルガリアの重要な貿易相手国です。',
    cultural_description: 'ブルガリアにはトルコ系少数民族が存在。オスマン帝国時代の歴史的記憶が関係に影響を与えることがあります。'
  },
  {
    country_a: 'BG',
    country_b: 'RS',
    overall_level: 3,
    overall_description: 'ブルガリアとセルビアは、バルカン地域の隣国として実用的な関係を維持していますが、歴史的な問題も存在します。',
    political_military_description: 'EU加盟国と加盟候補国という立場の違い。地域協力イニシアチブで協力していますが、歴史認識で相違もあります。',
    economic_description: '国境を越えた貿易と投資。エネルギー輸送プロジェクトでの協力があります。',
    cultural_description: '南スラヴの文化的つながりがある一方、歴史的な対立の記憶も残っています。'
  },
  {
    country_a: 'BG',
    country_b: 'MK',
    overall_level: 2,
    overall_description: 'ブルガリアと北マケドニアは、言語・歴史認識を巡る対立により、緊張を含む複雑な関係にあります。',
    political_military_description: 'ブルガリアは北マケドニアのEU加盟交渉で、歴史・言語問題の解決を条件としており、これが関係の障害となっています。',
    economic_description: '経済関係は存在するものの、政治的緊張により潜在能力を十分に発揮できていません。',
    cultural_description: '言語と歴史のアイデンティティを巡る根深い対立。ブルガリアはマケドニア語を方言と見なすなど、認識の相違があります。'
  },

  // クロアチアの関係
  {
    country_a: 'HR',
    country_b: 'SI',
    overall_level: 3,
    overall_description: 'クロアチアとスロベニアは、EU加盟国同士ですが、国境問題により時に緊張する関係にあります。',
    political_military_description: 'EU・NATO加盟国として協力していますが、ピラン湾の領海問題が未解決で、関係の障害となっています。',
    economic_description: '観光業や貿易で相互依存関係にありますが、国境問題が経済協力の深化を妨げることがあります。',
    cultural_description: '旧ユーゴスラビアの一部として共通の歴史を持ち、言語的にも近いですが、独立後は別々の道を歩んでいます。'
  },
  {
    country_a: 'HR',
    country_b: 'RS',
    overall_level: 3,
    overall_description: 'クロアチアとセルビアは、1990年代の紛争の記憶が残る中、関係正常化を進めています。',
    political_military_description: '戦争犯罪や行方不明者問題など未解決の問題が存在。EUはセルビアの加盟交渉で関係改善を求めています。',
    economic_description: '貿易関係は回復しつつあり、地域経済統合の動きもありますが、まだ潜在力を発揮していません。',
    cultural_description: '言語的には非常に近いが、宗教（カトリックと正教）や歴史認識の違いが存在します。'
  },
  {
    country_a: 'HR',
    country_b: 'BA',
    overall_level: 3,
    overall_description: 'クロアチアとボスニア・ヘルツェゴビナは、複雑な民族構成と歴史により、多面的な関係を持っています。',
    political_military_description: 'クロアチアはボスニアのクロアチア系住民の権利を重視。EU加盟国として、ボスニアの欧州統合を支援しています。',
    economic_description: 'クロアチアはボスニアの重要な貿易相手国。アドリア海へのアクセスでボスニアはクロアチアに依存しています。',
    cultural_description: 'ボスニアには多くのクロアチア系住民が居住。文化的つながりは強いが、政治的には複雑な関係です。'
  },
  {
    country_a: 'HR',
    country_b: 'HU',
    overall_level: 4,
    overall_description: 'クロアチアとハンガリーは、歴史的つながりと現代のEU協力に基づく良好な関係を維持しています。',
    political_military_description: 'EU・NATO加盟国として協力。地域協力イニシアチブでも連携しています。',
    economic_description: 'ハンガリーはクロアチアの観光業にとって重要な市場。エネルギー分野での協力も進んでいます。',
    cultural_description: '長い歴史的つながり（クロアチアはかつてハンガリー王国の一部）。文化交流が活発です。'
  },
  {
    country_a: 'HR',
    country_b: 'IT',
    overall_level: 3,
    overall_description: 'クロアチアとイタリアは、アドリア海を挟んだ隣国として、歴史的な問題を抱えながらも協力関係を発展させています。',
    political_military_description: 'EU・NATO同盟国として協力。しかし、第二次世界大戦後の領土問題の記憶が時に表面化します。',
    economic_description: 'イタリアはクロアチアの主要貿易相手国の一つ。観光業や海運で深い関係があります。',
    cultural_description: 'アドリア海沿岸の文化的つながり。イストリア半島にはイタリア系少数民族が存在します。'
  },

  // セルビアの関係
  {
    country_a: 'RS',
    country_b: 'ME',
    overall_level: 3,
    overall_description: 'セルビアとモンテネグロは、2006年まで同一国家でしたが、現在は独立した隣国として複雑な関係にあります。',
    political_military_description: 'モンテネグロのNATO加盟はセルビアとの関係に緊張をもたらしました。しかし、実務的な協力は継続しています。',
    economic_description: '深い経済的つながりが継続。セルビアはモンテネグロの主要貿易相手国です。',
    cultural_description: '言語・文化的に非常に近く、多くの家族的つながりが存在しますが、国家アイデンティティは分かれています。'
  },
  {
    country_a: 'RS',
    country_b: 'BA',
    overall_level: 4,
    overall_description: 'セルビアとボスニア・ヘルツェゴビナは、複雑な歴史にもかかわらず、特にスルプスカ共和国を通じて密接な関係を維持しています。',
    political_military_description: 'セルビアはボスニアのスルプスカ共和国と特別な関係を維持。デイトン合意の枠組み内で協力しています。',
    economic_description: '活発な貿易関係。エネルギーや投資分野での協力が進んでいます。',
    cultural_description: 'ボスニアのセルビア系住民との強い文化的・宗教的つながりがあります。'
  },
  {
    country_a: 'RS',
    country_b: 'MK',
    overall_level: 4,
    overall_description: 'セルビアと北マケドニアは、バルカン地域の隣国として友好的な関係を発展させています。',
    political_military_description: '両国ともEU加盟を目指しており、地域協力で連携。セルビアは北マケドニアの領土的一体性を支持しています。',
    economic_description: '自由貿易協定により活発な経済交流。セルビアは北マケドニアの重要な投資国です。',
    cultural_description: '正教会の伝統を共有し、文化的つながりがあります。多くの相互交流があります。'
  },
  {
    country_a: 'RS',
    country_b: 'AL',
    overall_level: 2,
    overall_description: 'セルビアとアルバニアは、コソボ問題を中心に緊張を含む困難な関係にあります。',
    political_military_description: 'コソボの地位を巡る根本的な対立。アルバニアはコソボの独立を支持し、セルビアは認めていません。',
    economic_description: '政治的緊張にもかかわらず、一定の経済交流は存在します。地域経済統合の動きもあります。',
    cultural_description: '民族・宗教・言語の違いが大きく、歴史的な対立の記憶が関係に影響しています。'
  },
  {
    country_a: 'RS',
    country_b: 'HU',
    overall_level: 4,
    overall_description: 'セルビアとハンガリーは、歴史的つながりと実利的協力に基づく良好な関係を維持しています。',
    political_military_description: 'ハンガリーはEU内でセルビアの利益を支援。セルビアのEU加盟を支持しています。',
    economic_description: '活発な経済協力。ハンガリーはセルビアへの重要な投資国で、エネルギー協力も進んでいます。',
    cultural_description: 'ヴォイヴォディナ地方にハンガリー系少数民族が存在。文化的つながりが強いです。'
  },

  // スロバキアの関係
  {
    country_a: 'SK',
    country_b: 'CZ',
    overall_level: 5,
    overall_description: 'スロバキアとチェコは、1993年の平和的分離後も、非常に密接で友好的な関係を維持しています。',
    political_military_description: 'V4協力の中核。EU・NATO加盟国として緊密に協力し、ほぼすべての国際問題で協調しています。',
    economic_description: '深い経済統合。労働市場は実質的に統合されており、多くのスロバキア人がチェコで働いています。',
    cultural_description: '言語的に非常に近く、相互理解が容易。共通のメディア空間を持ち、文化交流が極めて活発です。'
  },
  {
    country_a: 'SK',
    country_b: 'HU',
    overall_level: 3,
    overall_description: 'スロバキアとハンガリーは、V4協力の枠組みで連携していますが、少数民族問題で時に緊張が生じます。',
    political_military_description: 'V4での協力、EU・NATO同盟国。しかし、スロバキアのハンガリー系少数民族の扱いを巡って意見の相違があります。',
    economic_description: '活発な貿易関係と国境を越えた協力。多くの国境地域プロジェクトが実施されています。',
    cultural_description: 'スロバキア南部に多くのハンガリー系住民が居住。二重国籍問題など、民族問題が関係に影響します。'
  },
  {
    country_a: 'SK',
    country_b: 'AT',
    overall_level: 4,
    overall_description: 'スロバキアとオーストリアは、歴史的つながりと現代の経済協力に基づく良好な関係を築いています。',
    political_military_description: 'EU加盟国として協力。オーストリアはスロバキアのユーロ圏加入を支援しました。',
    economic_description: 'オーストリアはスロバキアへの最大の投資国の一つ。特に金融・サービス部門で強い存在感があります。',
    cultural_description: 'かつてのオーストリア・ハンガリー帝国の一部として共通の歴史。ブラチスラバとウィーンの近さが交流を促進しています。'
  },
  {
    country_a: 'SK',
    country_b: 'UA',
    overall_level: 4,
    overall_description: 'スロバキアとウクライナは、隣国として協力的な関係を維持し、特にウクライナ危機以降、支援を強化しています。',
    political_military_description: 'スロバキアはウクライナの主権と領土的一体性を強く支持。EU・NATOとウクライナの架け橋の役割を果たしています。',
    economic_description: 'エネルギー輸送の重要な経路。ウクライナ危機により経済関係は影響を受けていますが、支援は継続しています。',
    cultural_description: 'スロバキア東部にウクライナ系少数民族が存在。人道支援や難民受け入れで連帯を示しています。'
  },

  // スロベニアの関係
  {
    country_a: 'SI',
    country_b: 'AT',
    overall_level: 4,
    overall_description: 'スロベニアとオーストリアは、歴史的つながりと現代のEU協力に基づく良好な隣国関係を持っています。',
    political_military_description: 'EU加盟国として緊密に協力。少数民族の権利保護でも協力的な関係を維持しています。',
    economic_description: 'オーストリアはスロベニアの主要な貿易・投資相手国。観光業でも深い協力関係があります。',
    cultural_description: 'スロベニア系少数民族がオーストリアに存在。アルプス地域の文化的つながりが強いです。'
  },
  {
    country_a: 'SI',
    country_b: 'IT',
    overall_level: 4,
    overall_description: 'スロベニアとイタリアは、歴史的な問題を克服し、EU枠組みでの協力関係を発展させています。',
    political_military_description: 'EU・NATO同盟国として協力。国境地域の少数民族の権利保護で模範的な協力を実現しています。',
    economic_description: 'イタリアはスロベニアの主要貿易相手国。コペル港を通じた物流協力が重要です。',
    cultural_description: 'トリエステ地域を中心に文化的交流が活発。相互の少数民族の存在が関係を深めています。'
  },
  {
    country_a: 'SI',
    country_b: 'HU',
    overall_level: 4,
    overall_description: 'スロベニアとハンガリーは、直接国境を接していませんが、中欧協力の枠組みで良好な関係を維持しています。',
    political_military_description: 'EU・NATO加盟国として協力。地域イニシアチブでも連携しています。',
    economic_description: '貿易・投資関係が発展。エネルギー分野での協力も進んでいます。',
    cultural_description: 'スロベニア北東部に小規模なハンガリー系コミュニティが存在。文化交流も行われています。'
  }
];

async function addEasternEuropeRelations() {
  console.log('東ヨーロッパの関係データを追加開始...\n');

  let successCount = 0;
  let errorCount = 0;

  for (const relation of easternEuropeRelations) {
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
          data_source: 'Eastern Europe Relations Update 2025'
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
  console.log(`スキップ: ${easternEuropeRelations.length - successCount - errorCount}件（既存データ）`);
}

addEasternEuropeRelations().catch(console.error);