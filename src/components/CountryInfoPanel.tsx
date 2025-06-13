import {
  Paper,
  Typography,
  Box,
  IconButton,
  Chip,
  Divider,
  Stack
} from '@mui/material';
import { Close } from '@mui/icons-material';
import type { Country } from '../types';
import { RelationLevel, RelationColors } from '../types';

interface CountryInfoPanelProps {
  selectedCountry: Country | null;
  targetCountry: Country | null;
  relationLevel: RelationLevel;
  relationDescription: string;
  onReset: () => void;
}

export default function CountryInfoPanel({
  selectedCountry,
  targetCountry,
  relationLevel,
  relationDescription,
  onReset
}: CountryInfoPanelProps) {
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

  return (
    <Paper
      elevation={4}
      sx={{
        position: 'absolute',
        top: 16,
        left: 16,
        bottom: 16,
        width: 360,
        zIndex: 3000,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}
    >
      {/* ヘッダー */}
      <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="h4" component="h1" fontWeight="bold">
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
      <Box sx={{ flex: 1, p: 3, overflow: 'auto' }}>
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
              <Typography variant="body2" sx={{ lineHeight: 1.8 }}>
                {relationDescription}
              </Typography>
            </Box>
          </Stack>
        ) : (
          <Typography variant="body2" color="text.secondary">
            他の国をクリックして、2国間の関係を確認してください。
          </Typography>
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
    </Paper>
  );
}