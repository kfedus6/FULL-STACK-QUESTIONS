import React, { useEffect } from 'react'
import { Button, Form, Input, Select } from 'antd';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchGetIdTypes, fetchPostIdQuestion } from '../store/reducers/ActionCreators';

const { Option } = Select

type FieldType = {
    question: string;
    answer: string;
}

const CreateQuestion: React.FC = () => {
    const [form] = Form.useForm()

    const dispatch = useAppDispatch()

    const { user }: any = useAppSelector(state => state.user)
    const { types }: any = useAppSelector(state => state.types)

    useEffect(() => {
        dispatch(fetchGetIdTypes(user.id))
    }, [])

    const onFinish = (values: any) => {
        const typeId = values.type
        const data = { 'question': values.question, 'answer': values.answer }
        dispatch(fetchPostIdQuestion(typeId, data))
        form.resetFields()
    }

    const onReset = () => {
        form.resetFields()
    }

    return (
        <Form
            form={form}
            layout="vertical"
            labelCol={{ span: 0 }}
            wrapperCol={{ span: 22 }}
            onFinish={onFinish}
            autoComplete="off"
        >

            <Form.Item
                label="Type"
                name='type'
                rules={[{ required: true, message: 'Please enter Type!' }]}>
                <Select placeholder="Type" allowClear>
                    {types.map((item: any, idx: any) => (
                        <Option key={idx} value={item.id}>{item.title}</Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item<FieldType>
                label="Question"
                name='question'
                rules={[{ required: true, message: 'Please input your question!' }]}
            >
                <Input placeholder='Question...' />
            </Form.Item>

            <Form.Item<FieldType>
                label="Answer"
                name='answer'
                rules={[{ required: true, message: 'Please textArea your asnwer!' }]}
            >
                <Input.TextArea rows={6} placeholder='Answer...' />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 0, span: 22 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
                <Button htmlType="button" onClick={onReset}>
                    Reset
                </Button>
            </Form.Item>
        </Form>
    )
}

export default CreateQuestion