import { Box, Paper, Typography, LinearProgress } from '@mui/material';
import { useAppSelector } from '../hooks';
import { selectCompletedCount, selectTotalCount } from '../store/habitSlice';

export default function StatsBar() {
    const completed = useAppSelector(selectCompletedCount);
    const total = useAppSelector(selectTotalCount);
    const pct = total === 0 ? 0 : Math.round((completed / total) * 100);

    return (
        <Paper elevation={0} sx={{
            p: 2.5, mb: 3, borderRadius: 3,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
        }}>
            <Box display="flex" justifyContent="space-between" alignItems="flex-end" mb={1.5}>
                <Box>
                    <Typography variant="caption" sx={{ opacity: 0.8, letterSpacing: 1, fontWeight: 600 }}>
                        PROGRESSO DE HOJE
                    </Typography>
                    <Typography variant="h4" fontWeight={800} lineHeight={1.1}>{pct}%</Typography>
                </Box>
                <Box textAlign="right">
                    <Typography variant="body2" sx={{ opacity: 0.85 }}>{completed} de {total} hábitos</Typography>
                    <Typography variant="caption" sx={{ opacity: 0.65 }}>concluídos hoje</Typography>
                </Box>
            </Box>
            <LinearProgress
                variant="determinate" value={pct}
                sx={{
                    height: 8, borderRadius: 4,
                    backgroundColor: 'rgba(255,255,255,0.25)',
                    '& .MuiLinearProgress-bar': { borderRadius: 4, backgroundColor: 'white' },
                }}
            />
        </Paper>
    );
}