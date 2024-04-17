import {
  PayloadAction,
  SerializedError,
  asyncThunkCreator,
  buildCreateSlice,
} from '@reduxjs/toolkit';
import { differenceInMinutes } from 'date-fns';

export interface GeneralState {
  timeout: number;
  lastUpdate: string | undefined;
}

export const initialState: GeneralState = {
  timeout: 5,
  lastUpdate: undefined,
};

export const createSliceWithThunks = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

const generalSlice = createSliceWithThunks({
  name: 'users',
  initialState,
  reducers: (create) => ({
    resetTimeout: create.reducer((state) => {
      state.timeout = 5;
      state.lastUpdate = new Date().toISOString();
    }),
  }),
  selectors: {
    selectTimeout: (sliceState) => sliceState.timeout,
    selectLastUpdate: (sliceState) => sliceState.lastUpdate,
    selectHasTimerEnded: (sliceState) => {
      const difference = differenceInMinutes(
        new Date(sliceState.lastUpdate as string),
        new Date(),
      );
      return difference > sliceState.timeout;
    },
  },
});

export const { resetTimeout } = generalSlice.actions;
export const { selectTimeout, selectLastUpdate, selectHasTimerEnded } =
  generalSlice.selectors;
export default generalSlice.reducer;
