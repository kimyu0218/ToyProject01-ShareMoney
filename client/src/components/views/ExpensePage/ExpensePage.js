import React, { useState, useEffect } from 'react'
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom"
import { saveConsumption, bringupConsumption, updateConsumption } from '../../../_actions/consumption_action'
import { savePublic, bringupPublic, updatePublic } from '../../../_actions/public_action'

import { Input, Button, InputNumber, Popover } from 'antd'
import { QuestionCircleOutlined, DollarCircleOutlined } from '@ant-design/icons'

import { API_URL, API_KEY } from './Sections/currency_api'

function ExpensePage(props) {

    const dispatch = useDispatch();

    const Join = sessionStorage.getItem('join')
    const Edit = sessionStorage.getItem('edit')

    const [Currency, setCurrency] = useState(0)
    const [LoadUnit, setLoadUnit] = useState(false)
    const [CurrencyUnit, setCurrencyUnit] = useState("")

    const [Cost, setCost] = useState(0)
    const [PreCost, setPreCost] = useState(0)

    const [Persons, setPersons] = useState([])
    const [Contributions, setContributions] = useState([])

    const [OwnTravelAccount, setOwnTravelAccount] = useState(0)
    const [OwnTravelAccount_Public, setOwnTravelAccount_Public] = useState(0)
    const [ForeignTravelAccount, setForeignTravelAccount] = useState(0)
    const [ForeignTravelAccount_Public, setForeignTravelAccount_Public] = useState(0)
    const [OwnCash, setOwnCash] = useState(0)
    const [OwnCash_Public, setOwnCash_Public] = useState(0)
    const [ForeignCash, setForeignCash] = useState(0)
    const [ForeignCash_Public, setForeignCash_Public] = useState(0)
    const [OwnCard, setOwnCard] = useState(0)
    const [OwnCard_Public, setOwnCard_Public] = useState(0)
    const [ForeignCard, setForeignCard] = useState(0)
    const [ForeignCard_Public, setForeignCard_Public] = useState(0)
    const [MyConsumption, setMyConsumption] = useState(0)
    const [PublicConsumption, setPublicConsumption] = useState(0)

    const onOwnTravelAccountHandler = (event) => { setOwnTravelAccount(Number(event.currentTarget.value)); }
    const onOwnTravelAccountHandler_Public = (event) => { setOwnTravelAccount_Public(Number(event.currentTarget.value)); }
    const onForeignTravelAccountHandler = (event) => { setForeignTravelAccount(Number(event.currentTarget.value)); }
    const onForeignTravelAccountHandler_Public = (event) => { setForeignTravelAccount_Public(Number(event.currentTarget.value)); }
    const onOwnCashHandler = (event) => { setOwnCash(Number(event.currentTarget.value)); }
    const onOwnCashHandler_Public = (event) => { setOwnCash_Public(Number(event.currentTarget.value)); }
    const onForeignCashHandler = (event) => { setForeignCash(Number(event.currentTarget.value)); }
    const onForeignCashHandler_Public = (event) => { setForeignCash_Public(Number(event.currentTarget.value)); }
    const onOwnCardHandler = (event) => { setOwnCard(Number(event.currentTarget.value)); }
    const onOwnCardHandler_Public = (event) => { setOwnCard_Public(Number(event.currentTarget.value)); }
    const onForeignCardHandler = (event) => { setForeignCard(Number(event.currentTarget.value)); }
    const onForeignCardHandler_Public = (event) => { setForeignCard_Public(Number(event.currentTarget.value)); }

    useEffect( () => {

        if(Edit === "true") { // Edit ??????
            bringCon()
            bringPub()
        }
        else if(Join === "true") { // Join ??????
            bringPub()
        }
        
        setCurrencyUnit(props.match.params.currency_code) // ?????? ?????? ????????????
        setLoadUnit(true)

        fetch(`${API_URL}/${API_KEY}/latest/${props.match.params.currency_code}`) // ?????? ????????????
            .then(response => response.json())
            .then(response => {
                setCurrency(response.conversion_rates["KRW"])
            })

    }, []);

    const bringCon = () => { // Consumption ?????? ???????????? (Edit ??????)

        let con = {
            user_id: sessionStorage.getItem('userId'),
            travel_id: props.match.params.travel_id
        }
        
        dispatch(bringupConsumption(con)) // ?????? ?????? ?????? ????????????
            .then(response => {
                if (response.payload.success) {
                    setOwnTravelAccount(response.payload.data.own_travel_account)
                    setOwnTravelAccount_Public(response.payload.data.own_travel_account_pub)
                    setForeignTravelAccount(response.payload.data.foreign_travel_account)
                    setForeignTravelAccount_Public(response.payload.data.foreign_travel_account_pub)
                    setOwnCash(response.payload.data.own_cash)
                    setOwnCash_Public(response.payload.data.own_cash_pub)
                    setForeignCash(response.payload.data.foreign_cash)
                    setForeignCash_Public(response.payload.data.foreign_cash_pub)
                    setOwnCard(response.payload.data.own_card)
                    setOwnCard_Public(response.payload.data.own_card_pub)
                    setForeignCard(response.payload.data.foreign_card)
                    setForeignCard_Public(response.payload.data.foreign_card_pub)
                    setPreCost(response.payload.data.own_travel_account_pub+response.payload.data.foreign_travel_account_pub
                            +response.payload.data.own_cash_pub+response.payload.data.foreign_cash_pub
                            +response.payload.data.own_card_pub+response.payload.data.foreign_card_pub)
                } else {
                    return alert("Failed to bring up my consumption")
                }
            })
    }

    const bringPub = () => { // Public ?????? ???????????? (Edit ??????, Join ??????)

        let pub = { travel_id: props.match.params.travel_id }
        
        dispatch(bringupPublic(pub)) // ?????? ?????? ?????? ????????????
            .then(response => {
                if (response.payload.success) {
                    setCost(response.payload.data.cost)
                    setPersons(response.payload.data.persons)
                    setContributions(response.payload.data.contributions)
                } else {
                    return alert("Failed to bring up public")
                }
            })
    }

    // ??? ?????? ?????? ????????????
    const onCompute = () => {
        let sum = OwnTravelAccount + ForeignTravelAccount * Currency
                + (OwnCash+OwnCard) 
                + (ForeignCard+ForeignCash) * Currency
        setMyConsumption(Math.round(sum))
    }

    // ?????? ?????? ?????? ????????????
    const onCompute_Public = () => {
        let sum = (OwnTravelAccount_Public-OwnTravelAccount)
                 + (ForeignTravelAccount_Public-ForeignTravelAccount) * Currency
                + (OwnCash_Public+OwnCard_Public) 
                + (ForeignCard_Public+ForeignCash_Public) * Currency
        setPublicConsumption(Math.round(sum))
    }

    // ?????? ?????? DB??? ????????????
    const onSave = (event) => {
        event.preventDefault();

        if(Edit === "true") { // Edit ??????
            updateEdit()
            sessionStorage.setItem('edit', false)
            props.history.push(`/edit/success/${props.match.params.travel_id}`)
        }
        else if(Join === "true") { // Join ??????
            updateJoin()
            sessionStorage.setItem('join', false)
            props.history.push(`/join/success/${props.match.params.travel_id}`)
        }
        else {  // Generate ??????
            initial()
            props.history.push(`/generate/success/${props.match.params.travel_id}`)
        } 
    }

    const initial = () => { // Consumption??? Public ?????? ???????????? (Generate ??????)

        let con = { 
            user_id: sessionStorage.getItem('userId'),
            travel_id: props.match.params.travel_id,
            own_travel_account: OwnTravelAccount,
            own_travel_account_pub: OwnTravelAccount_Public,
            foreign_travel_account: ForeignTravelAccount,
            foreign_travel_account_pub: ForeignTravelAccount_Public,
            own_cash: OwnCash,
            own_cash_pub: OwnCash_Public,
            foreign_cash: ForeignCash,
            foreign_cash_pub: ForeignCash_Public,
            own_card: OwnCard,
            own_card_pub: OwnCard_Public,
            foreign_card: ForeignCard,
            foreign_card_pub: ForeignCard_Public
        }

        dispatch(saveConsumption(con)) // ?????? ?????? ?????? ????????????
            .then(response => {
                if (!response.payload.success) {
                    return alert("Failed to generate")
                }
            })
        
        // ?????? ?????? ?????? ????????????
        let sum = (OwnTravelAccount_Public-OwnTravelAccount) 
                + (ForeignTravelAccount_Public-ForeignTravelAccount) * Currency
                + OwnCash_Public + ForeignCash_Public * Currency
                + OwnCard_Public + ForeignCard_Public * Currency

        let pub = { 
            travel_id: props.match.params.travel_id,
            cost: sum,
            persons: [sessionStorage.getItem('userId')],
            contributions: [sum]
        }

        dispatch(savePublic(pub)) // ?????? ?????? ?????? ????????????
            .then(response => {
                if (!response.payload.success) {
                    return alert("Failed to generate")
                }
            })
    }

    const updateEdit = () => { // Consumption??? Public ?????? ???????????? (Edit ??????)

        let con = { 
            user_id: sessionStorage.getItem('userId'),
            travel_id: props.match.params.travel_id,
            own_travel_account: OwnTravelAccount,
            own_travel_account_pub: OwnTravelAccount_Public,
            foreign_travel_account: ForeignTravelAccount,
            foreign_travel_account_pub: ForeignTravelAccount_Public,
            own_cash: OwnCash,
            own_cash_pub: OwnCash_Public,
            foreign_cash: ForeignCash,
            foreign_cash_pub: ForeignCash_Public,
            own_card: OwnCard,
            own_card_pub: OwnCard_Public,
            foreign_card: ForeignCard,
            foreign_card_pub: ForeignCard_Public
        }

        dispatch(updateConsumption(con))
            .then(response => {
                if (!response.payload.success) {
                    return alert("Failed to edit")
                }
            })
        
        // ?????? ?????? ?????? ????????????
        let cost_ = (Cost - PreCost) 
                + (OwnTravelAccount_Public-OwnTravelAccount) 
                + (ForeignTravelAccount_Public-ForeignTravelAccount) * Currency
                + OwnCash_Public + ForeignCash_Public * Currency
                + OwnCard_Public + ForeignCard_Public * Currency
        
        var persons_ = Persons
        var index = 0;
        for(let i = 0; i < persons_.length; i++) {
            if(persons_[i] === sessionStorage.getItem('userId')) {
                index = i;
                break
            }
        }

        // ????????? ????????? ????????????
        let contribution = (OwnTravelAccount_Public - OwnTravelAccount)
                        + (ForeignTravelAccount_Public-ForeignTravelAccount) * Currency
                        + OwnCash_Public + ForeignCash_Public * Currency
                        + OwnCard_Public + ForeignCard_Public * Currency
        var contributions_ = Contributions
        contributions_[index] = contribution // ?????? ????????? ????????? ????????????
        
        let pub = { 
            travel_id: props.match.params.travel_id,
            cost: cost_,
            persons: persons_,
            contributions: contributions_
        }

        dispatch(updatePublic(pub)) // ?????? ?????? ?????? ????????????
            .then(response => {
                if (!response.payload.success) {
                    return alert("Failed to edit")
                }
            })
    }

    const updateJoin = () => { // Consumption ?????? & Public ???????????? (Join ??????)

        let con = { 
            user_id: sessionStorage.getItem('userId'),
            travel_id: props.match.params.travel_id,
            own_travel_account: OwnTravelAccount,
            own_travel_account_pub: OwnTravelAccount_Public,
            foreign_travel_account: ForeignTravelAccount,
            foreign_travel_account_pub: ForeignTravelAccount_Public,
            own_cash: OwnCash,
            own_cash_pub: OwnCash_Public,
            foreign_cash: ForeignCash,
            foreign_cash_pub: ForeignCash_Public,
            own_card: OwnCard,
            own_card_pub: OwnCard_Public,
            foreign_card: ForeignCard,
            foreign_card_pub: ForeignCard_Public
        }

        dispatch(saveConsumption(con)) // ?????? ?????? ?????? ????????????
            .then(response => {
                if (!response.payload.success) {
                    return alert("Failed to generate")
                }
            })
        
        // ?????? ?????? ?????? ????????????
        let cost_ = Cost 
                + (OwnTravelAccount_Public-OwnTravelAccount)
                + (ForeignTravelAccount_Public-ForeignTravelAccount) * Currency
                + OwnCash_Public + ForeignCash_Public * Currency
                + OwnCard_Public + ForeignCard_Public * Currency

        var persons_ = Persons
        persons_.push(sessionStorage.getItem('userId')) // ????????? join
        
        // ????????? ????????? ????????????
        let contribution = (OwnTravelAccount_Public-OwnTravelAccount)
                        + (ForeignTravelAccount_Public-ForeignTravelAccount) * Currency
                        + OwnCash_Public + ForeignCash_Public * Currency 
                        + OwnCard_Public + ForeignCard_Public * Currency
        var contributions_ = Contributions
        contributions_.push(contribution)

        let pub = { 
            travel_id: props.match.params.travel_id,
            cost: cost_,
            persons: persons_,
            contributions: contributions_
        }

        dispatch(updatePublic(pub)) // ?????? ?????? ?????? ????????????
            .then(response => {
                if (!response.payload.success) {
                    return alert("Failed to edit")
                }
            })
    }

    return (
        <div style={{
            textAlign: 'center', margin: '0 auto', paddingTop: '20px', 
            width: '100%', height: '80vh', fontFamily: 'Open-Sans'
        }}> 
            <div style={{ fontFamily: 'BlackHanSans', fontSize: '24px' }}>
                {props.match.params.travel_id}&nbsp;
                <Popover 
                    title="Currency"
                    content={`${Currency} KRW`}
                    arrowPointAtCenter
                    style={{ fontSize: '12px' }}
                >
                    <DollarCircleOutlined />
                </Popover>
            </div>
            {/* ????????? */}
            <div style={{ 
                margin: '0px auto', marginTop: '5px', padding: '5px',
                width: '300px', height: 'auto',
                backgroundColor: '#e6f7ff',
                borderRadius: '0.2em', fontSize: '12px'
            }}>Left: Personal / Right: Co-consumption
            </div>
            {/* ?????? ?????? */}
            <div style={{ 
                margin: '10px auto', paddingTop: '5px',
                width: '300px', height: 'auto',
                backgroundColor: '#bae7ff',
                borderRadius: '0.5em', fontSize: '12px'
            }}>
                <div style={{ fontSize: '14px', fontWeight: 'bold' }}>
                    Joint Bankbook&nbsp;&nbsp; 
                    <Popover 
                        content="On the left, write down the amount you personally used in the joint account 
                        and On the right, the amount you deposited in the joint account."
                        arrowPointAtCenter
                        style={{ fontSize: '12px' }}
                    >
                        <QuestionCircleOutlined />
                    </Popover>
                </div>
                <div style={{ display: 'flex' }}> {/* ?????? ?????? */}
                    <Input
                        size="small" bordered={false} suffix="KRW" 
                        style={{ width: '50%', margin: '8px', backgroundColor: 'white', color: "red" }}
                        value={OwnTravelAccount}
                        onChange={onOwnTravelAccountHandler}
                    />
                    <Input
                        size="small" bordered={false} suffix="KRW" 
                        style={{ width: '50%', margin: '8px', marginLeft: '0px', backgroundColor: 'white' }}
                        value={OwnTravelAccount_Public}
                        onChange={onOwnTravelAccountHandler_Public}
                    />
                </div>
                {LoadUnit &&
                <div style={{ display: 'flex' }}> {/* ?????? ?????? */} 
                    <Input
                        size="small" bordered={false} suffix={CurrencyUnit} 
                        style={{ width: '50%', margin: '8px', marginTop: '0px', backgroundColor: 'white', color: "red" }}
                        value={ForeignTravelAccount}
                        onChange={onForeignTravelAccountHandler}
                    />
                    <Input
                        size="small" bordered={false} suffix={CurrencyUnit} 
                        style={{ width: '50%', margin: '8px', marginLeft: '0px', marginTop: '0px', backgroundColor: 'white' }}
                        value={ForeignTravelAccount_Public}
                        onChange={onForeignTravelAccountHandler_Public}
                    />
                </div>}
            </div>
            <div style={{ 
                margin: '10px auto', paddingTop: '5px',
                width: '300px', height: 'auto',
                backgroundColor: '#91d5ff',
                borderRadius: '0.5em'
            }}>
                <div style={{ fontSize: '14px', fontWeight: 'bold' }}>Cash</div>
                <div style={{ display: 'flex' }}> {/* ?????? ?????? */}
                    <Input
                        size="small" bordered={false} suffix="KRW" 
                        style={{ width: '50%', margin: '8px', backgroundColor: 'white' }}
                        value={OwnCash}
                        onChange={onOwnCashHandler}
                    />
                    <Input
                        size="small" bordered={false} suffix="KRW" 
                        style={{ width: '50%', margin: '8px', marginLeft: '0px', backgroundColor: 'white' }}
                        value={OwnCash_Public}
                        onChange={onOwnCashHandler_Public}
                    />
                </div>
                {LoadUnit &&
                <div style={{ display: 'flex' }}> {/* ?????? ?????? */} 
                    <Input
                        size="small" bordered={false} suffix={CurrencyUnit} 
                        style={{ width: '50%', margin: '8px', marginTop: '0px', backgroundColor: 'white' }}
                        value={ForeignCash}
                        onChange={onForeignCashHandler}
                    />
                    <Input
                        size="small" bordered={false} suffix={CurrencyUnit} 
                        style={{ width: '50%', margin: '8px', marginLeft: '0px', marginTop: '0px', backgroundColor: 'white' }}
                        value={ForeignCash_Public}
                        onChange={onForeignCashHandler_Public}
                    />
                </div>}
            </div>
            <div style={{ 
                margin: '10px auto', paddingTop: '5px',
                width: '300px', height: 'auto',
                backgroundColor: '#bae7ff',
                borderRadius: '0.5em'
            }}>
                <div style={{ fontSize: '14px', fontWeight: 'bold' }}>Personal Card</div>
                <div style={{ display: 'flex' }}> {/* ?????? ?????? */}
                    <Input
                        size="small" bordered={false} suffix="KRW" 
                        style={{ width: '50%', margin: '8px', backgroundColor: 'white' }}
                        value={OwnCard}
                        onChange={onOwnCardHandler}
                    />
                    <Input
                        size="small" bordered={false} suffix="KRW" 
                        style={{ width: '50%', margin: '8px', marginLeft: '0px', backgroundColor: 'white' }}
                        value={OwnCard_Public}
                        onChange={onOwnCardHandler_Public}
                    />
                </div>
                {LoadUnit &&
                <div style={{ display: 'flex' }}> {/* ?????? ?????? */}
                    <Input
                        size="small" bordered={false} suffix={CurrencyUnit}  
                        style={{ width: '50%', margin: '8px', marginTop: '0px', backgroundColor: 'white' }}
                        value={ForeignCard}
                        onChange={onForeignCardHandler}
                    />
                    <Input
                        size="small" bordered={false} suffix={CurrencyUnit}  
                        style={{ width: '50%', margin: '8px', marginLeft: '0px', marginTop: '0px', backgroundColor: 'white' }}
                        value={ForeignCard_Public}
                        onChange={onForeignCardHandler_Public}
                    />
                </div>}
            </div>
            <div style={{ margin: '0px auto',  width: '300px' }}> {/* ??? ?????? ?????? */}
                <Button 
                    size="small"
                    type="primary" block 
                    style={{ width: '40%', margin: '5px', backgroundColor: "#40a9ff", borderColor: "#40a9ff" }}
                    onClick={onCompute}
                >
                Personal
                </Button>
                <InputNumber
                    size="small"
                    formatter={value => `??? ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    style={{ width: '50%', margin: '5px' }}
                    readOnly={true}
                    value={MyConsumption}
                />
            </div>
            <div style={{ margin: '0px auto', width: '300px' }}> {/* ?????? ?????? ?????? */}
                <Button 
                    size="small"
                    type="primary" block 
                    style={{ width: '40%', margin: '5px', backgroundColor: "#40a9ff", borderColor: "#40a9ff" }}
                    onClick={onCompute_Public}
                >
                Co-consumption
                </Button>
                <InputNumber
                    size="small"
                    formatter={value => `??? ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    style={{ width: '50%', margin: '5px' }}
                    readOnly={true}
                    value={PublicConsumption}
                />
            </div>
            <div style={{ margin: '5px auto', width: '300px' }}> {/* ?????? ?????? ?????? */}
                <Button 
                    type="primary" block 
                    style={{ width: '25%', backgroundColor: "#40a9ff", borderColor: "#bae7ff" }}
                    onClick={onSave}
                >
                Save
                </Button>
            </div>
        </div>
    )
}

export default withRouter(ExpensePage)