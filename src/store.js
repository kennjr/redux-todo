// this is where we're gonna start the redux setup

import { configureStore } from "@reduxjs/toolkit";
import todoReducer from './features/todo/todoSlice'

// think of the store as the entire state for our app 
export const store = configureStore({
    reducer: {
        // we're gonna setup our features aqui
        todo: todoReducer
    }
})