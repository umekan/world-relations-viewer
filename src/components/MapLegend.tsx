import { Paper, Typography, Box, Stack } from '@mui/material';
import { InitialCountryColors, RelationColors, RelationLevel } from '../types';

interface MapLegendProps {
  showRelationColors: boolean;
}

export default function MapLegend({ showRelationColors }: MapLegendProps) {
  const LegendItem = ({ color, label }: { color: string; label: string }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Box
        sx={{
          width: 16,
          height: 16,
          backgroundColor: color,
          border: '1px solid #e5e7eb',
          borderRadius: 0.5
        }}
      />
      <Typography variant="body2" sx={{ fontSize: '0.75rem' }}>
        {label}
      </Typography>
    </Box>
  );

  return (
    <Paper
      elevation={2}
      sx={{
        position: 'absolute',
        bottom: 16,
        right: 16,
        p: 2,
        zIndex: 1000,
        minWidth: 180
      }}
    >
      <Typography variant="subtitle2" gutterBottom sx={{ fontSize: '0.875rem', fontWeight: 600 }}>
        {showRelationColors ? '関係性レベル' : '初期状態'}
      </Typography>
      
      <Stack spacing={1}>
        {showRelationColors ? (
          <>
            <LegendItem color={RelationColors[RelationLevel.VERY_FRIENDLY]} label="非常に友好的" />
            <LegendItem color={RelationColors[RelationLevel.FRIENDLY]} label="友好的" />
            <LegendItem color={RelationColors[RelationLevel.NEUTRAL]} label="中立" />
            <LegendItem color={RelationColors[RelationLevel.TENSE]} label="緊張" />
            <LegendItem color={RelationColors[RelationLevel.VERY_TENSE]} label="非常に緊張" />
            <LegendItem color={RelationColors[RelationLevel.UNKNOWN]} label="データなし" />
          </>
        ) : (
          <>
            <LegendItem color={InitialCountryColors.HAS_DATA} label="関係性データあり" />
            <LegendItem color={InitialCountryColors.NO_DATA} label="データなし" />
          </>
        )}
      </Stack>
    </Paper>
  );
}