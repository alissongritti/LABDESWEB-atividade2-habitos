import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { Box, Typography, Paper } from '@mui/material';
import ChecklistIcon from '@mui/icons-material/Checklist';
import HabitForm from './components/HabitForm';
import HabitList from './components/HabitList';
import FilterBar from './components/FilterBar';
import StatsBar from './components/StatsBar';

const theme = createTheme({
    palette: {
        primary: { main: '#667eea' },
        success: { main: '#43a047' },
        background: { default: '#f0f2f8' },
    },
    typography: { fontFamily: '"Nunito", "Segoe UI", sans-serif' },
    shape: { borderRadius: 12 },
});

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box
                minHeight="100vh"
                sx={{
                    background: 'linear-gradient(160deg, #e8eaf6 0%, #f0f2f8 50%, #ede7f6 100%)',
                    py: { xs: 2, sm: 4 },
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <Box
                    sx={{
                        width: '100%',
                        maxWidth: 600,
                        px: { xs: 2, sm: 3 },
                    }}
                >
                    {/* Cabeçalho */}
                    <Box display="flex" alignItems="center" gap={1.5} mb={3}>
                        <Box sx={{
                            width: 48, height: 48, borderRadius: 3, flexShrink: 0,
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: '0 4px 16px rgba(102,126,234,0.4)',
                        }}>
                            <ChecklistIcon sx={{ color: 'white', fontSize: 28 }} />
                        </Box>
                        <Box>
                            <Typography variant="h5" fontWeight={800} lineHeight={1.1}>
                                Hábitos Diários
                            </Typography>
                            <Typography variant="caption" color="text.secondary" fontWeight={600} letterSpacing={0.5}>
                                {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
                            </Typography>
                        </Box>
                    </Box>

                    {/* Barra de progresso */}
                    <StatsBar />

                    {/* Formulário */}
                    <HabitForm />

                    {/* Lista + filtros */}
                    <Paper elevation={0} sx={{ p: { xs: 2, sm: 3 }, borderRadius: 3, border: '1px solid', borderColor: 'divider', background: 'white' }}>
                        <FilterBar />
                        <HabitList />
                    </Paper>

                    <Typography variant="caption" display="block" textAlign="center" mt={3} color="text.disabled">
                        Construído com React + Redux Toolkit + Material UI
                    </Typography>
                </Box>
            </Box>
        </ThemeProvider>
    );
}