import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IType } from '../../types/types'

export interface TypeState {
    types: IType[]
}

const initialState: TypeState = {
    types: []
}

export const typeSlice = createSlice({
    name: 'types',
    initialState,
    reducers: {
        postIdType(state, actions: PayloadAction<TypeState>) {
            state.types = actions.payload.types
        },
        getTypes(state, actions: PayloadAction<TypeState>) {
            state.types = actions.payload.types
        },
        patchIdType(state, actions: PayloadAction<TypeState>) {
            state.types = actions.payload.types
        },
        deleteIdType(state, actions: PayloadAction<TypeState>) {
            state.types = actions.payload.types
        }
    }
})

export default typeSlice.reducer