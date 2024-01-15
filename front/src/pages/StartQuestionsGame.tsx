import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { fetchGetIdQuestion, fetchGetIdQuestionStateUpdated, fetchGetIdType, fetchPostBasket } from '../store/reducers/ActionCreators'
import { CheckOutlined, CloseOutlined, SmileOutlined, MehOutlined, FrownOutlined } from '@ant-design/icons'
import { Button, Result } from 'antd'

const StartQuestionsGame: React.FC = () => {
    const [checkRotate, setCheckRotate] = useState<boolean>(false)
    const [gamesQuestions, setGamesQuestions] = useState<any>([])
    const [gameQuestion, setGameQuestion] = useState<any>()
    const [correctQuestions, setCorrectQuestions] = useState<number>(0)
    const [percentCorrectQuestions, setPercentCorrectQuestions] = useState<number>(0)
    const [countGamesQuestions, setCountGamesQuestions] = useState<any>(1)
    const [resultQuestions, setResultQuestions] = useState<any>([])

    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const { gameQuestions }: any = useAppSelector(state => state.questions)
    const { user }: any = useAppSelector(state => state.user)
    const { type }: any = useAppSelector(state => state.types)

    useEffect(() => {
        dispatch(fetchGetIdQuestion(id))
        dispatch(fetchGetIdType(user.id, id))
    }, [])

    useEffect(() => {
        setCountGamesQuestions(gameQuestions.length)
        const random = Math.floor(Math.random() * gameQuestions.length)
        const randomGameQuestion = gameQuestions[random]
        setGameQuestion(randomGameQuestion)
        const filteredGameQuestions = gameQuestions.filter((item: any) => item.id !== randomGameQuestion.id)
        if (randomGameQuestion) {
            let objQuestion = { id: randomGameQuestion.id, question: randomGameQuestion.question, status: false }
            resultQuestions.push(objQuestion)
        }
        setGamesQuestions(filteredGameQuestions)
    }, [gameQuestions])

    const randomQuestion = (str: string) => {
        const random = Math.floor(Math.random() * gamesQuestions.length)
        const randomGameQuestion = gamesQuestions[random]
        setGameQuestion(randomGameQuestion)
        const filteredGameQuestions = gamesQuestions.filter((item: any) => item.id !== randomGameQuestion.id)
        if (randomGameQuestion) {
            if (str === 'correct') {
                let objQuestion = { id: randomGameQuestion.id, question: randomGameQuestion.question, status: true }
                resultQuestions.push(objQuestion)
            } else {
                let objQuestion = { id: randomGameQuestion.id, question: randomGameQuestion.question, status: false }
                resultQuestions.push(objQuestion)
            }
        }
        setGamesQuestions(filteredGameQuestions)
        setCountGamesQuestions(countGamesQuestions - 1)
        if (str === 'correct') {
            setCorrectQuestions(correctQuestions + 1)
        }
    }

    useEffect(() => {
        let precent = correctQuestions / gameQuestions.length * 100
        setPercentCorrectQuestions(Math.round(precent))
    }, [correctQuestions])

    const goHome = () => {
        dispatch(fetchPostBasket(percentCorrectQuestions, type.title, type.id, user.id, resultQuestions))
        dispatch(fetchGetIdQuestionStateUpdated())
        navigate('/')
    }

    return (
        <div className='start-questions-game__content'>
            <div className='start-questions-game__block'>
                {countGamesQuestions > 0 ?
                    <div className='start-questions-random__blcok'>
                        {!checkRotate
                            ?
                            <div className='start-question__random'>
                                <div className='start-question-random__answer' onClick={() => setCheckRotate(!checkRotate)}>
                                    <span>{!gameQuestion ? <></> : gameQuestion.question}</span>
                                </div>
                                <div className='start-question-random__btns'>
                                    <button onClick={() => randomQuestion('correct')} className='start-question-random__check'><CheckOutlined /></button>
                                    <button onClick={() => randomQuestion('incorrect')} className='start-question-random__close'><CloseOutlined /></button>
                                </div>
                            </div>
                            :
                            <div className='start-question__random-back'>
                                <div className='start-question-random__answer' onClick={() => setCheckRotate(!checkRotate)}>
                                    <span>{!gameQuestion ? <></> : gameQuestion.answer}</span>
                                </div>
                            </div>
                        }
                    </div>
                    :
                    <Result
                        icon={percentCorrectQuestions < 40 ? <FrownOutlined /> : percentCorrectQuestions < 70 ? <MehOutlined /> : <SmileOutlined />}
                        title={percentCorrectQuestions < 40 ? `You are very stupid, try again - ${percentCorrectQuestions}%` : percentCorrectQuestions < 70 ? `Not bad, but you can do better - ${percentCorrectQuestions}%` : `So that I don't see you here again, smart man - ${percentCorrectQuestions}%`}
                        extra={<Button onClick={goHome} type="primary">Go Home</Button>}
                    />
                }
            </div>
        </div>
    )
}

export default StartQuestionsGame