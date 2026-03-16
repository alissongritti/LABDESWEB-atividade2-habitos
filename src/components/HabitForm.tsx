import { useState } from 'react';
import {
    Box, TextField, Button, MenuItem,
    Select, FormControl, InputLabel,
    Paper, Typography,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useAppDispatch } from '../hooks';
import { addHabit } from '../store/habitSlice';
import type { Category } from '../types/habit';

const categories: Exclude<Category, 'todas'>[] = ['saúde', 'estudo', 'lazer', 'produtividade', 'outros'];

const categoryLabels: Record<string, string> = {
    saúde: '💪 Saúde',
    estudo: '📚 Estudo',
    lazer: '🎮 Lazer',
    produtividade: '⚡ Produtividade',
    outros: '✨ Outros',
};

export default function HabitForm() {
    const dispatch = useAppDispatch();
    const [name, setName] = useState('');
    const [category, setCategory] = useState<Exclude<Category, 'todas'>>('saúde');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) {
            setError('O nome do hábito é obrigatório.');
            return;
        }
        dispatch(addHabit({ name: name.trim(), category }));
        setName('');
        setCategory('saúde');
        setError('');
    };

    return (
        <Paper elevation={0} sx={{ p: 3, mb: 3, borderRadius: 3, border: '1px solid', borderColor: 'divider', background: 'linear-gradient(135deg, #f8f9ff 0%, #ffffff 100%)' }}>
            <Typography variant="h6" fontWeight={700} mb={2} color="primary">
                ➕ Novo Hábito
            </Typography>
            <Box component="form" onSubmit={handleSubmit} display="flex" gap={2} flexWrap="wrap">
                <TextField
                    label="Nome do hábito *"
                    value={name}
                    onChange={(e) => { setName(e.target.value); setError(''); }}
                    error={!!error}
                    helperText={error}
                    size="small"
                    sx={{ flex: '1 1 220px' }}
                    placeholder="Ex: Beber 2L de água..."
                />
                <FormControl size="small" sx={{ flex: '0 1 180px' }}>
                    <InputLabel>Categoria</InputLabel>
                    <Select
                        value={category}
                        label="Categoria"
                        onChange={(e: SelectChangeEvent) => setCategory(e.target.value as Exclude<Category, 'todas'>)}
                    >
                        {categories.map((cat) => (
                            <MenuItem key={cat} value={cat}>{categoryLabels[cat]}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button
                    type="submit"
                    variant="contained"
                    startIcon={<AddIcon />}
                    sx={{
                        borderRadius: 2, px: 3, fontWeight: 700,
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        '&:hover': { background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)' },
                    }}
                >
                    Adicionar
                </Button>
            </Box>
        </Paper>
    );
}