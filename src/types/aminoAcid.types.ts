// Основные типы аминокислот
export type AminoAcidCode =
  | 'A' | 'R' | 'N' | 'D' | 'C' | 'E' | 'Q' | 'G' | 'H' | 'I'
  | 'L' | 'K' | 'M' | 'F' | 'P' | 'S' | 'T' | 'W' | 'Y' | 'V' | '-';

// Цветовая карта аминокислот
export interface AminoAcidColors {
  [key: string]: string;
}

// Данные формы для последовательностей
export interface SequenceFormData {
  sequence1: string;
  sequence2: string;
}

// Результаты валидации
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

// Статистика выравнивания
export interface AlignmentStats {
  length: number;
  matches: number;
  differences: number;
  similarity: number; // в процентах
}

// Результат выравнивания последовательностей
export interface AlignmentResult {
  sequence1: string;
  sequence2: string;
  stats: AlignmentStats;
  isValid: boolean;
  errors: string[];
}

// Пропсы для компонента аминокислоты
export interface AminoAcidElementProps {
  aminoAcid: AminoAcidCode;
  isHighlighted?: boolean;
  color?: string;
  onClick?: () => void;
}

// Пропсы для отображения последовательности
export interface SequenceDisplayProps {
  sequence: string;
  referenceSequence?: string;
  isDifferenceHighlight?: boolean;
  title: string;
  onAminoAcidClick?: (aminoAcid: AminoAcidCode, index: number) => void;
}

// Пропсы для статистики выравнивания
export interface AlignmentStatsProps {
  stats: AlignmentStats;
}

// Пропсы для формы
export interface AminoAcidFormProps {
  onSubmit: (data: SequenceFormData) => void;
  isLoading?: boolean;
}

// Языковые настройки
export type SupportedLanguage = 'en' | 'ru' | 'fr';

export interface LanguageOption {
  code: SupportedLanguage;
  name: string;
  flag: string;
}

// Уведомления
export interface NotificationMessage {
  message: string;
  severity: 'success' | 'error' | 'warning' | 'info';
  autoHideDuration?: number;
}

// Настройки приложения
export interface AppSettings {
  language: SupportedLanguage;
  theme: 'light' | 'dark' | 'auto';
}

// Состояние приложения
export interface AppState {
  sequences: {
    sequence1: string;
    sequence2: string;
  };
  alignmentResult: AlignmentResult | null;
  isLoading: boolean;
  settings: AppSettings;
}

// Контекст приложения
export interface AppContextType {
  state: AppState;
  updateSequences: (sequences: SequenceFormData) => void;
  setAlignmentResult: (result: AlignmentResult | null) => void;
  setLoading: (loading: boolean) => void;
  updateSettings: (settings: Partial<AppSettings>) => void;
}

// Хук валидации
export interface UseAminoAcidValidationReturn {
  validateSequence: (sequence: string) => ValidationResult;
  validateSequenceLength: (seq1: string, seq2: string) => ValidationResult;
  validateBoth: (data: SequenceFormData) => ValidationResult;
}

// Хук выравнивания
export interface UseSequenceAlignmentReturn {
  alignSequences: (seq1: string, seq2: string) => AlignmentResult;
  calculateStats: (seq1: string, seq2: string) => AlignmentStats;
}

// Хук буфера обмена
export interface UseClipboardReturn {
  copyToClipboard: (text: string) => Promise<boolean>;
  isCopied: boolean;
}

// Опции для рендеринга аминокислот
export interface RenderOptions {
  showColors: boolean;
  highlightDifferences: boolean;
  fontSize: 'small' | 'medium' | 'large';
}

// Конфигурация валидации для React Hook Form
export interface FormValidationConfig {
  required: boolean;
  pattern?: RegExp;
  minLength?: number;
  maxLength?: number;
  custom?: (value: string) => string | boolean;
}

// Схема валидации для Zod
export interface ValidationSchema {
  sequence1: FormValidationConfig;
  sequence2: FormValidationConfig;
}
