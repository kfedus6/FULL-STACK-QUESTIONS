import React, { useEffect, useMemo, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { fetchGetIdBasketHistories, fetchGetIdTypes, fetchgetIdBaskets } from '../store/reducers/ActionCreators'
import { DownOutlined, SmileOutlined, MehOutlined, FrownOutlined } from '@ant-design/icons';
import { Dropdown, Space, Progress, Tooltip, Card, Form, Select, Button, AutoComplete, PaginationProps, Pagination } from 'antd';

const { Meta } = Card
const { Option } = Select

const Account: React.FC = () => {
    const [form] = Form.useForm()

    const [items, setItems] = useState<any>()
    const [goodPercent, setGoodPercent] = useState<any>(0)
    const [normalPercent, setNormalPercent] = useState<any>(0)
    const [badPercent, setBadPercent] = useState<any>(0)
    const [typeId, setTypeId] = useState<number | undefined>(undefined)
    const [page, setPage] = useState<number>(1)
    const [limit, setLimit] = useState<number>(10)
    const [value, setValue] = useState('')
    const [sorteredBaskets, setSorteredBaskets] = useState<any>([])
    const [sorteredBasketsForm, setSorteredBasketsForm] = useState<any>()

    const dispatch = useAppDispatch()

    const { user }: any = useAppSelector(state => state.user)
    const { baskets }: any = useAppSelector(state => state.baskets)
    const { histories }: any = useAppSelector(state => state.histories)
    const { types }: any = useAppSelector(state => state.types)

    useEffect(() => {
        dispatch(fetchgetIdBaskets({ userId: user.id, typeId: typeId, page: page, limit: limit }))
    }, [typeId, page])

    useEffect(() => {
        dispatch(fetchGetIdTypes(user.id))
    }, [])

    const sendIdBasket = (id: any) => {
        dispatch(fetchGetIdBasketHistories(id))
    }

    const onFinish = (values: any) => {
        setTypeId(values.type)
    }

    const onSelect = (data: string) => {
        setValue(data)
    }

    const onSearch = (value: string) => {
        setValue(value)
    }

    const onChange: PaginationProps['onChange'] = (page: any) => {
        setPage(page)
    }

    useMemo(() => {
        const resultChangeHistories: any = []
        for (let i = 0; i < histories.length; i++) {
            resultChangeHistories.push({
                kay: `${histories[i].id}`,
                label: `${histories[i].question}`,
                danger: histories[i].status === true ? false : true
            })
        }
        setItems(resultChangeHistories)
    }, [histories])

    useMemo(() => {
        const filteredBaskets = baskets.rows.filter((item: any) => {
            return item.title.toLowerCase().includes(value.toLowerCase())
        })
        const resultSorteredBasketsForm = []
        for (let i = 0; i < filteredBaskets.length; i++) {
            resultSorteredBasketsForm.push({
                label: `${filteredBaskets[i].title}`,
            })
        }
        setSorteredBasketsForm(resultSorteredBasketsForm)
        setSorteredBaskets(filteredBaskets)
        let resultGoodCount = 0
        let resultNormalCount = 0
        let resultBadCount = 0
        filteredBaskets.forEach((b: any) => {
            if (b.resultPercent >= 80) {
                resultGoodCount++
            } else if (b.resultPercent >= 50 && b.resultPercent <= 80) {
                resultNormalCount++
            } else if (b.resultPercent <= 50) {
                resultBadCount++
            }
        })
        setGoodPercent(Math.round(resultGoodCount / filteredBaskets.length * 100))
        setNormalPercent(Math.round(resultNormalCount / filteredBaskets.length * 100))
        setBadPercent(Math.round(resultBadCount / filteredBaskets.length * 100))
    }, [typeId, value, baskets])

    return (
        <div className='basket-page'>
            <div className='basket-history'>
                <div className='basket-history__block'>
                    <div className='basket-user'>
                        <span>{user.nickName}</span>
                    </div>
                    <div className='basket-title'>
                        <span>History:</span>
                    </div>
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
                    <div className='baskets-items'>
                        <div className='basket-progress__precent'>
                            <Space wrap>
                                <Tooltip title="More than 80% of correct answers!">
                                    <Progress strokeLinecap="butt" strokeColor='green' type="dashboard" percent={goodPercent} />
                                </Tooltip>
                                <Tooltip title="More than 50% of correct answers!">
                                    <Progress strokeLinecap="butt" strokeColor='gold' type="dashboard" percent={normalPercent} />
                                </Tooltip>
                                <Tooltip title="Less than 50% of correct answers!">
                                    <Progress strokeLinecap="butt" strokeColor='red' type="dashboard" percent={badPercent} />
                                </Tooltip>
                            </Space>
                        </div>
                        <div className='basket-item'>
                            {sorteredBaskets.map((basket: any, idx: any) => (
                                <div key={idx} className='basket-dropdown' onClick={() => sendIdBasket(basket.id)}>
                                    <Dropdown menu={{ items }} trigger={['click']}>
                                        <Card
                                            hoverable
                                            onClick={(e) => e.preventDefault()} bordered={false}>
                                            <Meta title={basket.title} />
                                            <span className='basket-card__precent'>{basket.resultPercent < 50 ? <FrownOutlined /> : basket.resultPercent < 80 ? <MehOutlined /> : <SmileOutlined />} {`${basket.resultPercent}%`}</span>
                                            <span className='basket-card__down'><DownOutlined /></span>
                                        </Card>
                                    </Dropdown>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <Button type="text" danger>
                    Delete history
                </Button>
                <Pagination onChange={onChange} defaultCurrent={1} total={baskets.count + 2} />
            </div>
        </div>
    )
}

export default Account