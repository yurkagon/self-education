import { combineReducers } from 'redux';
import profileReducer from './profile';
import mainReducer from './main';

export default combineReducers({
  profile: profileReducer,
  main: mainReducer,
});