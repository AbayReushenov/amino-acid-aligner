import React from 'react'
import { Box, Typography, Grid, Paper } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { AlignmentResult } from '@/types/aminoAcid.types'

// Цвета для аминокислот (пример, можно доработать)
const aminoAcidColors: Record<string, string> = {
    A: '#FFD700',
    R: '#0000FF',
    N: '#00FF00',
    D: '#FF0000',
    C: '#FFFF00',
    E: '#FF4500',
    Q: '#00FFFF',
    G: '#808080',
    H: '#800080',
    I: '#008000',
    L: '#32CD32',
    K: '#00008B',
    M: '#8B4513',
    F: '#4B0082',
    P: '#FF69B4',
    S: '#00FA9A',
    T: '#7CFC00',
    W: '#800000',
    Y: '#DA70D6',
    V: '#006400',
    '-': 'transparent',
}

function getAminoColor(aa: string) {
    return aminoAcidColors[aa] || '#eee'
}

// Выделяет отличающиеся символы
function renderSequence(seq: string, refSeq: string) {
    return seq.split('').map((char, idx) => {
        const isDiff = char !== refSeq[idx]
        return (
            <span
                key={idx}
                style={{
                    background: isDiff ? '#ffb3b3' : getAminoColor(char),
                    color: isDiff ? '#b71c1c' : '#222',
                    borderRadius: '3px',
                    padding: '2px 4px',
                    margin: '1px',
                    fontFamily: 'monospace',
                    fontWeight: isDiff ? 700 : 400,
                    border: isDiff ? '1px solid #b71c1c' : 'none',
                    display: 'inline-block',
                }}
            >
                {char}
            </span>
        )
    })
}

const AlignmentResults: React.FC<AlignmentResult> = ({ sequence1, sequence2, stats }) => {
    const { t } = useTranslation()

    return (
        <Box sx={{ maxWidth: 800, margin: '32px auto', p: 2 }}>
            <Paper elevation={2} sx={{ p: 3 }}>
                <Typography variant='h5' align='center' gutterBottom>
                    {t('alignment_results', 'Результаты выравнивания')}
                </Typography>
                <Grid container spacing={2} component='section'>
                    <Paper>
                        <Typography variant='subtitle1' sx={{ mb: 1 }}>
                            {t('sequence1', 'Последовательность 1')}
                        </Typography>
                        <Box sx={{ mb: 2, overflowX: 'auto' }}>{renderSequence(sequence1, sequence2)}</Box>
                    </Paper>
                    <Paper>
                        <Typography variant='subtitle1' sx={{ mb: 1 }}>
                            {t('sequence2', 'Последовательность 2')}
                        </Typography>
                        <Box sx={{ mb: 2, overflowX: 'auto' }}>{renderSequence(sequence2, sequence1)}</Box>
                    </Paper>
                </Grid>
                <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Paper>
                        <Typography>
                            {t('length', 'Длина')}: <b>{stats.length}</b>
                        </Typography>
                    </Paper>
                    <Paper>
                        <Typography>
                            {t('matches', 'Совпадения')}: <b>{stats.matches}</b>
                        </Typography>
                    </Paper>
                    <Paper>
                        <Typography>
                            {t('differences', 'Отличия')}: <b>{stats.differences}</b>
                        </Typography>
                    </Paper>
                    <Paper>
                        <Typography>
                            {t('similarity', 'Сходство')}: <b>{stats.similarity}%</b>
                        </Typography>
                    </Paper>
                </Grid>
            </Paper>
        </Box>
    )
}

export default AlignmentResults
