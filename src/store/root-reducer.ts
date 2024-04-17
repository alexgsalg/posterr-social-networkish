import { combineReducers } from 'redux';
import userSlice from './user/user.slice';
import postsSlice from './post/post.slice';
import generalSlice from './general/general.slice';

const rootReducer = combineReducers({
  users: userSlice,
  posts: postsSlice,
  general: generalSlice,
});

export default rootReducer;
