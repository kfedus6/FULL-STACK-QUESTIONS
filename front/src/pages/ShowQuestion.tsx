import React, { useEffect, useMemo, useState } from 'react'
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
    const [sorteredQuestions, setSorteredQuestions] = useState<any>()

    const dispatch = useAppDispatch()

    const { questions }: any = useAppSelector(state => state.questions)

    useEffect(() => {
        dispatch(fetchGetQuestion({ typeId: typeId, limit: limit, page: page }))
    }, [typeId, page])

    const onChange: PaginationProps['onChange'] = (page) => {
        setPage(page)
    }

    useMemo(() => {
        const filteredQuestions = questions.rows.filter((item: any) => {
            return item.question.toLowerCase().includes(value.toLowerCase())
        })
        const resultSorteredQuestions = []
        for (let i = 0; i < filteredQuestions.length; i++) {
            resultSorteredQuestions.push({
                label: `${filteredQuestions[i].question}`,
                value: `${filteredQuestions[i].question}`,
                answer: `${filteredQuestions[i].answer}`,
                id: `${filteredQuestions[i].id}`
            })
        }
        setSorteredQuestions(resultSorteredQuestions)
    }, [value, questions])

    return (
        <div className='show-questions__content'>
            <div className='show-questions__search'>
                <div className='show-questions__title'>Search questions!</div>
                <SearchQuestion setTypeId={setTypeId} setValue={setValue} sorteredQuestions={sorteredQuestions} />
                <QuestionsList typeId={typeId} onChange={onChange} questions={questions} sorteredQuestions={sorteredQuestions} />
            </div>
        </div>
    )
}

export default ShowQuestion