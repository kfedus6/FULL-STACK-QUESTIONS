import React, { useEffect } from 'react'
import { message } from 'antd'
import { useAppSelector } from '../hooks/redux'

const SuccessMessage: React.FC = () => {
    const [messageApi, contextHolder] = message.useMessage()

    const { successMessage, errorMessage, warningMessage }: any = useAppSelector(state => state.message)

    useEffect(() => {
        if (successMessage !== null) {
            messageApi.open({
                type: 'success',
                content: successMessage,
            })
        } else if (errorMessage !== null) {
            messageApi.open({
                type: 'error',
                content: errorMessage,
            })
        } else if (warningMessage !== null) {
            messageApi.open({
                type: 'warning',
                content: warningMessage,
            })
        }
    })

    return (
        <div>
            {contextHolder}
        </div>
    )
}

export default SuccessMessage