import React, { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { fetchGetIdQuestion } from '../store/reducers/ActionCreators'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'

const StartQuestionsGame: React.FC = () => {
    const [checkRotate, setCheckRotate] = useState<boolean>(false)
    const [gamesQuestions, setGamesQuestions] = useState<any>()
    const [gameQuestion, setGameQuestion] = useState<any>()

    const { id } = useParams()
    const dispatch = useAppDispatch()

    const { gameQuestions }: any = useAppSelector(state => state.questions)

    useEffect(() => {
        dispatch(fetchGetIdQuestion(id))
    }, [])

    useMemo(() => {
        const random = Math.floor(Math.random() * gameQuestions.length)
        const randomGameQuestion = gameQuestions[random]
        setGameQuestion(randomGameQuestion)
        const filteredGameQuestions = gameQuestions.filter((item: any) => item.id !== randomGameQuestion.id)
        setGamesQuestions(filteredGameQuestions)
    }, [gameQuestions])

    const randomQuestion = () => {
        const random = Math.floor(Math.random() * gamesQuestions.length)
        const randomGameQuestion = gamesQuestions[random]
        setGameQuestion(randomGameQuestion)
        const filteredGameQuestions = gamesQuestions.filter((item: any) => item.id !== randomGameQuestion.id)
        setGamesQuestions(filteredGameQuestions)
    }

    return (
        <div className='start-questions-game__content'>
            <div className='start-questions-game__block'>
                <div className='start-questions-random__blcok'>
                    {!checkRotate
                        ?
                        <div className='start-question__random'>
                            <div onClick={() => setCheckRotate(!checkRotate)}>
                                <span>{!gameQuestion ? <></> : gameQuestion.question}</span>
                            </div>
                            <div className='start-question-random__btns'>
                                <button onClick={randomQuestion} className='start-question-random__check'><CheckOutlined /></button>
                                <button onClick={randomQuestion} className='start-question-random__close'><CloseOutlined /></button>
                            </div>
                        </div>
                        :
                        <div className='start-question__random'>
                            <div onClick={() => setCheckRotate(!checkRotate)}>
                                <span>{!gameQuestion ? <></> : gameQuestion.answer}</span>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default StartQuestionsGame