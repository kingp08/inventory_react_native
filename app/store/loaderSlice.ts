import {createSlice} from '@reduxjs/toolkit';

export type TLoading = {
  loading: boolean;
};

export type InitialState = {
  loading: boolean;
};

const initialState: InitialState = {
    loading: false
};

const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    updateLoader(state, action) {
        return {
            ...state,
            ...action.payload
        }
    },
  },
});

export const {updateLoader} = loaderSlice.actions;

export default loaderSlice.reducer;
