import React, { useState } from 'react'
import { Collapse, Divider, Pagination } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { fetchDeleteIdQuestion } from '../store/reducers/ActionCreators'

interface QuestionsListProps {
    onChange: ((page: number, pageSize: number) => void) | undefined,
    sorteredQuestions: any,
    questions: any,
    dispatch: any,
    page: any,
    limit: any
}

type ExpandIconPosition = 'start'

const QuestionsList: React.FC<QuestionsListProps> = ({ onChange, questions, sorteredQuestions, dispatch, page, limit }) => {
    const [expandIconPosition, setExpandIconPosition] = useState<ExpandIconPosition>('start')

    const genExtra = (id: number) => (
        <div className='questions-list-collapse__icons'>
            <EditOutlined className='questions-list-collapse__icon'
                onClick={(event) => {
                    console.log(id)
                    event.stopPropagation()
                }}
            />
            <DeleteOutlined className='questions-list-collapse__icon'
                onClick={(event) => {
                    dispatch(fetchDeleteIdQuestion(id, { page: page, limit: limit }))
                    event.stopPropagation()
                }}
            />
        </div>
    )

    return (
        <div>
            <Divider orientation="left">Questions</Divider>
            <div className='questions-collapse'>
                {sorteredQuestions.map((item: any, idx: any) => (
                    <Collapse key={idx} expandIconPosition={expandIconPosition}
                        items={[{ key: idx, label: item.value, children: item.answer, extra: genExtra(item.id) }]}
                    />
                ))}
            </div>
            <div>
                <Pagination onChange={onChange} defaultCurrent={1} total={questions.count + 5} />
            </div>
        </div>
    )
}

export default QuestionsList