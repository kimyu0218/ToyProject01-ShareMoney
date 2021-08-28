import React, { useState, useEffect } from 'react'
import { useDispatch } from "react-redux";
import { findTravel } from '../../../_actions/travel_action';
import { getPublicDetail } from '../../../_actions/public_action';

import { Alert } from 'antd';
import 'antd/dist/antd.css';

function LandingPage(props) {

    const dispatch = useDispatch()

    const [NotComplete, setNotComplete] = useState([])
    const [Load, setLoad] = useState(false)

    useEffect(() => {

        let body = { user_id: sessionStorage.getItem('userId') }

        dispatch(findTravel(body))
            .then(response => {
                if (response.payload.success) {
                    findNotComplete(response.payload.travels)
                    setLoad(true)
                    sessionStorage.setItem('edit', false)
                    sessionStorage.setItem('join', false)
                } 
                else return alert("Falied to load")
            })
    }, [])

    const findNotComplete = (travels) => { // 완료되지 않은 작업 개수 구하기

        for(let i = 0; i < travels.length; i++) {
            let personnel = travels[i].personnel

            if(personnel !== travels[i].persons.length) { 
                setNotComplete(NotComplete => [...NotComplete, travels[i]]) 
            }
            else {
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

    const alertNotComplete = (count) => { // 완료되지 않은 작업이 있는 경우 알림
        if(count !== 0) {
            sessionStorage.setItem("notComplete", count)
            return (
                <Alert
                    message="Travel information"
                    description={`${count} operation not completed.`}
                    style={{ position: 'absolute', top: '15%'}}
                    type="info"
                    showIcon
                />
            )
        }
    }

    return (
         <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height: '80vh'
        }}>
            {Load && alertNotComplete(NotComplete.length)}
            <div style={{ 
                position: 'absolute', 
                top: '50%', left: '50%',
                transform: 'translate(-50%,-50%)',
                width: '80%',
                textAlign: 'center'
            }}>
                <div style={{ margin: '10px'}}>
                    <a href="/generate">
                        <p style={{ fontSize: '18px' }}>Generate a New Travel</p>
                    </a>
                </div>
                or
                <div style={{ margin: '10px' }}>
                    <a href="/join">
                        <p style={{ fontSize: '18px', display: 'inline' }}>Join</p>
                    </a>
                    &nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;
                    <a href="/edit">
                        <p style={{ fontSize: '18px', display: 'inline' }}>Edit</p>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default LandingPage
