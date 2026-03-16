import { useState } from 'react';
import {
    Box, Checkbox, IconButton, Typography, Chip,
    TextField, Select, MenuItem, FormControl, Tooltip, Fade,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useAppDispatch } from '../hooks';
import { editHabit, deleteHabit, toggleHabit } from '../store/habitSlice';
import type { Habit, Category } from '../types/habit';

interface Props {
    habit: Habit;
}

const categories: Exclude<Category, 'todas'>[] = ['saúde', 'estudo', 'lazer', 'produtividade', 'outros'];

const categoryConfig: Record<string, { label: string; color: string; bg: string }> = {
    saúde: { label: '💪 Saúde', color: '#2e7d32', bg: '#e8f5e9' },
    estudo: { label: '📚 Estudo', color: '#1565c0', bg: '#e3f2fd' },
    lazer: { label: '🎮 Lazer', color: '#e65100', bg: '#fff3e0' },
    produtividade: { label: '⚡ Produtividade', color: '#6a1b9a', bg: '#f3e5f5' },
    outros: { label: '✨ Outros', color: '#37474f', bg: '#eceff1' },
};

import React from 'react';

const HabitItem: React.FC<Props> = ({ habit }) => {
    const dispatch = useAppDispatch();
    const [editing, setEditing] = useState(false);
    const [editName, setEditName] = useState(habit.name);
    const [editCategory, setEditCategory] = useState<Exclude<Category, 'todas'>>(habit.category);

    const handleSave = () => {
        if (editName.trim()) {
            dispatch(editHabit({ id: habit.id, name: editName.trim(), category: editCategory }));
            setEditing(false);
        }
    };

    const handleCancel = () => {
        setEditName(habit.name);
        setEditCategory(habit.category);
        setEditing(false);
    };

    const cfg = categoryConfig[habit.category];

    return (
        <Fade in timeout={300}>
            <Box sx={{
                display: 'flex', alignItems: 'center', gap: 1.5,
                p: 2, mb: 1.5, borderRadius: 3, border: '1px solid',
                borderColor: habit.completed ? 'success.light' : 'divider',
                background: habit.completed ? 'linear-gradient(135deg, #f0fff4 0%, #e8f5e9 100%)' : 'white',
                opacity: habit.completed ? 0.8 : 1,
                transition: 'all 0.25s ease',
                '&:hover': { boxShadow: '0 4px 20px rgba(0,0,0,0.08)', transform: 'translateY(-1px)' },
            }}>
                <Checkbox
                    checked={habit.completed}
                    onChange={() => dispatch(toggleHabit(habit.id))}
                    sx={{ '&.Mui-checked': { color: 'success.main' } }}
                />

                <Box flex={1} minWidth={0}>
                    {editing ? (
                        <Box display="flex" gap={1} flexWrap="wrap" alignItems="center">
                            <TextField
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                size="small" sx={{ flex: '1 1 160px' }} autoFocus
                            />
                            <FormControl size="small" sx={{ flex: '0 1 160px' }}>
                                <Select
                                    value={editCategory}
                                    onChange={(e: SelectChangeEvent) => setEditCategory(e.target.value as Exclude<Category, 'todas'>)}
                                >
                                    {categories.map((cat) => (
                                        <MenuItem key={cat} value={cat}>{categoryConfig[cat].label}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    ) : (
                        <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
                            <Typography variant="body1" fontWeight={500} sx={{
                                textDecoration: habit.completed ? 'line-through' : 'none',
                                color: habit.completed ? 'text.secondary' : 'text.primary',
                            }}>
                                {habit.name}
                            </Typography>
                            <Chip label={cfg.label} size="small" sx={{ backgroundColor: cfg.bg, color: cfg.color, fontWeight: 600, fontSize: '0.7rem', height: 22 }} />
                            {habit.completed && <Chip label="Concluído ✓" size="small" color="success" sx={{ height: 22, fontSize: '0.7rem' }} />}
                        </Box>
                    )}
                </Box>

                <Box display="flex" gap={0.5} flexShrink={0}>
                    {editing ? (
                        <>
                            <Tooltip title="Salvar">
                                <IconButton size="small" color="success" onClick={handleSave}><CheckIcon fontSize="small" /></IconButton>
                            </Tooltip>
                            <Tooltip title="Cancelar">
                                <IconButton size="small" color="error" onClick={handleCancel}><CloseIcon fontSize="small" /></IconButton>
                            </Tooltip>
                        </>
                    ) : (
                        <>
                            <Tooltip title="Editar">
                                <IconButton size="small" onClick={() => setEditing(true)} sx={{ color: 'text.secondary' }}><EditIcon fontSize="small" /></IconButton>
                            </Tooltip>
                            <Tooltip title="Excluir">
                                <IconButton size="small" color="error" onClick={() => dispatch(deleteHabit(habit.id))}><DeleteIcon fontSize="small" /></IconButton>
                            </Tooltip>
                        </>
                    )}
                </Box>
            </Box>
        </Fade>
    );
}

export default HabitItem;