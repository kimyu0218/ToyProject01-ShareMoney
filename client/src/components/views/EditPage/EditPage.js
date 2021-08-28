import React, { useState, useEffect } from 'react'
import { useDispatch } from "react-redux";
import { findTravel, deleteTravel } from '../../../_actions/travel_action';
import { getPublicDetail } from '../../../_actions/public_action';

import { Card, Col, Row, Tag, Badge } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

function EditPage(props) {

    const dispatch = useDispatch()

    const [MyTravels, setMyTravels] = useState([])
    const [NotComplete, setNotComplete] = useState([])
    const [Load, setLoad] = useState(false)

    useEffect(() => {
        loadTravels()
        setLoad(true)
    }, [])

    const loadTravels = () => { // 사용자 여행 정보 가져오기

        let body = { user_id: sessionStorage.getItem('userId') }

        dispatch(findTravel(body))
            .then(response => {
                if (response.payload.success) {
                    setMyTravels(response.payload.travels)
                    findNotComplete(response.payload.travels)
                } else {
                    return alert("Falied to load")
                }
            })
    }

    const findNotComplete = (travels) => { // 완료되지 않은 작업 개수 구하기

        for(let i = 0; i < travels.length; i++) { 

            let personnel = travels[i].personnel
            if(personnel !== travels[i].persons.length) { // 인원이 모자란 경우
                setNotComplete(NotComplete => [...NotComplete, travels[i]]) 
            }
            else { // 더치페이가 이루어지지 않은 경우
                let body = { travel_id: travels[i].travel_id }
                
                dispatch(getPublicDetail(body))
                    .then(response => {
                        if (response.payload.success) {
                            let avg = response.payload.data.cost / personnel
                            
                            for(let j = 0; j < personnel; j++) {
                                if(response.payload.data.contributions[j] !== avg) {
                                    setNotComplete(NotComplete => [...NotComplete, travels[i]])
                                    break
                                }
                            }
                        } 
                        else return alert("Falied to load")
                    })
            }
        }
    }

    const Edit = (travelId, unit) => { // 편집 버튼 클릭 -> 여행 경비 수정
        sessionStorage.setItem('edit', true)
        props.history.push(`/expense/${travelId}/${unit}`)
    }

    const Delete = (id, persons_) => { // 삭제 버튼 클릭 -> 여행 탈퇴

        let index = persons_.indexOf(sessionStorage.getItem('userId'))
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

    const printCompanions = (persons) => { // 여행 동료 출력
        return (
            persons.map((person) => {
                return ( <Tag color="green"> {person} </Tag> )
            })
        )
    }

    const renderTravels = (travels) => { // 사용자 여행 정보 출력하기

        travels.sort(function(a, b) { // 최신순으로 정렬
            return a.date[1] > b.date[1] ? -1 : a.date[1] < b.date[1] ? 1 : 0
        })

        return travels.map((travel) => {

            let flag = false
            for(let i = 0; i < sessionStorage.getItem('notComplete'); i++) {
                if(travel === NotComplete[i]) { 
                    flag = true
                    break
                }
            }

            return (
                <Col span={12}>
                    <Card 
                        title={`${travel.travel_id}`}
                        hoverable
                        bordered={false}
                        extra={<a href={`/detail/${travel.travel_id}/${travel.currency_unit}`}>More</a>}
                        headStyle={{ fontWeight: 'bold', backgroundColor: '#fafafa' }}
                        size="small"
                        style={{ textAlign: 'left', lineHeight: '200%' }}
                        actions={[
                            <EditOutlined key="edit" onClick={() => Edit(travel.travel_id, travel.currency_unit)} />,
                            <DeleteOutlined key="delete" onClick={() => Delete(travel._id, travel.persons)}/>,
                        ]}
                    >   
                        <div style={{ color: 'gray', textAlign: 'right', fontSize: '11.5px' }}>
                            {travel.date[0]}&nbsp;~&nbsp;{travel.date[1]}&nbsp;
                            {/* 완료되지 않은 작업 표시 */}{flag && <Badge status="processing" />}
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
            width: '95%', height: '80vh', overflow: 'auto'
        }}> 
            <div style={{ fontFamily: 'BlackHanSans', fontSize: '24px' }}>My Travels</div>
            <div className="site-card-wrapper" style={{ marginTop: '20px'}}>
                <Row gutter={[0, 16]}>
                    {Load && renderTravels(MyTravels)}
                </Row>
            </div>
        </div>
    )
}

export default EditPage