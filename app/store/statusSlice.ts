import {createSlice} from '@reduxjs/toolkit';

export type TStatus= {
  id: string,
  name: string,
};

export type InitialState = {
  statusList: TStatus[];
};

const initialState: InitialState = {
  statusList: [],
};

const statusSlice = createSlice({
  name: 'status',
  initialState,
  reducers: {
    statusReceived(state, action) {
      state.statusList = action.payload;
    }
  },
});

export const { statusReceived } =
statusSlice.actions;

export default statusSlice.reducer;
