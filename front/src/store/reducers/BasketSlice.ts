import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IBasket } from '../../types/types'

export interface BasketState {
    baskets: { count: number, rows: IBasket[] }
}

const initialState: BasketState = {
    baskets: { count: 0, rows: [] },
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