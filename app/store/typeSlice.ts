import { createSlice } from '@reduxjs/toolkit';

export type TItemType = {
  id: string,
  name: string,
  created_datetime: string,
  updated_datetime: string,
  syncDateTime: string | null,
  person_id_createdby: string,
  person_id_updatedby: string,
  accessCode: string | null,
  status: string
};

export type TItemSubType = {
  id: string,
  name: string,
  syncDateTime: string | null,
  accessCode: string | null,
  status: string
};

export type TLoactionCountryType = {
  id: string,
  name: string,
  accessCode: string | null,
  status: string,
}

export type InitialState = {
  itemTypes: TItemType[];
  itemSubTypes: TItemSubType[];
  itemCategory: TItemType[];
  itemSubCategory: TItemType[];
  itemTransferTypes: TItemType[];
  locationCountryTypes: TLoactionCountryType[];
};

const initialState: InitialState = {
  itemTypes: [],
  itemSubTypes: [],
  itemCategory: [],
  itemSubCategory: [],
  itemTransferTypes: [],
  locationCountryTypes: [],
};

const typeSlice = createSlice({
  name: 'type',
  initialState,
  reducers: {
    itemTypesReceived(state, action) {
      state.itemTypes = action.payload.map(({
        id, name, created_datetime, updated_datetime, syncDateTime, person_id_createdby, person_id_updatedby, accessCode, status
      }: TItemType) => ({
        id, name, created_datetime, updated_datetime, syncDateTime, person_id_createdby, person_id_updatedby, accessCode, status
      }))
    },
    itemSubTypeReceived(state, action) {
      state.itemSubTypes = action.payload.map(({
        id, name, syncDateTime, accessCode, status
      }: TItemSubType) => ({
        id, name, syncDateTime, accessCode, status
      }))
    },
    itemCategoryReceived(state, action) {
      state.itemCategory = action.payload.map(({
        id, name, created_datetime, updated_datetime, syncDateTime, person_id_createdby, person_id_updatedby, accessCode, status
      }: TItemType) => ({
        id, name, created_datetime, updated_datetime, syncDateTime, person_id_createdby, person_id_updatedby, accessCode, status
      }))
    },
    itemSubCategoryReceived(state, action) {
      state.itemSubCategory = action.payload.map(({
        id, name, created_datetime, updated_datetime, syncDateTime, person_id_createdby, person_id_updatedby, accessCode, status
      }: TItemType) => ({
        id, name, created_datetime, updated_datetime, syncDateTime, person_id_createdby, person_id_updatedby, accessCode, status
      }))
    },
    locationCountryTypesReceived(state, action) {
      state.locationCountryTypes = action.payload.map(({ id, name, accessCode, status }: TLoactionCountryType) => ({ id, name, accessCode, status }))
    },
    itemTransferTypesReceived(state, action) {
      state.itemTransferTypes = action.payload.map(({
        id, name, created_datetime, updated_datetime, syncDateTime, person_id_createdby, person_id_updatedby, accessCode, status
      }: TItemType) => ({
        id, name, created_datetime, updated_datetime, syncDateTime, person_id_createdby, person_id_updatedby, accessCode, status
      }))
    },
  },
});

export const { itemTypesReceived, itemSubTypeReceived, itemCategoryReceived, itemSubCategoryReceived, locationCountryTypesReceived, itemTransferTypesReceived } =
  typeSlice.actions;

export default typeSlice.reducer;
