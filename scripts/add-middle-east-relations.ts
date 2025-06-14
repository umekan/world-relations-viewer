import { createClient } from '@supabase/supabase-js';
import type { Database } from '../src/types/database';

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://rzsbezgovdebnrmtvtwh.supabase.co';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseAnonKey) {
  console.error('❌ VITE_SUPABASE_ANON_KEY environment variable is required');
  process.exit(1);
}

const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// 中東諸国間の複雑な関係データ
const middleEastRelations = [
  // GCC内部の関係
  {
    country_a: 'SA',
    country_b: 'AE',
    overall_level: 5,
    overall_description: 'サウジアラビアとUAEは、GCCの盟主として極めて密接な戦略的パートナーシップを築いており、地域政策で完全に協調しています。',
    political_military_description: 'イエメン介入、イラン封じ込め、カタール制裁で完全に協調。サウジのビジョン2030とUAEの経済多角化で協力しています。',
    economic_description: '石油政策の調整、共同投資プロジェクト、経済多角化での協力。両国の政府系ファンドも連携しています。',
    cultural_description: 'ワッハーブ派の宗教的つながりと、ベドウィン文化の共有。王族間の婚姻関係もあります。'
  },
  {
    country_a: 'SA',
    country_b: 'QA',
    overall_level: 2,
    overall_description: 'サウジアラビアとカタールは、2017-2021年の外交危機を経て関係を正常化しましたが、依然として緊張が残っています。',
    political_military_description: '2021年のアル・ウラ宣言で関係正常化。しかし、イラン・トルコとの関係やムスリム同胞団支援を巡って根本的な対立が残存。',
    economic_description: '封鎖解除により貿易は再開されているが、投資協力は限定的。カタールの経済独立性が高まっています。',
    cultural_description: '同じワッハーブ派の宗教的背景を持ちながら、カタールの独自外交路線が文化的にも距離を生んでいます。'
  },
  {
    country_a: 'AE',
    country_b: 'QA',
    overall_level: 2,
    overall_description: 'UAEとカタールは、地域影響力を巡る競争により、正式な関係正常化後も競争関係が続いています。',
    political_military_description: 'カタール危機は終了したが、地域政策での根本的相違は継続。航空業界や金融ハブを巡る競争も激化。',
    economic_description: 'ドバイ・ドーハ間の航空・金融ハブ競争。しかし、2022年W杯では実務的協力も見られました。',
    cultural_description: '湾岸アラブ文化を共有するものの、UAEの多文化主義とカタールの保守的アプローチに違いがあります。'
  },
  {
    country_a: 'SA',
    country_b: 'KW',
    overall_level: 4,
    overall_description: 'サウジアラビアとクウェートは、歴史的な隣国関係と石油協力により良好な関係を維持しています。',
    political_military_description: 'GCC枠組みでの協力。湾岸戦争での連帯経験。現在はイエメン・イラン問題で協調しています。',
    economic_description: '中立地帯での石油共同開発。OPEC+での石油政策調整も緊密です。',
    cultural_description: 'ベドウィン文化と商業の伝統を共有。クウェートの議会制度をサウジが参考にすることもあります。'
  },
  {
    country_a: 'SA',
    country_b: 'BH',
    overall_level: 5,
    overall_description: 'サウジアラビアとバーレーンは、コーズウェイで物理的に結ばれ、極めて密接な関係にあります。',
    political_military_description: '2011年の「アラブの春」時にサウジがバーレーンに軍事介入。現在も安全保障で完全に一体化しています。',
    economic_description: 'キング・ファハド・コーズウェイにより経済統合が進行。多くのサウジ人がバーレーンで働き、投資も活発です。',
    cultural_description: 'バーレーンのシーア派多数という特殊性はあるものの、スンニ派王室同士の連帯が強固です。'
  },
  {
    country_a: 'AE',
    country_b: 'OM',
    overall_level: 4,
    overall_description: 'UAEとオマーンは、隣国として実用的で安定した関係を維持しており、地域問題では中立的な協力を行っています。',
    political_military_description: 'オマーンの中立外交をUAEが尊重。地域紛争では異なる立場を取ることもありますが、二国間では協力的です。',
    economic_description: '国境貿易と観光での協力。UAEの港湾がオマーンの貿易ルートとしても重要です。',
    cultural_description: 'アラブ・イスラム文化を共有しつつ、オマーンの独特なイバード派の宗教的寛容性をUAEも尊重しています。'
  },

  // シーア派枢軸の関係
  {
    country_a: 'IR',
    country_b: 'SY',
    overall_level: 5,
    overall_description: 'イランとシリアは、「抵抗の枢軸」の中核として、軍事・政治的に極めて密接な同盟関係にあります。',
    political_military_description: 'シリア内戦でイランがアサド政権を全面支援。革命防衛隊の駐留、ヒズボラとの三角同盟を形成しています。',
    economic_description: 'イランがシリア復興で主導的役割。石油供給、インフラ投資、通貨協力を実施しています。',
    cultural_description: 'シーア派の宗教的絆と「イスラエル・米国抵抗」の共通イデオロギー。ペルシャ・アラブの違いを超えた連帯です。'
  },

  // スンニ派穏健同盟
  {
    country_a: 'EG',
    country_b: 'JO',
    overall_level: 4,
    overall_description: 'エジプトとヨルダンは、アラブ世界の穏健派として、中東和平と地域安定で密接に協力しています。',
    political_military_description: 'イスラエルとの平和条約を維持する数少ないアラブ国家。パレスチナ問題では2国家解決を支持で一致。',
    economic_description: 'エネルギー協力（エジプト→ヨルダン）、観光業での連携。ヨルダン川西岸・ガザでの復興協力も行っています。',
    cultural_description: 'ハシミテ王家とエジプトの歴史的威信。アラブ民族主義の伝統を共有しています。'
  },
  {
    country_a: 'EG',
    country_b: 'AE',
    overall_level: 4,
    overall_description: 'エジプトとUAEは、地域の安定勢力として、政治・経済両面で戦略的パートナーシップを強化しています。',
    political_military_description: 'ムスリム同胞団に対する共通の懸念。リビア東部政府支援で協力。軍事演習も実施しています。',
    economic_description: 'UAEはエジプトへの最大投資国の一つ。新行政首都建設、スエズ運河経済圏開発で協力しています。',
    cultural_description: 'スンニ派の穏健イスラムと、世俗的価値観の共有。文化・教育交流も活発です。'
  },

  // トルコの地域関係
  {
    country_a: 'TR',
    country_b: 'QA',
    overall_level: 5,
    overall_description: 'トルコとカタールは、2017年のカタール危機以降、極めて密接な戦略的同盟関係を築いています。',
    political_military_description: 'カタール危機時にトルコが軍事基地設置で支援。現在も安全保障協力が継続。ムスリム同胞団支援でも協調。',
    economic_description: '大規模な投資協力とエネルギー取引。カタールのトルコ投資が急拡大しています。',
    cultural_description: 'オスマン帝国の歴史的つながりと、穏健イスラム路線の共有。文化・教育協力も深化しています。'
  },
  {
    country_a: 'TR',
    country_b: 'IQ',
    overall_level: 3,
    overall_description: 'トルコとイラクは、複雑な歴史と現在のクルド問題により、協力と緊張が混在する関係にあります。',
    political_military_description: 'PKKなどクルド系武装組織に対する越境軍事作戦で緊張。一方で、ISIS掃討では協力もありました。',
    economic_description: 'エネルギー協力（イラク石油のトルコ経由輸出）と貿易関係。復興事業での協力も進んでいます。',
    cultural_description: 'オスマン帝国時代の遺産。イラクのトルクメン人を通じた文化的つながりがあります。'
  },

  // レバント地域の関係
  {
    country_a: 'JO',
    country_b: 'LB',
    overall_level: 3,
    overall_description: 'ヨルダンとレバノンは、レバント地域の小国として、地域情勢の安定化で協力しつつ、内政では異なる課題を抱えています。',
    political_military_description: 'シリア危機での難民受け入れという共通課題。しかし、ヨルダンは親西側、レバノンはヒズボラ影響下という違いがあります。',
    economic_description: '両国とも経済危機を抱え、国際支援に依存。貿易関係は限定的です。',
    cultural_description: 'レバント・アラブ文化を共有。多くのレバノン人がヨルダンに居住していました。'
  },
  {
    country_a: 'JO',
    country_b: 'SY',
    overall_level: 2,
    overall_description: 'ヨルダンとシリアは、隣国として歴史的つながりがありますが、シリア内戦により関係が冷却化しています。',
    political_military_description: 'シリア内戦でヨルダンは反政府勢力を支援。現在は関係正常化を模索していますが、イラン影響力への懸念が残ります。',
    economic_description: 'かつて重要な貿易相手国でしたが、内戦により大幅に縮小。国境再開により徐々に回復中です。',
    cultural_description: 'ハシミテ王家とバース党政権の政治的対立にもかかわらず、民族的・文化的つながりは維持されています。'
  },

  // 地域大国間の対立・競争
  {
    country_a: 'SA',
    country_b: 'TR',
    overall_level: 2,
    overall_description: 'サウジアラビアとトルコは、地域覇権とイスラム世界のリーダーシップを巡って競争関係にあります。',
    political_military_description: 'カショギ事件で関係が悪化。ムスリム同胞団支援（トルコ）vs王政支持（サウジ）の対立。イエメン・リビアでも対立。',
    economic_description: '経済制裁の応酬もありましたが、最近は関係改善の兆し。エネルギー・投資での協力可能性も模索されています。',
    cultural_description: 'スンニ派イスラムの異なる解釈（ワッハーブ派vsオスマン的穏健派）。メッカ・メディナ vs イスタンブールのシンボル競争。'
  },
  {
    country_a: 'IR',
    country_b: 'TR',
    overall_level: 3,
    overall_description: 'イランとトルコは、地域大国として競争しつつも、実利的な協力関係を維持する複雑な関係にあります。',
    political_military_description: 'シリアでは異なる勢力を支援するが、クルド問題では利害が一致。制裁回避でも実務的協力があります。',
    economic_description: 'エネルギー貿易（イラン→トルコ）と国境貿易。米国制裁下でも経済関係を維持しています。',
    cultural_description: 'ペルシャ・トルコの歴史的競争関係。しかし、西側への不信という共通点もあります。'
  },

  // アブラハム合意とその影響
  {
    country_a: 'IL',
    country_b: 'QA',
    overall_level: 2,
    overall_description: 'イスラエルとカタールは、公式な外交関係はないものの、ガザ人道支援とエネルギー分野で間接的な協力を行っています。',
    political_military_description: 'カタールはハマス支援を続ける一方、イスラエル・パレスチナ仲介でも役割を果たす複雑な立場。',
    economic_description: 'ガザ復興資金の提供や、天然ガス分野での将来的な協力可能性が議論されています。',
    cultural_description: '直接的な文化交流は限定的ですが、カタールのメディア（アル・ジャジーラ）がイスラエル・パレスチナ問題を頻繁に報道。'
  },
  {
    country_a: 'IL',
    country_b: 'OM',
    overall_level: 3,
    overall_description: 'イスラエルとオマーンは、オマーンの中立外交により、アラブ諸国の中では比較的良好な関係を維持しています。',
    political_military_description: 'オマーンはイスラエル・パレスチナ和平の仲介役を務めることがある。軍事的対立はありません。',
    economic_description: '限定的ながら貿易関係があり、技術・農業分野での協力可能性が模索されています。',
    cultural_description: 'オマーンの宗教的寛容性により、他のアラブ諸国より柔軟な関係。観光交流の可能性もあります。'
  },

  // 新たな地域協力
  {
    country_a: 'AE',
    country_b: 'EG',
    overall_level: 4,
    overall_description: 'UAEとエジプトは、地域の安定勢力として政治・経済両面で戦略的パートナーシップを強化しています。',
    political_military_description: 'ムスリム同胞団対策とリビア東部政府支援で完全に協調。軍事協力も深化しています。',
    economic_description: 'UAEはエジプトの最大投資国。新行政首都、スエズ運河経済圏、再生可能エネルギーで大規模投資。',
    cultural_description: 'アラブ文化の中心地エジプトと、近代化のシンボルUAE。文化・教育交流も活発です。'
  },

  // 石油・ガス協力
  {
    country_a: 'QA',
    country_b: 'OM',
    overall_level: 4,
    overall_description: 'カタールとオマーンは、天然ガス資源の共有と地域安定化で協力する良好な関係にあります。',
    political_military_description: '両国とも地域紛争では比較的中立的立場。GCC内部対立でも穏健な姿勢を取っています。',
    economic_description: '天然ガス分野での協力。オマーンの地理的位置を活かしたエネルギー輸送協力もあります。',
    cultural_description: '湾岸アラブ文化を共有。両国とも比較的寛容な社会政策を取っています。'
  }
];

async function addMiddleEastRelations() {
  console.log('中東諸国間の関係データを追加開始...\n');

  let successCount = 0;
  let errorCount = 0;

  for (const relation of middleEastRelations) {
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
          data_source: 'Middle East Relations Update 2025'
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
  console.log(`スキップ: ${middleEastRelations.length - successCount - errorCount}件（既存データ）`);
}

addMiddleEastRelations().catch(console.error);