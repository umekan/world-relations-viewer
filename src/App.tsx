import { useState, useEffect } from 'react'
import { ThemeProvider, createTheme, CssBaseline, Box } from '@mui/material'
import WorldMap from './components/WorldMap'
import CountryInfoPanel from './components/CountryInfoPanel'
import type { Country } from './types'
import { RelationLevel } from './types'
import { DataService } from './services/dataService'
import './App.css'

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: [
      'system-ui',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      'sans-serif'
    ].join(','),
  },
});

function App() {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null)
  const [targetCountry, setTargetCountry] = useState<Country | null>(null)
  const [countryRelations, setCountryRelations] = useState<Map<string, RelationLevel>>(new Map())

  const handleCountrySelect = async (country: Country) => {
    console.log('Country selected:', country);
    
    if (!selectedCountry) {
      // 最初の国を選択
      const relations = await DataService.getCountryRelations(country.code);
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

  const [currentRelation, setCurrentRelation] = useState<any>(null)

  useEffect(() => {
    const getCurrentRelation = async () => {
      if (!selectedCountry || !targetCountry) {
        setCurrentRelation(null)
        return
      }
      const relation = await DataService.getRelation(selectedCountry.code, targetCountry.code)
      setCurrentRelation(relation)
    }
    getCurrentRelation()
  }, [selectedCountry, targetCountry])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ position: 'relative', width: '100%', height: '100vh' }}>
        <WorldMap
          selectedCountry={selectedCountry}
          onCountrySelect={handleCountrySelect}
          relations={countryRelations}
        />
        <CountryInfoPanel
          selectedCountry={selectedCountry}
          targetCountry={targetCountry}
          relationLevel={currentRelation?.level || RelationLevel.UNKNOWN}
          relationDescription={currentRelation?.overallDescription || 'この2国間の関係データはまだ登録されていません。'}
          politicalMilitaryDescription={currentRelation?.politicalMilitaryDescription}
          economicDescription={currentRelation?.economicDescription}
          culturalDescription={currentRelation?.culturalDescription}
          onReset={handleReset}
        />
      </Box>
    </ThemeProvider>
  )
}

export default App
