import {createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login } from '../services';

const initialState = {
  url: '',
  username: '',
  token: '',
  refreshToken: '',
  loading: false,
};

export const loginThunk = createAsyncThunk(
  'user/login',
  async(body:any, thunkAPI) =>{
    const res = await login(body);
    return res?.data;
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser(state, action) {
      // const {url, username, token, refreshToken} = action.payload;
      // state.url = url;
      // state.username = username;
      // state.token = token;
      // state.refreshToken = refreshToken;
      return {
        ...state,
        ...action.payload,
      }
    },
    updateToken(state, action) {
      state.token = action.payload.token;
    },
    clearUser() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginThunk.pending, (state, action) => {
      state.loading = true
    });
    builder.addCase(loginThunk.fulfilled, (state, action: any) => {
      console.log('login thunk ===>', action.payload)
      // const {url, username, token, refreshToken} = action.payload;
      // state.url = url;
      // state.username = username;
      // state.token = token;
      // state.refreshToken = refreshToken;
      state.loading = false;
    }),
    builder.addCase(loginThunk.rejected, (state, action) => {
      state.loading = false;
    })
  }
});

export const {updateUser, updateToken, clearUser } = userSlice.actions;

export default userSlice.reducer;
