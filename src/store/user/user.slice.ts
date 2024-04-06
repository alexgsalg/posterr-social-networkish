import {
  SerializedError,
  asyncThunkCreator,
  buildCreateSlice,
} from '@reduxjs/toolkit';
import { StoreStatus } from '../store.model';

export interface UserState {
  users: [];
  currentUser: string | undefined;
  currentRequestId: string | undefined;
  status: StoreStatus;
  error: SerializedError | string | null;
}

export const initialState: UserState = {
  users: [],
  currentUser: undefined,
  currentRequestId: undefined,
  status: 'idle',
  error: null,
};

export const createSliceWithThunks = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

const usersSlice = createSliceWithThunks({
  name: 'users',
  initialState,
  reducers: (create) => ({
    // fetchUser: create.asyncThunk(
    //   async (userTitle: string, thunkAPI) => {
    //     try {
    //       const response: AxiosResponse<any, any> = await axios.get(
    //         `${BASE_URL}&plot=full&t=${userTitle}`,
    //       );
    //       if (response.data.Response === 'False') {
    //         return thunkAPI.rejectWithValue(response.data.Error);
    //       }
    //       return response.data;
    //     } catch (error: any) {
    //       return thunkAPI.rejectWithValue(error);
    //     }
    //   },
    //   {
    //     pending: (state, action) => {
    //       if (state.status === 'idle') {
    //         state.status = 'pending';
    //         state.currentRequestId = action.meta.requestId;
    //       }
    //     },
    //     rejected: (state, action) => {
    //       const { requestId } = action.meta;
    //       if (action.error.message === 'Rejected')
    //         if (
    //           action.error.message === 'Rejected' ||
    //           (state.status === 'pending' && state.currentRequestId === requestId)
    //         ) {
    //           state.status = 'idle';
    //           state.error = action.payload as string;
    //           state.currentRequestId = undefined;
    //         }
    //     },
    //     fulfilled: (state, action) => {
    //       const { requestId } = action.meta;
    //       if (state.status === 'pending' && state.currentRequestId === requestId) {
    //         state.status = 'idle';
    //         const isStored =
    //           state.users.some((m) => {
    //             return m.Title.toLowerCase() === action.payload.Title.toLowerCase();
    //           }) || undefined;
    //         if (!isStored && action.payload.imdbID) state.users.push(action.payload);
    //         state.error = null;
    //         state.currentRequestId = undefined;
    //       }
    //     },
    //   },
    // ),
    resetUsers: create.reducer<void>((state) => {
      state.users = [];
    }),
  }),
  selectors: {
    selectUsers: (sliceState) => sliceState.users,
    selectUserStatus: (sliceState) => sliceState.status,
    selectUsersError: (sliceState) => sliceState.error,
  },
});

// export const { fetchUser, resetUsers } = usersSlice.actions;
export const { selectUsers, selectUserStatus, selectUsersError } =
  usersSlice.selectors;
export default usersSlice.reducer;
