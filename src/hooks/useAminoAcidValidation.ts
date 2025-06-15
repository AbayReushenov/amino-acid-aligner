import { useCallback } from 'react';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';

import { UseAminoAcidValidationReturn, ValidationResult } from '../types/aminoAcid.types';

const VALID_AMINO_ACIDS = ['A', 'R', 'N', 'D', 'C', 'E', 'Q', 'G', 'H', 'I', 'L', 'K', 'M', 'F', 'P', 'S', 'T', 'W', 'Y', 'V', '-'];

export const useAminoAcidValidation = (): UseAminoAcidValidationReturn & { createValidationSchema: () => z.ZodSchema } => {
  const { t } = useTranslation();

  const validateSequence = useCallback((sequence: string): ValidationResult => {
    const errors: string[] = [];

    if (!sequence || sequence.trim() === '') {
      errors.push(t('validation.required'));
      return { isValid: false, errors };
    }

    const cleanSequence = sequence.trim().toUpperCase();

    if (cleanSequence.length === 0) {
      errors.push(t('validation.tooShort'));
    }

    if (cleanSequence.length > 10000) {
      errors.push(t('validation.tooLong'));
    }

    const invalidChars = cleanSequence
      .split('')
      .filter(char => !VALID_AMINO_ACIDS.includes(char))
      .filter((char, index, arr) => arr.indexOf(char) === index); // уникальные

    if (invalidChars.length > 0) {
      errors.push(t('validation.invalidCharacters', { characters: invalidChars.join(', ') }));
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }, [t]);

  const validateSequenceLength = useCallback((seq1: string, seq2: string): ValidationResult => {
    if (seq1.length !== seq2.length) {
      return {
        isValid: false,
        errors: [t('validation.lengthMismatch', { length1: seq1.length, length2: seq2.length })]
      };
    }

    return { isValid: true, errors: [] };
  }, [t]);

  const validateBoth = useCallback((data: { sequence1: string; sequence2: string }): ValidationResult => {
    const seq1Result = validateSequence(data.sequence1);
    const seq2Result = validateSequence(data.sequence2);
    const lengthResult = validateSequenceLength(data.sequence1, data.sequence2);

    const allErrors = [...seq1Result.errors, ...seq2Result.errors, ...lengthResult.errors];

    return {
      isValid: allErrors.length === 0,
      errors: allErrors
    };
  }, [validateSequence, validateSequenceLength]);

const createValidationSchema = useCallback(() => {
  return z.object({
    sequence1: z.string()
      .min(1, t('validation.required'))
      .max(10000, t('validation.tooLong'))
      .refine((value) => {
        const invalidChars = value.split('').filter(char => !VALID_AMINO_ACIDS.includes(char));
        return invalidChars.length === 0;
      }, {
        message: t('validation.invalidCharacters', { characters: 'invalid characters' })
      }),
    sequence2: z.string()
      .min(1, t('validation.required'))
      .max(10000, t('validation.tooLong'))
      .refine((value) => {
        const invalidChars = value.split('').filter(char => !VALID_AMINO_ACIDS.includes(char));
        return invalidChars.length === 0;
      }, {
        message: t('validation.invalidCharacters', { characters: 'invalid characters' })
      })
  }).superRefine((data, ctx) => {
    // Валидация длины последовательностей с актуальными данными
    if (data.sequence1.length !== data.sequence2.length) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: t('validation.lengthMismatch', {
          length1: data.sequence1.length,
          length2: data.sequence2.length
        }),
        path: ['sequence2']
      });
    }

    // Валидация символов для первой последовательности
    const invalidChars1 = data.sequence1.split('').filter(char => !VALID_AMINO_ACIDS.includes(char));
    if (invalidChars1.length > 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: t('validation.invalidCharacters', {
          characters: [...new Set(invalidChars1)].join(', ')
        }),
        path: ['sequence1']
      });
    }

    // Валидация символов для второй последовательности
    const invalidChars2 = data.sequence2.split('').filter(char => !VALID_AMINO_ACIDS.includes(char));
    if (invalidChars2.length > 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: t('validation.invalidCharacters', {
          characters: [...new Set(invalidChars2)].join(', ')
        }),
        path: ['sequence2']
      });
    }
  });
}, [t]);


  return {
    validateSequence,
    validateSequenceLength,
    validateBoth,
    createValidationSchema
  };
};
