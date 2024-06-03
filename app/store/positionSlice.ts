import { createSlice } from '@reduxjs/toolkit';

// export type THandlginUnit = {
//   id: string;
//   name: string;
//   code: string;
//   weight: string;
// };

// export type TSKU = {
//   id: string;
//   code: string;
//   name: string;
//   brand: string;
//   accessCode: string | null;
//   status: string;
// };

// export interface TEntityPerson {
//   id: string;
//   is_superuser: boolean;
//   is_staff: boolean;
//   user_name: string;
//   code: string;
//   accessCode: string | null;
//   status: string;
// }

// export interface TEntityCompany {
//   id: string;
//   name: string;
//   code: string;
//   address: string;
//   accessCode: string;
//   status: string;
// }

export interface TLocationPosition {
  id: string;
  code: string;
  type_id: string;
  name: string;
  description: string;
  capacity: string;
  uom_id: string;
  parent_location_id: string;
  report_id: string;
  accessCode: string;
}
export type InitialState = {
  positionList: TLocationPosition[];
  levelList: TLocationPosition[];
  bayList: TLocationPosition[];
  rowList: TLocationPosition[];
  roomList: TLocationPosition[];

  zoneList: TLocationPosition[];
  warehouseList: TLocationPosition[];
  branchList: TLocationPosition[];
  regionList: TLocationPosition[];

};

const initialState: InitialState = {
  positionList: [],
  levelList: [],
  bayList: [],
  rowList: [],
  roomList: [],
  zoneList: [],
  warehouseList: [],
  branchList: [],
  regionList: [],
};

const positionSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    handlingPositionsReceived(state, action) {
      state.positionList = action.payload.map(
        ({ id, name, code, parent_location_id }: TLocationPosition) => ({ id, name, code, parent_location_id }),
      );
    },
    handlingLevelsReceived(state, action) {
      state.levelList = action.payload.map(
        ({ id, name, code, parent_location_id }: TLocationPosition) => ({ id, name, code, parent_location_id }),
      );
    },
    handlingBaysReceived(state, action) {
      state.bayList = action.payload.map(
        ({ id, name, code, parent_location_id }: TLocationPosition) => ({ id, name, code, parent_location_id }),
      );
    },
    handlingRowsReceived(state, action) {
      state.rowList = action.payload.map(
        ({ id, name, code, parent_location_id }: TLocationPosition) => ({ id, name, code, parent_location_id }),
      );
    },
    handlingRoomsReceived(state, action) {
      state.roomList = action.payload.map(
        ({ id, name, code, parent_location_id }: TLocationPosition) => ({ id, name, code, parent_location_id }),
      );
    },
    // handlingAreasReceived(state, action) {
    //   state.areaList = action.payload.map(
    //     ({id, name, code, parent_location_id}: TLocationPosition) => ({id, name, code, parent_location_id}),
    //   );
    // },
    handlingZonesReceived(state, action) {
      state.zoneList = action.payload.map(
        ({ id, name, code, parent_location_id }: TLocationPosition) => ({ id, name, code, parent_location_id }),
      );
    },
    handlingWarehousesReceived(state, action) {
      state.warehouseList = action.payload.map(
        ({ id, name, code, parent_location_id }: TLocationPosition) => ({ id, name, code, parent_location_id }),
      );
    },
    handlingBranchsReceived(state, action) {
      state.branchList = action.payload.map(
        ({ id, name, code, parent_location_id }: TLocationPosition) => ({ id, name, code, parent_location_id }),
      );
    },
    handlingRegionsReceived(state, action) {
      state.regionList = action.payload.map(
        ({ id, name, code, parent_location_id }: TLocationPosition) => ({ id, name, code, parent_location_id }),
      );
    },
  },
});

export const {
  handlingPositionsReceived,
  handlingBaysReceived,
  handlingBranchsReceived,
  handlingLevelsReceived,
  handlingRegionsReceived,
  handlingRoomsReceived,
  handlingRowsReceived,
  handlingWarehousesReceived,
  handlingZonesReceived
} = positionSlice.actions;

export default positionSlice.reducer;
