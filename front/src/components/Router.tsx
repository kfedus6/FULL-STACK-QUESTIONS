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
import ShowQuestion from '../pages/ShowQuestion'
import StartQuestion from '../pages/StartQuestion'
import StartQuestionsGame from '../pages/StartQuestionsGame'

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
                {isAuth ? <Route path='showQuestion' element={<ShowQuestion />} /> : <></>}
                {isAuth ? <Route path='startQuestion' element={<StartQuestion />} /> : <></>}
                {isAuth ? <Route path='startQuestionGame/:id' element={<StartQuestionsGame />} /> : <></>}
                <Route path='*' element={<ErrorPages />} />
            </Route>
        </Routes>
    )
}

export default Router