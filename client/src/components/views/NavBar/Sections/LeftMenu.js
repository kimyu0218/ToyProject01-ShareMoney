import React from 'react';
import { Menu, Badge } from 'antd';

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
    <Menu.Item key="home">
      <a href="/">Home</a>
    </Menu.Item>
    <Menu.Item key="otherPage">
      <Badge count={sessionStorage.getItem('notComplete')}>
        <a href="/edit">My Travels</a>
      </Badge>
    </Menu.Item>
  </Menu>
  )
}

export default LeftMenu