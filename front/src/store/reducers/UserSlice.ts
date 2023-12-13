import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface UserState {
    user: []
}

const initialState: UserState = {
    user: []
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        registration(state, action: PayloadAction<UserState>) {
            state.user = action.payload.user
        },
        login(state, action: PayloadAction<UserState>) {
            state.user = action.payload.user
        },
        logout(state, action: PayloadAction<UserState>) {
            state.user = action.payload.user
        },
        refresh(state, action: PayloadAction<UserState>) {
            state.user = action.payload.user
        }
    }
})

export default userSlice.reducer