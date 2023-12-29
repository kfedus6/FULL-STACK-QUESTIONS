import React from 'react'
import { Collapse, Divider, Pagination } from 'antd'

interface QuestionsListProps {
    typeId: number | undefined,
    onChange: any,
    questions: any,
}

const QuestionsList: React.FC<QuestionsListProps> = ({ typeId, onChange, questions }) => {

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