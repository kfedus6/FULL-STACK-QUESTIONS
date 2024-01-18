import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IHistory } from '../../types/types'

export interface HistoryState {
    histories: IHistory[]
}

const initialState: HistoryState = {
    histories: []
}

export const historySlice = createSlice({
    name: 'history',
    initialState,
    reducers: {
        getIdHistories(state, actions: PayloadAction<HistoryState>) {
            state.histories = actions.payload.histories
        }
    }
})

export default historySlice.reducer