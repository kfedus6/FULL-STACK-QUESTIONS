import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IType } from '../../types/types'

export interface TypeState {
    types: IType[],
    type: {},
}

const initialState: TypeState = {
    types: [],
    type: {}
}

export const typeSlice = createSlice({
    name: 'types',
    initialState,
    reducers: {
        postIdType(state, actions: PayloadAction<TypeState>) {
            state.types = actions.payload.types
        },
        getIdTypes(state, actions: PayloadAction<TypeState>) {
            state.types = actions.payload.types
        },
        getIdType(state, actions: PayloadAction<TypeState>) {
            state.type = actions.payload.type
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