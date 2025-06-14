import { createClient } from '@supabase/supabase-js';
import type { Database } from '../src/types/database';

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://rzsbezgovdebnrmtvtwh.supabase.co';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseAnonKey) {
  console.error('❌ VITE_SUPABASE_ANON_KEY environment variable is required');
  process.exit(1);
}

const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// ウクライナと地域諸国・その他の関係データ
const ukraineRegionalRelations = [
  // 東欧・バルト諸国との関係
  {
    country_a: 'UA',
    country_b: 'CZ',
    overall_level: 5,
    overall_description: 'ウクライナとチェコは、共通の歴史経験と現在の強力な支援により、非常に密接な同盟関係にあります。',
    political_military_description: 'チェコは戦車やヘリコプター、榴弾砲など重要な軍事装備を供与。ウクライナのNATO・EU加盟を強力に支持。',
    economic_description: '復興支援と人道支援を提供。チェコ企業のウクライナ復興参画も推進しています。',
    cultural_description: 'ソ連・ロシア支配の共通経験により深い連帯。大規模なウクライナ難民を受け入れています。'
  },
  {
    country_a: 'UA',
    country_b: 'HU',
    overall_level: 2,
    overall_description: 'ウクライナとハンガリーは、オルバン政権の親ロシア的立場により、緊張を含む困難な関係にあります。',
    political_military_description: 'ハンガリーは他のNATO諸国とは異なり、ウクライナへの軍事支援に消極的。武器輸送の通過も制限。',
    economic_description: 'EU制裁には形式的に参加するものの、ロシアとのエネルギー関係を維持。ウクライナとの経済協力は限定的。',
    cultural_description: 'ウクライナ西部のハンガリー系住民を巡る歴史的な問題。言語法などで対立が続いています。'
  },
  {
    country_a: 'UA',
    country_b: 'RO',
    overall_level: 4,
    overall_description: 'ウクライナとルーマニアは、隣国として複雑な歴史を持ちながらも、現在は重要な支援関係を築いています。',
    political_military_description: 'ルーマニアは重要な軍事支援提供国。ウクライナ軍の訓練にも協力し、NATOの東方防衛の要。',
    economic_description: '穀物輸送の重要な代替ルート。復興支援や人道支援も積極的に提供しています。',
    cultural_description: '北ブコビナなど歴史的な領土問題はあるものの、現在は協力が優先されています。'
  },
  {
    country_a: 'UA',
    country_b: 'LT',
    overall_level: 5,
    overall_description: 'ウクライナとリトアニアは、対ロシア認識の完全な一致により、極めて強固な同盟関係にあります。',
    political_military_description: 'リトアニアは率先してウクライナに軍事支援を提供。カリーニングラード封鎖など強硬な対ロ政策でも協調。',
    economic_description: '人道・復興支援を提供。バルト海経由の新たな物流ルート構築でも協力。',
    cultural_description: 'ソ連支配の記憶を共有し、独立と民主主義の価値観で強く結ばれています。'
  },
  {
    country_a: 'UA',
    country_b: 'LV',
    overall_level: 5,
    overall_description: 'ウクライナとラトビアは、共通の脅威認識と価値観により、緊密な協力関係にあります。',
    political_military_description: 'ラトビアは能力に応じた軍事支援を提供。NATO東方防衛でウクライナとの協力を重視。',
    economic_description: '人道支援と復興支援を提供。ラトビア経由の物流ルート開発でも協力。',
    cultural_description: 'ソ連占領の歴史的記憶を共有。ロシアの脅威に対する認識が完全に一致しています。'
  },
  {
    country_a: 'UA',
    country_b: 'EE',
    overall_level: 5,
    overall_description: 'ウクライナとエストニアは、デジタル分野の協力と対ロシア政策の一致により、特別な関係を築いています。',
    political_military_description: 'エストニアは軍事支援に加え、サイバーセキュリティ分野でも協力。対ロシア制裁で最も強硬な立場。',
    economic_description: 'デジタル政府構築やeガバナンス分野での協力。復興においてもIT活用を支援。',
    cultural_description: 'ソ連占領の記憶とデジタル革新の経験を共有。IT分野での人材交流も活発です。'
  },
  {
    country_a: 'UA',
    country_b: 'BG',
    overall_level: 4,
    overall_description: 'ウクライナとブルガリアは、スラヴ系の文化的つながりと現在の支援関係により、良好な関係にあります。',
    political_military_description: 'ブルガリアはウクライナに軍事支援を提供。黒海地域の安全保障で協力しています。',
    economic_description: '人道支援と復興支援を提供。黒海貿易ルートの代替手段としても重要。',
    cultural_description: '正教会とスラヴ文化の共通性。ブルガリアには親ウクライナ感情が強いです。'
  },
  {
    country_a: 'UA',
    country_b: 'HR',
    overall_level: 4,
    overall_description: 'ウクライナとクロアチアは、独立戦争の経験を共有し、強い連帯に基づく支援関係にあります。',
    political_military_description: 'クロアチアは自身の戦争経験を活かし、軍事顧問や地雷除去技術を提供。復興経験も共有。',
    economic_description: '復興支援と人道支援を提供。戦後復興の経験を活かした協力を推進。',
    cultural_description: '独立戦争と領土防衛の経験を共有。クロアチア国民のウクライナへの共感は非常に強いです。'
  },
  {
    country_a: 'UA',
    country_b: 'SI',
    overall_level: 4,
    overall_description: 'ウクライナとスロベニアは、規模は小さいながらも、一貫した支援により重要な関係を築いています。',
    political_military_description: 'スロベニアは軍事装備品を供与。EU・NATOでウクライナ支援の強い支持者。',
    economic_description: '復興支援と人道支援を提供。民主化・EU統合の経験を共有。',
    cultural_description: '旧社会主義国としての共通経験。民主化プロセスでの知見を共有しています。'
  },
  {
    country_a: 'UA',
    country_b: 'RS',
    overall_level: 2,
    overall_description: 'ウクライナとセルビアは、セルビアの親ロシア的立場により、緊張を含む複雑な関係にあります。',
    political_military_description: 'セルビアはEU制裁に参加せず、中立を標榜。しかし、国際法上はウクライナの主権を支持。',
    economic_description: '戦争により経済関係は縮小。セルビアのロシア寄り政策がウクライナとの協力を制約。',
    cultural_description: 'スラヴ系の文化的つながりはあるが、コソボ問題との類推で立場が複雑化しています。'
  },

  // 西欧・その他の国との関係
  {
    country_a: 'UA',
    country_b: 'ES',
    overall_level: 4,
    overall_description: 'ウクライナとスペインは、EU枠組みでの支援と人道的価値観により、強い協力関係を発展させています。',
    political_military_description: 'レオパルド戦車や防空システムを供与。ウクライナ軍の訓練プログラムにも参加。',
    economic_description: '復興支援と人道支援を提供。スペイン企業の復興参画も推進しています。',
    cultural_description: '大規模なウクライナ難民を受け入れ。民主主義と人権の価値観で連帯しています。'
  },
  {
    country_a: 'UA',
    country_b: 'PT',
    overall_level: 4,
    overall_description: 'ウクライナとポルトガルは、地理的距離にもかかわらず、人道的価値観に基づく支援関係を築いています。',
    political_military_description: 'ポルトガルは能力に応じた軍事支援を提供。EU・NATOでウクライナ支援を強く支持。',
    economic_description: '復興支援と人道支援を提供。観光業回復支援なども検討されています。',
    cultural_description: 'ウクライナ難民を受け入れ。民主主義と自由の価値観で連帯を表明しています。'
  },
  {
    country_a: 'UA',
    country_b: 'AT',
    overall_level: 3,
    overall_description: 'ウクライナとオーストリアは、オーストリアの中立政策により、限定的ながらも支援関係にあります。',
    political_military_description: 'オーストリアは中立政策により軍事支援は行わないが、人道支援と外交努力は継続。',
    economic_description: '人道支援と復興支援を提供。オーストリア企業の復興参画の可能性も模索。',
    cultural_description: 'ウクライナ難民を受け入れ。中立国としての立場で人道的支援に注力しています。'
  },
  {
    country_a: 'UA',
    country_b: 'CH',
    overall_level: 3,
    overall_description: 'ウクライナとスイスは、スイスの中立政策の範囲内で、人道・金融面での重要な協力を行っています。',
    political_military_description: 'スイスは軍事支援は行わないが、人道支援と制裁実施で一定の役割を果たしています。',
    economic_description: 'ロシア資産の凍結と人道支援を実施。復興資金の管理でも重要な役割が期待されています。',
    cultural_description: 'ウクライナ難民を受け入れ。国際機関を通じた支援活動を展開しています。'
  },

  // その他の地域との関係
  {
    country_a: 'UA',
    country_b: 'ZA',
    overall_level: 2,
    overall_description: 'ウクライナと南アフリカは、南アフリカの中立・親ロシア的立場により、緊張を含む関係にあります。',
    political_military_description: '南アフリカはBRICS加盟国として中立を標榜し、プーチン大統領の逮捕状執行を拒否。',
    economic_description: '戦争により関係は大幅に縮小。南アフリカの立場がウクライナとの協力を制約しています。',
    cultural_description: '地理的・文化的距離が大きく、政治的立場の違いが関係発展を妨げています。'
  },
  {
    country_a: 'UA',
    country_b: 'MX',
    overall_level: 3,
    overall_description: 'ウクライナとメキシコは、メキシコの中立政策により、限定的ながらも協力関係を維持しています。',
    political_military_description: 'メキシコは伝統的な非介入政策により中立を維持。しかし、国際法違反としてロシアを批判。',
    economic_description: '人道支援は提供。ウクライナ避難民の受け入れも行っています。',
    cultural_description: 'メキシコにはウクライナ系コミュニティが存在。市民レベルでの支援活動もあります。'
  },
  {
    country_a: 'UA',
    country_b: 'NZ',
    overall_level: 4,
    overall_description: 'ウクライナとニュージーランドは、地理的距離にもかかわらず、価値観の共有により支援関係を築いています。',
    political_military_description: '軍事装備品と訓練支援を提供。国際社会でウクライナを強く支持しています。',
    economic_description: '人道支援と復興支援を提供。農業分野での協力の可能性も模索しています。',
    cultural_description: '民主主義と法の支配の価値観を共有。市民レベルでの支援活動も活発です。'
  }
];

async function addUkraineRegionalRelations() {
  console.log('ウクライナの地域関係データを追加開始...\n');

  let successCount = 0;
  let errorCount = 0;

  for (const relation of ukraineRegionalRelations) {
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
          data_source: 'Ukraine Regional Relations Update 2025'
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
  console.log(`スキップ: ${ukraineRegionalRelations.length - successCount - errorCount}件（既存データ）`);
}

addUkraineRegionalRelations().catch(console.error);