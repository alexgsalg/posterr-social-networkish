import { combineReducers } from 'redux';
import userSlice from './user/user.slice';

const rootReducer = combineReducers({
  users: userSlice,
});

export default rootReducer;
