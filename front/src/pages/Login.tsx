import React from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { NavLink } from 'react-router-dom';

const Login: React.FC = () => {

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    }

    return (
        <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
        >
            <Form.Item
                name="nickname"
                rules={[{ required: true, message: 'Please input your Nickname!' }]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Nickname" />
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

            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
                </Button>
                Or <NavLink to={'/registration'}>register now!</NavLink>
            </Form.Item>
        </Form>
    )
}

export default Login