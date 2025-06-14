import React, { useState } from 'react';
import { ThemeProvider, CssBaseline, Container, Typography, Box } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

import AminoAcidForm from './components/AminoAcidForm';
import AlignmentResults from './components/AlignmentResults';
import LanguageSwitcher from './components/LanguageSwitcher';
import { useSequenceAlignment } from './hooks/useSequenceAlignment';
import { SequenceFormData, AlignmentResult } from './types/aminoAcid.types';

// import './i18n/i18n';

import './App.css'

const theme = createTheme({
  palette: {
    primary: {
      main: '#21808d',
    },
    secondary: {
      main: '#5e5240',
    },
  },
  aminoAcid: {
    colors: {
      A: '#FFD700', R: '#0000FF', N: '#00FF00', D: '#FF0000', C: '#FFFF00',
      E: '#FF4500', Q: '#00FFFF', G: '#808080', H: '#800080', I: '#008000',
      L: '#32CD32', K: '#00008B', M: '#8B4513', F: '#4B0082', P: '#FF69B4',
      S: '#00FA9A', T: '#7CFC00', W: '#800000', Y: '#DA70D6', V: '#006400',
      '-': 'transparent'
    },
    spacing: {
      elementSize: 24,
      gap: 1
    }
  }
});

const App: React.FC = () => {
  const { t } = useTranslation();
  const [alignmentResult, setAlignmentResult] = useState<AlignmentResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { alignSequences } = useSequenceAlignment();

  const handleFormSubmit = async (data: SequenceFormData) => {
    setIsLoading(true);
    try {
      // Симуляция задержки для демонстрации загрузки
      await new Promise(resolve => setTimeout(resolve, 500));

      const result = alignSequences(data.sequence1, data.sequence2);
      setAlignmentResult(result);
    } catch (error) {
      console.error('Error during alignment:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ py: 4 }}>
          {/* Заголовок и переключатель языка */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Box>
              <Typography variant="h3" component="h1" gutterBottom color="primary">
                {t('title')}
              </Typography>
              <Typography variant="h6" color="text.secondary">
                {t('subtitle')}
              </Typography>
            </Box>
            <LanguageSwitcher />
          </Box>

          {/* Форма для ввода последовательностей */}
          <AminoAcidForm onSubmit={handleFormSubmit} isLoading={isLoading} />

          {/* Результаты выравнивания */}
          {alignmentResult && (
            <AlignmentResults {...alignmentResult} />
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default App;
