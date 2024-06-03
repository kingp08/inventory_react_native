import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {Table, Row} from 'react-native-table-component';

import * as Yup from 'yup';
import {useFormik} from 'formik';

// import {Text, TouchableOpacity, Alert} from 'react-native';
import {TableWrapper, Cell} from 'react-native-table-component';

import {StyleSheet} from 'react-native';
import Layout from './Layout';
import {ScrollView} from 'react-native-gesture-handler';

import AutoCompleteNScanInput from '../components/ScanItem';
// import {Button} from '../components/Button/Button';
// import UOMField from '../components/UOMField';
// import Icon from 'react-native-vector-icons/AntDesign';

import {useTheme} from '../theme/useTheme';
import Card from '../components/Card';
import {RootState} from '../store/store';
import {AppDispatch} from '../store/store';
// import Toast from 'react-native-toast-message';
import {useDispatch, useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';
import {ToastConfig} from '../components/Toast/ToastConfig';
import _ from 'lodash';

interface TItemInfo {
  location: string | null;
  expiration: string;
  uom: string;
  quantity: string;
}

interface TValues {
  productCode: string;
  itemSku: string;
}

const ProductAvailabiltySchema = Yup.object().shape({
  productCode: Yup.string().required('Required'),
  itemSku: Yup.string().required('Required'),
});

const tableData = {
  tableHead: ['Location', 'Expiration', 'UOM', 'Quantity'],
};

const ProductTable = ({
  data = {
    location: '',
    expiration: '',
    uom: '',
    quantity: '',
  },
}: {
  data: TItemInfo | undefined;
}) => {
  const {theme} = useTheme();
  return (
    <View style={{...styles.tableContainer, backgroundColor: theme.cardBg}}>
      <Table borderStyle={{borderColor: 'transparent'}}>
        <Row
          data={tableData.tableHead}
          style={styles.head}
          textStyle={styles.headText}
        />
        <TableWrapper style={styles.row}>
          <Cell data={data.location} textStyle={styles.text} />
          <Cell data={data.expiration} textStyle={styles.text} />
          <Cell data={data.uom} textStyle={styles.text} />
          <Cell data={data.quantity} textStyle={styles.text} />
        </TableWrapper>
      </Table>
    </View>
  );
};

const ProductAvailabilityScreen = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}): React.ReactElement => {
  const {params} = route;
  // const returnUrl = params?.returnUrl ?? 'Receiving';

  // const dispatch = useDispatch<AppDispatch>();
  const itemInventoryList = useSelector(
    (state: RootState) => state.item.itemInventoryList,
  );

  const SKUList = useSelector((state: RootState) => state.entity.SKUList);
  // const locationList = useSelector(
  //   (state: RootState) => state.location.locationList,
  // );
  const rawItemList = useSelector((state: RootState) => state.item.rawItemList);

  const [_locationList, setLocationList] = useState<TItemInfo>();
  const [currentItemId, setCurrentItemId] = useState('');
  const [itemSKUId, setItemSKUId] = useState('');

  const initialValues: TValues = {
    productCode: '',
    itemSku: '',
  };

  const {
    handleChange,
    // handleSubmit,
    handleBlur,
    values,
    errors,
    touched,
    setFieldValue,
    // resetForm,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: ProductAvailabiltySchema,
    onSubmit: () => {},
  });

  // useEffect(() => {
  //   if (params?.fieldName && params?.value) {
  //     setFieldValue(params.fieldName, params.value);
  //   }
  // }, [params?.fieldName, params?.value, setFieldValue]);

  useEffect(() => {
    if (params?.fieldName && params?.value) {
      const currentInventoryItem = itemInventoryList.find(
        item => item.code === params?.value,
      );

      // Warning!!!!!!!!!!!!!!!!!!!!!!!!!!!!!:
      // Backend only send data like:
      //    [{"code": "tte", "quantity": "1", "uom": "kg"}, {"code": "tte121", "quantity": "1", "uom": "kg"}]
      // Here "code" is "rawItemCode"
      // so we can't prepare values.productCode and item.code
      // and then can't find matching "quantity" and "uom"
      // so the output of the following line is "undefined"

      if (!currentInventoryItem) {
        ToastConfig.show({
          type: 'error',
          message: 'The product was not found in the database',
        });

        return;
      }

      const rawItem = rawItemList.find(item => item.code === params?.value);

      if (currentInventoryItem.sku_id) {
        const skuItem = _.find(SKUList, {id: currentInventoryItem.sku_id});
        skuItem && setFieldValue('itemSku', skuItem.name);
        setFieldValue('productCode', currentInventoryItem.code);
      }

      let uom = '';
      let quantity = '';
      if (rawItem) {
        uom = rawItem.uom;
        quantity = rawItem.quantity;
      }

      const infoValue: TItemInfo = {
        location: currentInventoryItem.country_id,
        expiration: currentInventoryItem.expiration_date,
        uom: uom,
        quantity: quantity,
      };
      setLocationList(infoValue);
    }
  }, [params]);

  return (
    <Layout>
      <ScrollView nestedScrollEnabled={true}>
        <View style={styles.container}>
          <Card>
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
              screenName="Product Availability"
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
              screenName="Product Availability"
              value={values.itemSku}
              data={SKUList}
              style={{zIndex: 9}}
              error={errors.itemSku && touched.itemSku ? errors.itemSku : ''}
            />

            <ProductTable data={_locationList} />
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
  text: {
    margin: 6,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  },
  row: {flexDirection: 'row', backgroundColor: '#FFF1C1'},
  btn: {width: 58, height: 24, borderRadius: 2, textAlign: 'center'},
  icon: {textAlign: 'center', lineHeight: 24},
  btnText: {textAlign: 'center', color: '#fff'},
});
export default ProductAvailabilityScreen;
