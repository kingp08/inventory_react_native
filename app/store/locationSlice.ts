import { createSlice } from '@reduxjs/toolkit';

export type TLocationCountry = {
  id: string;
  name: string;
  code: string;
  description: string;
  accessCode: string;
  status: string;
};

export type TLocation = {
  id: string;
  name: string;
  code: string;
  parent_location_id?: string | null;
};

export type InitialState = {
  locationList: TLocation[];
  countryList: TLocationCountry[];
};

const initialState: InitialState = {
  locationList: [],
  countryList: [],
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    locationsReceived(state, action) {
      const valuesArray: any = Object.values(action.payload);
      state.locationList = valuesArray.map(
        ({
          id,
          name,
          code,
          parent_location_id
        }: TLocation) => ({
          id,
          name,
          code,
          parent_location_id
        }),
      );
    },
    locationCountriesReceived(state, action) {
      const valuesArray: any = Object.values(action.payload);
      state.countryList = valuesArray.map(
        ({
          id,
          name,
          code,
          description,
          accessCode,
          status,
        }: TLocationCountry) => ({
          id,
          name,
          code,
          description,
          accessCode,
          status
        }),
      );
    },
  },
});

export const { locationsReceived, locationCountriesReceived } = locationSlice.actions;

export default locationSlice.reducer;
