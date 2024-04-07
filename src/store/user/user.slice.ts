import {
  PayloadAction,
  SerializedError,
  asyncThunkCreator,
  buildCreateSlice,
} from '@reduxjs/toolkit';
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
    // TODO: refactor this
    updateUser: create.asyncThunk(
      async (user: User) => {
        const response = await api.post(`/user/${user.id}`, user);
        return response.data;
      },
      {
        pending: (state) => {
          state.isLoading = true;
        },
        rejected: (state, action) => {
          state.isLoading = false;
          state.error = action.error;
        },
        fulfilled: (state, action) => {
          const idx = state.users.findIndex(
            (user) => user.id === action.payload.id,
          );
          state.isLoading = false;
          state.users[idx] = action.payload;
        },
      },
    ),
    logInUser: create.reducer<User>((state, action: PayloadAction<User>) => {
      state.loggedUser = action.payload;
    }),
  }),
  selectors: {
    selectUsers: (sliceState) => sliceState.users,
    selectLoggedUser: (sliceState) => sliceState.loggedUser,
    selectUserById: (sliceState, id: string): User | undefined => {
      return sliceState.users.find((el) => el.id === id) || undefined;
    },
    selectUserLoading: (sliceState) => sliceState.isLoading,
    selectUsersError: (sliceState) => sliceState.error,
  },
});

export const { setUsers, updateUser, logInUser } = usersSlice.actions;
export const {
  selectUsers,
  selectUserLoading,
  selectUsersError,
  selectLoggedUser,
} = usersSlice.selectors;
export default usersSlice.reducer;
