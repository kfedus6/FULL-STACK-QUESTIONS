import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IBasket } from '../../types/types'

export interface BasketState {
    baskets: IBasket[]
}

const initialState: BasketState = {
    baskets: []
}

export const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        postBasket(state, actions: PayloadAction<BasketState>) {
            state.baskets = actions.payload.baskets
        },
        getIdBaskets(state, actions: PayloadAction<BasketState>) {
            state.baskets = actions.payload.baskets
        }
    }
})

export default basketSlice.reducer