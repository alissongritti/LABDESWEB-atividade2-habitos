import { Box, Button, Typography } from '@mui/material';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import { useAppDispatch, useAppSelector } from '../hooks';
import { setFilter, clearCompleted, selectFilter, selectCompletedCount } from '../store/habitSlice';
import type { Category } from '../types/habit';

const filters: { value: Category; label: string }[] = [
    { value: 'todas', label: '🌟 Todas' },
    { value: 'saúde', label: '💪 Saúde' },
    { value: 'estudo', label: '📚 Estudo' },
    { value: 'lazer', label: '🎮 Lazer' },
    { value: 'produtividade', label: '⚡ Produtividade' },
    { value: 'outros', label: '✨ Outros' },
];

export default function FilterBar() {
    const dispatch = useAppDispatch();
    const currentFilter = useAppSelector(selectFilter);
    const completedCount = useAppSelector(selectCompletedCount);

    return (
        <Box mb={2}>
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={1.5} flexWrap="wrap" gap={1}>
                <Typography variant="subtitle2" color="text.secondary" fontWeight={600} letterSpacing={0.5}>
                    FILTRAR POR CATEGORIA
                </Typography>
                {completedCount > 0 && (
                    <Button
                        size="small" variant="outlined" color="error"
                        startIcon={<DeleteSweepIcon />}
                        onClick={() => dispatch(clearCompleted())}
                        sx={{ borderRadius: 2, fontWeight: 700, fontSize: '0.75rem' }}
                    >
                        Limpar concluídos ({completedCount})
                    </Button>
                )}
            </Box>
            <Box display="flex" gap={1} flexWrap="wrap">
                {filters.map((f) => (
                    <Button
                        key={f.value}
                        size="small"
                        variant={currentFilter === f.value ? 'contained' : 'outlined'}
                        onClick={() => dispatch(setFilter(f.value))}
                        sx={{
                            borderRadius: 2,
                            fontWeight: currentFilter === f.value ? 700 : 500,
                            fontSize: '0.78rem', px: 1.5,
                            background: currentFilter === f.value ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'transparent',
                            borderColor: currentFilter === f.value ? 'transparent' : 'divider',
                            color: currentFilter === f.value ? 'white' : 'text.secondary',
                            '&:hover': {
                                background: currentFilter === f.value ? 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)' : '#f5f5f5',
                            },
                        }}
                    >
                        {f.label}
                    </Button>
                ))}
            </Box>
        </Box>
    );
}