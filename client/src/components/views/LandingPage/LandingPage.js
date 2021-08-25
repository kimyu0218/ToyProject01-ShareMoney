import React from 'react'

import 'antd/dist/antd.css';
import './LandingPage.css'

function LandingPage() {
    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height: '80vh'
        }}>
            <div style={{ 
                position: 'absolute', 
                top: '50%', left: '50%',
                transform: 'translate(-50%,-50%)',
                width: '80%',
                textAlign: 'center'
            }}>
                <div style={{ margin: '10px' }}>
                    <a href="/generate"> Generate a New Travel </a>
                </div>
                or
                <div style={{ margin: '10px' }}>
                    <a href="/join"> Join </a> / <a href="/edit"> Edit </a>
                </div>
            </div>
        </div>
    )
}

export default LandingPage
