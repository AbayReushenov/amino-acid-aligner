import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

import { SequenceDisplayProps, AminoAcidCode } from '../types/aminoAcid.types';
import { useClipboard } from '../hooks/useClipboard';
import AminoAcidElement from './AminoAcidElement';

const SequenceDisplay: React.FC<SequenceDisplayProps> = ({
  sequence,
  referenceSequence,
  isDifferenceHighlight = false,
  title,
  onAminoAcidClick
}) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { copyToClipboard } = useClipboard();

  const handleSelection = () => {
    const selection = window.getSelection();
    const selectedText = selection?.toString().replace(/\s+/g, '');

    if (selectedText && selectedText.length > 0) {
      copyToClipboard(selectedText);
    }
  };

  const renderAminoAcids = () => {
    return sequence.split('').map((aminoAcid, index) => {
      const isDifferent = isDifferenceHighlight &&
                         referenceSequence &&
                         aminoAcid !== referenceSequence[index];

      return (
        <AminoAcidElement
          key={index}
          aminoAcid={aminoAcid as AminoAcidCode}
          isHighlighted={!isDifferenceHighlight || isDifferent || false}
          onClick={() => onAminoAcidClick?.(aminoAcid as AminoAcidCode, index)}
        />
      );
    });
  };

  return (
    <Paper
      elevation={1}
      sx={{
        p: 2,
        mb: 2,
        border: `1px solid ${theme.palette.divider}`
      }}
    >
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: theme.aminoAcid.spacing.gap,
          userSelect: 'text',
          cursor: 'text',
          minHeight: theme.aminoAcid.spacing.elementSize + 8,
          p: 1,
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 1,
          bgcolor: theme.palette.background.paper
        }}
        onMouseUp={handleSelection}
        title={t('copy.instruction')}
      >
        {sequence.length > 0 ? renderAminoAcids() : (
          <Typography variant="body2" color="text.secondary">
            {t('form.noSequence', 'No sequence to display')}
          </Typography>
        )}
      </Box>
    </Paper>
  );
};

export default SequenceDisplay;
