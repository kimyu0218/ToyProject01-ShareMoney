import React from 'react'
import { Link } from 'react-router-dom'

import { Result, Button } from 'antd';

function SuccessEdit(props) {
    return (
        <Result
            status="success"
            title="Successfully Edit the Travel!"
            subTitle={`'${props.match.params.travel_id}' is edited`}
            extra={[
            <Link to="../../edit">
                <Button type="primary" key="console">
                    Go to My Travels
                </Button>
            </Link>
            ]}
        />
    )
}

export default SuccessEdit