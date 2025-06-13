import type { Country } from '../types';
import { RelationLevel, RelationColors } from '../types';

interface CountryInfoProps {
  selectedCountry: Country | null;
  targetCountry: Country | null;
  relationLevel: RelationLevel;
  relationDescription: string;
  onReset: () => void;
}

export default function CountryInfo({
  selectedCountry,
  targetCountry,
  relationLevel,
  relationDescription,
  onReset
}: CountryInfoProps) {
  if (!selectedCountry) return null;

  const getRelationText = (level: RelationLevel) => {
    switch (level) {
      case RelationLevel.VERY_FRIENDLY:
        return '非常に友好的';
      case RelationLevel.FRIENDLY:
        return '友好的';
      case RelationLevel.NEUTRAL:
        return '中立的';
      case RelationLevel.TENSE:
        return 'やや緊張';
      case RelationLevel.VERY_TENSE:
        return '緊張関係';
      case RelationLevel.UNKNOWN:
        return 'データなし';
    }
  };

  return (
    <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-6 max-w-md z-[1000]">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-bold">
          {selectedCountry.nameJa || selectedCountry.name}
        </h2>
        <button
          onClick={onReset}
          className="text-gray-500 hover:text-gray-700"
          aria-label="閉じる"
        >
          ✕
        </button>
      </div>

      {targetCountry ? (
        <div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">
              {targetCountry.nameJa || targetCountry.name} との関係
            </h3>
            <div className="flex items-center gap-2 mb-3">
              <div
                className="w-4 h-4 rounded"
                style={{ backgroundColor: RelationColors[relationLevel] }}
              />
              <span className="font-medium">{getRelationText(relationLevel)}</span>
            </div>
          </div>
          <div className="text-sm text-gray-700 leading-relaxed">
            {relationDescription}
          </div>
        </div>
      ) : (
        <div className="text-sm text-gray-600">
          他の国をクリックして、2国間の関係を確認してください。
        </div>
      )}

      <div className="mt-4 pt-4 border-t text-xs text-gray-500">
        ※ これは簡略化された見解です。実際の国際関係はより複雑です。
      </div>
    </div>
  );
}