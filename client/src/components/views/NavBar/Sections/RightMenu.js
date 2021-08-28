import React from 'react';
import { Menu } from 'antd';
import axios from 'axios';

import { withRouter } from 'react-router-dom';
import { useSelector } from "react-redux";

function RightMenu(props) {
  const user = useSelector(state => state.user)

  const logoutHandler = () => {
    axios.get('/api/users/logout').then(response => {
      if (response.status === 200) {
        sessionStorage.setItem('edit', false)
        sessionStorage.setItem('join', false)
        sessionStorage.setItem('userId', '')
        sessionStorage.setItem('travelId', '')
        sessionStorage.setItem('country', '')
        sessionStorage.setItem('notComplete', 0)
        props.history.push("/login");
      } else {
        alert('Log Out Failed')
      }
    });
  };

  if (user.userData && !user.userData.isAuth) { // 로그인 상태 X
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="login">
          <a href="/login">Signin</a>
        </Menu.Item>
        <Menu.Item key="register">
          <a href="/register">Signup</a>
        </Menu.Item>
      </Menu>
    )
  } else { // 로그인 상태
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="logout">
          <a onClick={logoutHandler}>Logout</a>
        </Menu.Item>
      </Menu>
    )
  }
}

export default withRouter(RightMenu);