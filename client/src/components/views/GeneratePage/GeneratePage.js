import React, { useState } from 'react'

import { Form, Input, Button } from 'antd';
import 'antd/dist/antd.css';

function GeneratePage() {

    const [Destination, setDestination] = useState("");
    const [TravelId, setTravelId] = useState("");

    const onDestinationHandler = (event) => { setDestination(event.currentTarget.value); }
    const onTravelIdHandler = (event) => { setTravelId(event.currentTarget.value); }

    const onSubmitHandler = () => {
        
        let body = {
            destination: Destination,
            travelId: TravelId
        }

        console.log(body)
    }

    const formItemLayout = {
        labelCol: { 
            xs: { span: 24, },
            sm: { span: 8, },
        },
        wrapperCol: { 
            xs: { span: 24, },
            sm: { span: 16, },
        },
    };
    const tailFormItemLayout = {
        wrapperCol: {
            xs: { span: 24, offset: 0, },
            sm: { span: 16, offset: 8, },
        },
    };

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height: '100vh'
        }}>
            <Form
                {...formItemLayout}
                name="join"
                onFinish={onSubmitHandler}
                scrollToFirstError
                >
                <Form.Item
                    name="travelDestination"
                    label="Destination"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your Destination!',
                    },
                    ]}
                >
                    <Input value={Destination} onChange={onDestinationHandler}/>
                </Form.Item>

                <Form.Item
                    name="travelId"
                    label="Travel Id"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your TravelId! It will be used to invite others.',
                    },
                    ]}
                >
                    <Input value={TravelId} placeholder="It will be used to invite others." onChange={onTravelIdHandler}/>
                </Form.Item>

                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit" onClick={onSubmitHandler} style={{ width: '100%' }}>
                    Generate
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default GeneratePage
