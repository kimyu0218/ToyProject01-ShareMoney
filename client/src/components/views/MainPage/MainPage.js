import React, { useState, useEffect } from 'react'
import { withRouter } from "react-router-dom"

import { Input } from 'antd'
import { API_URL, API_KEY, PROXY_SERVER } from './Sections/currency_api'
import CountryInfo from './Sections/CountryInfo'

function MainPage() {

    const [Country, setCountry] = useState("")
    const [Currency, setCurrency] = useState()
    const [Result, setResult] = useState([])

    const { Search } = Input;
    const onCountryHandler = (event) => { setCountry(event.currentTarget.value); }
    const onCurrencyHandler = (event) => { setCurrency(event.currentTarget.value); }
    const onResultHandler = (event) => { setResult(event.currentTarget.value); }

    useEffect( () => {
        const endpoint = `${PROXY_SERVER}${API_URL}?authkey=${API_KEY}&data=AP01`
        console.log(endpoint)
        fetchCurrency(endpoint)
    }, []);

    const fetchCurrency = (endpoint) => {
        fetch(endpoint)
            .then(response => response.json())
            .then(response => {
                console.log(response)
            })
    }

    /*const getCurrency = (event) => {
        let find = countries.filter((e) => {
            return e.country.toLowerCase().trim() === Keyword.toLowerCase().trim()
        })
        setCountry(find[0].code)
        console.log("find: ", find[0].code)
        console.log("country: ", Country)
        const endpoint = `${API_URL}?access_key=${API_KEY}&source=USD&currencies=${Country}`
        fetchCurrency(endpoint)
    }*/

    return (
        <div style={{
            display: 'flex', justifyContent: 'center',
            width: '100%', height: '100vh'
        }}>
            <Search
                style={{ width: '350px', margin: '10px'}}
                placeholder="country"
                value={Country}
                onChange={onCountryHandler}
                //onSearch={getCurrency}
            />
        </div>
    )
}

export default withRouter(MainPage)