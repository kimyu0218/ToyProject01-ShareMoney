import React from 'react'

import 'antd/dist/antd.css';

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
