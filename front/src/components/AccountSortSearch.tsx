import React from 'react'
import { AutoComplete, Button, Form, Select } from 'antd'

const { Option } = Select

interface AccountSortSearchProps {
    onFinish: (values: any) => void;
    types: any;
    sorteredBasketsForm: any;
    onSelect: (data: string) => void;
    onSearch: (value: string) => void;
}

const AccountSortSearch: React.FC<AccountSortSearchProps> = ({ onFinish, types, sorteredBasketsForm, onSelect, onSearch }) => {
    const [form] = Form.useForm()

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
                    options={sorteredBasketsForm}
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

export default AccountSortSearch