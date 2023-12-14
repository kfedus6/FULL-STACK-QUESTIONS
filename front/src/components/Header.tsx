import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAppSelector } from '../hooks/redux'
import { LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { Button } from 'antd'

const Header: React.FC = () => {

    const { isAuth }: any = useAppSelector(state => state.user)

    return (
        <div className='header'>
            <div className='header-logo'>
                <NavLink to={'/'}>Questions?</NavLink>
            </div>
            <div className='header-authorization'>
                {!isAuth
                    ?
                    <nav>
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
                    <div className='header-account__logout'>
                        <div className='header-account'>
                            <NavLink to={'/account'}><UserOutlined /></NavLink>
                        </div>
                        <div>
                            <Button type='primary' icon={<LogoutOutlined />}>
                                Log Out
                            </Button>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Header