import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { fetchGetIdQuestion } from '../store/reducers/ActionCreators'
import { CheckOutlined, CloseOutlined, SmileOutlined, MehOutlined, FrownOutlined, ConsoleSqlOutlined } from '@ant-design/icons'
import { Button, Result } from 'antd'

const StartQuestionsGame: React.FC = () => {
    const [checkRotate, setCheckRotate] = useState<boolean>(false)
    const [gamesQuestions, setGamesQuestions] = useState<any>([])
    const [gameQuestion, setGameQuestion] = useState<any>()
    const [correctQuestions, setCorrectQuestions] = useState<number>(0)
    const [precentCorrectQuestions, setPresentCorrectQuestions] = useState<number>(0)
    const [countGamesQuestions, setCountGamesQuestions] = useState<any>(1)

    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const { gameQuestions }: any = useAppSelector(state => state.questions)

    useEffect(() => {
        dispatch(fetchGetIdQuestion(id))
    }, [])

    useMemo(() => {
        setCountGamesQuestions(gameQuestions.length)
        const random = Math.floor(Math.random() * gameQuestions.length)
        const randomGameQuestion = gameQuestions[random]
        setGameQuestion(randomGameQuestion)
        const filteredGameQuestions = gameQuestions.filter((item: any) => item.id !== randomGameQuestion.id)
        setGamesQuestions(filteredGameQuestions)
    }, [gameQuestions])

    const randomQuestion = (str: string) => {
        const random = Math.floor(Math.random() * gamesQuestions.length)
        const randomGameQuestion = gamesQuestions[random]
        setGameQuestion(randomGameQuestion)
        const filteredGameQuestions = gamesQuestions.filter((item: any) => item.id !== randomGameQuestion.id)
        setGamesQuestions(filteredGameQuestions)
        setCountGamesQuestions(countGamesQuestions - 1)
        if (str === 'correct') {
            setCorrectQuestions(correctQuestions + 1)
        }
    }

    useEffect(() => {
        let precent = correctQuestions / gameQuestions.length * 100
        setPresentCorrectQuestions(Math.round(precent))
    }, [correctQuestions])

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
                        icon={precentCorrectQuestions < 40 ? <FrownOutlined /> : precentCorrectQuestions < 70 ? <MehOutlined /> : <SmileOutlined />}
                        title={precentCorrectQuestions < 40 ? `You are very stupid, try again - ${precentCorrectQuestions}%` : precentCorrectQuestions < 70 ? `Not bad, but you can do better - ${precentCorrectQuestions}%` : `So that I don't see you here again, smart man - ${precentCorrectQuestions}%`}
                        extra={<Button onClick={() => navigate('/')} type="primary">Go Home</Button>}
                    />
                }
            </div>
        </div>
    )
}

export default StartQuestionsGame