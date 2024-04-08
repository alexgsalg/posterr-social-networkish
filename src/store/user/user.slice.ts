import {
  PayloadAction,
  SerializedError,
  asyncThunkCreator,
  buildCreateSlice,
} from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

import { User } from '../../models/user.model';
import api from '../../api/axios';

export interface UserState {
  users: User[];
  loggedUser: User | undefined;
  isLoading: boolean;
  error: SerializedError | string | null | undefined;
}

export const initialState: UserState = {
  users: [],
  loggedUser: undefined,
  isLoading: false,
  error: null,
};

export const createSliceWithThunks = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

const usersSlice = createSliceWithThunks({
  name: 'users',
  initialState,
  reducers: (create) => ({
    setUsers: create.reducer<User[]>((state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    }),
    updateLoggedUser: create.reducer<User>(
      (state, action: PayloadAction<User>) => {
        const idx = state.users.findIndex(
          (user) => user.id === action.payload.id,
        );
        state.users[idx] = action.payload;
        state.loggedUser = action.payload;
      },
    ),
    logInUser: create.reducer<User>((state, action: PayloadAction<User>) => {
      state.loggedUser = action.payload;
    }),
  }),
  selectors: {
    selectUsers: (sliceState) => sliceState.users,
    selectLoggedUser: (sliceState) => sliceState.loggedUser,
    selectUserLoading: (sliceState) => sliceState.isLoading,
    selectUsersError: (sliceState) => sliceState.error,
  },
});

export const { setUsers, updateLoggedUser, logInUser } = usersSlice.actions;
export const {
  selectUsers,
  selectUserLoading,
  selectUsersError,
  selectLoggedUser,
} = usersSlice.selectors;
export default usersSlice.reducer;
