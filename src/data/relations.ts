import { Relation, RelationLevel } from '../types';

// サンプルデータ - 実際にはより包括的なデータセットが必要
export const relations: Relation[] = [
  // 日本の関係
  {
    fromCountry: 'JP',
    toCountry: 'US',
    level: RelationLevel.VERY_FRIENDLY,
    description: '日本とアメリカは戦後から続く強固な同盟関係にあります。日米安全保障条約により軍事的な協力関係を持ち、経済面でも密接な関係を築いています。両国は民主主義、自由市場経済などの価値観を共有し、アジア太平洋地域の安定に共に取り組んでいます。',
    lastUpdated: '2024-01-01'
  },
  {
    fromCountry: 'JP',
    toCountry: 'CN',
    level: RelationLevel.TENSE,
    description: '日中関係は経済的には密接な関係にありながら、政治的には複雑な側面を持ちます。尖閣諸島（中国名：釣魚島）の領有権問題、歴史認識の相違、台湾問題への立場の違いなどが両国関係に影響を与えています。一方で、中国は日本の最大の貿易相手国であり、経済的な相互依存関係は深いです。',
    lastUpdated: '2024-01-01'
  },
  {
    fromCountry: 'JP',
    toCountry: 'KR',
    level: RelationLevel.NEUTRAL,
    description: '日韓関係は歴史問題（慰安婦問題、徴用工問題など）や竹島（韓国名：独島）の領有権問題により、時に緊張することがあります。しかし、両国は民主主義国家として価値観を共有し、北朝鮮問題への対応など安全保障面での協力も行っています。文化交流は活発で、K-POPや日本のアニメなど相互の文化が人気です。',
    lastUpdated: '2024-01-01'
  },
  {
    fromCountry: 'JP',
    toCountry: 'AU',
    level: RelationLevel.VERY_FRIENDLY,
    description: '日本とオーストラリアは「特別な戦略的パートナーシップ」を結んでいます。両国は民主主義、法の支配、自由貿易などの価値観を共有し、安全保障面でも協力を深めています。経済面では、オーストラリアは日本にとって重要な資源供給国であり、日本はオーストラリアにとって主要な輸出先です。',
    lastUpdated: '2024-01-01'
  },
  
  // アメリカの関係
  {
    fromCountry: 'US',
    toCountry: 'CA',
    level: RelationLevel.VERY_FRIENDLY,
    description: 'アメリカとカナダは世界で最も長い非武装国境を共有し、深い友好関係にあります。USMCA（米国・メキシコ・カナダ協定）により経済的に統合されており、NATO同盟国として安全保障面でも協力しています。文化的にも非常に近く、多くの分野で協力関係にあります。',
    lastUpdated: '2024-01-01'
  },
  {
    fromCountry: 'US',
    toCountry: 'CN',
    level: RelationLevel.TENSE,
    description: '米中関係は「戦略的競争」の関係にあります。貿易摩擦、技術覇権争い、台湾問題、人権問題などで対立していますが、同時に世界最大の二国間貿易関係でもあります。気候変動対策など一部の分野では協力も見られ、競争と協力が併存する複雑な関係です。',
    lastUpdated: '2024-01-01'
  },
  {
    fromCountry: 'US',
    toCountry: 'RU',
    level: RelationLevel.VERY_TENSE,
    description: 'ウクライナ侵攻以降、米露関係は冷戦後最悪の水準にあります。アメリカは対露制裁を主導し、NATOの東方拡大をめぐっても対立しています。核軍縮、サイバーセキュリティ、地域紛争など多くの分野で意見が対立しており、関係改善の見通しは立っていません。',
    lastUpdated: '2024-01-01'
  },
  
  // 中東の関係
  {
    fromCountry: 'SA',
    toCountry: 'IR',
    level: RelationLevel.VERY_TENSE,
    description: 'サウジアラビアとイランは中東における地域覇権を争うライバル関係にあります。スンニ派の盟主を自認するサウジアラビアと、シーア派大国のイランは、宗派対立を背景に、イエメン、シリア、レバノンなどで代理戦争を展開しています。2023年に中国の仲介で国交正常化に合意しましたが、根本的な対立は解消されていません。',
    lastUpdated: '2024-01-01'
  },
  {
    fromCountry: 'IL',
    toCountry: 'PS',
    level: RelationLevel.VERY_TENSE,
    description: 'イスラエルとパレスチナの関係は、1948年のイスラエル建国以来続く中東紛争の中核です。領土、エルサレムの地位、難民の帰還権、入植地問題などで対立が続いています。和平プロセスは停滞しており、ガザ地区を実効支配するハマスとイスラエルの間では定期的に武力衝突が発生しています。',
    lastUpdated: '2024-01-01'
  },
  
  // ヨーロッパの関係
  {
    fromCountry: 'DE',
    toCountry: 'FR',
    level: RelationLevel.VERY_FRIENDLY,
    description: '独仏関係は「ヨーロッパの発動機」と呼ばれ、EU統合の中核を担っています。第二次世界大戦後、歴史的な和解を達成し、現在は政治、経済、文化のあらゆる面で緊密な協力関係にあります。両国の協力はEUの政策決定に大きな影響力を持っています。',
    lastUpdated: '2024-01-01'
  },
  {
    fromCountry: 'GB',
    toCountry: 'EU',
    level: RelationLevel.NEUTRAL,
    description: 'Brexit後の英EU関係は、協力と競争が混在する複雑な関係です。北アイルランド問題、漁業権、金融サービスなどで摩擦が生じていますが、安全保障やウクライナ支援では協力しています。新たな関係の構築に向けて調整が続いています。',
    lastUpdated: '2024-01-01'
  },
  
  // アジアの関係
  {
    fromCountry: 'IN',
    toCountry: 'PK',
    level: RelationLevel.VERY_TENSE,
    description: 'インドとパキスタンは1947年の分離独立以来、カシミール地方の領有権をめぐって対立しています。両国は核保有国であり、これまでに4度の戦争を経験しています。テロ問題、水資源問題なども関係悪化の要因となっており、南アジアの安定にとって最大の懸念事項です。',
    lastUpdated: '2024-01-01'
  },
  {
    fromCountry: 'IN',
    toCountry: 'CN',
    level: RelationLevel.TENSE,
    description: '中印関係は国境問題により緊張しています。両国は3,488kmに及ぶ国境線で領土紛争を抱えており、2020年にはガルワン渓谷で武力衝突が発生しました。経済面では競争関係にありながら、BRICSなどの枠組みでは協力も見られる複雑な関係です。',
    lastUpdated: '2024-01-01'
  }
];

// 関係性を検索する関数
export function getRelation(country1: string, country2: string): Relation | null {
  return relations.find(
    r => (r.fromCountry === country1 && r.toCountry === country2) ||
         (r.fromCountry === country2 && r.toCountry === country1)
  ) || null;
}

// 特定の国の全関係を取得する関数
export function getCountryRelations(countryCode: string): Map<string, RelationLevel> {
  const countryRelations = new Map<string, RelationLevel>();
  
  relations.forEach(relation => {
    if (relation.fromCountry === countryCode) {
      countryRelations.set(relation.toCountry, relation.level);
    } else if (relation.toCountry === countryCode) {
      countryRelations.set(relation.fromCountry, relation.level);
    }
  });
  
  return countryRelations;
}