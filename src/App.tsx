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
      main: '#668197', // stone-blue-500 - 落ち着いたブルーグレー
      light: '#869eb0', // stone-blue-400
      dark: '#526a7e', // stone-blue-600
    },
    secondary: {
      main: '#7a8565', // sage-500 - 落ち着いたセージグリーン
      light: '#95a082', // sage-400
      dark: '#626b4f', // sage-600
    },
    background: {
      default: '#fafaf9', // warm-gray-50 - とても淡いウォームグレー
      paper: '#f5f5f4', // warm-gray-100 - 紙のような優しい色
    },
    text: {
      primary: '#292524', // warm-gray-800 - 落ち着いたダークグレー
      secondary: '#57534e', // warm-gray-600 - ミディアムグレー
    },
    divider: '#e7e5e4', // warm-gray-200 - 優しい区切り線
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
    h6: {
      fontWeight: 500,
      color: '#292524', // warm-gray-800
    },
    body1: {
      color: '#44403c', // warm-gray-700
      lineHeight: 1.6,
    },
    body2: {
      color: '#57534e', // warm-gray-600
      lineHeight: 1.5,
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#f5f5f4', // warm-gray-100
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.06)', // 優しい影
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // ボタンテキストの大文字化を無効
          borderRadius: '8px', // 丸みを持たせる
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '6px', // 少し角丸に
        },
      },
    },
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
      <Box sx={{ 
        position: 'relative', 
        width: '100%', 
        height: '100vh',
        backgroundColor: 'background.default', // テーマの背景色を適用
        minHeight: '-webkit-fill-available', // iOS Safari対応
        '@supports (-webkit-touch-callout: none)': {
          height: '-webkit-fill-available', // iOS Safari専用
        }
      }}>
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
