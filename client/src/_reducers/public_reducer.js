import {
    SAVE_PUBLIC,
    BRING_UP_PUBLIC
} from '../_actions/types';

export default function public_(state = {}, action) {
    switch (action.type) {
        case SAVE_PUBLIC:
            return { ...state, success: action.payload }
        case BRING_UP_PUBLIC:
            return { ...state, success: action.payload }
        default:
            return state;
    }
}