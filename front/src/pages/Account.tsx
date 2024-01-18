import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { fetchgetIdBaskets } from '../store/reducers/ActionCreators'

const Account: React.FC = () => {
    const [basketId, setBasketId] = useState<any>()

    const dispatch = useAppDispatch()

    const { user }: any = useAppSelector(state => state.user)
    const { baskets }: any = useAppSelector(state => state.baskets)
    const { histories }: any = useAppSelector(state => state.histories)

    useEffect(() => {
        dispatch(fetchgetIdBaskets(user.id))
    }, [])

    return (
        <div className='basket-page'>
            <div className='basket-history'>
                Account
            </div>
        </div>
    )
}

export default Account