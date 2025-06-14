import { createClient } from '@supabase/supabase-js';
import type { Database } from '../src/types/database';

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://rzsbezgovdebnrmtvtwh.supabase.co';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6c2JlemdvdmRlYm5ybXR2dHdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk4Mjg4NzQsImV4cCI6MjA2NTQwNDg3NH0.ks3zHdJkCnDvDiriwyxAIOJMxUwuGeU1B2_aG91u1BY';

const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// アフリカ諸国間の関係データ
const africaRelations = [
  // 地域大国間の関係
  {
    country_a: 'EG',
    country_b: 'ET',
    overall_level: 2,
    overall_description: 'エジプトとエチオピアは、ナイル川の水利権を巡る大エチオピア・ルネサンス・ダムの問題により、緊張関係にあります。',
    political_military_description: 'ダム建設による水量減少への懸念から、エジプトは強硬姿勢を取ることがある。スーダンも巻き込んだ三国間交渉が続いています。',
    economic_description: 'ダム問題が経済協力を阻害。しかし、両国ともアフリカ連合の重要メンバーとして一定の経済関係は維持しています。',
    cultural_description: 'キリスト教（コプト教・エチオピア正教）の歴史的つながりがありますが、現在の政治対立が文化交流にも影響を与えています。'
  },
  {
    country_a: 'ZA',
    country_b: 'ZW',
    overall_level: 3,
    overall_description: '南アフリカとジンバブエは、隣国として複雑な関係にあり、経済協力と政治的懸念が混在しています。',
    political_military_description: 'ムガベ政権時代の人権問題に南アが懸念を示してきましたが、静かな外交を優先。SADCの枠組みで協力しています。',
    economic_description: '南アはジンバブエの主要貿易相手国。多くのジンバブエ人が南アで働いており、経済的相互依存が深いです。',
    cultural_description: 'ショナ族など共通の民族グループが存在。しかし、経済移民の流入により社会的緊張も生じています。'
  },
  {
    country_a: 'EG',
    country_b: 'LY',
    overall_level: 3,
    overall_description: 'エジプトとリビアは、政治的不安定性の中でも、安全保障と経済的必要性により重要な関係を維持しています。',
    political_military_description: 'リビア内戦では東部政府（ハフタル軍）を支援。国境安全保障やテロ対策で協力しています。',
    economic_description: 'エネルギー協力と貿易関係。多くのエジプト人労働者がリビアで働いていましたが、内戦により減少しています。',
    cultural_description: 'アラブ・イスラム文化を共有。歴史的に深いつながりがありますが、政治情勢により交流は制限されています。'
  },
  {
    country_a: 'MA',
    country_b: 'TN',
    overall_level: 4,
    overall_description: 'モロッコとチュニジアは、マグレブ地域の安定した民主主義国として、地域協力と相互支援を行っています。',
    political_military_description: 'アラブ春暖期以降、地域の安定勢力として協力。テロ対策や移民問題で連携しています。',
    economic_description: '貿易・投資関係が活発。観光業でも協力し、モロッコの経験をチュニジアが参考にしています。',
    cultural_description: 'マグレブ・アラブ文化を共有。フランス語圏としての共通性もあり、文化交流が盛んです。'
  },
  {
    country_a: 'NG',
    country_b: 'GH',
    overall_level: 4,
    overall_description: 'ナイジェリアとガーナは、西アフリカの経済大国として、ECOWASを通じた密接な協力関係にあります。',
    political_military_description: 'ECOWAS平和維持活動で協力。民主主義の促進と地域安全保障で共通の立場を取っています。',
    economic_description: 'ナイジェリアはガーナの主要貿易相手国。エネルギー、農業、金融分野での協力が拡大しています。',
    cultural_description: 'ヨルバ族など共通の民族グループが存在。英語圏として教育・文化交流も活発です。'
  },
  {
    country_a: 'NG',
    country_b: 'SN',
    overall_level: 4,
    overall_description: 'ナイジェリアとセネガルは、ECOWASの主要国として、経済統合と地域安全保障で協力しています。',
    political_military_description: 'ECOWAS枠組みでの平和維持活動。テロ対策（ボコ・ハラム等）で情報共有と協力を行っています。',
    economic_description: '石油・ガス協力や農業貿易。セネガルの港湾施設はナイジェリアの貿易ルートとしても重要です。',
    cultural_description: 'イスラム教の共通性とハウサ・フラニ族の存在。宗教・文化交流が活発です。'
  },
  {
    country_a: 'KE',
    country_b: 'TZ',
    overall_level: 4,
    overall_description: 'ケニアとタンザニアは、東アフリカ共同体の中核として、経済統合を深めながらも競争関係もある複雑な関係です。',
    political_military_description: 'EAC統合で協力しつつ、地域の主導権を巡って競争。しかし、安全保障では協力関係を維持しています。',
    economic_description: 'EAC内最大の貿易関係。モンバサ港がタンザニア内陸部の貿易ルートとして重要です。',
    cultural_description: 'スワヒリ語と文化を共有。キリスト教とイスラム教が混在する類似の宗教構成を持っています。'
  },
  {
    country_a: 'ZA',
    country_b: 'AO',
    overall_level: 3,
    overall_description: '南アフリカとアンゴラは、SADC加盟国として協力しつつ、石油・鉱物資源を巡る経済競争もある関係です。',
    political_military_description: 'SADC平和維持活動で協力。南アはアンゴラの戦後復興を支援してきました。',
    economic_description: '南アフリカ企業のアンゴラ進出が活発。建設、金融、小売業での投資が拡大しています。',
    cultural_description: 'ポルトガル語圏のアンゴラと英語圏の南アという違いがありますが、アフリカとしての連帯意識を共有しています。'
  },
  {
    country_a: 'EG',
    country_b: 'SD',
    overall_level: 2,
    overall_description: 'エジプトとスーダンは、ナイル川流域国として重要な関係にありますが、政治情勢とダム問題により緊張を含む関係です。',
    political_military_description: 'スーダンの政治不安定にエジプトが懸念。エチオピア・ダム問題では一時的に連携しています。',
    economic_description: 'ナイル川の水資源管理と農業協力。しかし、政治的不安定により経済関係は制約されています。',
    cultural_description: 'アラブ・アフリカ文化の共有。歴史的に深いつながりがありますが、政治的緊張が交流に影響しています。'
  },
  {
    country_a: 'NG',
    country_b: 'CI',
    overall_level: 3,
    overall_description: 'ナイジェリアとコートジボワールは、ECOWASの主要国として協力していますが、経済競争と政治的相違もあります。',
    political_military_description: 'ECOWAS平和維持で協力。しかし、コートジボワール危機時の介入方針で意見が分かれることもありました。',
    economic_description: '農業（カカオ・コーヒー）と石油で競合関係。しかし、地域統合により相互補完的な関係も発展しています。',
    cultural_description: 'フランス語圏と英語圏の違いがありますが、西アフリカ文化の共通性と民族的つながりがあります。'
  },
  {
    country_a: 'ZA',
    country_b: 'MZ',
    overall_level: 4,
    overall_description: '南アフリカとモザンビークは、隣国として歴史的つながりと現代の経済協力により密接な関係にあります。',
    political_military_description: 'SADC加盟国として地域安全保障で協力。モザンビークの平和プロセスを南アが支援してきました。',
    economic_description: '南アはモザンビークの最大の投資国。港湾、エネルギー、鉱業での協力が活発です。',
    cultural_description: '多くのモザンビーク人が南アで働いており、人的つながりが深い。しかし、言語（ポルトガル語vs英語）の違いもあります。'
  },
  {
    country_a: 'KE',
    country_b: 'UG',
    overall_level: 4,
    overall_description: 'ケニアとウガンダは、東アフリカ共同体の創設国として、最も統合が進んだ関係にあります。',
    political_military_description: 'EAC統合の推進で完全に協調。テロ対策（アル・シャバーブ等）でも軍事協力しています。',
    economic_description: '経済統合が最も進んだ関係。ケニアの港湾がウガンダの主要貿易ルートです。',
    cultural_description: '国境地域では同じ民族グループが存在。スワヒリ語も共通し、文化的一体性が強いです。'
  },
  {
    country_a: 'MA',
    country_b: 'SN',
    overall_level: 4,
    overall_description: 'モロッコとセネガルは、宗教的つながりと経済協力により、西アフリカ・北アフリカ間の重要な架け橋となっています。',
    political_military_description: 'アフリカ連合復帰後、モロッコは西アフリカとの関係を重視。平和維持活動でも協力しています。',
    economic_description: 'モロッコ企業のセネガル進出が活発。銀行、通信、農業分野での投資が拡大しています。',
    cultural_description: 'イスラム教（スーフィズム）の深いつながり。モロッコのイスラム学者がセネガルでも尊敬されています。'
  },
  {
    country_a: 'ET',
    country_b: 'KE',
    overall_level: 3,
    overall_description: 'エチオピアとケニアは、東アフリカの地域大国として重要な関係にありますが、競争と協力が混在しています。',
    political_military_description: 'IGAD（政府間開発機構）で協力。しかし、南スーダン問題や地域影響力を巡って競争関係もあります。',
    economic_description: 'エチオピアはケニアの港湾に依存。しかし、エチオピアの独自の港湾アクセス確保により関係が複雑化しています。',
    cultural_description: 'キリスト教国としての共通性。しかし、エチオピアの古代文明への誇りと、ケニアの東アフリカ地域での影響力を巡る競争もあります。'
  },
  {
    country_a: 'DZ',
    country_b: 'TN',
    overall_level: 4,
    overall_description: 'アルジェリアとチュニジアは、隣国として歴史的・文化的つながりと現代の協力関係を持っています。',
    political_military_description: '国境安全保障とテロ対策で緊密に協力。リビア情勢の安定化でも協調しています。',
    economic_description: 'エネルギー協力と貿易関係。アルジェリアのガスがチュニジア経由でヨーロッパに輸出されています。',
    cultural_description: 'マグレブ・アラブ文化を共有。ベルベル人の存在や、フランス植民地時代の共通体験があります。'
  },
  {
    country_a: 'ZA',
    country_b: 'ZM',
    overall_level: 4,
    overall_description: '南アフリカとザンビアは、SADC加盟国として経済協力と地域統合を推進する重要なパートナーです。',
    political_military_description: 'SADC地域統合の推進で協力。ジンバブエ問題など地域課題での政策調整も行っています。',
    economic_description: '南アフリカはザンビアの主要投資国。鉱業、金融、小売業での協力が活発です。',
    cultural_description: '英語圏としての共通性と、植民地時代の類似した経験。多くのザンビア人が南アで教育を受けています。'
  },
  {
    country_a: 'GH',
    country_b: 'CI',
    overall_level: 3,
    overall_description: 'ガーナとコートジボワールは、隣国として経済協力を行いつつ、カカオ生産を巡る競争関係もあります。',
    political_military_description: 'ECOWAS枠組みで協力。しかし、コートジボワール危機時の難民流入や国境問題で緊張が生じることもありました。',
    economic_description: 'カカオ生産で世界1位・2位の競争関係。しかし、価格安定化では協力し、地域統合も進めています。',
    cultural_description: 'アカン族など共通の民族グループが存在。しかし、英語圏とフランス語圏の違いが交流を制約することもあります。'
  },
  {
    country_a: 'EG',
    country_b: 'MA',
    overall_level: 3,
    overall_description: 'エジプトとモロッコは、アラブ世界の両端に位置する国として、文化的つながりと地政学的協力を行っています。',
    political_military_description: 'アラブ連盟での協力と、アフリカ連合での政策調整。中東・地中海問題で類似の立場を取ることが多いです。',
    economic_description: '観光業、農業、投資の分野で協力。モロッコのリン鉱石とエジプトの産業製品の貿易もあります。',
    cultural_description: 'アラブ・イスラム文化を共有。映画、音楽、文学での文化交流が盛んです。'
  },
  {
    country_a: 'NG',
    country_b: 'CM',
    overall_level: 3,
    overall_description: 'ナイジェリアとカメルーンは、隣国として国境問題を抱えながらも、経済協力と地域安全保障で連携しています。',
    political_military_description: 'バカシ半島の領土問題は国際司法裁判所で解決。現在はボコ・ハラム対策で軍事協力しています。',
    economic_description: '石油・ガス分野での協力。ナイジェリアからカメルーンへの投資も増加しています。',
    cultural_description: '国境地域では同じ民族グループが存在。しかし、英語圏とフランス語圏の違いが課題となることもあります。'
  },
  {
    country_a: 'ET',
    country_b: 'DJ',
    overall_level: 4,
    overall_description: 'エチオピアとジブチは、内陸国エチオピアにとってジブチが唯一の海への出口として、極めて重要な関係にあります。',
    political_military_description: 'エチオピアの安全保障はジブチの港湾アクセスに依存。地域安全保障でも協力しています。',
    economic_description: 'エチオピア貿易の90%以上がジブチ港経由。鉄道建設や港湾開発で大規模投資を行っています。',
    cultural_description: 'ソマリ族、アファル族など共通の民族グループが存在。イスラム教とキリスト教の共存という共通点もあります。'
  }
];

async function addAfricaRelations() {
  console.log('アフリカ諸国間の関係データを追加開始...\n');

  let successCount = 0;
  let errorCount = 0;

  for (const relation of africaRelations) {
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
          data_source: 'Africa Relations Update 2025'
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
  console.log(`スキップ: ${africaRelations.length - successCount - errorCount}件（既存データ）`);
}

addAfricaRelations().catch(console.error);