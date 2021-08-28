import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { generateTravel, checkDuplicateTravelId } from '../../../_actions/travel_action';

import { Form, Input, Button, DatePicker } from 'antd';
import 'antd/dist/antd.css';

function GeneratePage(props) {

    const dispatch = useDispatch();

    const [Destination, setDestination] = useState("");
    const [Available, setAvailable] = useState([]);
    const [TravelId, setTravelId] = useState("");
    const [Personnel, setPersonnel] = useState();
    const [Date, setDate] = useState([]);

    const onDestinationHandler = (event) => { setDestination(event.currentTarget.value); }
    const onTravelIdHandler = (event) => { setTravelId(event.currentTarget.value); }
    const onPersonelHandler= (event) => { setPersonnel(Number(event.currentTarget.value)); }
    const onDateHandler = (date, dateString) => { setDate(dateString); }

    const getCurrencyCode = () => { // 나라 정보 가져오기
        fetch('http://restcountries.eu/rest/v2/all')
            .then(response => response.json())
            .then(response => {
                setAvailable(response)
            })
    }

    useEffect(() => {
        getCurrencyCode()
    }, [])
    
    // 유효한 나라 이름인지 확인하기
    const exist = (country) => {
        if(country.name === Destination)
            return true
    }
    const onSearch = () => { return Available.find(exist) }

    const onSubmitHandler = (event) => {
        event.preventDefault();
        
        let currencies = ""
        currencies = onSearch().currencies

        if(currencies === "") return alert("Country not found.")
        else {
            let currencyCode = ""
            if(currencies.length > 1) {
                for(let i = 0; i < currencies.length; i++) {
                    if(Destination === currencies[i].name.split(" ")[0]) {
                        currencyCode = currencies[i].code
                        break
                    }
                }
            }
            else currencyCode = currencyCode[0].code
            
            let check = { travel_id: TravelId }
            
            dispatch(checkDuplicateTravelId(check)) // 아이디 중복 체크
                .then(response => {
                    if (!response.payload.permit) {
                        return alert("This ID is not available.")
                    }
                })

            let body = {
                destination: Destination,
                travel_id: TravelId,
                personnel: Personnel,
                currency_unit: currencyCode,
                persons: [sessionStorage.getItem('userId')],
                date: Date
            }

            dispatch(generateTravel(body)) 
                .then(response => {
                    if (response.payload.success) { // 여행 정보 생성 -> 여행 경비 등록 페이지로 이동
                        props.history.push(`/expense/${TravelId}/${currencyCode}`)
                    } else {
                        return alert("Failed to generate")
                    }
                })
        }
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