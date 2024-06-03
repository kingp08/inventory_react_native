import {createSlice} from '@reduxjs/toolkit';

export type Currency = {
  id: string,
  name: string,
  code: string
};

export type InitialState = {
  entities: Currency[];
};

const initialState: InitialState = {
  entities: [],
};

const tasksSlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    currenciesReceived(state, action) {
      state.entities = action.payload.map(({id, name, code}: Currency)=>({id, name, code}))
    }
  },
});

export const { currenciesReceived } =
  tasksSlice.actions;

export default tasksSlice.reducer;
