import React, { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Router from './components/Router'
import { useAppDispatch } from './hooks/redux'
import { fetchRefresh } from './store/reducers/ActionCreators'

const App: React.FC = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (localStorage.getItem('accessToken')) {
            dispatch(fetchRefresh())
        }
    }, [])

    return (
        <BrowserRouter>
            <Router />
        </BrowserRouter>
    )
}

export default App