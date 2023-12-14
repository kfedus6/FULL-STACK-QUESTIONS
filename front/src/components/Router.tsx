import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Account from '../pages/Account'
import ErrorPages from '../pages/ErrorPages'
import Layout from './Layout'
import Login from '../pages/Login'
import Registration from '../pages/Registration'

const Router: React.FC = () => {
    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route index element={<Home />} />
                <Route path='login' element={<Login />} />
                <Route path='registration' element={<Registration />} />
                <Route path='account' element={<Account />} />
                <Route path='*' element={<ErrorPages />} />
            </Route>
        </Routes>
    )
}

export default Router