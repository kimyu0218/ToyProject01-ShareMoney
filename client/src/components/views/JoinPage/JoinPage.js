import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import { generateTravel, joinTravel } from '../../../_actions/travel_action';

import { Form, Input, Button } from 'antd';
import 'antd/dist/antd.css';

function JoinPage(props) {

    const dispatch = useDispatch();

    const [TravelId, setTravelId] = useState("");
    const onTravelIdHandler = (event) => { setTravelId(event.currentTarget.value); }

    const onSubmitHandler = (event) => {
        event.preventDefault();
        
        let body = { travel_id: TravelId }

        dispatch(joinTravel(body))
            .then(response => {
                if (response.payload.success) {

                    localStorage.setItem('country', response.payload.data.destination)

                    let generate = {
                        destination: localStorage.getItem('country'),
                        travel_id: response.payload.data.travel_id,
                        personnel: response.payload.data.personnel,
                        owner: localStorage.getItem('userId')
                    }
                    
                    generateHandler(generate)

                } else {
                    return alert( "존재하지 않는 아이디입니다.")
                }
            })
    }

    const generateHandler = (body) => {

        dispatch(generateTravel(body))
            .then(response => {
                if (response.payload.success) {
                    props.history.push('/main')
                } else {
                    return alert("Failed to generate")
                }
            })
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
            width: '100%', height: '80vh'
        }}>
            <Form
                {...formItemLayout}
                name="join"
                onFinish={onSubmitHandler}
                scrollToFirstError
                >
                
                <Form.Item
                    name="travelId"
                    label="Travel Id"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your Travel Id!',
                    },
                    ]}
                >
                    <Input value={TravelId} onChange={onTravelIdHandler}/>
                </Form.Item>

                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit" onClick={onSubmitHandler} style={{ width: '100%' }}>
                    Join
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
    
}

export default JoinPage