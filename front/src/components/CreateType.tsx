import React from 'react'
import { Button, Form, Input } from 'antd';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchPostIdType } from '../store/reducers/ActionCreators';

type FieldType = {
    title: string;
}

const CreateType: React.FC = () => {
    const [form] = Form.useForm()
    const dispatch = useAppDispatch()

    const { user }: any = useAppSelector(state => state.user)

    const onFinish = (values: string) => {
        const title: string = values
        dispatch(fetchPostIdType(title, user.id))
        form.resetFields()
    }

    const onReset = () => {
        form.resetFields()
    }

    return (
        <Form
            name="basic"
            form={form}
            labelCol={{ span: 0 }}
            wrapperCol={{ span: 22 }}
            onFinish={onFinish}
            autoComplete="off"
        >
            <Form.Item<FieldType>
                label="Title"
                name='title'
                rules={[{ required: true, message: 'Please input your title!' }]}
            >
                <Input placeholder='Title...' />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 0, span: 22 }}>
                <Button type="primary" htmlType="submit">
                    Create
                </Button>
                <Button htmlType="button" onClick={onReset}>
                    Reset
                </Button>
            </Form.Item>
        </Form>
    )
}

export default CreateType