import { useCallback, useMemo } from "react";
import { AlignmentStats, AlignmentResult } from '@/types/aminoAcid.types';

// Цветовая схема аминокислот (из исходного app.js)
const aminoAcidColors: Record<string, string> = {
  A: "#FFD700", // Золотой
  R: "#0000FF", // Синий
  N: "#00FF00", // Зеленый
  D: "#FF0000", // Красный
  C: "#FFFF00", // Желтый
  E: "#FF4500", // Оранжево-красный
  Q: "#00FFFF", // Циан
  G: "#808080", // Серый
  H: "#800080", // Фиолетовый
  I: "#008000", // Темно-зеленый
  L: "#32CD32", // Лаймовый
  K: "#00008B", // Темно-синий
  M: "#8B4513", // Коричневый
  F: "#4B0082", // Индиго
  P: "#FF69B4", // Розовый
  S: "#00FA9A", // Мятный
  T: "#7CFC00", // Лаймово-зеленый
  W: "#800000", // Бордовый
  Y: "#DA70D6", // Орхидея
  V: "#006400", // Темно-зеленый
  "-": "transparent", // Пропуск
};

// Валидные аминокислоты
const validAminoAcids = Object.keys(aminoAcidColors);

export function useSequenceAlignment() {
  // Валидация одной последовательности
  const validateSequence = useCallback((sequence: string): string[] => {
    const errors: string[] = [];

    if (!sequence || sequence.trim() === "") {
      errors.push("Последовательность не может быть пустой");
      return errors;
    }

    const cleanSequence = sequence.trim().toUpperCase().replace(/\s/g, "");
    const invalidChars: string[] = [];

    for (const char of cleanSequence) {
      if (!validAminoAcids.includes(char) && !invalidChars.includes(char)) {
        invalidChars.push(char);
      }
    }

    if (invalidChars.length > 0) {
      errors.push(
        `Недопустимые символы: ${invalidChars.join(", ")}. ` +
        `Допустимые символы: ${validAminoAcids.join(", ")}`
      );
    }

    return errors;
  }, []);

  // Очистка и подготовка последовательности
  const cleanSequence = useCallback((sequence: string): string => {
    return sequence.trim().toUpperCase().replace(/\s/g, "");
  }, []);

  // Расчет статистики выравнивания
  const calculateStats = useCallback((seq1: string, seq2: string): AlignmentStats => {
    if (seq1.length !== seq2.length) {
      return {
        length: Math.max(seq1.length, seq2.length),
        matches: 0,
        differences: Math.max(seq1.length, seq2.length),
        similarity: 0,
      };
    }

    const matches = seq1
      .split("")
      .filter((char, index) => char === seq2[index]).length;

    const differences = seq1.length - matches;
    const similarity = seq1.length > 0 ? Math.round((matches / seq1.length) * 100) : 0;

    return {
      length: seq1.length,
      matches,
      differences,
      similarity,
    };
  }, []);

  // Преобразование HEX в RGB для контрастности текста
  const hexToRgb = useCallback((hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  }, []);

  // Получение цвета аминокислоты
  const getAminoAcidColor = useCallback((aminoAcid: string) => {
    return aminoAcidColors[aminoAcid] || "#cccccc";
  }, []);

  // Определение цвета текста на основе яркости фона
  const getTextColor = useCallback(
    (backgroundColor: string): string => {
      if (backgroundColor === "transparent") return "var(--color-text)";

      const rgb = hexToRgb(backgroundColor);
      if (!rgb) return "#000000";

      const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
      return brightness > 128 ? "#000000" : "#ffffff";
    },
    [hexToRgb]
  );

  // Основная функция выравнивания
  const alignSequences = useCallback(
    (sequence1: string, sequence2: string): AlignmentResult => {
      const errors: string[] = [];

      // Валидация входных последовательностей
      const seq1Errors = validateSequence(sequence1);
      const seq2Errors = validateSequence(sequence2);

      errors.push(...seq1Errors, ...seq2Errors);

      // Очистка последовательностей
      const cleanSeq1 = cleanSequence(sequence1);
      const cleanSeq2 = cleanSequence(sequence2);

      // Проверка длины последовательностей
      if (cleanSeq1.length !== cleanSeq2.length && errors.length === 0) {
        errors.push(
          `Последовательности должны иметь одинаковую длину. ` +
          `Последовательность 1: ${cleanSeq1.length} символов, ` +
          `Последовательность 2: ${cleanSeq2.length} символов`
        );
      }

      // Расчет статистики
      const stats = calculateStats(cleanSeq1, cleanSeq2);

      return {
        sequence1: cleanSeq1,
        sequence2: cleanSeq2,
        stats,
        isValid: errors.length === 0,
        errors,
      };
    },
    [validateSequence, cleanSequence, calculateStats]
  );

  // Мемоизированные цвета аминокислот
  const aminoAcidColorMap = useMemo(() => aminoAcidColors, []);

  // Мемоизированный список валидных аминокислот
  const validAminoAcidsList = useMemo(() => validAminoAcids, []);

  return {
    alignSequences,
    validateSequence,
    cleanSequence,
    calculateStats,
    getAminoAcidColor,
    getTextColor,
    aminoAcidColorMap,
    validAminoAcidsList,
  };
}

export default useSequenceAlignment;
