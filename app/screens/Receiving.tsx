import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {StyleSheet, View} from 'react-native';
import Modal from 'react-native-modal';
import Layout from './Layout';
import {ScrollView} from 'react-native-gesture-handler';
import * as Yup from 'yup';
import AutoCompleteNScanInput from '../components/ScanItem';
import DropDown from '../components/Dropdown';
import {Button} from '../components/Button/Button';
import Card from '../components/Card';
import UOMField from '../components/UOMField';
import {RootState} from '../store/store';
import {FormikValues, useFormik} from 'formik';
import {directLabelPrintAsync} from '../store/printSlice';
import {setCurrentItemInventoryAsync} from '../store/itemSlice';
import {AppDispatch} from '../store/store';
import NormalInput from '../components/NormalInput';
import {TLocationPosition} from '../store/positionSlice';
import _ from 'lodash';
import {ToastConfig} from '../components/Toast/ToastConfig';

interface ValuesType {
  topQuantity: string;
  bottomQuantity: string;
  purchaseCode: string;
  productCode: string;
  itemSku: string;
  topHandlingUnit: string;
  bottomHandlingUnit: string;
  itemType: string;
  itemSubType: string;
  itemCategory: string;
  itemSubCategory: string;
  source: string;
  sourceType: string;
  transferType: string;
  destination: string;
  uomIn: string;
  uomInWt: string;
  uomOut: string;
  uomOutWt: string;
  embeddedDevice: string;
  locationIDInfos: Array<string>;
}

const RecevingSchema = Yup.object().shape({
  purchaseCode: Yup.string().required('Required'),
  productCode: Yup.string().required('Required'),
  itemSku: Yup.string().required('Required'),
  itemType: Yup.string().required('Required'),
  uomIn: Yup.string().required('Required'),
  uomOut: Yup.string().required('Required'),
  source: Yup.string().required('Required'),
  destination: Yup.string().required('Required'),
});

// const itemTypes = [
//   {id: '1', name: 'material/raw'},
//   {id: '2', name: 'eaches'},
//   {id: '3', name: 'assembly'},
// ];

const sourceTypeList = [
  {id: '1', name: 'person'},
  {id: '2', name: 'company'},
];

const ReceivingScreen = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}): React.ReactElement => {
  const {params} = route;

  const initialValues: ValuesType = {
    topQuantity: '1',
    bottomQuantity: '1',
    purchaseCode: '',
    productCode: '',
    itemSku: '',
    topHandlingUnit: '',
    bottomHandlingUnit: '',
    itemType: '',
    itemSubType: '',
    itemCategory: '',
    itemSubCategory: '',
    source: '',
    sourceType: 'company',
    transferType: '',
    destination: '',
    uomIn: '',
    uomInWt: '',
    uomOut: '',
    uomOutWt: '',
    embeddedDevice: '',
    locationIDInfos: new Array<string>(11),
  };

  const dispatch = useDispatch<AppDispatch>();
  const user: any = useSelector((state: RootState) => state.user);

  const {entity: printEntity, loading: printLoading} = useSelector(
    (state: RootState) => state.print,
  );

  const {loading: saveLoading} = useSelector((state: RootState) => state.item);

  // console.log('loading saveing', saveLoading);

  // const currencyList = useSelector(
  //   (state: RootState) => state.currency.entities,
  // );
  const [pmVisible, setPMVisible] = useState(false);
  console.log({printLoading, pmVisible});
  const hidePrintModal = () => {
    setPMVisible(false);
  };
  const showPrintModal = () => {
    setPMVisible(true);
  };

  const handlingUnitList = useSelector(
    (state: RootState) => state.unit.entities,
  );
  const UOMList = useSelector((state: RootState) => state.unit.UOMList);

  const SKUList = useSelector((state: RootState) => state.entity.SKUList);
  // const statusList = useSelector((state: RootState) => state.status.statusList);
  const peopleList = useSelector((state: RootState) => state.entity.peopleList);
  // console.log('loading UOMList', peopleList);

  const companyList = useSelector(
    (state: RootState) => state.entity.companyList,
  );
  const itemInventoryList = useSelector(
    (state: RootState) => state.item.itemInventoryList,
  );

  const positionList = useSelector(
    (state: RootState) => state.position.positionList,
  );

  const levelList = useSelector((state: RootState) => state.position.levelList);

  const bayList = useSelector((state: RootState) => state.position.bayList);

  const rowList = useSelector((state: RootState) => state.position.rowList);

  const roomList = useSelector((state: RootState) => state.position.roomList);

  const zoneList = useSelector((state: RootState) => state.position.zoneList);

  const warehouseList = useSelector(
    (state: RootState) => state.position.warehouseList,
  );

  const branchList = useSelector(
    (state: RootState) => state.position.branchList,
  );

  const regionList = useSelector(
    (state: RootState) => state.position.regionList,
  );

  // const countryList = useSelector(
  //   (state: RootState) => state.location.countryList,
  // );

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

  // console.log("All informations", locationInformationList);

  // console.log("CountryList : ", countryList);
  const transferTypeList = useSelector(
    (state: RootState) => state.type.itemTransferTypes,
  );

  // console.log('transferTypeList : ', transferTypeList);
  const typeList = useSelector((state: RootState) => state.type.itemTypes);

  const subTypeList = useSelector(
    (state: RootState) => state.type.itemSubTypes,
  );

  const categoryList = useSelector(
    (state: RootState) => state.type.itemCategory,
  );

  const subCategoryList = useSelector(
    (state: RootState) => state.type.itemSubCategory,
  );

  // For the Embedded Device List
  // const itemBOMList = useSelector((state: RootState) => state.item.itemBOMList);

  const embeddedDeviceList = useSelector(
    (state: RootState) => state.entity.embeddedDeviceList,
  );
  // console.log("MMMMMMMMMMMMMMMMMMMMMMMM");
  // console.log(itemInventoryList);
  // console.log("MMMMMMMMMMMMMMMMMMMM");

  const [topQuantity, setTopQuantity] = useState('');
  const [bottomQuantity, setBottomQuantity] = useState('');
  const [purchaseCode, setPurchaseCode] = useState('');
  const [currentItemId, setCurrentItemId] = useState('');
  const [itemSKUId, setItemSKUId] = useState('');
  const [topHandlingUnitId, setTopHandlingUnitId] = useState('');
  const [bottomHandlingUnit, setBottomHandlingUnit] = useState('');
  const [sourceId, setSourceId] = useState('');
  const [locationId, setLocationId] = useState('');
  const [UOMInId, setUOMInId] = useState('');
  const [UOMOutId, setUOMOutId] = useState('');

  //////////////////////////////
  // const transfer_type_list = itemInventoryList.map((i) => { return i.transfer_type_id });
  // // console.log("transfer_type_id : ", transfer_type_list);

  // const batch_number_list = itemInventoryList.map(i => i.batch_number);

  // const company_supplier_id_list = Array.from(new Set(itemInventoryList.map(i => i.company_supplier_id)));
  // // console.log("transfer_type_id : ", company_supplier_id_list);
  // const person_supplier_id_list = Array.from(new Set(itemInventoryList.map(i => i.person_supplier_id)));

  // console.log("person_supplier_id_list: ", company_supplier_id_list);
  ////////////////////////////

  // const itemTypeList = typeList.map(i => { return { id: (typeList.indexOf(i) + 1).toString(), name: i.name }; });
  // const itemTypeList = [{ id: '1', name: 'material/raw' },
  // { id: '2', name: 'eaches' },
  // { id: '3', name: 'assembly' }];
  // const itemTypeList = [
  //   { id: '1', name: 'material/raw' },
  //   { id: '2', name: 'eaches' },
  //   { id: '3', name: 'assembly' },
  // ];
  // const itemTypeList = itemTypes;

  const handleDirectLabelPrint = (values: FormikValues) => {
    const body = {
      item_id: values.productCode,
    };
    dispatch(directLabelPrintAsync({body, user}));
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
    if (values?.sourceType == 'person') {
      personId = sourceId;
    } else {
      companyId = sourceId;
    }
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

    transfertype_id = transferTypeList.find(
      item => item.name === values.transferType,
    )?.id;

    const updatedValues = {
      code: values.productCode,
      sku_id: itemSKUId,
      top_handling_unit_id: topHandlingUnitId,
      bottom_handling_unit_id: bottomHandlingUnit,
      person_supplier_id: personId,
      company_supplier_id: companyId,
      batch_number: purchaseCode,
      generic_code: purchaseCode,
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

      country_id: null, //values.locationIDInfos[10],
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
    dispatch(setCurrentItemInventoryAsync({body, user, resetForm}));
  };

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
    validationSchema: RecevingSchema,
    onSubmit: handleInventorySave,
  });

  useEffect(() => {
    if (params?.fieldName && params?.value) {
      const currentInventoryItem = _.find(itemInventoryList, {
        code: params?.value,
      });
      if (currentInventoryItem) {
        setFieldValue(params.fieldName, params.value);

        if (currentInventoryItem.sku_id) {
          const skuItem = _.find(SKUList, {id: currentInventoryItem.sku_id});
          skuItem && setFieldValue('itemSku', skuItem.name);
        }

        if (currentInventoryItem.top_handling_unit_id)
          setFieldValue(
            'topHandlingUnit',
            currentInventoryItem.top_handling_unit_id,
          );

        if (currentInventoryItem.bottom_handling_unit_id)
          setFieldValue(
            'bottomHandlingUnit',
            currentInventoryItem.bottom_handling_unit_id,
          );

        if (currentInventoryItem.type_id) {
          const typeItem = _.find(typeList, {id: currentInventoryItem.type_id});
          typeItem && setFieldValue('itemType', typeItem.name);
        }

        if (currentInventoryItem.subtype_id) {
          const subTypeItem = _.find(subTypeList, {
            id: currentInventoryItem.subtype_id,
          });
          subTypeItem && setFieldValue('itemSubType', subTypeItem.name);
        }

        if (currentInventoryItem.category_id) {
          const categoryItem = _.find(categoryList, {
            id: currentInventoryItem.category_id,
          });
          categoryItem && setFieldValue('itemCategory', categoryItem.name);
        }

        if (currentInventoryItem.subcategory_id) {
          const subCategoryItem = _.find(subCategoryList, {
            id: currentInventoryItem.subcategory_id,
          });
          subCategoryItem &&
            setFieldValue('itemSubCategory', subCategoryItem?.name);
        }

        if (currentInventoryItem.regular_uom_id) {
          const uomItem = _.find(UOMList, {
            id: currentInventoryItem.regular_uom_id,
          });
          uomItem && setFieldValue('uomIn', uomItem.name);
        }
        if (currentInventoryItem.regular_uom_id) {
          const uomItem = _.find(UOMList, {
            id: currentInventoryItem.regular_uom_id,
          });
          uomItem && setFieldValue('uomOut', uomItem.name);
        }
        if (currentInventoryItem.position_id) {
          setFieldValue(
            'destination',
            locationInformationList[0].find(
              item => item.id === currentInventoryItem.position_id,
            )?.code,
          );
        }
      } else {
        setFieldValue(params.fieldName, '');
        ToastConfig.show({
          type: 'error',
          message: 'The product was not found in the database',
        });
      }

      params.fieldName = null;
      params.value = null;
    }
  }, [params]);

  useEffect(() => {
    // console.log("current destination ", values.destination);
    // console.log("index___    :  ", positionList.findIndex(item => item.code === values.destination));
    let locationInfo = positionList.find(
      item => item.code === values.destination,
    );
    values.locationIDInfos = new Array<string>(11);
    // console.log("location list : ", positionList);
    // console.log("location count : ", positionList.length);
    // console.log("location found :  ", locationInfo);
    const locationArray = new Array<TLocationPosition>();

    let loopIndex = 1;
    while (locationInfo != undefined && locationInfo != null) {
      values.locationIDInfos[loopIndex - 1] = locationInfo.id;
      locationArray.push(locationInfo);

      const searchStr = locationInfo.parent_location_id;

      // console.log("parent value : ", locationInfo.parent_location_id);
      // console.log("search value : ", searchStr);
      // console.log("locationList first id : ", positionList[0].id);

      // locationInfo = levelList.find(item => item.id === searchStr);
      locationInfo = locationInformationList[loopIndex++].find(
        item => item.id === searchStr,
      );

      // console.log("location loop ", locationInfo);
      // console.log("new location count : ", levelList.length);
      // console.log("newSearch : ", locationInfo);
    }

    // console.log("location Infos : ", values.locationIDInfos);

    // console.log("location found : ", locationInfo);
    // console.log("location array : ", locationArray);

    // console.log("country found : ", countryInfo);
  }, [values.destination]);

  return (
    <Layout>
      <ScrollView nestedScrollEnabled={true}>
        <View style={styles.container}>
          <Card>
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
              }}>
              <DropDown
                placeholder={'Source'}
                name={'source Type'}
                list={sourceTypeList}
                value={values.sourceType}
                onChange={handleChange('sourceType')}
                onBlur={handleBlur('sourceType')}
                error={
                  errors.sourceType && touched.sourceType
                    ? errors.sourceType
                    : ''
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
                  errors.transferType && touched.transferType
                    ? errors.transferType
                    : ''
                }
              />
            </View>
            <AutoCompleteNScanInput
              handleId={setSourceId}
              fieldName="source"
              navigation={navigation}
              placeholder="Select Source"
              data={values.sourceType == 'person' ? peopleList : companyList}
              value={values.source}
              onChange={handleChange('source')}
              onBlur={handleBlur('source')}
              style={{zIndex: 9}}
              displayName={values.sourceType == 'person' ? 'user_name' : 'name'}
              error={errors.source && touched.source ? errors.source : ''}
            />
            <AutoCompleteNScanInput
              fieldName={'productCode'}
              navigation={navigation}
              placeholder="Enter Product Code"
              onChange={handleChange('productCode')}
              handleId={setCurrentItemId}
              onBlur={handleBlur('productCode')}
              value={values.productCode}
              data={itemInventoryList}
              style={{zIndex: 8}}
              displayName={'code'}
              error={
                errors.productCode && touched.productCode
                  ? errors.productCode
                  : ''
              }
            />
            <AutoCompleteNScanInput
              handleId={setItemSKUId}
              fieldName="itemSku"
              navigation={navigation}
              placeholder="Enter Item SKU"
              onChange={handleChange('itemSku')}
              onBlur={handleBlur('itemSku')}
              value={values.itemSku}
              data={SKUList}
              style={{zIndex: 7}}
              error={errors.itemSku && touched.itemSku ? errors.itemSku : ''}
            />
            <View
              style={{
                ...styles.container,
                zIndex: 6,
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
                style={{zIndex: 6, flex: 3.5}}
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
                  zIndex: 6,
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
                zIndex: 5,
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
                style={{zIndex: 5, flex: 3.5}}
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
                  zIndex: 5,
                }}
                displayName={'bottomQuantity'}
                error={
                  errors.bottomQuantity && touched.bottomQuantity
                    ? errors.bottomQuantity
                    : ''
                }
              />
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
              }}>
              <DropDown
                placeholder={'Select Item Type'}
                name="itemType"
                navigation={navigation}
                data={{productCode: values.productCode, returnUrl: 'Receiving'}}
                list={typeList}
                value={values?.itemType}
                onChange={e => setFieldValue('itemType', e)}
                onBlur={handleBlur('itemType')}
                error={
                  errors.itemType && touched.itemType ? errors.itemType : ''
                }
              />
              <DropDown
                placeholder={'Select Item SubType'}
                name="itemSubType"
                list={subTypeList}
                value={values?.itemSubType}
                onChange={e => setFieldValue('itemSubType', e)}
                onBlur={handleBlur('itemSubType')}
                error={
                  errors.itemSubType && touched.itemSubType
                    ? errors.itemSubType
                    : ''
                }
              />
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
              }}>
              <DropDown
                placeholder={'Select Item Category'}
                name="itemCategory"
                list={categoryList}
                value={values.itemCategory}
                onChange={handleChange('itemCategory')}
                onBlur={handleBlur('itemCategory')}
                error={
                  errors.itemCategory && touched.itemCategory
                    ? errors.itemCategory
                    : ''
                }
              />
              <DropDown
                placeholder={'Select Item SubCategory'}
                name="itemSubCategory"
                list={subCategoryList}
                value={values.itemSubCategory}
                onChange={handleChange('itemSubCategory')}
                onBlur={handleBlur('itemSubCategory')}
                error={
                  errors.itemSubCategory && touched.itemSubCategory
                    ? errors.itemSubCategory
                    : ''
                }
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
              style={{zIndex: 4}}
              error={errors.uomIn && touched.uomIn ? errors.uomIn : ''}
              wt_error={errors.uomInWt && touched.uomInWt ? errors.uomInWt : ''}
              handleId={setUOMInId}
            />
            <UOMField
              navigation={navigation}
              groupName="UOM Out"
              data={UOMList}
              fieldName="uomOut"
              value={values.uomOut}
              onChange={handleChange('uomOut')}
              onBlur={handleBlur('uomOut')}
              wt_value={values.uomOutWt}
              wt_data={[]}
              wt_onChange={handleChange('uomOutWt')}
              wt_onBlur={handleBlur('uomOutWt')}
              style={{zIndex: 3}}
              error={errors.uomOut && touched.uomOut ? errors.uomOut : ''}
              wt_error={
                errors.uomOutWt && touched.uomOutWt ? errors.uomOutWt : ''
              }
              handleId={setUOMOutId}
            />

            {/* <DropDown
                    placeholder={'Select the Destination'}
                    name={'destination'}
                    list={destinationMockList}
                    value={values.destination}
                    onChange={handleChange('destination')}
                    onBlur = {handleBlur('destination')}
                    search={true}
                  /> */}
            <AutoCompleteNScanInput
              handleId={setLocationId}
              fieldName={'destination'}
              navigation={navigation}
              placeholder="Enter the Destination"
              onChange={handleChange('destination')}
              onBlur={handleBlur('destination')}
              value={values.destination}
              data={positionList}
              displayName="code"
              style={{zIndex: 2}}
              error={
                errors.destination && touched.destination
                  ? errors.destination
                  : ''
              }
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
                {/* <DropDown
                  placeholder={'Select the Embedded Device'}
                  name={'Embedded Device'}
                  list={embeddedDeviceList}
                  value={values.embeddedDevice}
                  onBlur={handleBlur('embeddedDevice')}
                    error={
                      errors.embeddedDevice && touched.embeddedDevice
                    ? errors.embeddedDevice
                        : ''
                    }
                  /> */}
                <AutoCompleteNScanInput
                  handleId={setCurrentItemId}
                  navigation={navigation}
                  placeholder="Select Embedded Device"
                  onChange={handleChange('embeddedDevice')}
                  onBlur={handleBlur('embeddedDevice')}
                  value={values.embeddedDevice}
                  data={embeddedDeviceList}
                  displayName="device_code"
                  style={{zIndex: 1}}
                  error={
                    errors.embeddedDevice && touched.embeddedDevice
                      ? errors.embeddedDevice
                      : ''
                  }
                />
                <View>
                  <Button
                    onPress={() => handleDirectLabelPrint(values)}
                    text="Capture Weight"
                  />
                  {/* <Button onPress={hidePrintModal} text="CANCEL" /> */}
                </View>
              </View>
            </Modal>
          </Card>
        </View>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // height: 150,
    // backgroundColor: 'red',
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
export default ReceivingScreen;
