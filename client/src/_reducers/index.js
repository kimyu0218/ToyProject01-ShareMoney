import { combineReducers } from 'redux';

import user from './user_reducer';
import travel from './travel_reducer'
import consumption from './consumption_reducer';
import public_ from './public_reducer';

const rootReducer = combineReducers({
    user, travel, consumption, public_
})

export default rootReducer;