import React from 'react'
import { Link } from 'react-router-dom'

import { Result, Button } from 'antd';

function SuccessGenerate(props) {
    return (
        <Result
            status="success"
            title="Successfully Generate a New Travel!"
            subTitle={`'${localStorage.getItem('travelId')}' is generated`}
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

export default SuccessGenerate
