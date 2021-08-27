import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { generateTravel, checkDuplicateTravelId } from '../../../_actions/travel_action';

import { Form, Input, Button, DatePicker } from 'antd';
import 'antd/dist/antd.css';

function GeneratePage(props) {

    const dispatch = useDispatch();

    const [Destination, setDestination] = useState("");
    const [TravelId, setTravelId] = useState("");
    const [Personnel, setPersonnel] = useState();
    const [Date, setDate] = useState([]);

    const onDestinationHandler = (event) => { setDestination(event.currentTarget.value); }
    const onTravelIdHandler = (event) => { setTravelId(event.currentTarget.value); }
    const onPersonelHandler= (event) => { setPersonnel(Number(event.currentTarget.value)); }
    const onDateHandler = (date, dateString) => { setDate(dateString); }

    const countries = [
        "아랍에미리트", "호주", "바레인", "브루나이", "캐나다", "스위스",
        "덴마아크", "영국", "홍콩", "인도네시아", "일본", "한국", "쿠웨이트",
        "말레이지아", "노르웨이", "뉴질랜드", "사우디", "스웨덴", "싱가포르",
        "태국", "미국"
    ]

    const exist = (country) => {
        if(country === Destination) return true
    }
    const onSearch = () => { return countries.find(exist) }

    const onSubmitHandler = (event) => {
        event.preventDefault();
        
        if(!onSearch()) return alert("지원하지 않는 나라입니다.")

        let check = { travel_id: TravelId }
        
        dispatch(checkDuplicateTravelId(check))
            .then(response => {
                if (!response.payload.permit) {
                    return alert("사용할 수 없는 아이디입니다.")
                }
            })

        let body = {
            destination: Destination,
            travel_id: TravelId,
            personnel: Personnel,
            persons: [localStorage.getItem('userId')],
            date: Date
        }

        dispatch(generateTravel(body))
            .then(response => {
                if (response.payload.success) {
                    localStorage.setItem('country', Destination)
                    localStorage.setItem('travelId', TravelId)
                    props.history.push('/expense')
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
                name="generate"
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
                    <Input value={Destination} placeholder="Country" onChange={onDestinationHandler}/>
                </Form.Item>

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
                    <Input value={TravelId} placeholder="This will be used to invite others." onChange={onTravelIdHandler}/>
                </Form.Item>

                <Form.Item
                    name="personnel"
                    label="Personnel"
                    rules={[
                    {
                        required: true,
                        message: 'Please input Personnel!',
                    },
                    ]}
                >
                    <Input value={Personnel} onChange={onPersonelHandler}/>
                </Form.Item>

                <Form.Item
                    name="Itinerary"
                    label="Itinerary"
                    rules={[
                    {
                        required: true,
                        message: 'Please input Itinerary!',
                    },
                    ]}
                >
                    <DatePicker.RangePicker value={Date} onChange={onDateHandler}/>
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