import {
    GENERTATE_TRAVEL,
    CHECK_DUPLICATE_TRAVEL_ID,
    JOIN_TRAVEL,
    EDIT_PERSONS,
    FIND_MY_TRAVEL,
    DELETE_TRAVEL
} from '../_actions/types';

export default function travel(state = {}, action) {
    switch (action.type) {
        case GENERTATE_TRAVEL:
            return { ...state, success: action.payload }
        case CHECK_DUPLICATE_TRAVEL_ID:
            return { ...state, permit: action.payload }
        case JOIN_TRAVEL:
            return { ...state, success: action.payload }
        case EDIT_PERSONS:
            return { ...state, success: action.payload }
        case FIND_MY_TRAVEL:
            return { ...state, success: action.payload }
        case DELETE_TRAVEL:
            return { ...state, success: action.payload }
        /*case GET_TRAVEL_CURRENCY:
            return { ...state, success: action.payload }*/
        default:
            return state;
    }
}