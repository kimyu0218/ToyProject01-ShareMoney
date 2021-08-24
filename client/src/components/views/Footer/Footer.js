import React from 'react'

function Footer() {
    return (
        <div style={{
            height: '60px', display: 'flex',
            flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', fontSize:'1rem'
        }}>
           <p style={{ margin: '2px' }}> Logo </p>
        </div>
    )
}

export default Footer