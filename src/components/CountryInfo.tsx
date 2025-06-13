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
    <>
      {/* オーバーレイ */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-[1999] transition-opacity duration-300 ${
          selectedCountry ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onReset}
      />
      
      {/* サイドドロワー */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[2000] transform transition-transform duration-300 ease-in-out ${
        selectedCountry ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="h-full flex flex-col">
          {/* ヘッダー */}
          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="text-xl font-bold">
              {selectedCountry?.nameJa || selectedCountry?.name}
            </h2>
            <button
              onClick={onReset}
              className="text-gray-500 hover:text-gray-700 text-2xl"
              aria-label="閉じる"
            >
              ✕
            </button>
          </div>

          {/* コンテンツ */}
          <div className="flex-1 p-6 overflow-y-auto">
            {targetCountry ? (
              <div>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">
                    {targetCountry.nameJa || targetCountry.name} との関係
                  </h3>
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-5 h-5 rounded"
                      style={{ backgroundColor: RelationColors[relationLevel] }}
                    />
                    <span className="font-medium text-lg">{getRelationText(relationLevel)}</span>
                  </div>
                </div>
                <div className="text-sm text-gray-700 leading-relaxed space-y-3">
                  {relationDescription.split('。').filter(sentence => sentence.trim()).map((sentence, index) => (
                    <p key={index} className="text-justify">
                      {sentence.trim() + '。'}
                    </p>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-gray-600 text-sm">
                  他の国をクリックして、<br />
                  2国間の関係を確認してください。
                </p>
              </div>
            )}
          </div>

          {/* フッター */}
          <div className="p-6 border-t bg-gray-50">
            <p className="text-xs text-gray-500 text-center">
              ※ これは簡略化された見解です。<br />
              実際の国際関係はより複雑です。
            </p>
          </div>
        </div>
      </div>
    </>
  );
}