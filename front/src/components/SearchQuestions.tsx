import React, { useEffect } from 'react'
import { Button, Form, Select, AutoComplete } from 'antd'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { fetchGetIdTypes } from '../store/reducers/ActionCreators'

const { Option } = Select

interface SearchQuestionProps {
    setTypeId: (typeId: number) => void,
    setValue: (value: string) => void,
    sorteredQuestions: any
}

const SearchQuestion: React.FC<SearchQuestionProps> = ({ setTypeId, setValue, sorteredQuestions }) => {
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

    const onSelect = (data: string) => {
        setValue(data)
    }

    const onSearch = (value: string) => {
        setValue(value)
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
                <AutoComplete
                    options={sorteredQuestions}
                    onSelect={onSelect}
                    onSearch={onSearch}
                    placeholder="Search..."
                />
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