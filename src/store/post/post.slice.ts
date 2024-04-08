import {
  PayloadAction,
  SerializedError,
  asyncThunkCreator,
  buildCreateSlice,
} from '@reduxjs/toolkit';
import { Post } from '../../models/post.model';
import axios, { AxiosError } from 'axios';

export interface PostState {
  posts: Post[];
  isLoading: boolean;
  error: AxiosError | unknown | string | null | undefined;
}

export const initialState: PostState = {
  posts: [],
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
      state.posts = action.payload;
    }),
    addPost: create.reducer<Post[]>((state, action: PayloadAction<Post[]>) => {
      // @ts-expect-error
      state.posts.push(action.payload);
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
    selectPostLoading: (sliceState) => sliceState.isLoading || false,
    selectPostsError: (sliceState) => sliceState.error || null,
  },
});

export const { setPosts, addPost, updatePost, postLoading, postError } =
  postsSlice.actions;
export const { selectPosts, selectPostLoading, selectPostsError } =
  postsSlice.selectors;
export default postsSlice.reducer;
