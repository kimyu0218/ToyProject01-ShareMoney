import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    CHECK_DUPLICATE_ID,
    CHECK_DUPLICATE_EMAIL
} from '../_actions/types';

export default function user(state = {}, action) {
    switch (action.type) {
        case LOGIN_USER:
            return { ...state, loginSuccess: action.payload }
        case REGISTER_USER:
            return { ...state, register: action.payload }
        case AUTH_USER:
            return {...state, userData: action.payload }
        case LOGOUT_USER:
            return {...state }
        case CHECK_DUPLICATE_ID:
            return { ...state, permit: action.payload }
        case CHECK_DUPLICATE_EMAIL:
            return { ...state, permit: action.payload }
        default:
            return state;
    }
}