import {
    SAVE_CONSUMPTION,
    BRING_UP_CONSUMPTION,
    UPDATE_CONSUMPTION
} from '../_actions/types';

export default function consumption(state = {}, action) {
    switch (action.type) {
        case SAVE_CONSUMPTION:
            return { ...state, success: action.payload }
        case BRING_UP_CONSUMPTION:
            return { ...state, success: action.payload }
        case UPDATE_CONSUMPTION:
            return { ...state, success: action.payload }
        default:
            return state;
    }
}