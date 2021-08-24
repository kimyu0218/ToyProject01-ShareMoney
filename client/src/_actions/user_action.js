import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    CHECK_DUPLICATE_EMAIL,
    CHECK_DUPLICATE_ID
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
// 5. 아이디 중복 확인
export function checkDuplicateId(dataToSubmit) {

    const request = axios.post('/api/users/checkId', dataToSubmit) // 서버에 get 요청
        .then(response => response.data)
    return {
        type: CHECK_DUPLICATE_ID,
        payload: request
    }
}
// 6. 이메일 중복 확인
export function checkDuplicateEmail(dataToSubmit) {

    const request = axios.post('/api/users/checkEmail', dataToSubmit) // 서버에 get 요청
        .then(response => response.data)
    return {
        type: CHECK_DUPLICATE_EMAIL,
        payload: request
    }
}