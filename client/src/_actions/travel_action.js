import axios from 'axios';
import {
    GENERTATE_TRAVEL,
    CHECK_TRAVEL_DUPLICATE_ID
} from './types';

// 1. 로그인
export function (dataToSubmit) {
    const request = axios.post('/api/users/login', dataToSubmit)
    .then(response => response.data)

    return {
        type: LOGIN_USER,
        payload: request
    }
}