import React from 'react';
import { Menu } from 'antd';

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
    <Menu.Item key="home">
      <a href="/">Home</a>
    </Menu.Item>
    <Menu.Item key="otherPage">
      <a href="/">Other Page</a>
    </Menu.Item>
  </Menu>
  )
}

export default LeftMenu