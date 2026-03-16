// Categorias disponíveis para os hábitos
export type Category = 'saúde' | 'estudo' | 'lazer' | 'produtividade' | 'outros' | 'todas';

// Interface principal do hábito
export interface Habit {
    id: string;
    name: string;
    category: Exclude<Category, 'todas'>;
    completed: boolean;
    createdAt: string;
}

// Estado global do Redux
export interface HabitState {
    habits: Habit[];
    filter: Category;
}