import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { useAppSelector } from '../hooks/redux'
import Home from '../pages/Home'
import Account from '../pages/Account'
import ErrorPages from '../pages/ErrorPages'
import Layout from './Layout'
import Login from '../pages/Login'
import Registration from '../pages/Registration'
import CreateTypeAndQuestion from '../pages/CreateTypeAndQuestion'

const Router: React.FC = () => {

    const { isAuth }: any = useAppSelector(state => state.user)

    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                {isAuth ? <Route index element={<Home />} /> : <></>}
                <Route path='login' element={<Login />} />
                <Route path='registration' element={<Registration />} />
                {isAuth ? <Route path='createTypeAndQuestion' element={<CreateTypeAndQuestion />} /> : <></>}
                {isAuth ? <Route path='account' element={<Account />} /> : <></>}
                <Route path='*' element={<ErrorPages />} />
            </Route>
        </Routes>
    )
}

export default Router