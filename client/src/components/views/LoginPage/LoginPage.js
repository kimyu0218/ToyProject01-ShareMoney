import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { loginUser } from '../../../_actions/user_action';

import { Form, Input, Button } from 'antd';
import 'antd/dist/antd.css';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './LoginPage.css'

function LoginPage(props) {

    const dispatch = useDispatch();

    const [Id, setId] = useState("");
    const [Password, setPassword] = useState("")

    const onIdHandler = (event) => { setId(event.currentTarget.value) }
    const onPasswordHandler = (event) => { setPassword(event.currentTarget.value) }

    const onSubmitHandler = (event) => {
        event.preventDefault();

        let body = {
            id: Id,
            password: Password
        }

        dispatch(loginUser(body))
            .then(response => {
                if (response.payload.loginSuccess) { // 로그인 성공 -> 사용자 ID 저장, 랜딩 페이지로 이동
                    sessionStorage.setItem("userId", Id) 
                    props.history.push("/")
                } else {
                    alert('You entered the wrong ID or password.')
                }
            })
    }

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height: '80vh'
        }}>
            <Form
                name="normal_login"
                className="login-form"
                onFinish={onSubmitHandler}
            >
            <Form.Item
                name="id"
                rules={[{ required: true, message: 'Please input your Id!' }]}
            >
                <Input 
                    prefix={<UserOutlined className="site-form-item-icon" />} 
                    value={Id} 
                    placeholder="Id"
                    onChange={onIdHandler}
                />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your Password!' }]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    value={Password}
                    placeholder="Password"
                    onChange={onPasswordHandler}
                />
            </Form.Item>
            <Form.Item>
                <Button 
                    type="primary" htmlType="submit" className="login-form-button"
                    onClick={onSubmitHandler}
                >
                Log in
                </Button>
                Or <a href="/register">register now!</a>
            </Form.Item>
            </Form>
        </div>
      );
}

export default withRouter(LoginPage);