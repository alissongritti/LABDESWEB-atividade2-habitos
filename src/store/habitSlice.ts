import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Habit, HabitState, Category } from '../types/habit';
import type { RootState } from './index';

// Estado inicial com alguns hábitos de exemplo
const initialState: HabitState = {
    habits: [
        { id: crypto.randomUUID(), name: 'Beber 2L de água', category: 'saúde', completed: false, createdAt: new Date().toISOString() },
        { id: crypto.randomUUID(), name: 'Caminhar 30 min', category: 'saúde', completed: false, createdAt: new Date().toISOString() },
        { id: crypto.randomUUID(), name: 'Estudar TypeScript', category: 'estudo', completed: true, createdAt: new Date().toISOString() },
        { id: crypto.randomUUID(), name: 'Ler 20 páginas', category: 'lazer', completed: false, createdAt: new Date().toISOString() },
        { id: crypto.randomUUID(), name: 'Meditar', category: 'produtividade', completed: false, createdAt: new Date().toISOString() },
    ],
    filter: 'todas',
};

const habitSlice = createSlice({
    name: 'habits',
    initialState,
    reducers: {
        // Adicionar novo hábito
        addHabit: (state, action: PayloadAction<{ name: string; category: Exclude<Category, 'todas'> }>) => {
            const newHabit: Habit = {
                id: crypto.randomUUID(),
                name: action.payload.name,
                category: action.payload.category,
                completed: false,
                createdAt: new Date().toISOString(),
            };
            state.habits.push(newHabit);
        },

        // Editar nome e/ou categoria de um hábito existente
        editHabit: (state, action: PayloadAction<{ id: string; name: string; category: Exclude<Category, 'todas'> }>) => {
            const habit = state.habits.find((h) => h.id === action.payload.id);
            if (habit) {
                habit.name = action.payload.name;
                habit.category = action.payload.category;
            }
        },

        // Excluir hábito individualmente
        deleteHabit: (state, action: PayloadAction<string>) => {
            state.habits = state.habits.filter((h) => h.id !== action.payload);
        },

        // Alternar concluído/pendente
        toggleHabit: (state, action: PayloadAction<string>) => {
            const habit = state.habits.find((h) => h.id === action.payload);
            if (habit) {
                habit.completed = !habit.completed;
            }
        },

        // Limpar todos os hábitos concluídos
        clearCompleted: (state) => {
            state.habits = state.habits.filter((h) => !h.completed);
        },

        // Filtrar por categoria
        setFilter: (state, action: PayloadAction<Category>) => {
            state.filter = action.payload;
        },
    },
});

export const { addHabit, editHabit, deleteHabit, toggleHabit, clearCompleted, setFilter } = habitSlice.actions;

// Selectors
export const selectAllHabits = (state: RootState) => state.habits.habits;
export const selectFilter = (state: RootState) => state.habits.filter;
export const selectFilteredHabits = (state: RootState) => {
    const { habits, filter } = state.habits;
    if (filter === 'todas') return habits;
    return habits.filter((h) => h.category === filter);
};
export const selectCompletedCount = (state: RootState) =>
    state.habits.habits.filter((h) => h.completed).length;
export const selectTotalCount = (state: RootState) => state.habits.habits.length;

export default habitSlice.reducer;