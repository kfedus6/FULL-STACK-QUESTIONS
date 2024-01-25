import React from 'react'
import { Progress, Space, Tooltip } from 'antd'

interface AccountProgressProgress {
    goodPercent: any;
    normalPercent: any;
    badPercent: any;
}

const AccountProgress: React.FC<AccountProgressProgress> = ({ goodPercent, normalPercent, badPercent }) => {
    return (
        <Space wrap>
            <Tooltip title="More than 80% of correct answers!">
                <Progress strokeLinecap="butt" strokeColor='green' type="dashboard" percent={goodPercent} />
            </Tooltip>
            <Tooltip title="More than 50% of correct answers!">
                <Progress strokeLinecap="butt" strokeColor='gold' type="dashboard" percent={normalPercent} />
            </Tooltip>
            <Tooltip title="Less than 50% of correct answers!">
                <Progress strokeLinecap="butt" strokeColor='red' type="dashboard" percent={badPercent} />
            </Tooltip>
        </Space>
    )
}

export default AccountProgress