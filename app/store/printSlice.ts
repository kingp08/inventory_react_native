import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {setDirectLabelPrint} from '../services';
import Toast from 'react-native-toast-message';

export interface TDirectLabelPrint {
  item_id: string;
  weight: string;
  production_date: null | string;
  dispatch_date: null | string;
  print_reference: null | string;
  syncDateTime: null | string;
  uom_id: string;
  source_branch_id: null | string;
  source_warehouse_id: null | string;
  customer_id: null | string;
  embedded_device_id: null | string;
  accessCode: null | string;
  status: string;
}

const initialState = {
  entity: {
    item_id: '',
    weight: '',
    production_date: '',
    dispatch_date: '',
    print_reference: '',
    syncDateTime: '',
    uom_id: '',
    source_branch_id: '',
    source_warehouse_id: '',
    customer_id: '',
    embedded_device_id: '',
    accessCode: '',
    status: '',
  },
  loading: false,
};

export const directLabelPrintAsync = createAsyncThunk(
  'print/directLabel',
  async ({body, user}: {body: any; user: any}, {rejectWithValue}) => {
    try {
      const res = await setDirectLabelPrint(body, user);
      return res?.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

const printSlice = createSlice({
  name: 'print',
  initialState,
  reducers: {
    updatePrint(state, action) {
      // const {url, username, token, refreshToken} = action.payload;
      // state.url = url;
      // state.username = username;
      // state.token = token;
      // state.refreshToken = refreshToken;
      return {
        ...state,
        ...action.payload,
      };
    },
  },
  extraReducers: builder => {
    builder.addCase(directLabelPrintAsync.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(directLabelPrintAsync.fulfilled, (state, action: any) => {
      Toast.show({
        type: 'success',
        text1: 'Printed Successfully',
      });
      state.entity = action.payload;
      state.loading = false;
    }),
      builder.addCase(directLabelPrintAsync.rejected, (state, action: any) => {
        state.loading = false;
        const formattedErrors = Object.entries(action.payload).map(
          ([key, value]: any) => `${key}: ${value.join(' ')}`,
        );
        console.error(formattedErrors);
        Toast.show({
          type: 'error',
          text1: JSON.stringify(formattedErrors),
        });
      });
  },
});

export const {updatePrint} = printSlice.actions;

export default printSlice.reducer;
