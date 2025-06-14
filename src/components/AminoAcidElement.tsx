import React from 'react';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { AminoAcidElementProps } from '../types/aminoAcid.types';

const AminoAcidElement: React.FC<AminoAcidElementProps> = ({
  aminoAcid,
  isHighlighted = true,
  color,
  onClick
}) => {
  const theme = useTheme();

  const getBackgroundColor = () => {
    if (!isHighlighted) {
      return 'transparent';
    }

    if (color) {
      return color;
    }

    return theme.aminoAcid.colors[aminoAcid] || theme.palette.grey[300];
  };

  const getTextColor = () => {
    const bgColor = getBackgroundColor();

    if (bgColor === 'transparent') {
      return theme.palette.text.primary;
    }

    // Простое определение контрастности
    if (bgColor === '#FFD700' || bgColor === '#FFFF00' || bgColor === '#00FF00' ||
        bgColor === '#00FFFF' || bgColor === '#00FA9A' || bgColor === '#7CFC00') {
      return '#000000';
    }

    return '#FFFFFF';
  };

  const isDashed = aminoAcid === '-' && isHighlighted;

  return (
    <Box
      component="span"
      onClick={onClick}
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: theme.aminoAcid.spacing.elementSize,
        height: theme.aminoAcid.spacing.elementSize,
        backgroundColor: getBackgroundColor(),
        color: getTextColor(),
        border: isDashed ? '1px dashed' : 'none',
        borderColor: isDashed ? theme.palette.text.secondary : 'transparent',
        borderRadius: 1,
        fontFamily: 'monospace',
        fontWeight: 600,
        fontSize: '0.875rem',
        cursor: onClick ? 'pointer' : 'text',
        userSelect: 'text',
        flexShrink: 0,
        transition: theme.transitions.create(['transform', 'box-shadow'], {
          duration: theme.transitions.duration.short,
        }),
        '&:hover': onClick ? {
          transform: 'scale(1.1)',
          boxShadow: theme.shadows[2],
          zIndex: 1
        } : {}
      }}
      title={`${aminoAcid} (${getAminoAcidName(aminoAcid)})`}
    >
      {aminoAcid}
    </Box>
  );
};

// Вспомогательная функция для получения полного названия аминокислоты
const getAminoAcidName = (code: string): string => {
  const names: { [key: string]: string } = {
    'A': 'Alanine', 'R': 'Arginine', 'N': 'Asparagine', 'D': 'Aspartic acid',
    'C': 'Cysteine', 'E': 'Glutamic acid', 'Q': 'Glutamine', 'G': 'Glycine',
    'H': 'Histidine', 'I': 'Isoleucine', 'L': 'Leucine', 'K': 'Lysine',
    'M': 'Methionine', 'F': 'Phenylalanine', 'P': 'Proline', 'S': 'Serine',
    'T': 'Threonine', 'W': 'Tryptophan', 'Y': 'Tyrosine', 'V': 'Valine',
    '-': 'Gap'
  };

  return names[code] || 'Unknown';
};

export default AminoAcidElement;
