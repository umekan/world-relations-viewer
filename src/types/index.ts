export interface Country {
  code: string;
  name: string;
  nameJa: string;
  capital: string;
  region: string;
  latlng: [number, number];
  description?: string;
}

export interface Relation {
  fromCountry: string;
  toCountry: string;
  level: RelationLevel;
  overallDescription: string;
  politicalMilitaryDescription?: string;
  economicDescription?: string;
  culturalDescription?: string;
  lastUpdated: string;
}

export const RelationLevel = {
  VERY_FRIENDLY: 5,
  FRIENDLY: 4,
  NEUTRAL: 3,
  TENSE: 2,
  VERY_TENSE: 1,
  UNKNOWN: 0
} as const;

export type RelationLevel = typeof RelationLevel[keyof typeof RelationLevel];

export const RelationColors: Record<RelationLevel, string> = {
  [RelationLevel.VERY_FRIENDLY]: '#059669', // emerald-600 - 深い緑（非常に友好的）
  [RelationLevel.FRIENDLY]: '#65a30d',      // lime-600 - 明るい緑（友好的）
  [RelationLevel.NEUTRAL]: '#ca8a04',       // yellow-600 - 黄色（中立）
  [RelationLevel.TENSE]: '#ea580c',         // orange-600 - オレンジ（緊張）
  [RelationLevel.VERY_TENSE]: '#dc2626',    // red-600 - 赤（非常に緊張）
  [RelationLevel.UNKNOWN]: '#6b7280'        // gray-500 - グレー（不明）
};

// 初期状態での国の色分け
export const InitialCountryColors = {
  HAS_DATA: '#2563eb',      // blue-600 - データありの国（鮮やかなブルー）
  NO_DATA: '#e5e7eb',       // gray-200 - データなしの国（明るいグレー）
  SELECTED: '#1d4ed8'       // blue-700 - 選択された国（濃いブルー）
} as const;