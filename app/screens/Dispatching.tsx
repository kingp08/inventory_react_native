import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UOMField from '../components/UOMField';

import * as Yup from 'yup';
import { FormikValues, useFormik } from 'formik';

import { ScrollView } from 'react-native-gesture-handler';
import { StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';

import AutoCompleteNScanInput from '../components/ScanItem';
import { Button } from '../components/Button/Button';

import Layout from './Layout';
import Card from '../components/Card';
import DropDown from '../components/Dropdown';
import SwitchItem from '../components/Switch';
import { AppDispatch, RootState } from '../store/store';

import { directLabelPrintAsync } from '../store/printSlice';
import { setCurrentItemInventoryAsync } from '../store/itemSlice';
import NormalInput from '../components/NormalInput';
import { TLocationPosition } from '../store/positionSlice';

interface TValues {
  destinationType: string;
  isFullTransfer: boolean;
  dispatchType: string;
  transferType: string;
  destination: string;
  productCode: string;
  newProductCode: string;
  itemSku: string;
  itemType: string;
  itemSubType: string;
  itemCategory: string;
  itemSubCategory: string;
  topHandlingUnit: string;
  bottomHandlingUnit: string;
  topQuantity: string;
  bottomQuantity: string;
  uomIn: string,
  uomInWt: string,
  uomOut: string,
  uomOutWt: string,
  purchaseCode: string;
  embeddedDevice: string;
  locationIDInfos: Array<string>;
}

const destinationTypeList = [
  { id: '1', name: 'person' },
  { id: '2', name: 'company' },
];

const dispatchTypeList = [
  { id: '1', name: 'Full Dispatch' },
  { id: '2', name: 'Partial Dispatch' },
];

function DispatchingScreen({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}): React.ReactElement {
  const { params } = route;
  // console.log('======> params', params);
  const dispatch = useDispatch<AppDispatch>();
  const user: any = useSelector((state: RootState) => state.user);
  const positions: any = useSelector((state: RootState) => state.position.positionList);

  // console.log('======> positions ========>', positions);

  const UOMList = useSelector((state: RootState) => state.unit.UOMList);
  const SKUList = useSelector((state: RootState) => state.entity.SKUList);

  const { entity: printEntity, loading: printLoading } = useSelector(
    (state: RootState) => state.print,
  );
  const { loading: saveLoading } = useSelector((state: RootState) => state.item);

  const itemInventoryList = useSelector(
    (state: RootState) => state.item.itemInventoryList,
  );

  const positionList = useSelector(
    (state: RootState) => state.position.positionList,
  );

  const levelList = useSelector(
    (state: RootState) => state.position.levelList,
  );

  const bayList = useSelector(
    (state: RootState) => state.position.bayList,
  );

  const rowList = useSelector(
    (state: RootState) => state.position.rowList,
  );

  const roomList = useSelector(
    (state: RootState) => state.position.roomList,
  );

  const zoneList = useSelector(
    (state: RootState) => state.position.zoneList,
  );

  const warehouseList = useSelector(
    (state: RootState) => state.position.warehouseList,
  );

  const branchList = useSelector(
    (state: RootState) => state.position.branchList,
  );

  const regionList = useSelector(
    (state: RootState) => state.position.regionList,
  );

  const countryList = useSelector(
    (state: RootState) => state.location.countryList,
  );

  const locationInformationList = new Array<Array<TLocationPosition>>();
  locationInformationList[0] = positionList;
  locationInformationList[1] = levelList;
  locationInformationList[2] = bayList;
  locationInformationList[3] = rowList;
  locationInformationList[4] = roomList;
  locationInformationList[5] = zoneList;
  locationInformationList[6] = warehouseList;
  locationInformationList[7] = branchList;
  locationInformationList[8] = regionList;

  const locationList = useSelector(
    (state: RootState) => state.location.locationList,
  );
  const peopleList = useSelector((state: RootState) => state.entity.peopleList);
  const companyList = useSelector(
    (state: RootState) => state.entity.companyList,
  );

  const embeddedDeviceList = useSelector(
    (state: RootState) => state.entity.embeddedDeviceList,
  );

  const transferTypeList = useSelector(
    (state: RootState) => state.type.itemTransferTypes,
  );

  const typeList = useSelector(
    (state: RootState) => state.type.itemTypes,
  );

  const subTypeList = useSelector(
    (state: RootState) => state.type.itemSubTypes,
  );

  const categoryList = useSelector(
    (state: RootState) => state.type.itemCategory,
  );

  const subCategoryList = useSelector(
    (state: RootState) => state.type.itemSubCategory,
  );

  const handlingUnitList = useSelector(
    (state: RootState) => state.unit.entities,
  );

  const [topQuantity, setTopQuantity] = useState('');
  const [bottomQuantity, setBottomQuantity] = useState('');
  const [purchaseCode, setPurchaseCode] = useState('');
  const [currentItemId, setCurrentItemId] = useState('');
  const [destinationId, setDestinationId] = useState('');
  const [itemSKUId, setItemSKUId] = useState('');
  const [topHandlingUnitId, setTopHandlingUnitId] = useState('');
  const [bottomHandlingUnit, setBottomHandlingUnit] = useState('');
  const [UOMInId, setUOMInId] = useState('');
  const [UOMOutId, setUOMOutId] = useState('');

  const [pmVisible, setPMVisible] = useState(false);

  const hidePrintModal = () => {
    setPMVisible(false);
  };
  const showPrintModal = () => {
    setPMVisible(true);
  };

  useEffect(() => {
    if (params?.fieldName && params?.value) {
      setFieldValue(params.fieldName, params.value);
    }
  }, [params]);

  const handleDirectLabelPrint = (values: FormikValues) => {
    const body = {
      item_id: values.productCode,
    };
    dispatch(directLabelPrintAsync({ body, user }));
    hidePrintModal();
  };

  const handleInventorySave = (values: FormikValues) => {
    let personId = null,
      companyId = null,
      regularUOMId = null,
      eachesReceivedUOMId = null,
      eachesRemainingUOMId = null,
      regularQtyReceived = null,
      regularQtyRemaining = null,
      eachesQtyReceived = null,
      eachesQtyRemaining = null,
      transfertype_id = null;

    if (values?.destinationType == 'person') {
      personId = destinationId;
    } else {
      companyId = destinationId;
    }

    if (values.dispatchType == 'Full Dispatch') {
      console.log("Full Transfer------------------>");

      const body = {
        id: currentItemId,
        person_customer_id: personId,
        company_customer_id: companyId,
      };
      dispatch(setCurrentItemInventoryAsync({ body, user, resetForm }));
    } else {
      console.log("Partial Transfer------------------>");

      if (values?.itemType == 'eaches') {
        eachesReceivedUOMId = UOMInId;
        eachesRemainingUOMId = UOMOutId;
        eachesQtyReceived = values.uomInWt;
        eachesQtyRemaining = values.uomOutWt;
      } else {
        regularUOMId = UOMInId;
        regularQtyReceived = values.uomInWt;
        regularQtyRemaining = values.uomOutWt;
      }
      
    transfertype_id = transferTypeList.find(item => item.name === values.transferType)?.id;

      const updatedValues = {
        code: values.newProductCode ? values.newProductCode : values.productCode,
        sku_id: itemSKUId,
        top_handling_unit_id: topHandlingUnitId,
        bottom_handling_unit_id: bottomHandlingUnit,
        person_customer_id: personId,
        company_customer_id: companyId,
        batch_number: purchaseCode,
        transfer_type_id: transfertype_id,
        no_top_handling_unit: topQuantity,
        no_bottom_handling_unit: bottomQuantity,
        type_id: values.itemType.id,
        subtype_id: values.itemSubType.id,
        category_id: values.itemCategory.id,
        subcategory_id: values.itemSubCategory.id,
        // destination: locationId,

        regular_net_qty_received: regularQtyReceived,
        regular_net_qty_remaining: regularQtyRemaining,
        regular_uom_id: regularUOMId,

        country_id: null,//values.locationIDInfos[10],
        region_id: values.locationIDInfos[9],
        branch_id: values.locationIDInfos[8],
        warehouse_id: values.locationIDInfos[7],
        zone_id: values.locationIDInfos[6],
        area_id: values.locationIDInfos[5],
        room_id: values.locationIDInfos[4],
        row_id: values.locationIDInfos[3],
        bay_id: values.locationIDInfos[2],
        level_id: values.locationIDInfos[1],
        position_id: values.locationIDInfos[0],
        bin_id: null,

        eaches_net_qty_received: eachesQtyReceived,
        eaches_net_qty_remaining: eachesQtyRemaining,
        eaches_received_uom_id: eachesReceivedUOMId,
        eaches_remaining_uom_id: eachesRemainingUOMId,
      };

      const body = {
        ...updatedValues,
      };
      dispatch(setCurrentItemInventoryAsync({ body, user, resetForm }));
    }
  };

  const initialValues: TValues = {
    isFullTransfer: true,
    destinationType: '',
    transferType: '',
    destination: '',
    productCode: '',
    newProductCode: '',
    itemSku: '',
    topHandlingUnit: '',
    bottomHandlingUnit: '',
    topQuantity: '1',
    bottomQuantity: '1',
    itemType: '',
    itemSubType: '',
    itemCategory: '',
    itemSubCategory: '',
    uomIn: '',
    uomInWt: '',
    uomOut: '',
    uomOutWt: '',
    dispatchType: 'Full Dispatch',
    purchaseCode: '',
    embeddedDevice: '',
    locationIDInfos: new Array<string>(11),
  };

  const InternalTransterSchema = Yup.object().shape({
    productCode: Yup.string().required('Requried'),
    isFullTransfer: Yup.boolean(),
    transferType: Yup.string().required('Required'),
    destinationType: Yup.string().required('Required'),
    destination: Yup.string().required('Required'),
    itemType: Yup.string().required('Required'),
  });

  const {
    handleChange,
    handleSubmit,
    handleBlur,
    values,
    errors,
    touched,
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: InternalTransterSchema,
    onSubmit: handleInventorySave,
  });

  useEffect(() => {
    if (!values.isFullTransfer) {
      setFieldValue('dispatchType', "Partial Dispatch");
    }
    else {
      setFieldValue('dispatchType', "Full Dispatch");
    }
  }, [values.isFullTransfer])

  useEffect(() => {
    const currentInventoryItem = itemInventoryList.find((item) => item.code === values.productCode);

    if (!currentInventoryItem) return;

    console.log("current inventory item (Dispatching) : ", currentInventoryItem);

    if (currentInventoryItem.sku_id != undefined || currentInventoryItem.sku_id != null) {
      const skuItem = SKUList.filter((item) => item.id === currentInventoryItem.sku_id);
      setFieldValue('itemSku', skuItem[0].name);
    }

    if (currentInventoryItem.top_handling_unit_id != undefined || currentInventoryItem.top_handling_unit_id != null)
      setFieldValue('topHandlingUnit', currentInventoryItem.top_handling_unit_id);

    if (currentInventoryItem.bottom_handling_unit_id != undefined || currentInventoryItem.bottom_handling_unit_id != null)
      setFieldValue('bottomHandlingUnit', currentInventoryItem.bottom_handling_unit_id);

    if (currentInventoryItem.type_id != undefined || currentInventoryItem.type_id != null) {
      const typeItem = typeList.find(item => item.id === currentInventoryItem.type_id);
      setFieldValue('itemType', typeItem?.name);
    }

    if (currentInventoryItem.subtype_id != undefined || currentInventoryItem.subtype_id != null) {
      const subTypeItem = subTypeList.find(item => item.id === currentInventoryItem.subtype_id);
      setFieldValue('itemSubType', subTypeItem?.name);
    }

    if (currentInventoryItem.category_id != undefined || currentInventoryItem.category_id != null) {
      const categoryItem = categoryList.find(item => item.id === currentInventoryItem.category_id);
      setFieldValue('itemCategory', categoryItem?.name);
    }

    if (currentInventoryItem.subcategory_id != undefined || currentInventoryItem.subcategory_id != null) {
      const subCategoryItem = subCategoryList.find(item => item.id === currentInventoryItem.subcategory_id);
      setFieldValue('itemSubCategory', subCategoryItem?.name);
    }

    if (currentInventoryItem.regular_uom_id != undefined || currentInventoryItem.regular_uom_id != null) {
      const uomItem = UOMList.filter(item => item.id === currentInventoryItem.regular_uom_id);
      setFieldValue('uomIn', uomItem[0].name);
    }
    if (currentInventoryItem.regular_uom_id != undefined || currentInventoryItem.regular_uom_id != null) {
      const uomItem = UOMList.filter(item => item.id === currentInventoryItem.regular_uom_id);
      setFieldValue('uomOut', uomItem[0].name);
    }
  }, [values.productCode])

  useEffect(() => {
    // console.log("current destination ", values.destination);
    // console.log("index___    :  ", positionList.findIndex(item => item.code === values.destination));
    var locationInfo = positionList.find(item => item.code === values.destination);
    values.locationIDInfos = new Array<string>(11);
    // console.log("location list : ", positionList);
    // console.log("location count : ", positionList.length);
    // console.log("location found :  ", locationInfo);
    const locationArray = new Array<TLocationPosition>();

    var loopIndex = 1;
    while (locationInfo != undefined && locationInfo != null) {

      values.locationIDInfos[loopIndex - 1] = locationInfo.id;
      locationArray.push(locationInfo);

      let searchStr = locationInfo.parent_location_id;

      // console.log("parent value : ", locationInfo.parent_location_id);
      // console.log("search value : ", searchStr);
      // console.log("locationList first id : ", positionList[0].id);

      // locationInfo = levelList.find(item => item.id === searchStr);
      locationInfo = locationInformationList[loopIndex++].find(item => item.id === searchStr);

      // console.log("location loop ", locationInfo);
      // console.log("new location count : ", levelList.length);
      // console.log("newSearch : ", locationInfo);
    }

    // console.log("location Infos : ", values.locationIDInfos);

    // console.log("location found : ", locationInfo);
    // console.log("location array : ", locationArray);
    const countryInfo = countryList.find(item => item.code === values.destination);
    // console.log("country found : ", countryInfo);
  }, [values.destination]);

  return (
    <Layout>
      <ScrollView nestedScrollEnabled={true}>
        <View style={styles.container}>
          <Card>
            <SwitchItem
              onLabel="Partial Dispatching"
              offLabel="Full Dispatching"
              isSwitchOn={values.dispatchType != 'Full Dispatch'}
              onSwitch={value => setFieldValue('isFullTransfer', value)}
            />

            <DropDown
              placeholder={'Full Dispatch / Partial Dispatch'}
              name={'dispatch Type'}
              list={dispatchTypeList}
              value={values.dispatchType}
              onChange={handleChange('dispatchType')}
              onBlur={handleBlur('dispatchType')}
              error={
                errors.dispatchType && touched.dispatchType ? errors.dispatchType : ''
              }
            />
            <NormalInput
              fieldName={'purchaseCode'}
              navigation={navigation}
              placeholder="Purchase / Restock / Transfer Code"
              onChange={handleChange('purchaseCode')}
              handleId={setPurchaseCode}
              onBlur={handleBlur('purchaseCode')}
              value={values.purchaseCode}
              data={[]}
              style={{
                zIndex: 10,
              }}
              displayName={'purchase'}
              error={
                errors.purchaseCode && touched.purchaseCode
                  ? errors.purchaseCode
                  : ''
              }
            />
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                zIndex: 9,
              }}
            >
              <DropDown
                placeholder={'Destination'}
                name={'destination Type'}
                list={destinationTypeList}
                value={values.destinationType}
                onChange={handleChange('destinationType')}
                onBlur={handleBlur('destinationType')}
                error={
                  errors.destinationType && touched.destinationType ? errors.destinationType : ''
                }
              />
              <DropDown
                placeholder={'Select Transfer Type'}
                name={'transfer Type'}
                list={transferTypeList}
                value={values.transferType}
                onChange={handleChange('transferType')}
                onBlur={handleBlur('transferType')}
                error={
                  errors.transferType && touched.transferType ? errors.transferType : ''
                }
              />
            </View>

            <AutoCompleteNScanInput
              handleId={setDestinationId}
              screenName="Dispatching"
              fieldName="destination"
              navigation={navigation}
              placeholder="Select Destination"
              onChange={handleChange('destination')}
              onBlur={handleBlur('destination')}
              value={values.destination}
              data={values.destinationType == 'person' ? peopleList : companyList}
              displayName={values.destinationType == 'person' ? 'user_name' : 'name'}
              style={{ zIndex: 12 }}
              error={
                errors.destination && touched.destination
                  ? errors.destination
                  : ''
              }
            />

            <AutoCompleteNScanInput
              handleId={setCurrentItemId}
              fieldName={'productCode'}
              screenName="Dispatching"
              navigation={navigation}
              placeholder="Enter Product Code"
              onChange={handleChange('productCode')}
              onBlur={handleBlur('productCode')}
              value={values.productCode}
              data={itemInventoryList}
              style={{ zIndex: 11 }}
              displayName={'code'}
              error={
                errors.productCode && touched.productCode
                  ? errors.productCode
                  : ''
              }
            />
            <AutoCompleteNScanInput
              handleId={setCurrentItemId}
              screenName="Dispatching"
              isEditable={values.dispatchType != 'Full Dispatch'}
              enableButton={values.dispatchType != 'Full Dispatch'}
              fieldName={'newProductCode'}
              navigation={navigation}
              placeholder="Enter new Product Code"
              onChange={handleChange('newProductCode')}
              onBlur={handleBlur('newProductCode')}
              value={values.newProductCode}
              data={itemInventoryList}
              style={{ zIndex: 10 }}
              displayName={'code'}
              error={
                errors.newProductCode && touched.newProductCode
                  ? errors.newProductCode
                  : ''
              }
            />
            <AutoCompleteNScanInput
              handleId={setItemSKUId}
              fieldName="itemSku"
              isEditable={values.dispatchType != 'Full Dispatch'}
              enableButton={values.dispatchType != 'Full Dispatch'}
              navigation={navigation}
              placeholder="Enter Item SKU"
              onChange={handleChange('itemSku')}
              onBlur={handleBlur('itemSku')}
              value={values.itemSku}
              data={SKUList}
              style={{ zIndex: 9 }}
              error={errors.itemSku && touched.itemSku ? errors.itemSku : ''}
            />

            <View
              style={{
                ...styles.container,
                zIndex: 8,
                flex: 10,
                flexDirection: 'row',
                backgroundColor: 'transparent',
              }}>
              <AutoCompleteNScanInput
                handleId={setTopHandlingUnitId}
                fieldName="topHandlingUnit"
                navigation={navigation}
                placeholder="Top Handling Unit"
                onChange={handleChange('topHandlingUnit')}
                onBlur={handleBlur('topHandlingUnit')}
                value={values.topHandlingUnit}
                data={handlingUnitList}
                style={{ zIndex: 8, flex: 3.5, }}
                error={
                  errors.topHandlingUnit && touched.topHandlingUnit
                    ? errors.topHandlingUnit
                    : ''
                }
              />
              <NormalInput
                fieldName={'topQuantity'}
                navigation={navigation}
                placeholder="Quantity"
                onChange={handleChange('topQuantity')}
                handleId={setTopQuantity}
                onBlur={handleBlur('topQuantity')}
                value={values.topQuantity}
                data={[]}
                style={{
                  zIndex: 8
                }}
                displayName={'topQuantity'}
                error={
                  errors.topQuantity && touched.topQuantity
                    ? errors.topQuantity
                    : ''
                }
              />
            </View>

            <View
              style={{
                ...styles.container,
                flex: 10,
                zIndex: 7,
                flexDirection: 'row',
                backgroundColor: 'transparent',
              }}>

              <AutoCompleteNScanInput
                handleId={setBottomHandlingUnit}
                fieldName="bottomHandlingUnit"
                navigation={navigation}
                placeholder="Bottom Handling Unit"
                onChange={handleChange('bottomHandlingUnit')}
                onBlur={handleBlur('bottomHandlingUnit')}
                value={values.bottomHandlingUnit}
                data={handlingUnitList}
                style={{ zIndex: 7, flex: 3.5, }}
                error={
                  errors.bottomHandlingUnit && touched.bottomHandlingUnit
                    ? errors.bottomHandlingUnit
                    : ''
                }
              />
              <NormalInput
                fieldName={'bottomQuantity'}
                navigation={navigation}
                placeholder="Quantity"
                onChange={handleChange('bottomQuantity')}
                handleId={setBottomQuantity}
                onBlur={handleBlur('bottomQuantity')}
                value={values.bottomQuantity}
                data={[]}
                style={{
                  zIndex: 7
                }}
                displayName={'bottomQuantity'}
                error={
                  errors.bottomQuantity && touched.bottomQuantity
                    ? errors.bottomQuantity
                    : ''
                }
              />
            </View>
            {values.dispatchType != 'Full Dispatch' ? (
              <View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row'
                  }}
                >
                  <DropDown
                    placeholder={'Select Item Type'}
                    name='itemType'
                    navigation={navigation}
                    data={{ productCode: values.productCode, returnUrl: "Dispatching" }}
                    list={typeList}
                    value={values?.itemType}
                    onChange={e => setFieldValue('itemType', e)}
                    onBlur={handleBlur('itemType')}
                    error={errors.itemType && touched.itemType ? errors.itemType : ''}
                  />
                  <DropDown
                    placeholder={'Select Item SubType'}
                    name="itemSubType"
                    list={subTypeList}
                    value={values?.itemSubType}
                    onChange={e => setFieldValue('itemSubType', e)}
                    onBlur={handleBlur('itemSubType')}
                    error={errors.itemSubType && touched.itemSubType ? errors.itemSubType : ''}
                  />
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row'
                  }}
                >
                  <DropDown
                    placeholder={'Select Item Category'}
                    name="itemCategory"
                    list={categoryList}
                    value={values.itemCategory}
                    onChange={handleChange('itemCategory')}
                    onBlur={handleBlur('itemCategory')}
                    error={errors.itemCategory && touched.itemCategory ? errors.itemCategory : ''}
                  />
                  <DropDown
                    placeholder={'Select Item SubCategory'}
                    name="itemSubCategory"
                    list={subCategoryList}
                    value={values.itemSubCategory}
                    onChange={handleChange('itemSubCategory')}
                    onBlur={handleBlur('itemSubCategory')}
                    error={errors.itemSubCategory && touched.itemSubCategory ? errors.itemSubCategory : ''}
                  />
                </View>
                <UOMField
                  fieldName="uomIn"
                  navigation={navigation}
                  groupName="UOM In"
                  data={UOMList}
                  value={values.uomIn}
                  onChange={handleChange('uomIn')}
                  onBlur={handleBlur('uomIn')}
                  wt_value={values.uomInWt}
                  wt_data={[]}
                  wt_onChange={handleChange('uomInWt')}
                  wt_onBlur={handleBlur('uomInWt')}
                  style={{ zIndex: 6 }}
                  error={errors.uomIn && touched.uomIn ? errors.uomIn : ''}
                  wt_error={
                    errors.uomInWt && touched.uomInWt ? errors.uomInWt : ''
                  }
                  handleId={setUOMInId}
                />
              </View>
            ) : null}

            <UOMField
              fieldName="uomOut"
              navigation={navigation}
              groupName="UOM Out"
              data={UOMList}
              value={values.uomOut}
              onChange={handleChange('uomOut')}
              onBlur={handleBlur('uomOut')}
              wt_value={values.uomOutWt}
              wt_data={[]}
              wt_onChange={handleChange('uomOutWt')}
              wt_onBlur={handleBlur('uomOutWt')}
              style={{ zIndex: 4 }}
              error={errors.uomOut && touched.uomOut ? errors.uomOut : ''}
              wt_error={
                errors.uomOutWt && touched.uomOutWt ? errors.uomOutWt : ''
              }
              handleId={setUOMOutId}
            />

            <Button
              text="Print"
              isLoading={printLoading}
              onPress={showPrintModal}
            // testID="Login.Button"
            />
            <Button
              text="Save"
              isLoading={saveLoading}
              onPress={handleSubmit}
            // testID="Login.Button"
            />
            <Modal onDismiss={hidePrintModal} isVisible={pmVisible}>
              <View style={styles.modalContainerStyle}>
                <AutoCompleteNScanInput
                  handleId={setCurrentItemId}
                  screenName="Dispatching"
                  navigation={navigation}
                  placeholder="Enter the Embedded Device"
                  onChange={handleChange('embeddedDevice')}
                  onBlur={handleBlur('embeddedDevice')}
                  value={values.embeddedDevice}
                  data={embeddedDeviceList}
                  displayName="device_code"
                  style={{ zIndex: 2 }}
                  error={
                    errors.embeddedDevice && touched.embeddedDevice
                      ? errors.embeddedDevice
                      : ''
                  }
                />
                <View
                  style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                  <Button
                    onPress={() => handleDirectLabelPrint(values)}
                    text="OK"
                  />
                  <Button onPress={hidePrintModal} text="CANCEL" />
                </View>
              </View>
            </Modal>
          </Card>
        </View>
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  modalContainerStyle: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'white',
  },

  centeredView: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
});

export default DispatchingScreen;
