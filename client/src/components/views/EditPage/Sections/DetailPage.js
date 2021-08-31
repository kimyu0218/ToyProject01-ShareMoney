import React, { useEffect, useState } from 'react'
import { useDispatch } from "react-redux";
import { getPublicDetail } from '../../../../_actions/public_action';

import { Card, Col, Row, Statistic, Popover, InputNumber } from 'antd';
import { UpOutlined, DownOutlined, MinusOutlined } from '@ant-design/icons';
import { ResponsivePie } from '@nivo/pie'

function DetailPage(props) {

    const dispatch = useDispatch()

    const [Cost, setCost] = useState(0)
    const [Personnel, setPersonnel] = useState(0)
    const [Companions, setCompanions] = useState([])
    const [Contributions, setContributions] = useState([])
    const [Load, setLoad] = useState(false)

    useEffect(() => {

        let body= { travel_id: props.match.params.travel_id }

        dispatch(getPublicDetail(body)) // 여행 공동 소비 내역 가져오기
            .then(response => {
                if (response.payload.success) {
                    setCost(response.payload.data.cost)
                    setCompanions(response.payload.data.persons)
                    setContributions(response.payload.data.contributions)
                    var tmp = response.payload.data.persons
                    setPersonnel(tmp.length)
                    setLoad(true)
                } else {
                    return alert("Falied to load")
                }
            })
    }, [])

    const getContribution = (contribution) => { // 기여도 출력하기
        return (
            <InputNumber
                size="small" bordered={false}
                formatter={value => `${value} ₩`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                readOnly={true}
                value={contribution}
            />
        )
    }

    const renderCompanions = Companions.map((companion, index) => { // 여행자 출력하기

        if(Cost/Personnel < Contributions[index]) { // 돈을 더 받아야 하는 사람
            return (
                <Col xs={{ span: 12 }} lg={{ span: 8 }}>
                <Popover content={getContribution(Math.round(Contributions[index]))} title="Amout paid">
                    <Card>
                    <Statistic
                            title={`${companion}`}
                            value={Contributions[index]-Cost/Personnel}
                            precision={0}
                            valueStyle={{ color: '#3f8600', fontSize: '1.2rem' }}
                            prefix={<UpOutlined />}
                            suffix="₩"
                        /> 
                    </Card>
                </Popover>
                </Col>
            )
        }
        else if(Cost/Personnel === Contributions[index]) {
            return (
                <Col xs={{ span: 12 }} lg={{ span: 8 }}>
                <Popover content={getContribution(Math.round(Contributions[index]))} title="Amout paid" >
                    <Card >
                    <Statistic
                            title={`${companion}`}
                            value={0}
                            precision={0}
                            valueStyle={{ color: '#1890ff', fontSize: '1.2rem' }}
                            prefix={<MinusOutlined />}
                            suffix="₩"
                        /> 
                    </Card>
                </Popover>
                </Col>
            )
        }
        else { // 돈을 더 내야하는 사람
            return (
                <Col xs={{ span: 12 }} lg={{ span: 8 }}>
                <Popover content={getContribution(Math.round(Contributions[index]))} title="Amout paid">
                    <Card >
                    <Statistic
                            title={`${companion}`}
                            value={Cost/Personnel-Contributions[index]}
                            precision={0}
                            valueStyle={{ color: '#cf1322', fontSize: '1.2rem' }}
                            prefix={<DownOutlined />}
                            suffix="₩"
                        /> 
                    </Card>
                </Popover>
                </Col>
            )
        }
    })

    const showGraph = (companions, contributions) => {
        let data = []
        for(let i = 0; i < companions.length; i++){
            data.push({
                id: companions[i],
                label: companions[i],
                value: contributions[i]
            })
        }

        return (
            <ResponsivePie
                data={data}
                margin={{ top: 20, right: 40, bottom: 20, left: 40 }}
                innerRadius={0.5} padAngle={1} cornerRadius={3}
                activeOuterRadiusOffset={8}
                colors={{ scheme: 'blues' }}
                borderWidth={1} borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
                sortByValue={true}
                arcLinkLabelsSkipAngle={10}
                arcLinkLabelsTextColor={{ theme: 'background' }}
                arcLinkLabelsThickness={2}
                arcLinkLabelsColor={{ theme: 'background' }}
                arcLabelsSkipAngle={10}
                arcLabel="id"
                arcLabelsTextColor={{ from: 'color', modifiers: [ [ 'darker', 2 ] ] }}
            />
        )
    }
    return (
        <div style={{
            textAlign: 'center', margin: '0 auto', paddingTop: '20px', 
            width: '90%', height: '80vh', overflow: 'auto'
        }}> 
            <div style={{ fontFamily: 'BlackHanSans', fontSize: '24px' }}>{props.match.params.travel_id}</div>
            <div className="site-card-wrapper" style={{ marginTop: '20px'}}>
                <Row gutter={[0, 16]}>
                    {Load && renderCompanions}
                </Row>
            </div>
            <div style={{ width: '90%', height: '50%', margin: '0 auto' }}>
                {Load && showGraph(Companions, Contributions)}
            </div>
        </div>
    )
}

export default DetailPage