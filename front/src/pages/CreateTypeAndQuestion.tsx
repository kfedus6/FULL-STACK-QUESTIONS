import React from 'react'
import CreateType from '../components/CreateType'
import CreateQuestion from '../components/CreateQuestion'

const CreateTypeAndQuestion: React.FC = () => {

    return (
        <div className='page-type__question'>
            <div className='block-type__question'>
                <div className='block-type'>
                    <p>Type</p>
                    <CreateType />
                </div>
                <div className='block-question'>
                    <p>Question</p>
                    <CreateQuestion />
                </div>
            </div>
        </div>
    )
}

export default CreateTypeAndQuestion