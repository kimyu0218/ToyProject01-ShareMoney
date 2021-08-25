import React, { useState, useEffect } from 'react'
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom"
import Axios from 'axios';
import { saveConsumption, bringupConsumption, updateConsumption } from '../../../_actions/consumption_action'
import { savePublic, bringupPublic, updatePublic } from '../../../_actions/public_action'

import { Input, Button } from 'antd'
import { API_URL, API_KEY, PROXY_SERVER } from './Sections/currency_api'

function DetailPage(props) {

    const dispatch = useDispatch();

    const Join = localStorage.getItem('join')
    const Edit = localStorage.getItem('edit')

    const Country = localStorage.getItem('country') // 국가
    const [Currency, setCurrency] = useState(0)     // 환율
    const [Result, setResult] = useState([])        // 환율 배열
    const [Load, setLoad] = useState(false)
    const [LoadUnit, setLoadUnit] = useState(false)
    const [CurrencyUnit, setCurrencyUnit] = useState("")

    const [Cost, setCost] = useState(0)
    const [PreCost, setPreCost] = useState(0)
    const [TravelAccount, setTravelAccount] = useState(0)
    const [TravelAccount_Public, setTravelAccount_Public] = useState(0)
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

    const { Search } = Input;
    const onTravelAccountHandler = (event) => { setTravelAccount(Number(event.currentTarget.value)); }
    const onTravelAccountHandler_Public = (event) => { setTravelAccount_Public(Number(event.currentTarget.value)); }
    const onOwnCashHandler = (event) => { setOwnCash(Number(event.currentTarget.value)); }
    const onOwnCashHandler_Public = (event) => { setOwnCash_Public(Number(event.currentTarget.value)); }
    const onForeignCashHandler = (event) => { setForeignCash(Number(event.currentTarget.value)); }
    const onForeignCashHandler_Public = (event) => { setForeignCash_Public(Number(event.currentTarget.value)); }
    const onOwnCardHandler = (event) => { setOwnCard(Number(event.currentTarget.value)); }
    const onOwnCardHandler_Public = (event) => { setOwnCard_Public(Number(event.currentTarget.value)); }
    const onForeignCardHandler = (event) => { setForeignCard(Number(event.currentTarget.value)); }
    const onForeignCardHandler_Public = (event) => { setForeignCard_Public(Number(event.currentTarget.value)); }

    // 환율 받아오기
    const getCurrency = (endpoint) => {
        Axios.get(endpoint, {})
            .then(response => {
                if(response.data === null) return;
                setResult(response.data)
                setLoad(true);
            })
    }

    useEffect( () => {
        const endpoint = `${PROXY_SERVER}${API_URL}?authkey=${API_KEY}&data=AP01`
        getCurrency(endpoint)

        if(Edit === "true") { // Edit 모드
            bringCon()
            bringPub()
        }
        else if(Join === "true") { // Join 모드
            bringPub()
        }
        
    }, []);

    const bringCon = () => { // Consumption 정보 가져오기 (Edit 모드)

        let con = {
            user_id: localStorage.getItem('userId'),
            travel_id: localStorage.getItem('travelId')
        }
        
        dispatch(bringupConsumption(con))
            .then(response => {
                if (response.payload.success) {
                    setTravelAccount(response.payload.data.travel_account)
                    setTravelAccount_Public(response.payload.data.travel_account_pub)
                    setOwnCash(response.payload.data.own_cash)
                    setOwnCash_Public(response.payload.data.own_cash_pub)
                    setForeignCash(response.payload.data.foreign_cash)
                    setForeignCash_Public(response.payload.data.foreign_cash_pub)
                    setOwnCard(response.payload.data.own_card)
                    setOwnCard_Public(response.payload.data.own_card_pub)
                    setForeignCard(response.payload.data.foreign_card)
                    setForeignCard_Public(response.payload.data.foreign_card_pub)
                    setPreCost(response.payload.data.travel_account_pub
                        +response.payload.data.own_cash_pub+response.payload.data.foreign_cash_pub
                        +response.payload.data.own_card_pub+response.payload.data.foreign_card_pub)
                } else {
                    return alert("Failed to bring up my consumption")
                }
            })
    }
    const bringPub = () => { // Public 정보 가져오기 (Edit 모드, Join 모드)

        let pub = { travel_id: localStorage.getItem('travelId') }
        
        dispatch(bringupPublic(pub))
            .then(response => {
                if (response.payload.success) {
                    setCost(response.payload.data.cost)
                } else {
                    return alert("Failed to bring up public")
                }
            })
    }

    // 해당 국가 환율 설정하기
    const exist = (country) => {
        let tmp = country.cur_nm.split(" ")
        if(tmp[0] === Country) return true
    }
    const onSearch = () => {
        let find = Result.find(exist)
        setCurrency(find.tts)
        setCurrencyUnit(find.cur_unit)
        setLoadUnit(true)
    }
    
    // 내 소비 내역 계산하기
    const onCompute = () => {
        var currency = Currency.replace(',','')
        var sum = TravelAccount + (OwnCash+OwnCard) + (ForeignCard+ForeignCash) * parseFloat(currency)
        setMyConsumption(sum)
    }

    // 공동 소비 내역 계산하기
    const onCompute_Public = () => {
        var currency = Currency.replace(',','')
        var sum = TravelAccount_Public + (OwnCash_Public+OwnCard_Public) + (ForeignCard_Public+ForeignCash_Public) * parseFloat(currency)
        setPublicConsumption(sum)
    }

    // 소비 내역 DB에 저장하기
    const onSave = (event) => {
        event.preventDefault();

        if(Edit === "true") { // Edit 모드
            updateEdit()
            localStorage.setItem('edit', false)
        }
        else if(Join === "true") { // Join 모드
            updateJoin()
            localStorage.setItem('join', false)
        }
        else { initial() } // Generate 모드
        props.history.push('/')
    }

    const initial = () => { // Consumption과 Public 정보 생성하기 (Generate 모드)

        let con = { 
            user_id: localStorage.getItem('userId'),
            travel_id: localStorage.getItem('travelId'),
            travel_account: TravelAccount,
            travel_account_pub: TravelAccount_Public,
            own_cash: OwnCash,
            own_cash_pub: OwnCard_Public,
            foreign_cash: ForeignCash,
            foreign_cash_pub: ForeignCash_Public,
            own_card: OwnCard,
            own_card_pub: OwnCard_Public,
            foreign_card: ForeignCard,
            foreign_card_pub: ForeignCard_Public
        }

        dispatch(saveConsumption(con))
            .then(response => {
                if (response.payload.success) {
                    alert('Success!')
                } else {
                    return alert("Failed to generate")
                }
            })

        let sum = TravelAccount_Public + OwnCard_Public + ForeignCash_Public 
                + OwnCard_Public + ForeignCard_Public

        let pub = { 
            travel_id: localStorage.getItem('travelId'),
            cost: sum 
        }

        dispatch(savePublic(pub))
            .then(response => {
                if (response.payload.success) {
                    alert('Success!')
                } else {
                    return alert("Failed to generate")
                }
            })
    }

    const updateEdit = () => { // Consumption과 Public 모두 갱신하기 (Edit 모드)

        let con = { 
            user_id: localStorage.getItem('userId'),
            travel_id: localStorage.getItem('travelId'),
            travel_account: TravelAccount,
            travel_account_pub: TravelAccount_Public,
            own_cash: OwnCash,
            own_cash_pub: OwnCard_Public,
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

        let sum = (Cost - PreCost) 
                + TravelAccount_Public + OwnCard_Public + ForeignCash_Public 
                + OwnCard_Public + ForeignCard_Public
        
        let pub = { 
            travel_id: localStorage.getItem('travelId'),
            cost: sum 
        }

        dispatch(updatePublic(pub))
            .then(response => {
                if (!response.payload.success) {
                    return alert("Failed to edit")
                }
            })
    }

    const updateJoin = () => { // Consumption 생성 & Public 갱신하기 (Join 모드)

        let con = { 
            user_id: localStorage.getItem('userId'),
            travel_id: localStorage.getItem('travelId'),
            travel_account: TravelAccount,
            travel_account_pub: TravelAccount_Public,
            own_cash: OwnCash,
            own_cash_pub: OwnCard_Public,
            foreign_cash: ForeignCash,
            foreign_cash_pub: ForeignCash_Public,
            own_card: OwnCard,
            own_card_pub: OwnCard_Public,
            foreign_card: ForeignCard,
            foreign_card_pub: ForeignCard_Public
        }

        dispatch(saveConsumption(con))
            .then(response => {
                if (!response.payload.success) {
                    return alert("Failed to generate")
                }
            })

        let sum = Cost + TravelAccount_Public + OwnCard_Public + ForeignCash_Public 
                + OwnCard_Public + ForeignCard_Public

        let pub = { 
            travel_id: localStorage.getItem('travelId'),
            cost: sum 
        }

        dispatch(updatePublic(pub))
            .then(response => {
                if (!response.payload.success) {
                    return alert("Failed to edit")
                }
            })
    }

    return (
        <div style={{
            textAlign: 'center',
            width: '100%', height: '80vh'
        }}> 
            {/* 환율 적용 */}
            <div>
                { Load && 
                    <div style={{ height: 'auto' }}>
                        <Search
                            style={{ width: '300px', margin: '10px', textAlign: 'right'}}
                            prefix="환율"
                            suffix="원"
                            value={Currency}
                            readOnly={true}
                            onSearch={onSearch}
                        />
                    </div>
                }
            </div>
            {/* 안내문 */}
            <div style={{ 
                margin: '5px auto', padding: '5px',
                width: '300px', height: 'auto',
                backgroundColor: '#e6f7ff',
                borderRadius: '0.2em', fontSize: '11px'
            }}> 왼쪽: 개인 소비 내역 / 오른쪽: 공동 소비 내역
            </div>

            {/* 경비 관리 */}
            <div style={{ 
                margin: '10px auto', padding: '10px 0px',
                width: '300px', height: 'auto',
                backgroundColor: '#bae7ff',
                borderRadius: '1em'
            }}>
                공동 통장
                <div style={{ display: 'flex' }}> {/* 자국 화폐 */}
                    <Input 
                        size="small"
                        suffix="KRW" 
                        style={{ width: '50%', margin: '10px', fontSize: "12px", textAlign: 'right' }}
                        value={TravelAccount}
                        onChange={onTravelAccountHandler}
                    />
                    <Input 
                        size="small"
                        suffix="KRW" 
                        style={{ width: '50%', margin: '10px', fontSize: "12px", textAlign: 'right' }}
                        value={TravelAccount_Public}
                        onChange={onTravelAccountHandler_Public}
                    />
                </div>
            </div>
            <div style={{ 
                margin: '10px auto', padding: '10px 0px',
                width: '300px', height: 'auto',
                backgroundColor: '#91d5ff',
                borderRadius: '1em'
            }}>
                현금
                <div style={{ display: 'flex' }}> {/* 자국 화폐 */}
                    <Input 
                        size="small"
                        suffix="KRW" 
                        style={{ width: '50%', margin: '10px', fontSize: "12px", textAlign: 'right' }}
                        value={OwnCash}
                        onChange={onOwnCashHandler}
                    />
                    <Input 
                        size="small"
                        suffix="KRW" 
                        style={{ width: '50%', margin: '10px', fontSize: "12px", textAlign: 'right' }}
                        value={OwnCash_Public}
                        onChange={onOwnCashHandler_Public}
                    />
                </div>
                {LoadUnit &&
                <div style={{ display: 'flex' }}> {/* 타국 화폐 */} 
                    <Input 
                        size="small"
                        suffix={CurrencyUnit} 
                        style={{ width: '50%', margin: '10px', fontSize: "12px", textAlign: 'right' }}
                        value={ForeignCash}
                        onChange={onForeignCashHandler}
                    />
                    <Input 
                        size="small"
                        suffix={CurrencyUnit} 
                        style={{ width: '50%', margin: '10px', fontSize: "12px", textAlign: 'right' }}
                        value={ForeignCash_Public}
                        onChange={onForeignCashHandler_Public}
                    />
                </div>}
            </div>
            <div style={{ 
                margin: '10px auto', padding: '10px 0px',
                width: '300px', height: 'auto',
                backgroundColor: '#bae7ff',
                borderRadius: '1em'
            }}>
                개인 카드/통장
                <div style={{ display: 'flex' }}> {/* 자국 화폐 */}
                    <Input 
                        size="small"
                        suffix="KRW" 
                        style={{ width: '50%', margin: '10px', fontSize: "12px", textAlign: 'right' }}
                        value={OwnCard}
                        onChange={onOwnCardHandler}
                    />
                    <Input 
                        size="small"
                        suffix="KRW" 
                        style={{ width: '50%', margin: '10px', fontSize: "12px", textAlign: 'right' }}
                        value={OwnCard_Public}
                        onChange={onOwnCardHandler_Public}
                    />
                </div>
                {LoadUnit &&
                <div style={{ display: 'flex' }}> {/* 타국 화폐 */}
                    <Input 
                        size="small"
                        suffix={CurrencyUnit} 
                        style={{ width: '50%', margin: '10px', fontSize: "12px", textAlign: 'right' }}
                        value={ForeignCard}
                        onChange={onForeignCardHandler}
                    />
                    <Input 
                        size="small"
                        suffix={CurrencyUnit} 
                        style={{ width: '50%', margin: '10px', fontSize: "12px", textAlign: 'right' }}
                        value={ForeignCard_Public}
                        onChange={onForeignCardHandler_Public}
                    />
                </div>}
            </div>
            <div style={{ margin: '0px auto',  width: '300px' }}> {/* 내 소비 계산 */}
                <Button 
                    type="primary" block 
                    style={{ width: '40%', backgroundColor: "#40a9ff", borderColor: "#40a9ff" }}
                    onClick={onCompute}
                >
                나의 소비
                </Button>
                <Input
                    style={{ width: '50%', margin: '10px'}}
                    readOnly={true}
                    suffix="원"
                    value={MyConsumption}
                />
            </div>
            <div style={{ margin: '0px auto', width: '300px' }}> {/* 공동 소비 계산 */}
                <Button 
                    type="primary" block 
                    style={{ width: '40%', backgroundColor: "#40a9ff", borderColor: "#40a9ff" }}
                    onClick={onCompute_Public}
                >
                공동 소비
                </Button>
                <Input
                    style={{ width: '50%', margin: '10px'}}
                    readOnly={true}
                    suffix="원"
                    value={PublicConsumption}
                />
            </div>
            <div style={{ margin: '5px auto', width: '300px' }}> {/* 소비 내역 저장 */}
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

export default withRouter(DetailPage)