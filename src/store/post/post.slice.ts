import {
  PayloadAction,
  asyncThunkCreator,
  buildCreateSlice,
} from '@reduxjs/toolkit';
import { Post } from '../../models/post.model';
import axios, { AxiosError } from 'axios';

export interface PostState {
  posts: Post[];
  comments: Post[];
  isLoading: boolean;
  error: AxiosError | unknown | string | null | undefined;
}

export const initialState: PostState = {
  posts: [],
  comments: [],
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
    setPosts: create.reducer<Post[]>((state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload.filter((post) => !post.isComment);
      state.comments = action.payload.filter((post) => post.isComment);
    }),
    addPost: create.reducer<Post>((state, action: PayloadAction<Post>) => {
      state.posts.push(action.payload);
    }),
    addComment: create.reducer<Post>((state, action: PayloadAction<Post>) => {
      state.comments.push(action.payload);
    }),
    updatePost: create.reducer<Post>((state, action: PayloadAction<Post>) => {
      const idx = state.posts.findIndex(
        (user) => user.id === action.payload.id,
      );
      state.posts[idx] = action.payload;
    }),
    postLoading: create.reducer<boolean>(
      (state, action: PayloadAction<boolean>) => {
        state.isLoading = action.payload;
      },
    ),
    postError: create.reducer<AxiosError | unknown>(
      (state, action: PayloadAction<AxiosError | unknown>) => {
        if (axios.isAxiosError(action.payload)) {
          state.error = action.payload.message;
        } else {
          state.error = action.payload;
        }
      },
    ),
  }),
  selectors: {
    selectPosts: (sliceState) => sliceState.posts || [],
    selectComments: (sliceState) => sliceState.comments || [],
    selectPostLoading: (sliceState) => sliceState.isLoading || false,
    selectPostsError: (sliceState) => sliceState.error || null,
  },
});

export const {
  setPosts,
  addPost,
  addComment,
  updatePost,
  postLoading,
  postError,
} = postsSlice.actions;
export const {
  selectPosts,
  selectPostLoading,
  selectComments,
  selectPostsError,
} = postsSlice.selectors;
export default postsSlice.reducer;
