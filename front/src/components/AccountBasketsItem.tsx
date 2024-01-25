import React from 'react'
import { Card, Dropdown } from 'antd'
import { DownOutlined, SmileOutlined, MehOutlined, FrownOutlined } from '@ant-design/icons'

const { Meta } = Card

interface AccountBasketsItemProps {
    sendIdBasket: (id: any) => void;
    idx: any;
    basket: any;
    items: any;
}

const AccountBasketsItem: React.FC<AccountBasketsItemProps> = ({ sendIdBasket, idx, basket, items }) => {
    return (
        <div key={idx} className='basket-dropdown' onClick={() => sendIdBasket(basket.id)}>
            <Dropdown menu={{ items }} trigger={['click']}>
                <Card
                    hoverable
                    onClick={(e) => e.preventDefault()} bordered={false}>
                    <Meta title={basket.title} />
                    <span className='basket-card__precent'>{basket.resultPercent < 50 ? <FrownOutlined /> : basket.resultPercent < 80 ? <MehOutlined /> : <SmileOutlined />} {`${basket.resultPercent}%`}</span>
                    <span className='basket-card__down'><DownOutlined /></span>
                </Card>
            </Dropdown>
        </div>
    )
}

export default AccountBasketsItem