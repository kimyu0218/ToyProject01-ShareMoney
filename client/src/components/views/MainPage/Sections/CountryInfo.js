import React from 'react'

export default class CountryInfo extends React.Component {
    render() {
        return (
            <div onClick={this.props.onClick}>{this.props.country.name}</div>
        )
    }
}