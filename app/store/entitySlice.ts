import {createSlice} from '@reduxjs/toolkit';

export type THandlginUnit = {
  id: string;
  name: string;
  code: string;
  weight: string;
};

export type TSKU = {
  id: string;
  code: string;
  name: string;
  brand: string;
  accessCode: string | null;
  status: string;
};

export interface TEntityPerson {
  id: string;
  is_superuser: boolean;
  is_staff: boolean;
  user_name: string;
  code: string;
  accessCode: string | null;
  status: string;
}

export interface TEntityCompany {
  id: string;
  name: string;
  code: string;
  address: string;
  accessCode: string;
  status: string;
}

export interface TEntityEmbeddedDevice {
  id: string;
  wifi_ssid: string;
  wifi_password: string;
  api_url: string;
  software_download_link: string;
  ip_address: string;
  ble_address: string;
  device_code: string;
  device_name: string;
  usb_port: string;
  baud_rate: string;
}
export type InitialState = {
  entities: THandlginUnit[];
  SKUList: TSKU[];
  peopleList: TEntityPerson[];
  companyList: TEntityCompany[];
  embeddedDeviceList: Array<any>;
};

const initialState: InitialState = {
  entities: [],
  SKUList: [],
  peopleList: [],
  companyList: [],
  embeddedDeviceList: [],
};

const entitySlice = createSlice({
  name: 'entity',
  initialState,
  reducers: {
    handlingUnitsReceived(state, action) {
      state.entities = action.payload.map(
        ({id, name, code, weight}: THandlginUnit) => ({id, name, code, weight}),
      );
    },
    SKUsReceived(state, action) {
      state.SKUList = action.payload.map(
        ({id, code, name, brand, accessCode, status}: TSKU) => ({
          id,
          code,
          name,
          brand,
          accessCode,
          status,
        }),
      );
    },
    entityPeopleReceived(state, action) {
      state.peopleList = action.payload.map(
        ({
          id,
          is_superuser,
          is_staff,
          user_name,
          accessCode,
          status,
          code,
        }: TEntityPerson) => ({
          id,
          is_superuser,
          is_staff,
          user_name,
          accessCode,
          status,
          code,
        }),
      );
    },
    entityCompaniesReceived(state, action) {
      state.companyList = action.payload.map(
        ({id, name, code, address, accessCode, status}: TEntityCompany) => ({
          id,
          name,
          code,
          address,
          accessCode,
          status,
        }),
      );
    },
    embeddedDevicesReceived(state, action) {
      state.embeddedDeviceList = action.payload.map(
        ({
          id,
          wifi_ssid,
          wifi_password,
          api_url,
          software_download_link,
          ip_address,
          ble_address,
          device_code,
          device_name,
          usb_port,
          baud_rate,
        }: TEntityEmbeddedDevice) => ({
          id,
          wifi_ssid,
          wifi_password,
          api_url,
          software_download_link,
          ip_address,
          ble_address,
          device_code,
          device_name,
          usb_port,
          baud_rate,
        }),
      );
    },
  },
});

export const {
  handlingUnitsReceived,
  SKUsReceived,
  entityPeopleReceived,
  entityCompaniesReceived,
  embeddedDevicesReceived,
} = entitySlice.actions;

export default entitySlice.reducer;
