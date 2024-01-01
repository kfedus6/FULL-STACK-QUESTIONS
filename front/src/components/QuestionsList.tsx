import React, { useState } from 'react'
import { Collapse, Divider, Pagination } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

interface QuestionsListProps {
    typeId: number | undefined,
    onChange: any,
    sorteredQuestions: any,
    questions: any,
}

type ExpandIconPosition = 'start'

const QuestionsList: React.FC<QuestionsListProps> = ({ typeId, onChange, questions, sorteredQuestions }) => {
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
                    console.log(id)
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
                <Pagination onChange={onChange} defaultCurrent={1} total={questions.count + 2} />
            </div>
        </div>
    )
}

export default QuestionsList