import React, { useEffect, useMemo, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { fetchDeleteIdBasketHistories, fetchGetIdBasketHistories, fetchGetIdTypes, fetchgetIdBaskets } from '../store/reducers/ActionCreators'
import { Button, PaginationProps, Pagination } from 'antd';
import AccountSortSearch from '../components/AccountSortSearch';
import AccountProgress from '../components/AccountProgress';
import AccountBasketsItem from '../components/AccountBasketsItem';

const Account: React.FC = () => {
    const [items, setItems] = useState<any>()
    const [goodPercent, setGoodPercent] = useState<any>(0)
    const [normalPercent, setNormalPercent] = useState<any>(0)
    const [badPercent, setBadPercent] = useState<any>(0)
    const [typeId, setTypeId] = useState<number | undefined>(undefined)
    const [page, setPage] = useState<number>(1)
    const [limit, setLimit] = useState<number>(12)
    const [value, setValue] = useState('')
    const [sorteredBaskets, setSorteredBaskets] = useState<any>([])
    const [sorteredBasketsForm, setSorteredBasketsForm] = useState<any>()

    const dispatch = useAppDispatch()

    const { user }: any = useAppSelector(state => state.user)
    const { baskets }: any = useAppSelector(state => state.baskets)
    const { histories }: any = useAppSelector(state => state.histories)
    const { types }: any = useAppSelector(state => state.types)
    console.log(baskets)

    useEffect(() => {
        dispatch(fetchgetIdBaskets({ userId: user.id, typeId: typeId, page: page, limit: limit }))
    }, [typeId, page])

    useEffect(() => {
        dispatch(fetchGetIdTypes(user.id))
    }, [])

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

    const deleteBasketHistory = () => {
        dispatch(fetchDeleteIdBasketHistories(user.id))
    }

    return (
        <div className='basket-page'>
            <div className='basket-history'>
                <div className='basket-user'>
                    <span>{user.nickName}</span>
                </div>
                <div className='basket-history__block'>
                    <div className='basket-sort__search'>
                        <AccountSortSearch
                            onFinish={onFinish}
                            types={types}
                            sorteredBasketsForm={sorteredBasketsForm}
                            onSelect={onSelect}
                            onSearch={onSearch}
                        />
                    </div>
                    <div className='baskets-items'>
                        <div className='basket-item__block'>
                            <div className='basket-title'>
                                <span>History:</span>
                            </div>
                            <div className='basket-item'>
                                {sorteredBaskets.map((basket: any, idx: any) => (
                                    <AccountBasketsItem
                                        idx={idx}
                                        basket={basket}
                                        items={items}
                                        sendIdBasket={sendIdBasket}
                                    />
                                ))}
                            </div>
                            <div className='basket-delete__history'>
                                <Button onClick={deleteBasketHistory} type="text" danger>
                                    Delete history
                                </Button>
                            </div>
                        </div>
                        <div className='basket-progress__precent'>
                            <AccountProgress
                                goodPercent={goodPercent}
                                normalPercent={normalPercent}
                                badPercent={badPercent}
                            />
                        </div>
                    </div>
                    <div className='basket-pagination'>
                        <Pagination onChange={onChange} defaultCurrent={1} total={baskets.count + 2} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Account