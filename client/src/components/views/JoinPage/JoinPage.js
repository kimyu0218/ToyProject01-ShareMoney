import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import { joinTravel, editPersons } from '../../../_actions/travel_action';

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
                    var persons_ = response.payload.data.persons
                    for(let i = 0; i < persons_.length; i++){
                        if(persons_[i] === localStorage.getItem('userId')) {
                            alert('이미 추가한 아이디입니다. Edit 페이지로 이동합니다.')
                            props.history.push('/edit')
                        }
                    }
                    persons_.push(localStorage.getItem('userId'))

                    if(persons_.length > response.payload.data.personnel) 
                        return alert('해당 인원 수를 초과했습니다.')

                    let edit = {
                        travel_id: TravelId,
                        persons: persons_
                    }
                    editHandler(edit)
                } else {
                    return alert( "존재하지 않는 아이디입니다.")
                }
            })
    }

    const editHandler = (body) => {

        dispatch(editPersons(body))
            .then(response => {
                if (response.payload.success) {
                    localStorage.setItem('join', true)
                    props.history.push('/expense')
                } else {
                    return alert("Failed to edit")
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