import { createClient } from '@supabase/supabase-js';
import type { Database } from '../src/types/database';

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://rzsbezgovdebnrmtvtwh.supabase.co';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6c2JlemdvdmRlYm5ybXR2dHdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk4Mjg4NzQsImV4cCI6MjA2NTQwNDg3NH0.ks3zHdJkCnDvDiriwyxAIOJMxUwuGeU1B2_aG91u1BY';

const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// 追加の東ヨーロッパ関係データ
const moreEasternEuropeRelations = [
  // アルバニアの関係
  {
    country_a: 'AL',
    country_b: 'IT',
    overall_level: 4,
    overall_description: 'アルバニアとイタリアは、地理的近接性と歴史的つながりにより、強い協力関係を築いています。イタリアはアルバニアのEU加盟を支援する主要国です。',
    political_military_description: 'イタリアはアルバニアのNATO加盟を支援し、現在もEU加盟を強く後押し。防衛協力や警察協力が活発です。',
    economic_description: 'イタリアはアルバニアの最大の貿易相手国かつ投資国。多くのアルバニア人がイタリアで働いています。',
    cultural_description: '大規模なアルバニア系コミュニティがイタリアに存在。言語・文化交流が非常に活発です。'
  },
  {
    country_a: 'AL',
    country_b: 'GR',
    overall_level: 3,
    overall_description: 'アルバニアとギリシャは、過去の緊張を乗り越えて協力関係を発展させていますが、一部の問題が残っています。',
    political_military_description: 'ギリシャはアルバニアのEU加盟を支持。しかし、海洋境界画定や少数民族の権利で時に意見が対立します。',
    economic_description: 'ギリシャはアルバニアへの重要な投資国。多くのアルバニア人がギリシャで働いています。',
    cultural_description: 'ギリシャ系少数民族がアルバニア南部に存在。宗教的つながり（正教）もありますが、民族問題が時に緊張を生みます。'
  },
  {
    country_a: 'AL',
    country_b: 'MK',
    overall_level: 4,
    overall_description: 'アルバニアと北マケドニアは、大きなアルバニア系人口を通じて密接な関係を持ち、地域協力を推進しています。',
    political_military_description: '両国はNATO加盟国として協力。アルバニアは北マケドニアのEU加盟プロセスを支援しています。',
    economic_description: '活発な貿易関係と投資。国境地域での経済協力が進んでいます。',
    cultural_description: '北マケドニアの人口の約25%がアルバニア系。言語・文化的つながりが非常に強いです。'
  },
  {
    country_a: 'AL',
    country_b: 'ME',
    overall_level: 4,
    overall_description: 'アルバニアとモンテネグロは、アルバニア系住民の存在と地域協力により、友好的な関係を維持しています。',
    political_military_description: '両国はNATO加盟国として協力。地域の安定化で共通の利益を持っています。',
    economic_description: '観光業や貿易での協力。アドリア海沿岸の開発プロジェクトでも連携しています。',
    cultural_description: 'モンテネグロにアルバニア系少数民族が存在。文化的交流が活発です。'
  },
  {
    country_a: 'AL',
    country_b: 'TR',
    overall_level: 4,
    overall_description: 'アルバニアとトルコは、歴史的・文化的つながりと現代の戦略的協力に基づく強い関係を持っています。',
    political_military_description: 'NATO同盟国として防衛協力。トルコはアルバニアの軍事近代化を支援しています。',
    economic_description: 'トルコはアルバニアへの主要投資国。インフラプロジェクトや貿易で重要な役割を果たしています。',
    cultural_description: 'イスラム教の伝統を共有（アルバニアは世俗的）。トルコの文化的影響力が強く、教育交流も活発です。'
  },

  // モルドバの関係
  {
    country_a: 'MD',
    country_b: 'RO',
    overall_level: 5,
    overall_description: 'モルドバとルーマニアは、言語・文化・歴史を共有する特別な関係にあり、非常に密接な協力を行っています。',
    political_military_description: 'ルーマニアはモルドバのEU加盟を最も強く支援。多くのモルドバ人がルーマニア国籍を取得しています。',
    economic_description: 'ルーマニアはモルドバの主要貿易相手国。エネルギー供給や投資で重要な役割を果たしています。',
    cultural_description: '実質的に同じ言語（ルーマニア語）を話し、文化的に非常に近い。教育・文化交流が極めて活発です。'
  },
  {
    country_a: 'MD',
    country_b: 'UA',
    overall_level: 4,
    overall_description: 'モルドバとウクライナは、隣国として協力関係を発展させており、特に安全保障面での連携を強化しています。',
    political_military_description: '両国は親欧州路線で協調。トランスニストリア問題やロシアの脅威に共同で対処しています。',
    economic_description: '重要な貿易パートナー。エネルギーや輸送分野での協力が進んでいます。',
    cultural_description: 'モルドバにウクライナ系、ウクライナにモルドバ系少数民族が存在。地域レベルでの交流が活発です。'
  },
  {
    country_a: 'MD',
    country_b: 'RU',
    overall_level: 2,
    overall_description: 'モルドバとロシアは、トランスニストリア問題とエネルギー依存により、緊張を含む複雑な関係にあります。',
    political_military_description: 'トランスニストリアにロシア軍が駐留。モルドバの親EU路線とロシアの影響力が対立しています。',
    economic_description: '歴史的にロシアへのエネルギー依存が高いが、多角化を進めています。ワイン輸出などで経済的つながりは残っています。',
    cultural_description: 'ロシア語話者が多く存在しますが、モルドバの欧州統合志向により文化的影響力は低下しています。'
  },
  {
    country_a: 'MD',
    country_b: 'TR',
    overall_level: 4,
    overall_description: 'モルドバとトルコは、ガガウズ自治区を通じた特別なつながりと、経済協力により良好な関係を築いています。',
    political_military_description: 'トルコはモルドバの領土的一体性を支持。ガガウズ自治区との関係を通じて影響力を持っています。',
    economic_description: '貿易・投資関係が拡大。トルコ企業がインフラプロジェクトに参加しています。',
    cultural_description: 'ガガウズ人（トルコ系キリスト教徒）の存在により特別な文化的つながりがあります。'
  },

  // 北マケドニアの関係
  {
    country_a: 'MK',
    country_b: 'GR',
    overall_level: 3,
    overall_description: '北マケドニアとギリシャは、長年の国名紛争を解決し、関係改善を進めていますが、まだ課題が残っています。',
    political_military_description: '2018年のプレスパ合意により国名問題を解決。ギリシャは北マケドニアのNATO・EU加盟への反対を撤回しました。',
    economic_description: 'ギリシャは北マケドニアへの主要投資国。経済関係は改善傾向にありますが、まだ潜在力を発揮していません。',
    cultural_description: '歴史・文化遺産を巡る認識の相違は残っていますが、人的交流は増加しています。'
  },
  {
    country_a: 'MK',
    country_b: 'TR',
    overall_level: 4,
    overall_description: '北マケドニアとトルコは、歴史的つながりと現代の経済協力に基づく友好的な関係を維持しています。',
    political_military_description: 'NATO同盟国として協力。トルコは北マケドニアのEU加盟プロセスを支援しています。',
    economic_description: 'トルコは重要な投資国。貿易関係も活発で、多くのトルコ企業が進出しています。',
    cultural_description: 'オスマン帝国時代の遺産とトルコ系・ムスリム住民の存在により、文化的つながりがあります。'
  },

  // ボスニア・ヘルツェゴビナの関係
  {
    country_a: 'BA',
    country_b: 'TR',
    overall_level: 4,
    overall_description: 'ボスニア・ヘルツェゴビナとトルコは、歴史的・文化的つながりと現代の支援関係により、強い絆を持っています。',
    political_military_description: 'トルコはボスニアの領土的一体性を強く支持。防衛協力や開発援助を提供しています。',
    economic_description: 'トルコは主要な投資国。インフラプロジェクトや貿易で重要な役割を果たしています。',
    cultural_description: 'ボスニアのムスリム人口（ボシュニャク人）との強い文化的・宗教的つながり。教育交流も活発です。'
  },
  {
    country_a: 'BA',
    country_b: 'AT',
    overall_level: 4,
    overall_description: 'ボスニア・ヘルツェゴビナとオーストリアは、歴史的つながりと現代の経済協力に基づく良好な関係を持っています。',
    political_military_description: 'オーストリアはボスニアのEU加盟を支援。平和維持活動にも参加してきました。',
    economic_description: 'オーストリアは主要な投資国。銀行・通信・製造業で強い存在感があります。',
    cultural_description: 'オーストリア・ハンガリー帝国時代の遺産。多くのボスニア人がオーストリアで働いています。'
  },

  // モンテネグロの関係
  {
    country_a: 'ME',
    country_b: 'IT',
    overall_level: 4,
    overall_description: 'モンテネグロとイタリアは、アドリア海を挟んだ隣国として、経済・文化面で密接な関係を築いています。',
    political_military_description: 'イタリアはモンテネグロのNATO加盟を支援し、EU加盟プロセスも支持しています。',
    economic_description: 'イタリアは主要な投資国。観光業、不動産、金融部門で大きな存在感があります。',
    cultural_description: 'アドリア海沿岸の文化的つながり。多くのイタリア人観光客がモンテネグロを訪れます。'
  },
  {
    country_a: 'ME',
    country_b: 'RU',
    overall_level: 3,
    overall_description: 'モンテネグロとロシアは、NATO加盟により関係が冷却化しましたが、経済的つながりは残っています。',
    political_military_description: 'モンテネグロの2017年NATO加盟はロシアとの関係を悪化させました。ロシアは加盟に強く反対していました。',
    economic_description: 'ロシア人投資家や観光客の存在は依然として重要ですが、政治的緊張により影響を受けています。',
    cultural_description: '正教会の伝統を共有し、歴史的つながりもありますが、親西欧路線により関係は変化しています。'
  },

  // その他の重要な東ヨーロッパ関係
  {
    country_a: 'GE',
    country_b: 'UA',
    overall_level: 5,
    overall_description: 'ジョージアとウクライナは、ロシアとの困難な関係を共有し、親欧州路線で強く連帯する戦略的パートナーです。',
    political_military_description: '両国は領土をロシアに占領されており、安全保障面で協力。EU・NATO加盟を共に目指しています。',
    economic_description: '黒海地域での経済協力。エネルギー輸送や貿易で協力関係を発展させています。',
    cultural_description: '民主化と欧州統合という共通の価値観。市民社会レベルでの交流も活発です。'
  },
  {
    country_a: 'GE',
    country_b: 'TR',
    overall_level: 4,
    overall_description: 'ジョージアとトルコは、隣国として深い経済関係と戦略的協力を発展させています。',
    political_military_description: 'トルコはジョージアの領土的一体性を支持。地域の安定化で協力していますが、NATO加盟では慎重な立場です。',
    economic_description: 'トルコはジョージアの最大の貿易相手国。エネルギー輸送の要衝として重要な役割を果たしています。',
    cultural_description: 'ジョージアのムスリム地域（アジャリア）との文化的つながり。多くの観光交流があります。'
  },
  {
    country_a: 'GE',
    country_b: 'AM',
    overall_level: 3,
    overall_description: 'ジョージアとアルメニアは、隣国として実用的な関係を維持していますが、一部の問題により制約があります。',
    political_military_description: '両国は異なる地政学的志向を持ち、ジョージアは親西欧、アルメニアはロシアとの同盟関係を維持しています。',
    economic_description: 'アルメニアにとってジョージアは重要な輸送回廊。しかし、政治的相違が経済協力の深化を妨げています。',
    cultural_description: 'キリスト教国としての共通性がありますが、アルメニア系住民を巡る問題が時に緊張を生みます。'
  },
  {
    country_a: 'GE',
    country_b: 'AZ',
    overall_level: 4,
    overall_description: 'ジョージアとアゼルバイジャンは、エネルギー協力を中心に戦略的パートナーシップを発展させています。',
    political_military_description: '地域の安定化で協力。両国は異なる安全保障志向を持ちますが、実用的な協力を維持しています。',
    economic_description: 'BTC石油パイプラインなど、重要なエネルギー輸送プロジェクトで協力。貿易関係も活発です。',
    cultural_description: 'ジョージアにアゼルバイジャン系少数民族が存在。文化交流も行われています。'
  }
];

async function addMoreEasternEuropeRelations() {
  console.log('追加の東ヨーロッパ関係データを挿入開始...\n');

  let successCount = 0;
  let errorCount = 0;

  for (const relation of moreEasternEuropeRelations) {
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
          data_source: 'Eastern Europe Relations Update 2025 - Part 2'
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
  console.log(`スキップ: ${moreEasternEuropeRelations.length - successCount - errorCount}件（既存データ）`);
}

addMoreEasternEuropeRelations().catch(console.error);