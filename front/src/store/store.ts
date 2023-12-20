import { combineReducers, configureStore } from "@reduxjs/toolkit";
import user from './reducers/UserSlice'
import types from './reducers/TypeSlice'
import questions from './reducers/QuestionSlice'

const rootReducer = combineReducers({
    user,
    types,
    questions
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']