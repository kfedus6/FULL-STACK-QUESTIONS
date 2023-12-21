import React from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../hooks/redux';
import { fetchLogin } from '../store/reducers/ActionCreators';

const Login: React.FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const onFinish = (values: any) => {
        const userObj = values
        dispatch(fetchLogin(userObj))
        navigate('/')
    }

    return (
        <div className='login-form__ant'>
            <div className='login-form__block'>
                <div className='login-form__title'>
                    Hello!
                </div>
                <Form
                    name="normal_login"
                    className="login-form"
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Please input your Email!' }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>

                    <Form.Item className='login-button__ant'>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                        Or <NavLink to={'/registration'}>register now!</NavLink>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default Login