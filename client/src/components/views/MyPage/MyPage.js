import React, { useState, useEffect } from 'react'
import { useDispatch } from "react-redux";
import { findTravel, deleteTravel } from '../../../_actions/travel_action';

import './MyPage.css'

function MyPage() {

    const dispatch = useDispatch()

    const [MyTravels, setMyTravels] = useState([])
    const [Load, setLoad] = useState(false)

    useEffect(() => {
        loadTravels()
    }, [])

    const loadTravels = () => {

        let body = { owner: localStorage.getItem('userId') }

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

    const Delete = (id) => {

        let body = { _id: id }

        dispatch(deleteTravel(body))
            .then(response => {
                if (response.payload.success) {
                    loadTravels()
                } else {
                    return alert("Falied to delete")
                }
            })
    }

    const renderMovies = MyTravels.map((travel, index) => {
        return (
            <tr key={index}>                
                <td><a href="#">{travel.travel_id}</a></td>
                <td>{travel.destination}</td>
                <td>{travel.personnel}</td>
                <td><button onClick={() => Delete(travel._id)}>Remove</button></td>
            </tr>
        )
    })

    return (
        <div style={{
            textAlign: 'center', marginTop: '20px',
            width: '100%', height: '75vh'
        }}> 
            <table style={{ padding: '10px', margin: '5px auto' }}>
                <thead>
                    <th>Travel ID</th>
                    <th>Country</th>
                    <th>Personnel</th>
                    <th>Remove</th>
                </thead>
                <tbody>
                    {Load && renderMovies}
                </tbody>
            </table>
        </div>
    )
}

export default MyPage