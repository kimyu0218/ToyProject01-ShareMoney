import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { registerUser, checkDuplicateEmail, checkDuplicateId } from '../../../_actions/user_action';

import { Form, Input, Button } from 'antd';
import 'antd/dist/antd.css';

function RegisterPage(props) {

    const dispatch = useDispatch();

    const [Email, setEmail] = useState("");
    const [Id, setId] = useState("");
    const [Password, setPassword] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("");
    
    const onEmailHandler = (event) => {setEmail(event.currentTarget.value) }
    const onIdHandler = (event) => { setId(event.currentTarget.value) }
    const onPasswordHandler = (event) => { setPassword(event.currentTarget.value) }
    const onConfirmPasswordHandler = (event) => { setConfirmPassword(event.currentTarget.value) }

    const onSubmitHandler = (event) => {
        event.preventDefault();

        let check1 = { id: Id }

        dispatch(checkDuplicateId(check1))
            .then(response => {
                if (response.payload.permit) {

                } else {
                    return alert("사용할 수 없는 아이디입니다.")
                }
            })

        let check2 = { email: Email }

        dispatch(checkDuplicateEmail(check2))
            .then(response => {
                if (response.payload.permit) {
                } else {
                    return alert("사용할 수 없는 이메일입니다.")
                }
            })
        
        let body = {
            email: Email,
            id: Id,
            password: Password
        }

        dispatch(registerUser(body))
            .then(response => {
                if (response.payload.success) {
                    alert("회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.")
                    props.history.push('/login')
                } else {
                    alert("Failed to sign up")
                }
            })
    }

    const formItemLayout = {
        labelCol: { 
            xs: { span: 24, },
            sm: { span: 8, },
        },
        wrapperCol: { 
            xs: { span: 24, },
            sm: { span: 16, },
        },
    };
    const tailFormItemLayout = {
        wrapperCol: {
            xs: { span: 24, offset: 0, },
            sm: { span: 16, offset: 8, },
        },
    };

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height: '80vh'
        }}>
            <Form
                {...formItemLayout}
                name="register"
                onFinish={onSubmitHandler}
                scrollToFirstError
                >
                <Form.Item
                    name="email"
                    label="E-mail"
                    rules={[
                    {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                    },
                    {
                        required: true,
                        message: 'Please input your E-mail!',
                    },
                    ]}
                >
                    <Input value={Email} onChange={onEmailHandler}/>
                </Form.Item>

                <Form.Item
                    name="id"
                    label="Id"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your Id!',
                    },
                    ]}
                >
                    <Input value={Id} onChange={onIdHandler}/>
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                    ]}
                    hasFeedback
                >
                    <Input.Password value={Password} onChange={onPasswordHandler}/>
                </Form.Item>

                <Form.Item
                    name="confirm"
                    label="Confirm"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                    {
                        required: true,
                        message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                          }
            
                          return Promise.reject(new Error('The two passwords that you entered do not match!'));
                        },
                    }),
                    ]}
                >
                    <Input.Password value={ConfirmPassword} onChange={onConfirmPasswordHandler}/>
                </Form.Item>

                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit" onClick={onSubmitHandler} style={{ width: '100%' }}>
                    Register
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default withRouter(RegisterPage)