export interface Country {
  code: string;
  name: string;
  nameJa: string;
  capital: string;
  region: string;
  latlng: [number, number];
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
  [RelationLevel.VERY_FRIENDLY]: '#10b981', // emerald-500
  [RelationLevel.FRIENDLY]: '#84cc16',      // lime-500
  [RelationLevel.NEUTRAL]: '#eab308',       // yellow-500
  [RelationLevel.TENSE]: '#f97316',         // orange-500
  [RelationLevel.VERY_TENSE]: '#ef4444',    // red-500
  [RelationLevel.UNKNOWN]: '#9ca3af'        // gray-400
};

// 初期状態での国の色分け
export const InitialCountryColors = {
  HAS_DATA: '#3b82f6',      // blue-500 - データありの国
  NO_DATA: '#d1d5db',       // gray-300 - データなしの国
  SELECTED: '#1f2937'       // gray-800 - 選択された国
} as const;