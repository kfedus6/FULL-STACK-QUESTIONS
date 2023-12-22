import React, { useEffect } from 'react'
import { Button, Form, Input, Select } from 'antd'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { fetchGetIdTypes } from '../store/reducers/ActionCreators'

const { Option } = Select

interface SearchQuestionProps {
    setTypeId: (typeId: number) => void
}

const SearchQuestion: React.FC<SearchQuestionProps> = ({ setTypeId }) => {
    const [form] = Form.useForm()

    const dispatch = useAppDispatch()

    const { user }: any = useAppSelector(state => state.user)
    const { types }: any = useAppSelector(state => state.types)

    useEffect(() => {
        dispatch(fetchGetIdTypes(user.id))
    }, [])

    const onFinish = (values: any) => {
        setTypeId(values.type)
    }

    return (
        <Form
            form={form}
            onFinish={onFinish}
            autoComplete="off"
        >
            <Form.Item name='type'>
                <Select placeholder="Type" allowClear>
                    {types.map((item: any, idx: any) => (
                        <Option key={idx} value={item.id}>{item.title}</Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item>
                <Input onChange={(e) => console.log(e.target.value)} placeholder='Search...' />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Search
                </Button>
            </Form.Item>
        </Form>
    )
}

export default SearchQuestion