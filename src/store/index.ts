import { configureStore } from '@reduxjs/toolkit';
import habitReducer from './habitSlice';

// Configura a store central do Redux
export const store = configureStore({
    reducer: {
        habits: habitReducer,
    },
});

// Tipos para usar no React com segurança
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;