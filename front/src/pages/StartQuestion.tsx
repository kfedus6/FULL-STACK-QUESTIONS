import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { fetchGetIdTypes } from '../store/reducers/ActionCreators'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

const StartQuestion: React.FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const { user }: any = useAppSelector(state => state.user)
    const { types }: any = useAppSelector(state => state.types)

    useEffect(() => {
        dispatch(fetchGetIdTypes(user.id))
    }, [])

    const handlerType = (id: number) => {
        navigate(`/startQuestionGame/${id}`)
    }

    return (
        <div className='start-questions__content'>
            <div className='start-questions__types'>
                <div className='start-questions-types__block'>
                    <div className='start-questions-types__title'>Choose a type!</div>
                    <div className='start-questions-types__items'>
                        {types.map((item: any, idx: any) => (
                            <div key={idx} className='start-questions-types__item'>
                                <Button onClick={() => handlerType(item.id)} type="primary">
                                    {item.title}
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StartQuestion