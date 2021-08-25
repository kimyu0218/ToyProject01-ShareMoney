import React from 'react'
import { Link } from 'react-router-dom'

import { Result, Button } from 'antd';

function SuccessJoin(props) {
    return (
        <Result
            status="success"
            title="Successfully Join the Travel!"
            extra={[
            <Link to="../edit">
                <Button type="primary" key="console">
                    Go to My Travels
                </Button>
            </Link>
            ]}
        />
    )
}

export default SuccessJoin