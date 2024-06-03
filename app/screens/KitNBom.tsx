import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {TouchableOpacity, Alert} from 'react-native';

import * as Yup from 'yup';
import {FormikValues, useFormik} from 'formik';
import {Table, Row, TableWrapper, Cell} from 'react-native-table-component';

import {StyleSheet} from 'react-native';
import Layout from './Layout';
import {ScrollView} from 'react-native-gesture-handler';

import Toast from 'react-native-toast-message';
import AutoCompleteNScanInput from '../components/ScanItem';
import {Button} from '../components/Button/Button';
import UOMField from '../components/UOMField';
import Icon from 'react-native-vector-icons/AntDesign';
import {useTheme} from '../theme/useTheme';
import Card from '../components/Card';
import {RootState} from '../store/store';
import {AppDispatch} from '../store/store';
import {useDispatch, useSelector} from 'react-redux';
import {TRawItem} from '../store/itemSlice';
import {rawItemListUpdated} from '../store/itemSlice';
import _ from 'lodash';

interface TValues {
  productCode: string;
  itemSku: string;
  rawItemCode: string;
  uom: string;
  uomWt: string;
}

const KitNBomSchema = Yup.object().shape({
  productCode: Yup.string().required('Required'),
  itemSku: Yup.string().required('Required'),
  rawItemCode: Yup.string().required('Required'),
  uom: Yup.string().required('Required'),
});

const tableData = {
  tableHead: ['Action', 'Raw Code', 'UOM', 'Quantity'],
};

const ProductTable = ({
  data = [],
  handleDeleteItem,
}: {
  data: Array<TRawItem>;
  handleDeleteItem: any;
}) => {
  const {theme} = useTheme();

  const DelButton = ({rowData, index}: {rowData: TRawItem; index: number}) => (
    <TouchableOpacity onPress={() => handleDeleteItem(rowData)}>
      <View style={styles.btn}>
        <Icon name="delete" size={18} color="#000" style={styles.icon} />
        {/* <Text style={styles.btnText}>{myIcon}</Text> */}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{...styles.tableContainer, backgroundColor: theme.cardBg}}>
      <Table borderStyle={{borderColor: 'transparent'}}>
        <Row
          data={tableData.tableHead}
          style={styles.head}
          textStyle={styles.headText}
        />
        {data.map((rowData, index) => (
          <TableWrapper key={index} style={styles.row}>
            <DelButton rowData={rowData} index={index} />
            <Cell data={rowData.code} textStyle={styles.text} />
            <Cell data={rowData.uom} textStyle={styles.text} />
            <Cell data={rowData.quantity} textStyle={styles.text} />
          </TableWrapper>
        ))}
      </Table>
    </View>
  );
};

const KitNBomScreen = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}): React.ReactElement => {
  const {params} = route;
  const returnUrl = params?.returnUrl ?? 'Receiving';

  const initialValues: TValues = {
    productCode: '',
    itemSku: '',
    rawItemCode: '',
    uom: '',
    uomWt: '',
  };

  const dispatch = useDispatch<AppDispatch>();
  // const user: any = useSelector((state: RootState) => state.user);
  const itemInventoryList = useSelector(
    (state: RootState) => state.item.itemInventoryList,
  );
  const itemBOMList = useSelector((state: RootState) => state.item.itemBOMList);
  const UOMList = useSelector((state: RootState) => state.unit.UOMList);
  const SKUList = useSelector((state: RootState) => state.entity.SKUList);
  const rawItemList = useSelector((state: RootState) => state.item.rawItemList);
  const [UOMId, setUOMId] = useState('');
  const [currentItemId, setCurrentItemId] = useState('');
  const [itemSKUId, setItemSKUId] = useState('');
  const [rawItemCode, setRawItemCode] = useState('');
  const [productCode, setProductCode] = useState(params?.productCode);

  console.log('rawItemList===>', rawItemList);
  const [_rawItemList, setRawItemList] = useState<TRawItem[]>(rawItemList);

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

        if (currentInventoryItem.regular_uom_id) {
          const uomItem = _.find(UOMList, {
            id: currentInventoryItem.regular_uom_id,
          });
          uomItem && setFieldValue('uom', uomItem.name);
        }
      }
    }
  }, [params]);

  useEffect(() => {
    if (rawItemList) {
      setRawItemList(rawItemList);
    }
  }, [rawItemList]);

  const handleAdd = (formValues: FormikValues) => {
    if (_rawItemList.findIndex(e => e.code === values.rawItemCode) === -1) {
      const rawItemListTemp: TRawItem[] = [..._rawItemList];
      const newItem: TRawItem = {
        code: formValues.rawItemCode,
        uom: formValues.uom,
        quantity: formValues.uomWt,
      };
      rawItemListTemp.push(newItem);
      setRawItemList(rawItemListTemp);
    } else {
      Toast.show({
        type: 'error',
        text1: 'Same code is already existed',
      });
    }
  };

  const handleDeleteItem = (rowData: TRawItem) => {
    const rawItemListTemp: TRawItem[] = [..._rawItemList];
    setRawItemList(rawItemListTemp.filter(e => e.code !== rowData.code));
  };

  // const handleSave = () => {};

  const handleSaveTableData = () => {
    dispatch(rawItemListUpdated(_rawItemList));
    navigation.navigate(returnUrl);
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
    validationSchema: KitNBomSchema,
    onSubmit: handleAdd,
  });

  // useEffect(() => {
  //   setFieldValue('productCode', params?.productCode);

  //   const currentInventoryItem = itemInventoryList.find(
  //     item => item.code === params?.productCode,
  //   );

  //   if (!currentInventoryItem) return;

  //   console.log('current inventory item (Kit/Bom) : ', currentInventoryItem);

  //   if (
  //     currentInventoryItem.sku_id != undefined ||
  //     currentInventoryItem.sku_id != null
  //   ) {
  //     const skuItem = SKUList.filter(
  //       item => item.id === currentInventoryItem.sku_id,
  //     );
  //     setFieldValue('itemSku', skuItem[0].name);
  //   }
  // }, [params?.productCode]);

  return (
    <Layout>
      <ScrollView nestedScrollEnabled={true}>
        <View style={styles.container}>
          <Card>
            <AutoCompleteNScanInput
              handleId={setCurrentItemId}
              screenName="Kit/Bom"
              fieldName={'productCode'}
              navigation={navigation}
              placeholder="Enter Product Code"
              onChange={handleChange('productCode')}
              onBlur={handleBlur('productCode')}
              value={values.productCode}
              data={itemInventoryList}
              style={{zIndex: 11}}
              displayName={'code'}
              error={
                errors.productCode && touched.productCode
                  ? errors.productCode
                  : ''
              }
            />
            <AutoCompleteNScanInput
              handleId={setItemSKUId}
              screenName="Kit/Bom"
              fieldName="itemSku"
              navigation={navigation}
              placeholder="Enter Item SKU"
              onChange={handleChange('itemSku')}
              onBlur={handleBlur('itemSku')}
              value={values.itemSku}
              data={SKUList}
              style={{zIndex: 10}}
              error={errors.itemSku && touched.itemSku ? errors.itemSku : ''}
            />
            <AutoCompleteNScanInput
              handleId={setRawItemCode}
              screenName="Kit/Bom"
              fieldName={'rawItemCode'}
              navigation={navigation}
              placeholder="Enter raw Item Code"
              onChange={handleChange('rawItemCode')}
              onBlur={handleBlur('rawItemCode')}
              value={values.rawItemCode}
              data={itemInventoryList}
              style={{zIndex: 9}}
              displayName={'code'}
              error={
                errors.rawItemCode && touched.rawItemCode
                  ? errors.rawItemCode
                  : ''
              }
            />
            <UOMField
              handleId={setUOMId}
              fieldName="uom"
              navigation={navigation}
              groupName="UOM In"
              data={UOMList}
              value={values.uom}
              screenName="Kit/Bom"
              onChange={handleChange('uom')}
              onBlur={handleBlur('uom')}
              wt_value={values.uomWt}
              wt_data={itemBOMList}
              wt_onChange={handleChange('uomWt')}
              wt_onBlur={handleBlur('uomWt')}
              style={{zIndex: 5}}
              error={errors.uom && touched.uom ? errors.uom : ''}
              wt_error={errors.uomWt && touched.uomWt ? errors.uomWt : ''}
            />
            <Button
              text="Add"
              onPress={handleSubmit}
              // testID="Login.Button"
            />
            <ProductTable
              data={_rawItemList}
              handleDeleteItem={handleDeleteItem}
            />
            <Button
              text="Save"
              onPress={handleSaveTableData}
              // testID="Login.Button"
            />
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
  tableContainer: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginTop: 12,
  },
  head: {height: 44, backgroundColor: '#666'},
  headText: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  text: {fontSize: 14, fontWeight: 'bold', textAlign: 'center'},
  row: {flexDirection: 'row', backgroundColor: '#FFF1C1'},
  btn: {width: 58, height: 24, borderRadius: 2, textAlign: 'center'},
  icon: {textAlign: 'center', lineHeight: 24},
  btnText: {textAlign: 'center', color: '#fff'},
});
export default KitNBomScreen;
