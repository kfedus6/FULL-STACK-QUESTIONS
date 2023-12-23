import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface MessageState {
    successMessage: string | null;
    errorMessage: string | null;
    warningMessage: string | null;
}

const initialState: MessageState = {
    successMessage: null,
    errorMessage: null,
    warningMessage: null
}

export const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        success(state, actions: PayloadAction<MessageState>) {
            state.successMessage = actions.payload.successMessage
            state.errorMessage = actions.payload.errorMessage
            state.warningMessage = actions.payload.warningMessage
        },
        error(state, actions: PayloadAction<MessageState>) {
            state.successMessage = actions.payload.successMessage
            state.errorMessage = actions.payload.errorMessage
            state.warningMessage = actions.payload.warningMessage
        },
        warning(state, actions: PayloadAction<MessageState>) {
            state.successMessage = actions.payload.successMessage
            state.errorMessage = actions.payload.errorMessage
            state.warningMessage = actions.payload.warningMessage
        }
    }
})

export default messageSlice.reducer