import {
  PayloadAction,
  asyncThunkCreator,
  buildCreateSlice,
} from '@reduxjs/toolkit';
import { Post } from '../../models/post.model';
import { AxiosError } from 'axios';
import { handleQuota } from '../../utils/post.utils';

// Hard-coded
export const dailyQuota = 5;

export interface PostState {
  posts: Post[];
  comments: Post[];
  dailyPosts: number;
  isLoading: boolean;
  error: AxiosError | unknown | string | null | undefined;
}

export const initialState: PostState = {
  posts: [],
  comments: [],
  dailyPosts: 0,
  isLoading: false,
  error: null,
};

export const createSliceWithThunks = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

const postsSlice = createSliceWithThunks({
  name: 'posts',
  initialState,
  reducers: (create) => ({
    // Posts
    setPosts: create.reducer<Post[]>((state, action: PayloadAction<Post[]>) => {
      const posts = action.payload.sort((a, b) => {
        const postA = new Date(a.createdAt).getTime();
        const postB = new Date(b.createdAt).getTime();
        return postB - postA;
      });

      state.posts = posts;
      state.comments = action.payload.filter((post) => post.isComment);
    }),
    addPost: create.reducer<Post>((state, action: PayloadAction<Post>) => {
      if (handleQuota()) {
        state.posts.push(action.payload);
        state.posts.sort((a, b) => {
          const postA = new Date(a.createdAt).getTime();
          const postB = new Date(b.createdAt).getTime();
          return postB - postA;
        });
        state.dailyPosts++;
      }
    }),
    updatePost: create.reducer<Post>((state, action: PayloadAction<Post>) => {
      const idx = state.posts.findIndex(
        (user) => user.id === action.payload.id,
      );
      state.posts[idx] = action.payload;
    }),
    // Comments
    addComment: create.reducer<Post>((state, action: PayloadAction<Post>) => {
      state.comments.push(action.payload);
    }),
  }),
  selectors: {
    selectPosts: (sliceState) => sliceState.posts || [],
    selectPostCount: (sliceState) => sliceState.posts.length || 0,
    selectComments: (sliceState) => sliceState.comments || [],
    selectDailyQuota: (sliceState) => sliceState.dailyPosts,
  },
});

export const { setPosts, addPost, addComment, updatePost } = postsSlice.actions;
export const {
  selectPosts,
  selectPostCount,
  selectComments,
  selectDailyQuota,
} = postsSlice.selectors;
export default postsSlice.reducer;
