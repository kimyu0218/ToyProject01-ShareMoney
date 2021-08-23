import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER
} from './types';

// 1. 로그인
export function loginUser(dataToSubmit) {
    const request = axios.post('/api/users/login', dataToSubmit)
    .then(response => response.data)

    return {
        type: LOGIN_USER,
        payload: request
    }
}
// 2. 회원 가입
export function registerUser(dataToSubmit) {
    const request = axios.post('/api/users/register', dataToSubmit)
        .then(response => response.data)

    return {
        type: REGISTER_USER,
        payload: request
    }
}
// 3. 인증
export function auth(){
    const request = axios.get('/api/users/auth')
    .then(response => response.data);

    return {
        type: AUTH_USER,
        payload: request
    }
}
// 4. 로그아웃
export function logoutUser(){
    const request = axios.get('/api/users/logout')
    .then(response => response.data);

    return {
        type: LOGOUT_USER,
        payload: request
    }
}