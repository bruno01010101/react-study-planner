import {createSlice} from '@reduxjs/toolkit'; // precisa de chaves

const initialState = {
    tarefas: [{
        id: 1,
        titulo: 'Estudar React',
        descricao: 'Estudar os conceitos básicos do React e criar um projeto simples.',
        completed: false
    }]
}

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action) => {
            const taskWithId = {
                ...action.payload,
                id: Date.now(),
                completed: false
            };
            state.tarefas.push(taskWithId);
        },
        toggleTaskComplete: (state, action) => {
            const task = state.tarefas.find(task => task.id === action.payload);
            if (task) { // existe porque o find retorna undefined se não encontrar.
                task.completed = !task.completed;
            }
        },
        editTask: (state, action) => {
            const { taskId, updatedTask } = action.payload;
            const taskIndex = state.tarefas.findIndex(task => task.id === taskId);
            if(taskIndex !== -1) {
                // funciona porque o spread operator não substitui o objeto, ele cria um novo objeto com as propriedades do antigo e as novas propriedades do updatedTask. como updatedTask tem um campo titulo, ele substitui o campo titulo do objeto antigo pelo campo titulo do updatedTask. se updatedTask não tiver um campo titulo, o campo titulo do objeto antigo permanece inalterado.
                state.tarefas[taskIndex] = { ...state.tarefas[taskIndex], ...updatedTask };
            }
        },
        deleteTask: (state, action) => {
            const taskID = action.payload;
            state.tarefas = state.tarefas.filter(task => task.id !== taskID);
        }
    }
})

// actions são funções que retornam um objeto com o tipo da ação e o payload. Serão importadas no componente para serem despachadas para o reducer. O reducer é uma função que recebe o estado atual e a ação e retorna o novo estado. O createSlice cria automaticamente as actions e o reducer com base nas funções definidas no objeto reducers.
export const { addTask, toggleTaskComplete, editTask, deleteTask } = tasksSlice.actions;
export const selectTasks = (state) => state.tasks.tarefas; // selector é uma função que recebe o estado global e retorna uma parte do estado. Será importada no componente para acessar o estado global. O state.tasks é o nome do slice definido no configureStore, e o state.tasks.tarefas é o estado do slice definido no initialState.
export const selectPendingTasks = (state) => state.tasks.tarefas.filter(task => !task.completed);
export const selectCompletedTasks = (state) => state.tasks.tarefas.filter(task => task.completed);

export default tasksSlice.reducer;