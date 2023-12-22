import React from 'react'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

const Home: React.FC = () => {
    const navigate = useNavigate()

    return (
        <div className='home-block'>
            <div className='home-block__buttons'>
                <Button onClick={() => navigate('/startQuestion')} type='primary'>Start</Button>
                <Button onClick={() => navigate('/showQuestion')}>Show</Button>
            </div>
        </div>
    )
}

export default Home