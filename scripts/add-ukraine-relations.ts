import { createClient } from '@supabase/supabase-js';
import type { Database } from '../src/types/database';

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://rzsbezgovdebnrmtvtwh.supabase.co';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6c2JlemdvdmRlYm5ybXR2dHdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk4Mjg4NzQsImV4cCI6MjA2NTQwNDg3NH0.ks3zHdJkCnDvDiriwyxAIOJMxUwuGeU1B2_aG91u1BY';

const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// ウクライナの関係データ（2025年の状況を反映）
const ukraineRelations = [
  // 主要な支援国との関係
  {
    country_a: 'UA',
    country_b: 'US',
    overall_level: 5,
    overall_description: 'ウクライナとアメリカは、ロシアの侵攻に対する防衛において最も重要な同盟関係にあります。アメリカは軍事・経済・人道支援の最大の提供国です。',
    political_military_description: '米国は数百億ドル規模の軍事援助を提供し、情報共有、訓練、最新兵器システムの供与を行っています。ウクライナのNATO加盟を支持。',
    economic_description: '大規模な経済・財政支援を提供。ウクライナの戦後復興においても主導的役割を担うことが期待されています。',
    cultural_description: 'ウクライナ系アメリカ人コミュニティが支援活動を展開。民主主義と自由の価値観を共有しています。'
  },
  {
    country_a: 'UA',
    country_b: 'GB',
    overall_level: 5,
    overall_description: 'ウクライナとイギリスは、ロシアの侵攻以前から強固な戦略的パートナーシップを構築し、現在も最も緊密な同盟関係にあります。',
    political_military_description: '英国は早期から対戦車兵器を供与し、軍事訓練プログラムを主導。ウクライナの安全保障に深くコミットしています。',
    economic_description: '復興支援の約束と制裁によるロシア資産の凍結でウクライナを支援。ロンドンは復興会議の主要開催地。',
    cultural_description: '大規模なウクライナ難民を受け入れ、市民レベルでの支援も活発。メディアもウクライナ支持の論調が強いです。'
  },
  {
    country_a: 'UA',
    country_b: 'PL',
    overall_level: 5,
    overall_description: 'ウクライナとポーランドは、歴史的な問題を乗り越えて、現在は最も重要な隣国同盟となっています。ポーランドは支援の最前線基地です。',
    political_military_description: 'ポーランドは西側の軍事支援の主要な輸送拠点。自国の戦車や装備も提供し、ウクライナのEU・NATO加盟を強力に支持。',
    economic_description: '最大の難民受け入れ国として巨額の負担。穀物輸出問題などの摩擦もありますが、基本的に強い経済支援を継続。',
    cultural_description: '数百万人のウクライナ難民を受け入れ、社会統合を推進。歴史問題は残るものの、連帯感が優先されています。'
  },
  {
    country_a: 'UA',
    country_b: 'DE',
    overall_level: 4,
    overall_description: 'ウクライナとドイツは、当初の躊躇を経て、現在は強力な支援関係を構築しています。ドイツは欧州最大の支援国の一つとなっています。',
    political_military_description: '重火器供与には慎重でしたが、現在は戦車や防空システムを提供。ウクライナの長期的な防衛能力構築を支援。',
    economic_description: 'EUを通じた財政支援の最大拠出国。エネルギー転換支援や復興計画でも主導的役割を果たしています。',
    cultural_description: '大規模なウクライナ難民を受け入れ。市民社会の支援活動も活発で、連帯意識が高まっています。'
  },
  {
    country_a: 'UA',
    country_b: 'FR',
    overall_level: 4,
    overall_description: 'ウクライナとフランスは、マクロン大統領の外交努力と軍事支援により、強い協力関係を発展させています。',
    political_military_description: 'CAESARりゅう弾砲など重要な装備を供与。外交的解決も模索しつつ、ウクライナの主権を強く支持しています。',
    economic_description: '復興支援会議を主催し、フランス企業の参画を推進。農業分野での協力も重視しています。',
    cultural_description: '文化財保護支援やウクライナ人学生の受け入れを実施。フランス的価値観に基づく連帯を表明しています。'
  },
  {
    country_a: 'UA',
    country_b: 'IT',
    overall_level: 4,
    overall_description: 'ウクライナとイタリアは、当初の慎重姿勢から、ドラギ政権以降は強力な支援関係へと発展しました。',
    political_military_description: '防空システムや榴弾砲を供与。G7議長国として国際的な支援調整でも重要な役割を果たしています。',
    economic_description: 'ウクライナ復興会議を主催し、イタリア企業の復興参画を推進。エネルギー分野での協力も模索しています。',
    cultural_description: '文化遺産保護での協力。多くのウクライナ難民を受け入れ、社会統合を進めています。'
  },
  {
    country_a: 'UA',
    country_b: 'NL',
    overall_level: 5,
    overall_description: 'ウクライナとオランダは、MH17撃墜事件以来の正義追求と、現在の軍事支援により、非常に強固な関係を築いています。',
    political_military_description: 'F-16戦闘機の供与を主導し、パトリオット防空システムも提供。国際刑事裁判所での戦争犯罪追及でも協力。',
    economic_description: '一人当たりでは最大級の財政支援を提供。農業技術や水管理での協力も推進しています。',
    cultural_description: 'MH17事件の記憶により、市民レベルでもウクライナへの連帯意識が非常に強いです。'
  },
  {
    country_a: 'UA',
    country_b: 'BE',
    overall_level: 4,
    overall_description: 'ウクライナとベルギーは、EU本部所在国として、また実質的な軍事支援により、重要な協力関係にあります。',
    political_military_description: 'F-16戦闘機の供与を約束し、軍事訓練を提供。EU・NATOでのウクライナ支援調整で重要な役割を果たしています。',
    economic_description: 'EU機関を通じた支援調整の中心。復興計画策定でも重要な役割を担っています。',
    cultural_description: '難民受け入れと社会統合を推進。ブリュッセルはウクライナ支援の国際会議の主要開催地です。'
  },

  // 北欧諸国との関係
  {
    country_a: 'UA',
    country_b: 'NO',
    overall_level: 5,
    overall_description: 'ウクライナとノルウェーは、エネルギー支援と長期的な復興協力により、極めて強い関係を構築しています。',
    political_military_description: '大規模な軍事・財政支援パッケージを提供。防空システムや海軍能力の強化を支援しています。',
    economic_description: '5年間で75億ドルの支援を約束。エネルギーインフラの復旧と近代化で主導的役割を果たしています。',
    cultural_description: '人道支援と難民受け入れで積極的。ノルウェーの市民社会もウクライナ支援に深く関与しています。'
  },
  {
    country_a: 'UA',
    country_b: 'SE',
    overall_level: 5,
    overall_description: 'ウクライナとスウェーデンは、歴史的なつながりと現在の包括的支援により、特別な関係を築いています。',
    political_military_description: 'CV90歩兵戦闘車やArcher自走砲など重要な装備を供与。NATO加盟によりさらに支援を強化しています。',
    economic_description: '一人当たりでは最大級の支援を提供。グリーン復興と民主的制度構築を重視した支援を展開。',
    cultural_description: '歴史的にウクライナとの関係が深く（ポルタヴァの戦い等）、市民の支援意識も非常に高いです。'
  },
  {
    country_a: 'UA',
    country_b: 'FI',
    overall_level: 5,
    overall_description: 'ウクライナとフィンランドは、ロシアとの困難な歴史を共有し、強い連帯に基づく支援関係を築いています。',
    political_military_description: 'NATO新規加盟国として、ウクライナの安全保障を重視。防衛装備品の供与と訓練支援を実施。',
    economic_description: '人道支援と復興支援を提供。教育分野での協力も重視しています。',
    cultural_description: '冬戦争の経験から、ウクライナの抵抗に深い共感。市民レベルでの支援活動も活発です。'
  },
  {
    country_a: 'UA',
    country_b: 'DK',
    overall_level: 5,
    overall_description: 'ウクライナとデンマークは、包括的な安全保障支援と復興協力により、模範的な同盟関係を構築しています。',
    political_military_description: 'F-16戦闘機の供与を主導し、訓練センターを設立。ウクライナ軍の近代化を長期的に支援。',
    economic_description: '復興基金への大規模拠出と、デンマーク企業の復興参画を推進。グリーンエネルギー転換を支援。',
    cultural_description: '市民社会の支援活動が活発。民主主義と人権の価値観でウクライナと強く連帯しています。'
  },

  // アジア・太平洋地域との関係
  {
    country_a: 'UA',
    country_b: 'JP',
    overall_level: 4,
    overall_description: 'ウクライナと日本は、G7で唯一のアジア国として、非軍事分野での支援を中心に強い協力関係を発展させています。',
    political_military_description: '憲法上の制約から非殺傷装備（防弾チョッキ、ヘルメット等）に限定されるが、外交面では強力に支援。',
    economic_description: '大規模な財政支援と復興支援を約束。地雷除去、インフラ復旧、医療支援などで貢献しています。',
    cultural_description: '両国とも領土を不法占拠されている共通点。民主主義と法の支配の価値観を共有しています。'
  },
  {
    country_a: 'UA',
    country_b: 'KR',
    overall_level: 4,
    overall_description: 'ウクライナと韓国は、人道支援と復興協力を中心に、アジアにおける重要なパートナーシップを構築しています。',
    political_military_description: '直接的な武器供与は行っていないが、非殺傷装備品や人道支援を提供。国際社会でウクライナを支持。',
    economic_description: '財政支援と人道支援を提供。韓国の復興経験を活かした支援プログラムを展開しています。',
    cultural_description: '分断国家としての経験を共有。民主主義価値観での連帯があります。'
  },
  {
    country_a: 'UA',
    country_b: 'AU',
    overall_level: 5,
    overall_description: 'ウクライナとオーストラリアは、地理的距離にもかかわらず、軍事・経済両面で強力な支援関係を築いています。',
    political_military_description: 'ブッシュマスター装甲車など重要な軍事装備を供与。ウクライナ軍の訓練にも積極的に参加。',
    economic_description: '制裁によるロシア産石炭の代替供給など、エネルギー安全保障で協力。復興支援も約束。',
    cultural_description: '大規模なウクライナ系コミュニティが存在。MH17事件の記憶もあり、市民の支援意識が高いです。'
  },
  {
    country_a: 'UA',
    country_b: 'CA',
    overall_level: 5,
    overall_description: 'ウクライナとカナダは、世界最大のウクライナ系ディアスポラを通じて、極めて強固な同盟関係にあります。',
    political_military_description: '早期から軍事訓練任務（UNIFIER）を実施。重要な軍事装備品の供与と訓練支援を継続。',
    economic_description: '大規模な財政支援と復興支援を提供。カナダ企業の復興参画も推進しています。',
    cultural_description: '130万人以上のウクライナ系カナダ人が存在。副首相もウクライナ系で、政治的影響力が大きいです。'
  },

  // 中立的・複雑な関係
  {
    country_a: 'UA',
    country_b: 'TR',
    overall_level: 3,
    overall_description: 'ウクライナとトルコは、黒海地域の重要なパートナーとして協力しつつ、トルコはロシアとも関係を維持する複雑な立場にあります。',
    political_military_description: 'バイラクタルTB2ドローンを供与し、黒海穀物回廊の実現に貢献。しかし、対ロシア制裁には参加していません。',
    economic_description: '重要な貿易相手国。黒海経由の穀物輸出でトルコの仲介が重要な役割を果たしました。',
    cultural_description: 'クリミア・タタール人を通じた歴史的つながり。トルコはタタール人の権利を支持しています。'
  },
  {
    country_a: 'UA',
    country_b: 'IL',
    overall_level: 3,
    overall_description: 'ウクライナとイスラエルは、両国の大きなユダヤ人人口により結ばれていますが、ロシアとの関係から慎重な立場を維持しています。',
    political_military_description: '人道支援は提供するが、武器供与は拒否。ロシアとの安全保障上の配慮から中立的立場を維持。',
    economic_description: '医療支援や人道支援を提供。IT分野での協力の可能性がありますが、まだ限定的です。',
    cultural_description: 'ゼレンスキー大統領もユダヤ系。多くのウクライナ系ユダヤ人がイスラエルに移住しています。'
  },
  {
    country_a: 'UA',
    country_b: 'CN',
    overall_level: 2,
    overall_description: 'ウクライナと中国は、中国がロシアとの戦略的パートナーシップを維持しているため、緊張を含む複雑な関係にあります。',
    political_military_description: '中国は「中立」を標榜するが、実質的にロシア寄り。ウクライナの主権は支持するが、制裁には反対。',
    economic_description: '戦前は重要な貿易相手国でしたが、戦争により関係は大幅に縮小。一帯一路への参加も停滞。',
    cultural_description: '政治体制の違いが大きく、価値観の共有は限定的。中国の和平提案はウクライナに受け入れられていません。'
  },
  {
    country_a: 'UA',
    country_b: 'IN',
    overall_level: 3,
    overall_description: 'ウクライナとインドは、インドが伝統的にロシアと密接な関係にあるため、複雑な関係となっています。',
    political_military_description: 'インドは中立を維持し、対ロシア制裁に参加せず。しかし、人道支援は提供しています。',
    economic_description: '戦争により貿易は影響を受けているが、医薬品などの人道物資の供給は継続。',
    cultural_description: '民主主義国家としての共通点はあるが、地政学的立場の違いが関係を制約しています。'
  },
  {
    country_a: 'UA',
    country_b: 'BR',
    overall_level: 3,
    overall_description: 'ウクライナとブラジルは、地理的に離れており、ブラジルの中立的立場により、限定的な関係となっています。',
    political_military_description: 'ブラジルは中立を維持し、和平交渉を提唱。武器供与や制裁には参加していません。',
    economic_description: '農業大国同士として競合関係にある面も。戦争により穀物市場での関係が複雑化しています。',
    cultural_description: '大きなウクライナ系コミュニティが存在し、文化的つながりはありますが、政府間関係は限定的です。'
  }
];

async function addUkraineRelations() {
  console.log('ウクライナの関係データを追加開始...\n');

  let successCount = 0;
  let errorCount = 0;

  for (const relation of ukraineRelations) {
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
          data_source: 'Ukraine Relations Update 2025'
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
  console.log(`スキップ: ${ukraineRelations.length - successCount - errorCount}件（既存データ）`);
}

addUkraineRelations().catch(console.error);