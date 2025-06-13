import { useState } from 'react'
import WorldMap from './components/WorldMap'
import type { Country } from './types'
import { RelationLevel } from './types'
import { getRelation, getCountryRelations } from './data/relations'
import './App.css'

function App() {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null)
  const [targetCountry, setTargetCountry] = useState<Country | null>(null)
  const [countryRelations, setCountryRelations] = useState<Map<string, RelationLevel>>(new Map())

  const handleCountrySelect = (country: Country) => {
    console.log('Country selected:', country);
    
    if (!selectedCountry) {
      // 最初の国を選択
      const relations = getCountryRelations(country.code);
      console.log('Country relations:', relations);
      setSelectedCountry(country)
      setCountryRelations(relations)
    } else if (selectedCountry.code === country.code) {
      // 同じ国をクリックした場合はリセット
      handleReset()
    } else {
      // 2番目の国を選択
      setTargetCountry(country)
    }
  }

  const handleReset = () => {
    setSelectedCountry(null)
    setTargetCountry(null)
    setCountryRelations(new Map())
  }

  const getCurrentRelation = () => {
    if (!selectedCountry || !targetCountry) return null
    return getRelation(selectedCountry.code, targetCountry.code)
  }

  const relation = getCurrentRelation()

  return (
    <div className="relative w-full h-screen">
      <WorldMap
        selectedCountry={selectedCountry}
        onCountrySelect={handleCountrySelect}
        relations={countryRelations}
      />
      <div className="absolute top-4 left-4 bottom-4 w-80 bg-white rounded-lg shadow-lg p-4 z-[1000] overflow-y-auto">
        <h1 className="text-2xl font-bold mb-2">World Relations Viewer</h1>
        
        {!selectedCountry ? (
          <p className="text-sm text-gray-600">
            地図上の国をクリックして、国際関係を確認してください
          </p>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {selectedCountry.nameJa || selectedCountry.name}
              </h2>
              <button
                onClick={handleReset}
                className="text-gray-500 hover:text-gray-700 text-xl"
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
                      style={{ backgroundColor: 
                        relation?.level === RelationLevel.VERY_FRIENDLY ? '#10b981' :
                        relation?.level === RelationLevel.FRIENDLY ? '#84cc16' :
                        relation?.level === RelationLevel.NEUTRAL ? '#eab308' :
                        relation?.level === RelationLevel.TENSE ? '#f97316' :
                        relation?.level === RelationLevel.VERY_TENSE ? '#ef4444' :
                        '#9ca3af'
                      }}
                    />
                    <span className="font-medium">
                      {relation?.level === RelationLevel.VERY_FRIENDLY ? '非常に友好的' :
                       relation?.level === RelationLevel.FRIENDLY ? '友好的' :
                       relation?.level === RelationLevel.NEUTRAL ? '中立的' :
                       relation?.level === RelationLevel.TENSE ? 'やや緊張' :
                       relation?.level === RelationLevel.VERY_TENSE ? '緊張関係' :
                       'データなし'}
                    </span>
                  </div>
                </div>
                <div className="text-sm text-gray-700 leading-relaxed">
                  {relation?.description || 'この2国間の関係データはまだ登録されていません。'}
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
        )}
      </div>
    </div>
  )
}

export default App
