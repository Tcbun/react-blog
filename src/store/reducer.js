import { combineReducers } from 'redux';
import { reducer as homeReducer } from '../pages/home/store';
export default combineReducers({
    home:homeReducer
});