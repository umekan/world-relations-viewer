import { createClient } from '@supabase/supabase-js';
import type { Database } from '../src/types/database';

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://rzsbezgovdebnrmtvtwh.supabase.co';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6c2JlemdvdmRlYm5ybXR2dHdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk4Mjg4NzQsImV4cCI6MjA2NTQwNDg3NH0.ks3zHdJkCnDvDiriwyxAIOJMxUwuGeU1B2_aG91u1BY';

const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// バルト三国と東ヨーロッパの関係データ
const balticEasternEuropeRelations = [
  // ラトビアの関係
  {
    country_a: 'LV',
    country_b: 'EE',
    overall_level: 5,
    overall_description: 'ラトビアとエストニアは、バルト三国として非常に密接な協力関係を維持し、共通の安全保障・経済利益を追求しています。',
    political_military_description: 'NATO・EUの枠組みでの緊密な協力。バルト防衛協力やロシアへの共同対応で完全に一致しています。',
    economic_description: '統合されたエネルギー市場、活発な貿易。Rail Balticaなど共同インフラプロジェクトを推進しています。',
    cultural_description: 'バルト海地域の共通アイデンティティ。歴史的経験を共有し、文化交流が非常に活発です。'
  },
  {
    country_a: 'LV',
    country_b: 'LT',
    overall_level: 5,
    overall_description: 'ラトビアとリトアニアは、バルト三国の一員として、あらゆる分野で極めて密接な協力関係にあります。',
    political_military_description: 'バルト三国の統一的な安全保障政策。NATO東方防衛の最前線として完全に協調しています。',
    economic_description: '深い経済統合。共通のエネルギー・輸送プロジェクトを推進し、労働市場も実質的に統合されています。',
    cultural_description: 'バルト地域の歴史と運命を共有。言語は異なりますが、強い地域アイデンティティで結ばれています。'
  },
  {
    country_a: 'LV',
    country_b: 'PL',
    overall_level: 4,
    overall_description: 'ラトビアとポーランドは、地域安全保障と欧州統合において強い協力関係を築いています。',
    political_military_description: 'NATO東方防衛での協力。ロシアの脅威に対する認識を共有し、防衛協力を強化しています。',
    economic_description: '成長する貿易関係。ポーランドはバルト地域への重要な投資国となっています。',
    cultural_description: '共通の歴史的経験（ソ連支配）。カトリックとプロテスタントの違いはありますが、価値観を共有しています。'
  },
  {
    country_a: 'LV',
    country_b: 'RU',
    overall_level: 2,
    overall_description: 'ラトビアとロシアは、大きなロシア語話者人口と歴史的経緯により、緊張を含む複雑な関係にあります。',
    political_military_description: 'NATO加盟国としてロシアを安全保障上の脅威と認識。ウクライナ侵攻後、関係は著しく悪化しています。',
    economic_description: 'かつては重要な経済関係がありましたが、制裁とエネルギー独立政策により大幅に縮小しています。',
    cultural_description: 'ラトビアの人口の約25%がロシア語話者。言語政策や歴史認識を巡って対立が続いています。'
  },
  {
    country_a: 'LV',
    country_b: 'DE',
    overall_level: 4,
    overall_description: 'ラトビアとドイツは、EU枠組みでの協力と歴史的つながりに基づく良好な関係を維持しています。',
    political_military_description: 'NATO・EU同盟国として協力。ドイツはバルト地域の安全保障に貢献しています。',
    economic_description: 'ドイツは主要な貿易・投資相手国。多くのラトビア人がドイツで働いています。',
    cultural_description: 'バルト・ドイツ人の歴史的遺産。ハンザ同盟の伝統を共有し、文化交流が活発です。'
  },
  {
    country_a: 'LV',
    country_b: 'SE',
    overall_level: 5,
    overall_description: 'ラトビアとスウェーデンは、バルト海地域協力の枠組みで非常に密接な関係を築いています。',
    political_military_description: 'バルト海地域の安全保障協力。スウェーデンはラトビアの防衛能力強化を支援しています。',
    economic_description: 'スウェーデンは主要な投資国。銀行・通信・製造業で大きな存在感があります。',
    cultural_description: 'バルト海文化圏を共有。環境保護や持続可能な開発での価値観が一致しています。'
  },

  // アルメニアの関係
  {
    country_a: 'AM',
    country_b: 'RU',
    overall_level: 4,
    overall_description: 'アルメニアとロシアは、安全保障同盟と経済依存に基づく密接な関係を維持していますが、最近は多角化を模索しています。',
    political_military_description: 'CSTO（集団安全保障条約機構）の同盟国。ロシア軍基地が駐留していますが、ナゴルノ・カラバフ問題での支援不足に不満も。',
    economic_description: 'ロシアへの経済依存が高い。エネルギー供給や労働移民でロシアに依存しています。',
    cultural_description: '正教会の伝統を共有。多くのアルメニア人がロシアに居住し、文化的つながりは強いです。'
  },
  {
    country_a: 'AM',
    country_b: 'IR',
    overall_level: 4,
    overall_description: 'アルメニアとイランは、地政学的必要性から実用的で安定した関係を維持しています。',
    political_military_description: '領土的現状維持で一致。イランはアルメニア・アゼルバイジャン紛争で中立的立場を維持しています。',
    economic_description: 'イランはアルメニアにとって重要なエネルギー供給国。貿易ルートとしても重要です。',
    cultural_description: '古代からの文化的つながり。アルメニアにはペルシャ文化の影響が残り、イランには大きなアルメニア人コミュニティがあります。'
  },
  {
    country_a: 'AM',
    country_b: 'FR',
    overall_level: 5,
    overall_description: 'アルメニアとフランスは、大きなアルメニア系ディアスポラを通じて、非常に強い絆を持っています。',
    political_military_description: 'フランスはアルメニアの主要な支援国。ナゴルノ・カラバフ問題でアルメニアの立場を支持してきました。',
    economic_description: 'フランスからの投資と開発援助。観光業や文化産業での協力も進んでいます。',
    cultural_description: 'フランスには大規模で影響力のあるアルメニア人コミュニティが存在。文化交流が極めて活発です。'
  },

  // アゼルバイジャンの関係
  {
    country_a: 'AZ',
    country_b: 'TR',
    overall_level: 5,
    overall_description: 'アゼルバイジャンとトルコは「一つの民族、二つの国家」のスローガンの下、極めて密接な同盟関係にあります。',
    political_military_description: '軍事同盟関係。トルコはナゴルノ・カラバフ紛争でアゼルバイジャンを全面支援しました。',
    economic_description: 'エネルギー協力の中核（BTCパイプライン等）。貿易・投資関係も非常に深いです。',
    cultural_description: '言語・民族的に極めて近い。文化・教育交流が非常に活発で、メディア空間も共有しています。'
  },
  {
    country_a: 'AZ',
    country_b: 'IL',
    overall_level: 4,
    overall_description: 'アゼルバイジャンとイスラエルは、戦略的利益の一致により、強い協力関係を築いています。',
    political_military_description: 'イスラエルはアゼルバイジャンに高度な軍事技術を供給。両国はイランに対する懸念を共有しています。',
    economic_description: 'アゼルバイジャンはイスラエルに石油を供給。イスラエルは技術・農業分野で投資しています。',
    cultural_description: '宗教的相違にもかかわらず、世俗的な価値観を共有。アゼルバイジャンのユダヤ人コミュニティが架け橋となっています。'
  },
  {
    country_a: 'AZ',
    country_b: 'RU',
    overall_level: 3,
    overall_description: 'アゼルバイジャンとロシアは、バランスの取れた実用的な関係を維持していますが、完全には信頼していません。',
    political_military_description: '地域大国としてのロシアと協力しつつ、独立した外交政策を維持。CSTOには加盟していません。',
    economic_description: '重要な貿易相手国。エネルギー輸送や武器取引で関係がありますが、多角化を進めています。',
    cultural_description: 'ソ連時代の遺産によりロシア語が広く理解されますが、トルコ系アイデンティティを強調しています。'
  },

  // 追加の重要な関係
  {
    country_a: 'BY',
    country_b: 'PL',
    overall_level: 1,
    overall_description: 'ベラルーシとポーランドは、政治体制の違いと移民危機により、非常に緊張した関係にあります。',
    political_military_description: '2020年の抗議運動以降、関係は急速に悪化。2021年の移民危機で対立は頂点に達しました。',
    economic_description: '政治的対立により経済関係は大幅に縮小。国境封鎖や制裁が経済交流を妨げています。',
    cultural_description: 'ポーランドはベラルーシの民主化運動を支援。多くの反体制派がポーランドに亡命しています。'
  },
  {
    country_a: 'BY',
    country_b: 'LT',
    overall_level: 1,
    overall_description: 'ベラルーシとリトアニアは、政治的対立と安全保障上の懸念により、極めて困難な関係にあります。',
    political_military_description: 'リトアニアはベラルーシの民主化を強く支援。ベラルーシの原発建設にも反対しています。',
    economic_description: '制裁と対抗措置により経済関係は最小限。かつての transit 貿易も大幅に減少しています。',
    cultural_description: 'リトアニアには多くのベラルーシ反体制派が滞在。独立系メディアの拠点となっています。'
  },
  {
    country_a: 'BY',
    country_b: 'UA',
    overall_level: 2,
    overall_description: 'ベラルーシとウクライナは、ロシアのウクライナ侵攻へのベラルーシの関与により、関係が大きく悪化しています。',
    political_military_description: 'ベラルーシ領土がロシアのウクライナ攻撃に使用されたことで、実質的に敵対関係に。',
    economic_description: '戦争により経済関係は事実上停止。国境は封鎖され、貿易は最小限になっています。',
    cultural_description: '言語・文化的な近さにもかかわらず、政治的対立が人的交流を妨げています。'
  }
];

async function addBalticEasternEuropeRelations() {
  console.log('バルト・東ヨーロッパ追加関係データを挿入開始...\n');

  let successCount = 0;
  let errorCount = 0;

  for (const relation of balticEasternEuropeRelations) {
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
          data_source: 'Baltic and Eastern Europe Relations Update 2025'
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
  console.log(`スキップ: ${balticEasternEuropeRelations.length - successCount - errorCount}件（既存データ）`);
}

addBalticEasternEuropeRelations().catch(console.error);