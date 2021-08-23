import React, { useState, useEffect } from 'react'
import { withRouter } from "react-router-dom"
import Axios from 'axios';

import { Input, InputNumber } from 'antd'
import { API_URL, API_KEY, PROXY_SERVER } from './Sections/currency_api'

function MainPage() {

    const [Country, setCountry] = useState("")
    const [Currency, setCurrency] = useState(0)
    const [Result, setResult] = useState([])

    const { Search } = Input;
    const onCountryHandler = (event) => { setCountry(event.currentTarget.value); }
    const onCurrencyHandler = (event) => { setCurrency(event.currentTarget.value); }

    useEffect( () => {
        const endpoint = `${PROXY_SERVER}${API_URL}?authkey=${API_KEY}&data=AP01`
        getCurrency(endpoint)
    }, []);

    const getCurrency = (endpoint) => {
        Axios.get(endpoint, {})
            .then(response => {
                console.log(response)
                setResult(response.data)
                console.log("Result: ", Result)
            })
    }

    const onSearch = () => {
        Result.sort()
        let find = Result.find(country => country.cur_nm===Country)
        setCurrency(find)
        console.log(find)
    }

    return (
        <div style={{
            display: 'flex', justifyContent: 'center',
            width: '100%', height: '100vh'
        }}> 
            <div>
                {Result &&
                    <Search
                        style={{ width: '350px', margin: '10px'}}
                        placeholder="country"
                        value={Country}
                        onChange={onCountryHandler}
                        onSearch={onSearch}
                    />
                }
            </div>
            <div>
                <InputNumber
                    style={{ width: '350px', margin: '10px'}}
                    step="0.000000001"
                    readOnly={true}
                    value={Currency}
                    onChange={onCurrencyHandler}
                    //stringMode
                />
            </div>
        </div>
    )
}

export default withRouter(MainPage)