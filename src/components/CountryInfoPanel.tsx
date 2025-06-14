import {
  Paper,
  Typography,
  Box,
  IconButton,
  Chip,
  Divider,
  Stack,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { Close } from '@mui/icons-material';
import type { Country } from '../types';
import { RelationLevel, RelationColors } from '../types';

interface CountryInfoPanelProps {
  selectedCountry: Country | null;
  targetCountry: Country | null;
  relationLevel: RelationLevel;
  relationDescription: string;
  politicalMilitaryDescription?: string;
  economicDescription?: string;
  culturalDescription?: string;
  onReset: () => void;
}

export default function CountryInfoPanel({
  selectedCountry,
  targetCountry,
  relationLevel,
  relationDescription,
  politicalMilitaryDescription,
  economicDescription,
  culturalDescription,
  onReset
}: CountryInfoPanelProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));

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

  const getRelationColor = (level: RelationLevel) => {
    return RelationColors[level] || '#9ca3af';
  };

  // 共通のコンテンツコンポーネント
  const PanelContent = () => (
    <>
      {/* ヘッダー */}
      <Box sx={{ p: isMobile ? 2 : 3, borderBottom: 1, borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant={isMobile ? "h5" : "h4"} component="h1" fontWeight="bold">
            World Relations Viewer
          </Typography>
          {selectedCountry && (
            <IconButton onClick={onReset} size="small">
              <Close />
            </IconButton>
          )}
        </Box>
        
        {selectedCountry && (
          <Typography variant="h6" component="h2" color="primary">
            {selectedCountry.nameJa || selectedCountry.name}
          </Typography>
        )}
      </Box>

      {/* コンテンツ */}
      <Box sx={{ 
        flex: 1, 
        p: isMobile ? 2 : 3, 
        overflow: 'auto',
        minHeight: 0 // フレックスボックス内でのスクロール確保
      }}>
        {!selectedCountry ? (
          <Typography variant="body2" color="text.secondary">
            地図上の国をクリックして、国際関係を確認してください
          </Typography>
        ) : targetCountry ? (
          <Stack spacing={3}>
            <Box>
              <Typography variant="h6" gutterBottom>
                {targetCountry.nameJa || targetCountry.name} との関係
              </Typography>
              
              <Chip
                label={getRelationText(relationLevel)}
                sx={{
                  backgroundColor: getRelationColor(relationLevel),
                  color: 'white',
                  fontWeight: 'medium'
                }}
              />
            </Box>

            <Box>
              <Typography variant="body2" sx={{ lineHeight: 1.8, mb: 2 }}>
                {relationDescription}
              </Typography>
            </Box>

            {(politicalMilitaryDescription || economicDescription || culturalDescription) && (
              <>
                <Divider />
                <Box>
                  <Typography variant="h6" gutterBottom sx={{ fontSize: '1rem' }}>
                    分野別詳細
                  </Typography>
                  
                  {politicalMilitaryDescription && (
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" color="primary" gutterBottom>
                        🛡️ 政治・軍事
                      </Typography>
                      <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                        {politicalMilitaryDescription}
                      </Typography>
                    </Box>
                  )}
                  
                  {economicDescription && (
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" color="primary" gutterBottom>
                        💰 経済・貿易
                      </Typography>
                      <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                        {economicDescription}
                      </Typography>
                    </Box>
                  )}
                  
                  {culturalDescription && (
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" color="primary" gutterBottom>
                        🎭 文化・社会
                      </Typography>
                      <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                        {culturalDescription}
                      </Typography>
                    </Box>
                  )}
                </Box>
              </>
            )}
          </Stack>
        ) : (
          <Stack spacing={2}>
            {/* 国の基本情報 */}
            <Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                首都: {selectedCountry.capital || 'データなし'}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                地域: {selectedCountry.region || 'データなし'}
              </Typography>
            </Box>

            {/* 国の説明 */}
            {selectedCountry.description && (
              <>
                <Divider />
                <Box>
                  <Typography variant="h6" gutterBottom sx={{ fontSize: '1rem' }}>
                    国の概要
                  </Typography>
                  <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                    {selectedCountry.description}
                  </Typography>
                </Box>
              </>
            )}

            {/* 操作案内 */}
            <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
              <Typography variant="body2" color="text.secondary" align="center">
                他の国をクリックして、2国間の関係を確認してください。
              </Typography>
            </Box>
          </Stack>
        )}
      </Box>

      {/* フッター */}
      {selectedCountry && (
        <>
          <Divider />
          <Box sx={{ p: 2, bgcolor: 'grey.50' }}>
            <Typography variant="caption" color="text.secondary" align="center">
              ※ これは簡略化された見解です。<br />
              実際の国際関係はより複雑です。
            </Typography>
          </Box>
        </>
      )}
    </>
  );

  // モバイル表示：固定位置のコンパクトパネル
  if (isMobile) {
    return (
      <Paper
        elevation={4}
        sx={{
          position: 'absolute',
          bottom: 16,
          left: 8,
          right: 8,
          maxHeight: selectedCountry && targetCountry ? '60vh' : '20vh',
          zIndex: 1400, // 地図より上、でもモーダルより下
          display: selectedCountry ? 'flex' : 'none',
          flexDirection: 'column',
          borderRadius: 2,
          overflow: 'hidden'
        }}
      >
        <PanelContent />
      </Paper>
    );
  }

  // PC/タブレット表示：左パネル
  return (
    <Paper
      elevation={4}
      sx={{
        position: 'absolute',
        top: 16,
        left: 16,
        bottom: 16,
        width: isTablet ? 320 : 360,
        zIndex: 3000,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}
    >
      <PanelContent />
    </Paper>
  );
}