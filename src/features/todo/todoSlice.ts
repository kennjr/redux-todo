/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

// filter options available
export enum FilterOptions {
    DEFAULT, COMPLETED, INCOMPLETE
}

// the possible options for todo's complete property
export enum CompleteActions {
    TOGGLE, COMPLETE, INCOMPLETE
}

export interface Todo {
    id: string,
    todoString: string,
    complete: boolean,
}

// this will be the initial state of the app, on render
const initialState = {
    all_todos: [],
    todos: [],
    loading: true,
    filter: FilterOptions.DEFAULT
}

const todoSlice = createSlice({
    name: 'todo',
    initialState,
    // the reducers are the actions that can be executed on the state
    reducers: {
        clearTodos: (state) => {
            state.loading = true;
            state.todos = []
            state.all_todos = []
            state.loading = false;
        },
        addTodo: (state, action) => {
            state.loading = true;
            const todoString = action.payload.todoString;
            const todo: Todo = {
                id: crypto.randomUUID(),
                todoString: todoString,
                complete: false
            }
            state.todos = [...state.todos, todo]
            state.all_todos = [...state.all_todos, todo]
            state.loading = false;
        },
        // toggleTodo: (state, action) => {
        //     state.loading = true;
        //     const todoId = action.payload.id
        //     const todoItem = state.todos.find((item) => item.id == todoId)
        //     if(todoItem){
        //         todoItem.complete = !todoItem.complete
        //     }
        //     state.loading = false;
        // },
        removeTodo: (state, { payload }) => {
            state.loading = true;
            const itemId = payload.id
            state.todos = state.todos.filter((item) => item.id !== itemId)
            state.all_todos = state.all_todos.filter((item) => item.id !== itemId)
            state.loading = false;
        },
        updateTodoCompletionState: (state, action) => {
            state.loading = true;
            const itemId = action.payload.id
            const todoItem = state.todos.find((item) => item.id == itemId)
            const allTodoItem = state.all_todos.find((item) => item.id == itemId)
            const updateAction = action.payload.updateAction
            switch (updateAction) {
                case CompleteActions.COMPLETE:
                    if(todoItem && allTodoItem){
                        todoItem.complete = true
                        allTodoItem.complete = true
                    }
                    break;
                case CompleteActions.INCOMPLETE:
                    if(todoItem && allTodoItem){
                        todoItem.complete = false
                        allTodoItem.complete = false
                    }
                    break;
                default:
                    if(todoItem && allTodoItem){
                        todoItem.complete = !todoItem.complete
                        allTodoItem.complete = !allTodoItem.complete
                    }
                    break;
            }
            state.loading = false;
        },
        // incompleteTodo: (state, action) => {
        //     state.loading = true;
        //     const itemId = action.payload.id
        //     const todoItem = state.todos.find((item) => item.id == itemId)
        //     if(todoItem){
        //         todoItem.complete = false
        //     }
        //     state.loading = false;
        // },
        filterTodos: (state, action) => {
            state.loading = true;
            const predicate = action.payload.predicate
            switch (predicate) {
                case FilterOptions.COMPLETED:
                    state.todos = state.todos.filter((item) => item.complete == true)
                    state.filter = FilterOptions.COMPLETED
                    break;
                case FilterOptions.INCOMPLETE:
                    state.todos = state.todos.filter((item) => item.complete == false)
                    state.filter = FilterOptions.INCOMPLETE
                    break;
                default:
                    state.todos = state.all_todos;
                    state.filter = FilterOptions.DEFAULT
                    break;
            }
            state.loading = false;
        },
        completeAllTodos: (state) => {
            state.loading = true;
            const updatedTodos = new Array(state.todos.length)
            state.todos.forEach((item: Todo, index) => {
                item.complete = true;
                updatedTodos[index] = item
            })
            state.todos = updatedTodos
            state.all_todos = updatedTodos
            state.loading = false;
        },
        searchTodos: (state, action) => {
            state.loading = true;
            const query = action.payload.query
            state.todos = state.todos.filter((item: Todo) => item.todoString.toLowerCase().includes(query))
            state.loading = false;
        },
        clearSearch: (state) => {
            state.todos = state.all_todos
        }
    }
});

// we make all the actions accessible to the components by exporting them
// export const { clearTodos, addTodo, toggleTodo, removeTodo, completeTodo, incompleteTodo, filterTodos, completeAllTodos, searchTodos } = todoSlice.actions
export const { clearTodos, addTodo, removeTodo, updateTodoCompletionState, filterTodos, completeAllTodos, searchTodos, clearSearch } = todoSlice.actions

export default todoSlice.reducer;