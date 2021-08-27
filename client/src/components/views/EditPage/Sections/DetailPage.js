import React, { useEffect, useState } from 'react'
import { useDispatch } from "react-redux";
import { getPublicDetail } from '../../../../_actions/public_action';

import { Card, Col, Row, Statistic, Popover, InputNumber } from 'antd';
import { UpOutlined, DownOutlined, MinusOutlined } from '@ant-design/icons';

function DetailPage(props) {

    const dispatch = useDispatch()

    const [Cost, setCost] = useState(0)
    const [Personnel, setPersonnel] = useState(0)
    const [Companions, setCompanions] = useState([])
    const [Contributions, setContributions] = useState([])
    const [Load, setLoad] = useState(false)

    useEffect(() => {

        let body= { travel_id: props.match.params.travel_id }

        dispatch(getPublicDetail(body))
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

    const getContribution = (contribution) => {
        return (
            <InputNumber
                size="small"
                bordered={false}
                formatter={value => `${value}원`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                readOnly={true}
                value={contribution}
            />
        )
    }

    const renderCompanions = Companions.map((companion, index) => {

        if(Cost/Personnel < Contributions[index]) {
            return (
                <Col xs={{ span: 12 }} lg={{ span: 8 }}>
                <Popover content={getContribution(Contributions[index])} title="납부 금액">
                    <Card>
                    <Statistic
                            title={`${companion}`}
                            value={Contributions[index]-Cost/Personnel}
                            precision={0}
                            valueStyle={{ color: '#3f8600', fontSize: '1.2rem' }}
                            prefix={<UpOutlined />}
                            suffix="원 미수령"
                        /> 
                    </Card>
                </Popover>
                </Col>
            )
        }
        else if(Cost/Personnel === Contributions[index]) {
            return (
                <Col xs={{ span: 12 }} lg={{ span: 8 }}>
                <Popover content={getContribution(Contributions[index])} title="납부 금액" >
                    <Card >
                    <Statistic
                            title={`${companion}`}
                            value={0}
                            precision={0}
                            valueStyle={{ color: '#1890ff', fontSize: '1.2rem' }}
                            prefix={<MinusOutlined />}
                            suffix="원"
                        /> 
                    </Card>
                </Popover>
                </Col>
            )
        }
        else {
            return (
                <Col xs={{ span: 12 }} lg={{ span: 8 }}>
                <Popover content={getContribution(Contributions[index])} title="납부 금액">
                    <Card >
                    <Statistic
                            title={`${companion}`}
                            value={Cost/Personnel-Contributions[index]}
                            precision={0}
                            valueStyle={{ color: '#cf1322', fontSize: '1.2rem' }}
                            prefix={<DownOutlined />}
                            suffix="원 미납"
                        /> 
                    </Card>
                </Popover>
                </Col>
            )
        }
    })

    return (
        <div style={{
            textAlign: 'center', margin: '0 auto', paddingTop: '20px', 
            width: '90%', height: '80vh', overflow: 'auto'
        }}> 
            <div id="title">{props.match.params.travel_id}</div>
            <div className="site-card-wrapper" style={{ marginTop: '20px'}}>
            <Row gutter={[0, 16]}>
                {Load && renderCompanions}
            </Row>
            </div>
        </div>
    )
}

export default DetailPage