import { Box, Typography } from '@mui/material';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { useAppSelector } from '../hooks';
import { selectFilteredHabits } from '../store/habitSlice';
import HabitItem from './HabitItem';

export default function HabitList() {
    const habits = useAppSelector(selectFilteredHabits);

    if (habits.length === 0) {
        return (
            <Box display="flex" flexDirection="column" alignItems="center" py={6} color="text.secondary">
                <FormatListBulletedIcon sx={{ fontSize: 56, mb: 2, opacity: 0.3 }} />
                <Typography variant="h6" fontWeight={600} color="text.disabled">
                    Nenhum hábito encontrado
                </Typography>
                <Typography variant="body2" color="text.disabled">
                    Adicione um novo hábito ou mude o filtro.
                </Typography>
            </Box>
        );
    }

    return (
        <Box>
            {habits.map((habit) => (
                <HabitItem key={habit.id} habit={habit} />
            ))}
        </Box>
    );
}