import React, { useEffect, useMemo, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { fetchGetIdBasketHistories, fetchgetIdBaskets } from '../store/reducers/ActionCreators'
import { DownOutlined, SmileOutlined, MehOutlined, FrownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';

const Account: React.FC = () => {
    const [items, setItems] = useState<any>()

    const dispatch = useAppDispatch()

    const { user }: any = useAppSelector(state => state.user)
    const { baskets }: any = useAppSelector(state => state.baskets)
    const { histories }: any = useAppSelector(state => state.histories)

    useEffect(() => {
        dispatch(fetchgetIdBaskets(user.id))
    }, [])

    const sendIdBasket = (id: any) => {
        dispatch(fetchGetIdBasketHistories(id))
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

    return (
        <div className='basket-page'>
            <div className='basket-history'>
                <div className='basket-user'>
                    <span>{user.nickName}</span>
                </div>
                <div className='baskets-items'>
                    <div className='basket-title'>
                        <span>History:</span>
                    </div>
                    {baskets.map((basket: any, idx: any) => (
                        <div key={idx} className='basket-dropdown' onClick={() => sendIdBasket(basket.id)}>
                            <Dropdown menu={{ items }} trigger={['click']}>
                                <Space onClick={(e) => e.preventDefault()}>
                                    {`${idx + 1}.`}
                                    {basket.title}
                                    {basket.resultPercent < 40 ? <FrownOutlined /> : basket.resultPercent < 70 ? <MehOutlined /> : <SmileOutlined />}
                                    {`${basket.resultPercent}%`}
                                    <DownOutlined />
                                </Space>
                            </Dropdown>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Account