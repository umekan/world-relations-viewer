import { useState } from 'react'
import WorldMap from './components/WorldMap'
import CountryInfo from './components/CountryInfo'
import type { Country } from './types'
import { RelationLevel } from './types'
import { getRelation, getCountryRelations } from './data/relations'
import './App.css'

function App() {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null)
  const [targetCountry, setTargetCountry] = useState<Country | null>(null)
  const [countryRelations, setCountryRelations] = useState<Map<string, RelationLevel>>(new Map())

  const handleCountrySelect = (country: Country) => {
    if (!selectedCountry) {
      // 最初の国を選択
      setSelectedCountry(country)
      setCountryRelations(getCountryRelations(country.code))
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
      <CountryInfo
        selectedCountry={selectedCountry}
        targetCountry={targetCountry}
        relationLevel={relation?.level || RelationLevel.UNKNOWN}
        relationDescription={relation?.description || 'この2国間の関係データはまだ登録されていません。'}
        onReset={handleReset}
      />
      <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-4 z-[1000]">
        <h1 className="text-2xl font-bold mb-2">World Relations Viewer</h1>
        <p className="text-sm text-gray-600">
          地図上の国をクリックして、国際関係を確認してください
        </p>
      </div>
    </div>
  )
}

export default App
