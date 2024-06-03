import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
  setCurrentItemInventory,
  putCurrentItemInventory,
} from '../services/item';
import Toast from 'react-native-toast-message';

export type TItemInventory = {
  id: string;
  code: string;
  description: string;
};

export type TRawItem = {
  code: string;
  uom: string;
  quantity: string;
};

export interface TItemInventoryDetailed {
  id: string;
  code: string;
  name: string;
  description: string | null;
  lot_number: string | null;
  batch_number: string | null;
  generic_code: string | null;
  image_url: string | null;
  // has_bom: boolean;
  regular_net_qty_received: number | null;
  regular_net_qty_remaining: number | null;
  eaches_net_qty_received: number | null;
  eaches_net_qty_remaining: number | null;
  no_top_handling_unit: number | null;
  no_bottom_handling_unit: number | null;
  manufacturing_date: string;
  slaughter_date: string;
  production_date: string;
  processing_date: string;
  datetime_in: string;
  datetime_out: string;
  expiration_date: string;
  created_datetime: string;
  updated_datetime: string;
  syncDateTime: string | null;
  sku_id: string | null;
  transfer_type_id: string | null;
  cost_center_id: string | null;
  category_id: string | null;
  subcategory_id: string | null;
  type_id: string | null;
  subtype_id: string | null;
  company_supplier_id: string | null;
  company_customer_id: string | null;
  person_supplier_id: string | null;
  person_customer_id: string | null;
  regular_uom_id: string | null;
  eaches_received_uom_id: string | null;
  eaches_remaining_uom_id: string | null;
  top_handling_unit_id: string | null;
  bottom_handling_unit_id: string | null;
  country_id: string | null;
  region_id: string | null;
  branch_id: string | null;
  warehouse_id: string | null;
  zone_id: string | null;
  area_id: string | null;
  room_id: string | null;
  row_id: string | null;
  bay_id: string | null;
  level_id: string | null;
  position_id: string | null;
  bin_id: string | null;
  person_id_createdby: string;
  person_id_updatedby: string | null;
  accessCode: string | null;
  status: string;
}

export interface TItemInventoryPostBody {
  code: string;
  has_bom: boolean;
  regular_net_qty_received: number | null;
  regular_net_qty_remaining: number | null;
  eaches_net_qty_received: number | null;
  eaches_net_qty_remaining: number | null;
  no_top_handling_unit: number | null;
  no_bottom_handling_unit: number | null;
  manufacturing_date: string;
  slaughter_date: string;
  production_date: string;
  processing_date: string;
  datetime_in: string;
  datetime_out: string;
  expiration_date: string;
  created_datetime: string;
  updated_datetime: string;
  syncDateTime: string | null;
  sku_id: string | null;
  company_supplier_id: string | null;
  company_customer_id: string | null;
  person_supplier_id: string | null;
  person_customer_id: string | null;
  regular_uom_id: string | null;
  eaches_received_uom_id: string | null;
  eaches_remaining_uom_id: string | null;
  top_handling_unit_id: string | null;
  bottom_handling_unit_id: string | null;
  country_id: string | null;
  region_id: string | null;
  branch_id: string | null;
  warehouse_id: string | null;
  zone_id: string | null;
  area_id: string | null;
  room_id: string | null;
  row_id: string | null;
  bay_id: string | null;
  level_id: string | null;
  position_id: string | null;
  bin_id: string | null;
  person_id_createdby: string;
  person_id_updatedby: string | null;
  accessCode: string | null;
  status: string;
}

export interface TItemInventoryPutBody {
  code: string;
  has_bom: boolean;
  net_qty_in_regular: string;
  net_current_qty_regular: string;
  net_qty_in_eaches: string | 'NA';
  net_current_qty_eaches: string | 'NA';
  manufacturing_date: null | string;
  slaughter_date: null | string;
  production_date: null | string;
  processing_date: null | string;
  datetime_in: null | string;
  datetime_out: null | string;
  created_datetime: string;
  updated_datetime: string;
  sku_id: string;
  supplier_id: null | string;
  customer_id: null | string;
  uom_id_regular: null | string;
  uom_id_eaches: null | string;
  top_handling_unit_id: null | string;
  no_top_handling_unit: null | string;
  bottom_handling_unit_id: null | string;
  no_bottom_handling_unit: null | string;
  country_id: null | string;
  region_id: null | string;
  branch_id: null | string;
  warehouse_id: null | string;
  zone_id: null | string;
  area_id: null | string;
  room_id: null | string;
  row_id: null | string;
  bay_id: null | string;
  level_id: null | string;
  position_id: null | string;
  bin_id: null | string;
  person_id_createdby: null | string;
  person_id_updatedby: null | string;
  status: string;
}

export type TItemBOM = {
  id: string;
};

export type InitialState = {
  itemInventoryList: TItemInventoryDetailed[];
  activeItemInventory: TItemInventoryDetailed;
  itemBOMList: TItemBOM[];
  loading: boolean;
  rawItemList: TRawItem[];
};

const initialState: InitialState = {
  itemInventoryList: [],
  activeItemInventory: {
    id: '',
    code: '',
    name: '',
    description: '',
    lot_number: '',
    batch_number: '',
    generic_code: '',
    image_url: '',
    // has_bom: false,
    regular_net_qty_received: -1,
    regular_net_qty_remaining: -1,
    eaches_net_qty_received: -1,
    eaches_net_qty_remaining: -1,
    no_top_handling_unit: -1,
    no_bottom_handling_unit: -1,
    manufacturing_date: '',
    slaughter_date: '',
    production_date: '',
    processing_date: '',
    datetime_in: '',
    datetime_out: '',
    expiration_date: '',
    created_datetime: '',
    updated_datetime: '',
    syncDateTime: '',
    sku_id: '',
    transfer_type_id: '',
    cost_center_id: '',
    category_id: '',
    subcategory_id: '',
    type_id: '',
    subtype_id: '',
    company_supplier_id: '',
    company_customer_id: '',
    person_supplier_id: '',
    person_customer_id: '',
    regular_uom_id: '',
    eaches_received_uom_id: '',
    eaches_remaining_uom_id: '',
    top_handling_unit_id: '',
    bottom_handling_unit_id: '',
    country_id: '',
    region_id: '',
    branch_id: '',
    warehouse_id: '',
    zone_id: '',
    area_id: '',
    room_id: '',
    row_id: '',
    bay_id: '',
    level_id: '',
    position_id: '',
    bin_id: '',
    person_id_createdby: '',
    person_id_updatedby: '',
    accessCode: '',
    status: '',
  },
  itemBOMList: [],
  loading: false,
  rawItemList: [],
};

export const setCurrentItemInventoryAsync = createAsyncThunk(
  'item/setCurrentitemInventory',
  async (
    {body, user, resetForm}: {body: any; user: any; resetForm: any},
    {rejectWithValue},
  ) => {
    try {
      // const {id: itemId, ...restBody} = body;

      let res: any = {};
      if (body.id) {
        res = await putCurrentItemInventory(body, body.id, user);
      } else {
        res = await setCurrentItemInventory(body, user);
      }
      resetForm();
      return res?.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

const itemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {
    itemInventoriesReceived(state, action) {
      state.itemInventoryList = action.payload.map(
        ({
          id,
          code,
          name,
          description,
          lot_number,
          batch_number,
          generic_code,
          image_url,
          regular_net_qty_received,
          regular_net_qty_remaining,
          eaches_net_qty_received,
          eaches_net_qty_remaining,
          no_top_handling_unit,
          no_bottom_handling_unit,
          manufacturing_date,
          slaughter_date,
          production_date,
          processing_date,
          datetime_in,
          datetime_out,
          expiration_date,
          created_datetime,
          updated_datetime,
          syncDateTime,
          sku_id,
          transfer_type_id,
          cost_center_id,
          category_id,
          subcategory_id,
          type_id,
          subtype_id,
          company_supplier_id,
          company_customer_id,
          person_supplier_id,
          person_customer_id,
          regular_uom_id,
          eaches_received_uom_id,
          eaches_remaining_uom_id,
          top_handling_unit_id,
          bottom_handling_unit_id,
          country_id,
          region_id,
          branch_id,
          warehouse_id,
          zone_id,
          area_id,
          room_id,
          row_id,
          bay_id,
          level_id,
          position_id,
          bin_id,
          person_id_createdby,
          person_id_updatedby,
          accessCode,
          status,
        }: TItemInventoryDetailed) => ({
          id,
          code,
          name,
          description,
          lot_number,
          batch_number,
          generic_code,
          image_url,
          regular_net_qty_received,
          regular_net_qty_remaining,
          eaches_net_qty_received,
          eaches_net_qty_remaining,
          no_top_handling_unit,
          no_bottom_handling_unit,
          manufacturing_date,
          slaughter_date,
          production_date,
          processing_date,
          datetime_in,
          datetime_out,
          expiration_date,
          created_datetime,
          updated_datetime,
          syncDateTime,
          sku_id,
          transfer_type_id,
          cost_center_id,
          category_id,
          subcategory_id,
          type_id,
          subtype_id,
          company_supplier_id,
          company_customer_id,
          person_supplier_id,
          person_customer_id,
          regular_uom_id,
          eaches_received_uom_id,
          eaches_remaining_uom_id,
          top_handling_unit_id,
          bottom_handling_unit_id,
          country_id,
          region_id,
          branch_id,
          warehouse_id,
          zone_id,
          area_id,
          room_id,
          row_id,
          bay_id,
          level_id,
          position_id,
          bin_id,
          person_id_createdby,
          person_id_updatedby,
          accessCode,
          status,
        }),
      );
    },
    itemBOMsReceived(state, action) {
      state.itemBOMList = action.payload.map(({id}: TItemBOM) => ({id}));
    },
    activeItemInventoryReceived(state, action) {
      state.activeItemInventory = action.payload;
    },
    rawItemListUpdated(state, action) {
      state.rawItemList = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(setCurrentItemInventoryAsync.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(
      setCurrentItemInventoryAsync.fulfilled,
      (state, action: any) => {
        Toast.show({
          type: 'success',
          text1: 'Saved Successfully',
        });
        state.loading = false;
      },
    ),
      builder.addCase(
        setCurrentItemInventoryAsync.rejected,
        (state, action: {payload: any}) => {
          state.loading = false;
          // console.log('====> set current inventory async');
          // console.log(action);
          // const payload = {"code": ["This field may not be blank."]};
          // Extract the messages for each field and join them

          const errorText = action.payload?.code?.join();

          const formattedErrors = Object.entries(action.payload).map(
            ([key, value]: any) => `${key}: ${value.join(' ')}`,
          );
          console.log(formattedErrors);

          Toast.show({
            type: 'error',
            text1: errorText || 'Something wrong, try again',
            autoHide: true,
            visibilityTime: 5000,
            swipeable: false,
          });
        },
      );
  },
});

export const {
  itemInventoriesReceived,
  itemBOMsReceived,
  activeItemInventoryReceived,
  rawItemListUpdated,
} = itemSlice.actions;

export default itemSlice.reducer;
