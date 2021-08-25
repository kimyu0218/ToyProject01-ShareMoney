import React, { useState, useEffect } from 'react'
import { useDispatch } from "react-redux";
import { findTravel, deleteTravel } from '../../../_actions/travel_action';

import { Card, Col, Row } from 'antd';
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

    const renderTravels = MyTravels.map((travel, index) => {
        return (
            <Col span={12}>
                <Card 
                    title={`${travel.travel_id}`}
                    hoverable
                    bordered={false}
                    extra={<a href={`/detail/${travel.travel_id}`}>More</a>}
                    headStyle={{ fontWeight: 'bold' }}
                    size="small"
                    style={{ textAlign: 'left' }}
                    actions={[
                        <EditOutlined key="edit" onClick={() => Edit(travel.travel_id)}/>,
                        <DeleteOutlined key="delete" onClick={() => Delete(travel._id, travel.persons)}/>,
                    ]}
                >
                    <Card.Grid 
                        hoverable={false}
                        style={{ width: '40%', padding: '5px 10px', overflow: 'hidden' }}
                    >
                        Country
                    </Card.Grid>
                    <Card.Grid 
                        hoverable={false}
                        style={{ width: '60%', padding: '5px 10px', overflow: 'hidden' }}
                    >
                        {travel.destination}
                    </Card.Grid>
                    <Card.Grid
                        hoverable={false}
                        style={{ width: '40%', padding: '5px 10px', overflow: 'hidden' }}
                    >
                        Personnel
                    </Card.Grid>
                    <Card.Grid 
                        hoverable={false}
                        style={{ width: '60%', padding: '5px 10px', overflow: 'hidden' }}
                    >
                        {travel.personnel}
                    </Card.Grid>
                </Card>
            </Col>
        )
    })

    return (
        <div style={{
            textAlign: 'center', margin: '0 auto', paddingTop: '20px', 
            width: '90%', height: '80vh'
        }}> 
            <div id="title">
                나의 여행
            </div>
            <div className="site-card-wrapper" style={{ marginTop: '20px'}}>
            <Row gutter={[0, 16]}>
                {Load && renderTravels}
            </Row>
            </div>
        </div>
    )
}

export default EditPage