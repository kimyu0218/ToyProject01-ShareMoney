import React, { useEffect, useState } from 'react'
import { useDispatch } from "react-redux";
import { getPublicDetail } from '../../../../_actions/public_action';

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

    const renderTravel = Companions.map((companion, index) => {
        if(Cost/Personnel > Contributions[index]) {
            return (
                <tr key={index}>                
                    <td>{companion}</td>
                    <td>{Contributions[index]}</td>
                    <td style={{ textAlign: 'center' }}>-</td>
                    <td>{Contributions[index]-Cost/Personnel}</td>
                </tr>
            )
        }
        else if(Cost/Personnel === Contributions[index]) {
            return (
                <tr key={index}>                
                    <td>{companion}</td>
                    <td>{Contributions[index]}</td>
                    <td style={{ textAlign: 'center' }}>ok</td>
                    <td>0</td>
                </tr>
            )
        }
        else {
            return (
                <tr key={index}>                
                    <td>{companion}</td>
                    <td>{Contributions[index]}</td>
                    <td style={{ textAlign: 'center' }}>+</td>
                    <td>{Contributions[index]-Cost/Personnel}</td>
                </tr>
            )
        }
    })


    return (
        <div style={{
            textAlign: 'center', marginTop: '20px',
            width: '100%', height: '75vh'
        }}> 
            <h3 id="title">{props.match.params.travel_id}</h3>
            <table style={{ padding: '10px', margin: '5px auto', fontSize: '12px' }}>
                <thead>
                    <th>Companion</th>
                    <th>Contribution</th>
                    <th>Status</th>
                    <th>Money to Receive</th>
                </thead>
                <tbody>
                    {Load && renderTravel}
                </tbody>
            </table>
        </div>
    )
}

export default DetailPage