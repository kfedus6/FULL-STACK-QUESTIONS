import React, { useEffect, useState } from 'react'
import SearchQuestion from '../components/SearchQuestions'
import QuestionsList from '../components/QuestionsList'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { fetchGetQuestion } from '../store/reducers/ActionCreators'
import type { PaginationProps } from 'antd'

const ShowQuestion: React.FC = () => {

    const [typeId, setTypeId] = useState<number | undefined>(undefined)
    const [page, setPage] = useState<number>(1)
    const [limit, setLimit] = useState<number>(8)
    const [value, setValue] = useState<string>('')

    const dispatch = useAppDispatch()

    const { questions }: any = useAppSelector(state => state.questions)

    useEffect(() => {
        dispatch(fetchGetQuestion({ typeId: typeId, limit: limit, page: page }))
    }, [typeId, page])

    const onChange: PaginationProps['onChange'] = (page) => {
        setPage(page)
    }

    const filteredQuestions = questions.rows.filter((item: any) => {
        return item.question.toLowerCase().includes(value.toLowerCase())
    })

    return (
        <div className='show-questions__content'>
            <div className='show-questions__search'>
                <div className='show-questions__title'>Search questions!</div>
                <SearchQuestion setTypeId={setTypeId} questions={questions} setValue={setValue} />
                <QuestionsList typeId={typeId} onChange={onChange} questions={questions} />
            </div>
        </div>
    )
}

export default ShowQuestion