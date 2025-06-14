import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    aminoAcid: {
      colors: {
        [key: string]: string;
      };
      spacing: {
        elementSize: number;
        gap: number;
      };
    };
  }

  interface ThemeOptions {
    aminoAcid?: {
      colors?: {
        [key: string]: string;
      };
      spacing?: {
        elementSize?: number;
        gap?: number;
      };
    };
  }
}
