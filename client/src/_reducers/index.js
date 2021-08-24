import { combineReducers } from 'redux';
import user from './user_reducer';
import travel from './travel_reducer'

const rootReducer = combineReducers({
    user, travel
})

export default rootReducer;