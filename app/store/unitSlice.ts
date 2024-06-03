import {createSlice} from '@reduxjs/toolkit';

export type THandlginUnit = {
  id: string,
  name: string,
  code: string,
  weight: string,
};

export type TUOM = {
  id: string,
  name: string,
  acronym: string,
}

export type InitialState = {
  entities: THandlginUnit[];
  UOMList: TUOM[];
};

const initialState: InitialState = {
  entities: [],
  UOMList: [],
};

const unitSlice = createSlice({
  name: 'unit',
  initialState,
  reducers: {
    handlingUnitsReceived(state, action) {
      state.entities = action.payload.map(({id, name, code, weight}: THandlginUnit)=>({id, name, code, weight}))
    },
    UOMsReceived(state, action) {
      state.UOMList = action.payload.map(({id, name, acronym}: TUOM) => ({id, name, acronym}))
    }
  },
});

export const { handlingUnitsReceived, UOMsReceived} =
unitSlice.actions;

export default unitSlice.reducer;
