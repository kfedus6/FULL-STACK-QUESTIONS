import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { fetchGetQuestion } from '../store/reducers/ActionCreators'
import { Collapse, Divider, Pagination } from 'antd'
import type { PaginationProps } from 'antd'

interface QuestionsListProps {
    typeId: number | undefined
}

const QuestionsList: React.FC<QuestionsListProps> = ({ typeId }) => {
    const [page, setPage] = useState<number>(1)
    const [limit, setLimit] = useState<number>(8)

    const dispatch = useAppDispatch()

    const { questions }: any = useAppSelector(state => state.questions)

    useEffect(() => {
        dispatch(fetchGetQuestion({ typeId: typeId, limit: limit, page: page }))
    }, [typeId, page])

    const onChange: PaginationProps['onChange'] = (page) => {
        setPage(page)
    };

    return (
        <div>
            <Divider orientation="left">Questions</Divider>
            <div className='questions-collapse'>
                {questions.rows.map((item: any, idx: any) => (
                    <Collapse key={idx}
                        items={[{ key: idx, label: item.question, children: item.answer }]}
                    />
                ))}
            </div>
            <div>
                <Pagination onChange={onChange} defaultCurrent={1} total={questions.count + 2} />
            </div>
        </div>
    )
}

export default QuestionsList