import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { fetchLogout } from '../store/reducers/ActionCreators'
import { GoTasklist } from "react-icons/go";

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
                <NavLink to={'/'}>Questions?</NavLink>
            </div>
            <div>
                {isAuth
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
                    <nav className='header-menu__logout'>
                        <ul>
                            <li>
                                <NavLink to={'/createTypeAndQuestion'}><GoTasklist size={23} /></NavLink>
                            </li>
                            <li>
                                <NavLink to={'/account'}><UserOutlined /></NavLink>
                            </li>
                        </ul>
                        <Button onClick={logout} type='primary' icon={<LogoutOutlined />}>
                            Log Out
                        </Button>
                    </nav>
                }
            </div>
        </div>
    )
}

export default Header