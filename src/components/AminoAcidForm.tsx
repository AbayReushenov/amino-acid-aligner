import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
// import { z } from 'zod';
import { TextField, Button, Paper, Grid, Typography, Box, Chip, Alert } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { LoadingButton } from '@mui/lab'

import { SequenceFormData, AminoAcidFormProps } from '../types/aminoAcid.types'
import { useAminoAcidValidation } from '../hooks/useAminoAcidValidation'

const AminoAcidForm: React.FC<AminoAcidFormProps> = ({ onSubmit, isLoading = false }) => {
    const { t } = useTranslation()
    const { createValidationSchema } = useAminoAcidValidation()

    const schema = createValidationSchema()

    const {
        control,
        handleSubmit,
        setValue,
        reset,
        watch,
        formState: { errors, isValid },
    } = useForm<SequenceFormData>({
        resolver: zodResolver(schema),
        mode: 'onChange',
        defaultValues: {
            sequence1: '',
            sequence2: '',
        },
    })

    const watchedValues = watch()

    // Автоматическое преобразование в верхний регистр
    const handleInputChange = (value: string, field: keyof SequenceFormData) => {
        const upperCaseValue = value.toUpperCase().replace(/\s+/g, '')
        setValue(field, upperCaseValue, { shouldValidate: true })
    }

    // Пример последовательности
    const exampleSequence =
        'VLSPADKTNIKASWEKIGSHGGEYGAEALERTFLCFPTTKTYFPHFDLSHGSAQVKAHGKKVADALTNAVGHLDDLPGALSALSDLHAYKLRVDPVNFKLLSHCLLVTLASHHPAEFT'

    const handleExampleClick = () => {
        setValue('sequence1', exampleSequence, { shouldValidate: true })
        setValue('sequence2', exampleSequence, { shouldValidate: true })
    }

    const handleClear = () => {
        reset()
    }

    return (
        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
            <Typography variant='h5' gutterBottom>
                {t('form.title', 'Enter Sequences')}
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={3}>
                    {/* Первая последовательность */}
                    <Paper>
                        <Controller
                            name='sequence1'
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label={t('form.sequence1.label')}
                                    placeholder={t('form.sequence1.placeholder')}
                                    helperText={errors.sequence1?.message || t('form.sequence1.helper')}
                                    error={!!errors.sequence1}
                                    multiline
                                    rows={4}
                                    fullWidth
                                    onChange={(e) => handleInputChange(e.target.value, 'sequence1')}
                                    sx={{
                                        '& .MuiInputBase-root': {
                                            fontFamily: 'monospace',
                                        },
                                    }}
                                />
                            )}
                        />
                    </Paper>

                    {/* Вторая последовательность */}
                    <Paper>
                        <Controller
                            name='sequence2'
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label={t('form.sequence2.label')}
                                    placeholder={t('form.sequence2.placeholder')}
                                    helperText={errors.sequence2?.message || t('form.sequence2.helper')}
                                    error={!!errors.sequence2}
                                    multiline
                                    rows={4}
                                    fullWidth
                                    onChange={(e) => handleInputChange(e.target.value, 'sequence2')}
                                    sx={{
                                        '& .MuiInputBase-root': {
                                            fontFamily: 'monospace',
                                        },
                                    }}
                                />
                            )}
                        />
                    </Paper>

                    {/* Информация о длине */}
                    <Paper>
                        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                            <Chip
                                label={`${t('form.length')} 1: ${watchedValues.sequence1.length}`}
                                color={watchedValues.sequence1.length > 0 ? 'primary' : 'default'}
                                size='small'
                            />
                            <Chip
                                label={`${t('form.length')} 2: ${watchedValues.sequence2.length}`}
                                color={watchedValues.sequence2.length > 0 ? 'primary' : 'default'}
                                size='small'
                            />
                            {watchedValues.sequence1.length !== watchedValues.sequence2.length &&
                                watchedValues.sequence1.length > 0 &&
                                watchedValues.sequence2.length > 0 && (
                                    <Chip
                                        label={t('validation.lengthMismatch', {
                                            length1: watchedValues.sequence1.length,
                                            length2: watchedValues.sequence2.length,
                                        })}
                                        color='error'
                                        size='small'
                                    />
                                )}
                        </Box>
                    </Paper>

                    {/* Кнопки */}
                    <Paper>
                        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                            <LoadingButton
                                type='submit'
                                variant='contained'
                                loading={isLoading}
                                disabled={!isValid}
                                loadingPosition='start'
                                startIcon={<span>🧬</span>}
                            >
                                {t('form.submit')}
                            </LoadingButton>

                            <Button variant='outlined' onClick={handleExampleClick} disabled={isLoading}>
                                {t('form.example')}
                            </Button>

                            <Button variant='text' onClick={handleClear} disabled={isLoading}>
                                {t('form.clear')}
                            </Button>
                        </Box>
                    </Paper>

                    {/* Пример последовательности */}
                    <Paper>
                        <Alert severity='info' sx={{ mt: 2 }}>
                            <Typography variant='body2' gutterBottom>
                                {t('example.description')}
                            </Typography>
                            <Box
                                component='code'
                                sx={{
                                    display: 'block',
                                    p: 1,
                                    bgcolor: 'grey.100',
                                    borderRadius: 1,
                                    fontFamily: 'monospace',
                                    fontSize: '0.875rem',
                                    wordBreak: 'break-all',
                                    cursor: 'pointer',
                                    '&:hover': {
                                        bgcolor: 'grey.200',
                                    },
                                }}
                                onClick={handleExampleClick}
                                title={t('example.clickToCopy')}
                            >
                                {exampleSequence}
                            </Box>
                        </Alert>
                    </Paper>
                </Grid>
            </form>
        </Paper>
    )
}

export default AminoAcidForm
