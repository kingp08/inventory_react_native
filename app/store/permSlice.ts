import {createSlice} from '@reduxjs/toolkit';

export type TRoleNPermission = {
  id: string,
  name: string,
  description: string,
  status: string,
};

export type InitialState = {
  entities: TRoleNPermission[];
};

const initialState: InitialState = {
  entities: [],
};

const permSlice = createSlice({
  name: 'perm',
  initialState,
  reducers: {
    permsReceived(state, action) {
      state.entities = action.payload.map(({id, name, description, status}: TRoleNPermission)=>({id, name, description, status}))
    }
  },
});

export const { permsReceived } =
  permSlice.actions;

export default permSlice.reducer;
