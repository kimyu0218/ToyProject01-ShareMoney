import React, { useState, useEffect } from 'react'
import { useDispatch } from "react-redux";
import { findTravel, deleteTravel } from '../../../_actions/travel_action';

import { Card, Col, Row, Tag } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import './EditPage.css'

function EditPage(props) {

    const dispatch = useDispatch()

    const [MyTravels, setMyTravels] = useState([])
    const [Load, setLoad] = useState(false)

    useEffect(() => {
        loadTravels()
    }, [])

    const loadTravels = () => {

        let body = { user_id: localStorage.getItem('userId') }

        dispatch(findTravel(body))
            .then(response => {
                if (response.payload.success) {
                    setMyTravels(response.payload.travels)
                    setLoad(true)
                } else {
                    return alert("Falied to load")
                }
            })
    }

    const Edit = (travelId) => {
        localStorage.setItem('edit', true)
        localStorage.setItem('travelId', travelId)
        props.history.push('/expense')
    }

    const Delete = (id, persons_) => {

        let index = persons_.indexOf(localStorage.getItem('userId'))
        persons_.splice(index, 1)

        let body = { 
            _id: id,
            persons: persons_
        }

        dispatch(deleteTravel(body))
            .then(response => {
                if (response.payload.success) {
                    loadTravels()
                } else {
                    return alert("Falied to delete")
                }
            })
    }

    const printCompanions = (persons) => {
        return (
            persons.map((person) => {
                return ( <Tag color="green"> {person} </Tag> )
            })
        )
    }

    const renderTravels = (travels) => {

        travels.sort(function(a, b) {
            return a.date[1] > b.date[1] ? -1 : a.date[1] < b.date[1] ? 1 : 0
        })

        return travels.map((travel) => {
            return (
                <Col span={12}>
                    <Card 
                        title={`${travel.travel_id}`}
                        hoverable
                        bordered={false}
                        extra={<a href={`/detail/${travel.travel_id}`}>More</a>}
                        headStyle={{ fontWeight: 'bold', backgroundColor: '#fafafa' }}
                        size="small"
                        style={{ textAlign: 'left', lineHeight: '200%' }}
                        actions={[
                            <EditOutlined key="edit" onClick={() => Edit(travel.travel_id)} />,
                            <DeleteOutlined key="delete" onClick={() => Delete(travel._id, travel.persons)}/>,
                        ]}
                    >   
                        <div style={{ color: 'gray', textAlign: 'right', fontSize: '12px' }}>
                            {travel.date[0]}&nbsp;~&nbsp;{travel.date[1]}
                        </div>
                        <Tag color="geekblue">{travel.destination}</Tag>
                        <Tag color="orange">{travel.personnel}명</Tag>
                        <br />
                        {printCompanions(travel.persons)}
                    </Card>
                </Col>
            )
        })
    }

    return (
        <div style={{
            textAlign: 'center', margin: '0 auto', paddingTop: '20px', 
            width: '90%', height: '80vh', overflow: 'auto'
        }}> 
            <div id="title">
                나의 여행
            </div>
            <div className="site-card-wrapper" style={{ marginTop: '20px'}}>
                <Row gutter={[0, 16]}>
                    {Load && renderTravels(MyTravels)}
                </Row>
            </div>
        </div>
    )
}

export default EditPage