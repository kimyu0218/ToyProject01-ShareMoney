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

        dispatch(joinTravel(body)) // 여행 ID로 여행에 join 하기
            .then(response => {
                if (response.payload.success) {

                    // 여행 ID 등록 여부 검사하기
                    var persons_ = response.payload.data.persons
                    for(let i = 0; i < persons_.length; i++){
                        if(persons_[i] === sessionStorage.getItem('userId')) { // 이미 등록한 경우 내 여행 정보 페이지로 이동
                            alert('This ID has already been added. Go to the My Travels page.')
                            props.history.push('/edit')
                        }
                    }
                    persons_.push(sessionStorage.getItem('userId')) 

                    // 여행 인원 초과 여부 검사하기
                    if(persons_.length > response.payload.data.personnel) 
                        return alert('The number of people has been exceeded.')

                    let edit = {
                        travel_id: TravelId,
                        persons: persons_
                    }
                    editHandler(edit, response.payload.data.currency_unit) // 여행 join
                } else {
                    return alert("This ID does not exist.")
                }
            })
    }

    const editHandler = (body, currencyCode) => {

        dispatch(editPersons(body))
            .then(response => {
                if (response.payload.success) { // 여행 join -> 여행 경비 등록 페이지로 이동
                    sessionStorage.setItem('join', true)
                    props.history.push(`/expense/${TravelId}/${currencyCode}`)
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