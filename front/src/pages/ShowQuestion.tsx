import React, { useState } from 'react'
import SearchQuestion from '../components/SearchQuestions'
import QuestionsList from '../components/QuestionsList'

const ShowQuestion: React.FC = () => {

    const [typeId, setTypeId] = useState<number>(0)

    return (
        <div className='show-questions__content'>
            <div className='show-questions__search'>
                <div className='show-questions__title'>Search questions!</div>
                <SearchQuestion setTypeId={setTypeId} />
                <QuestionsList typeId={typeId} />
            </div>
        </div>
    )
}

export default ShowQuestion