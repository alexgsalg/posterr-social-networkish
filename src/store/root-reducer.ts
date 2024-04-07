import { combineReducers } from 'redux';
import userSlice from './user/user.slice';
import postsSlice from './post/post.slice';

const rootReducer = combineReducers({
  users: userSlice,
  posts: postsSlice,
});

export default rootReducer;
