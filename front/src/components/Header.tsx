import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { LogoutOutlined, UserOutlined, FormOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { fetchLogout } from '../store/reducers/ActionCreators'

const Header: React.FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const { isAuth }: any = useAppSelector(state => state.user)

    const logout = () => {
        dispatch(fetchLogout())
        navigate('/login')
    }

    return (
        <div className='header'>
            <div className='header-logo'>
                <NavLink to={'/'}>Questions</NavLink>
            </div>
            <div>
                {!isAuth
                    ?
                    <nav className='header-authorization'>
                        <ul>
                            <li>
                                <NavLink to={'/login'}>
                                    <Button>Log In</Button>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/registration'}>
                                    <Button type='primary'>Sign Up</Button>
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                    :
                    <nav className='header-menu-icons__logout'>
                        <ul>
                            <li>
                                <NavLink to={'/createTypeAndQuestion'}><FormOutlined /></NavLink>
                            </li>
                            <li>
                                <NavLink to={'/account'}><UserOutlined /></NavLink>
                            </li>
                        </ul>
                        <Button className='header-logout__btn' onClick={logout} type='primary' danger icon={<LogoutOutlined className='header-logout__icons' />}>
                            Log Out
                        </Button>
                    </nav>
                }
            </div>
        </div>
    )
}

export default Header