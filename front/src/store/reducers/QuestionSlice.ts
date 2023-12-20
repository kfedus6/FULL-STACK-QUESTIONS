import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IQuestion } from '../../types/types'

export interface QuestionState {
    questions: IQuestion[];
}

const initialState: QuestionState = {
    questions: []
}

export const questionSlice = createSlice({
    name: 'questions',
    initialState,
    reducers: {
        postIdQuestion(state, actions: PayloadAction<QuestionState>) {
            state.questions = actions.payload.questions
        },
        getIdQuestions(state, actions: PayloadAction<QuestionState>) {
            state.questions = actions.payload.questions
        },
        patchIdQuestion(state, actions: PayloadAction<QuestionState>) {
            state.questions = actions.payload.questions
        },
        deleteIdQuestion(state, actions: PayloadAction<QuestionState>) {
            state.questions = actions.payload.questions
        }
    }
})

export default questionSlice.reducer