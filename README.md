# 📋 Controle de Hábitos Diários

Aplicativo web desenvolvido como **Atividade 2** da disciplina de Laboratório de Desenvolvimento Web — FATEC.

## 🎯 Objetivo

Desenvolver um aplicativo de controle de hábitos diários utilizando **React + Redux Toolkit + TypeScript**, com interface construída com **Material UI**.

---

## ✨ Funcionalidades

- ➕ **Adicionar** novos hábitos (nome obrigatório, categoria opcional)
- ✏️ **Editar** nome e categoria de hábitos existentes
- ✅ **Marcar** hábitos como concluídos
- 🗑️ **Excluir** hábitos individualmente
- 🔍 **Filtrar** hábitos por categoria
- 🧹 **Limpar** todos os hábitos concluídos de uma vez
- 📊 **Progresso** do dia exibido em tempo real

---

## 🛠️ Tecnologias

| Tecnologia | Versão |
|---|---|
| React | 19 |
| TypeScript | 5 |
| Redux Toolkit | 2 |
| React Redux | 9 |
| Material UI | 7 |
| Vite | 7 |

---

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── FilterBar.tsx     # Filtros por categoria + botão limpar concluídos
│   ├── HabitForm.tsx     # Formulário para adicionar hábito
│   ├── HabitItem.tsx     # Card individual com edição inline
│   ├── HabitList.tsx     # Lista filtrada dos hábitos
│   └── StatsBar.tsx      # Barra de progresso do dia
├── store/
│   ├── habitSlice.ts     # Slice Redux com actions e selectors
│   └── index.ts          # Configuração da store
├── types/
│   └── habit.ts          # Interfaces e tipos TypeScript
├── hooks.ts              # Hooks tipados (useAppDispatch, useAppSelector)
├── App.tsx               # Componente raiz com tema e layout
└── main.tsx              # Entry point com Provider do Redux
```

---

## 🔧 Redux — Estrutura do Estado

```typescript
interface Habit {
  id: string;
  name: string;
  category: 'saúde' | 'estudo' | 'lazer' | 'produtividade' | 'outros';
  completed: boolean;
  createdAt: string;
}
```

**Actions disponíveis:**
- `addHabit` — adiciona novo hábito
- `editHabit` — edita nome e categoria
- `deleteHabit` — remove hábito
- `toggleHabit` — alterna concluído/pendente
- `clearCompleted` — remove todos os concluídos
- `setFilter` — filtra por categoria

---

## 🚀 Como rodar

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build de produção
npm run build
```

Acesse em: `http://localhost:5173`

---

## 👨‍🎓 Informações Acadêmicas

- **Curso:** Tecnologia em Análise e Desenvolvimento de Sistemas
- **Disciplina:** Laboratório de Desenvolvimento Web
- **Professor:** Neymar
- **Instituição:** FATEC