import React, { useEffect } from 'react';
import { StyleSheet, View, Image, ScrollView } from 'react-native';
import { UseSelector, useSelector } from 'react-redux';
import { Button } from '../../components/Button/Button';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Toast from 'react-native-toast-message';

import Layout from '../../components/Layout';
import Card from '../../components/Card';
import { Input } from '../../components/Form';
const AppIcon = require('../../assets/images/virginia_logo.png');

import { useDispatch } from 'react-redux';
import { updateUser } from '../../store/userSlice';

import { login } from '../../services';
import { loginThunk } from '../../store/userSlice';
import { setSecureValue } from '../../utils/keyChain';
import { transformToFormikErrors } from '../../utils/form';
import { RootState, AppDispatch } from '../../store/store';

// actions
import { currenciesReceived } from '../../store/currencySlice';
import { handlingUnitsReceived, UOMsReceived } from '../../store/unitSlice';
import {
  SKUsReceived,
  entityPeopleReceived,
  entityCompaniesReceived,
  embeddedDevicesReceived,
} from '../../store/entitySlice';
import { statusReceived } from '../../store/statusSlice';
import { itemInventoriesReceived } from '../../store/itemSlice';
import { permsReceived } from '../../store/permSlice';
import { itemBOMsReceived } from '../../store/itemSlice';
import { itemTypesReceived, itemSubTypeReceived, itemCategoryReceived, itemSubCategoryReceived, itemTransferTypesReceived } from '../../store/typeSlice';
import { locationsReceived, locationCountriesReceived } from '../../store/locationSlice';
import { updateLoader } from '../../store/loaderSlice';

// apis
import { getTransferType } from '../../services';
import { getCurrencies } from '../../services';
import {
  getHandlingUnits,
  getUOMs,
  getEntityCompany,
  getEntityPeople,
} from '../../services';
import { getEntityItemSKU } from '../../services';
import { getEntityEmbeddedDevice } from '../../services';
import { getStatus } from '../../services';
import { getItemInventories } from '../../services';
import { getPerms } from '../../services/perms';
import { getItemBOMS } from '../../services/item';
import { getTypes, getSubTypes, getCategories, getSubCategories } from '../../services';
import {
  getLocationCountries,
  getLocationRegions,
  getLocationBranches,
  getLocationWarehouses,
  getLocationZones,
  getLocationAreas,
  getLocationRooms,
  getLocationRows,
  getLocationBays,
  getLocationLevel,
  getLocationPosition,
  getLocationBins,
} from '../../services';
import {
  handlingPositionsReceived,
  handlingBaysReceived,
  handlingBranchsReceived,
  handlingLevelsReceived,
  handlingRegionsReceived,
  handlingRoomsReceived,
  handlingRowsReceived,
  handlingWarehousesReceived,
  handlingZonesReceived
} from '../../store/positionSlice';

interface ValuesType {
  user_name: string;
  password: string;
  url: string;
}

const initialValues: ValuesType = { user_name: '', password: '', url: '' };

const LoginSchema = Yup.object().shape({
  user_name: Yup.string().min(5, 'Too Short!').required('Required'),
  password: Yup.string().min(5, 'Too Short!').required('Required'),
  url: Yup.string().min(5, 'Too Short!').required('Required'),
});

const Login = (props: any) => {
  const { navigation } = props;
  const user = useSelector((state: RootState) => state.user);
  const { loading } = user;

  const dispatch = useDispatch<AppDispatch>();

  async function getAllLocationData(user: any, activeStatusId: string) {
    const [
      countries,
      regions,
      branches,
      warehouses,
      zones,
      areas,
      rooms,
      rows,
      bays,
      level,
      position,
      bins,
    ] = await Promise.all([
      await getLocationCountries(user, { status: activeStatusId }),
      await getLocationRegions(user, { status: activeStatusId }),
      await getLocationBranches(user, { status: activeStatusId }),
      await getLocationWarehouses(user, { status: activeStatusId }),
      await getLocationZones(user, { status: activeStatusId }),
      await getLocationAreas(user, { status: activeStatusId }),
      await getLocationRooms(user, { status: activeStatusId }),
      await getLocationRows(user, { status: activeStatusId }),
      await getLocationBays(user, { status: activeStatusId }),
      await getLocationLevel(user, { status: activeStatusId }),
      await getLocationPosition(user, { status: activeStatusId }),
      await getLocationBins(user, { status: activeStatusId }),
    ]);

    return {
      ...countries?.data,
      ...regions?.data,
      ...branches?.data,
      ...warehouses?.data,
      ...zones?.data,
      ...areas?.data,
      ...rooms?.data,
      ...rows?.data,
      ...bays?.data,
      ...level?.data,
      ...position?.data,
      ...bins?.data,
    };
  }

  async function getAllCountriesData(user: any, activeStatusId: string) {
    const [
      countries,
    ] = await Promise.all([
      await getLocationCountries(user, { status: activeStatusId }),
    ]);

    return {
      ...countries?.data,
    };
  }

  const endAsync = async (user: any) => {

    const statusRes = await getStatus(user);
    const activeStatus = statusRes?.data.find((e: any) => e.name === 'active');

    // item SKU
    const SKUsRes = await getEntityItemSKU(user, { status: activeStatus.id });
    dispatch(SKUsReceived(SKUsRes?.data));

    // get embedded device
    const devicesRes = await getEntityEmbeddedDevice(user);
    dispatch(embeddedDevicesReceived(devicesRes?.data));

    // EntityEmbeddedDevice - itemBOM
    const itemBOMsRes = await getItemBOMS(user);
    dispatch(itemBOMsReceived(itemBOMsRes?.data));

    // item Type
    const itemTypesRes = await getTypes(user);
    dispatch(itemTypesReceived(itemTypesRes?.data));

    // item Sub Type
    const itemSubTypesRes = await getSubTypes(user);
    dispatch(itemSubTypeReceived(itemSubTypesRes?.data));

    // item Category Type
    const itemCategoryRes = await getCategories(user);
    dispatch(itemCategoryReceived(itemCategoryRes?.data));

    // item SubCategory Type
    const itemSubCategoryRes = await getSubCategories(user);
    dispatch(itemSubCategoryReceived(itemSubCategoryRes?.data));

    // get unit of measures
    const UOMsRes = await getUOMs(user);
    dispatch(UOMsReceived(UOMsRes?.data));

    // SettingsHandlingUnit
    const handlingUnitRes = await getHandlingUnits(user, {
      status: activeStatus.id,
    });
    dispatch(handlingUnitsReceived(handlingUnitRes?.data));

    const itemInventoriesRes = await getItemInventories(user, {
      status: activeStatus.id,
    });
    dispatch(itemInventoriesReceived(itemInventoriesRes?.data));


    // get positions
    const positionRes = await getLocationPosition(user);
    dispatch(handlingPositionsReceived(positionRes?.data));

    const levelRes = await getLocationLevel(user);
    dispatch(handlingLevelsReceived(levelRes?.data));

    const locationRes = await getLocationBays(user);
    dispatch(handlingBaysReceived(locationRes?.data));

    const rowRes = await getLocationRows(user);
    dispatch(handlingRowsReceived(rowRes?.data));

    const roomRes = await getLocationRooms(user);
    dispatch(handlingRoomsReceived(roomRes?.data));

    const zoneRes = await getLocationZones(user);
    dispatch(handlingZonesReceived(zoneRes?.data));

    const warehouseRes = await getLocationWarehouses(user);
    dispatch(handlingWarehousesReceived(warehouseRes?.data));

    const branchRes = await getLocationBranches(user);
    dispatch(handlingBranchsReceived(branchRes?.data));

    const regionRes = await getLocationRegions(user);
    dispatch(handlingRegionsReceived(regionRes?.data));


    // currency
    const currencyRes = await getCurrencies(user);
    dispatch(currenciesReceived(currencyRes?.data));

  };

  const init = async (user: any) => {
    // status
    const statusRes = await getStatus(user);
    dispatch(statusReceived(statusRes?.data));

    // roles and permissions
    const permsRes = await getPerms(user);
    dispatch(permsReceived(permsRes?.data));

    // entity people
    const entityPeopleRes = await getEntityPeople(user);
    // const userInfo = entityPeopleRes?.data.find(
    //   (e: any) => e.user_name === user.username,
    // );
    const activeStatus = statusRes?.data.find((e: any) => e.name === 'active');
    // console.log('userFullInformation', userInfo);
    dispatch(entityPeopleReceived(entityPeopleRes?.data));

    // entity companies
    const entityCompanyRes = await getEntityCompany(user);
    dispatch(entityCompaniesReceived(entityCompanyRes?.data));

    // // item SKU
    // const SKUsRes = await getEntityItemSKU(user, { status: activeStatus.id });
    // dispatch(SKUsReceived(SKUsRes?.data));

    // // get embedded device
    // const devicesRes = await getEntityEmbeddedDevice(user);
    // dispatch(embeddedDevicesReceived(devicesRes?.data));

    // // EntityEmbeddedDevice - itemBOM
    // const itemBOMsRes = await getItemBOMS(user);
    // dispatch(itemBOMsReceived(itemBOMsRes?.data));

    // // item Type
    // const itemTypesRes = await getTypes(user);
    // dispatch(itemTypesReceived(itemTypesRes?.data));

    // item Type
    const itemTransferTypesRes = await getTransferType(user);
    dispatch(itemTransferTypesReceived(itemTransferTypesRes?.data));

    // // item Sub Type
    // const itemSubTypesRes = await getSubTypes(user);
    // dispatch(itemSubTypeReceived(itemSubTypesRes?.data));

    // // item Category Type
    // const itemCategoryRes = await getCategories(user);
    // dispatch(itemCategoryReceived(itemCategoryRes?.data));

    // // item SubCategory Type
    // const itemSubCategoryRes = await getSubCategories(user);
    // dispatch(itemSubCategoryReceived(itemSubCategoryRes?.data));

    // // get unit of measures
    // const UOMsRes = await getUOMs(user);
    // dispatch(UOMsReceived(UOMsRes?.data));

    // // SettingsHandlingUnit
    // const handlingUnitRes = await getHandlingUnits(user, {
    //   status: activeStatus.id,
    // });
    // dispatch(handlingUnitsReceived(handlingUnitRes?.data));

    // // locations_mapping - iteminventory

    // // get positions
    // const positionRes = await getLocationPosition(user);
    // dispatch(handlingPositionsReceived(positionRes?.data));

    // const levelRes = await getLocationLevel(user);
    // dispatch(handlingLevelsReceived(levelRes?.data));

    // const locationRes = await getLocationBays(user);
    // dispatch(handlingBaysReceived(locationRes?.data));

    // const rowRes = await getLocationRows(user);
    // dispatch(handlingRowsReceived(rowRes?.data));

    // const roomRes = await getLocationRooms(user);
    // dispatch(handlingRoomsReceived(roomRes?.data));

    // const zoneRes = await getLocationZones(user);
    // dispatch(handlingZonesReceived(zoneRes?.data));

    // const warehouseRes = await getLocationWarehouses(user);
    // dispatch(handlingWarehousesReceived(warehouseRes?.data));

    // const branchRes = await getLocationBranches(user);
    // dispatch(handlingBranchsReceived(branchRes?.data));

    // const regionRes = await getLocationRegions(user);
    // dispatch(handlingRegionsReceived(regionRes?.data));

    // const itemInventoriesRes = await getItemInventories(user, {
    //   status: activeStatus.id,
    // });
    // dispatch(itemInventoriesReceived(itemInventoriesRes?.data));

    // // currency
    // const currencyRes = await getCurrencies(user);
    // dispatch(currenciesReceived(currencyRes?.data));

    // Locations
    const data = await getAllLocationData(user, activeStatus.id);
    dispatch(locationsReceived(data));

    // const data1 = await getAllCountriesData(user, activeStatus.id);
    // dispatch(locationCountriesReceived(data1));
  };

  const handleLogin = (values: ValuesType, { setErrors }: any) => {
    // Add grant_type value to obj
    let reqObj: any = Object.assign({}, values, { grant_type: 'password' });
    // Service request
    // dispatch(updateUser({ loading: true }));
    // values = {"password": "v1rg1n1a-superuser_pass-d3v!", "url": "http://abakada.tech:89/", "user_name": "v1rg1n1a-superuser-d3v"}
    // console.log("pre login value is : %s", values);
    login(values)
      .then(async res => {
        if (res?.data?.access) {
          const { access, refresh } = res.data;
          dispatch(
            updateUser({
              username: values.user_name,
              token: access,
              refreshToken: refresh,
              loading: false,
            }),
          );

          setSecureValue('token', access);
          setSecureValue('refresh_token', refresh);
          dispatch(updateLoader({ loading: true }));
          init({
            refreshToken: refresh,
            accessToken: access,
            username: values.user_name,
          })
            .finally(() => {
              endAsync({
                refreshToken: refresh,
                accessToken: access,
                username: values.user_name,
              });
              navigation.navigate('Home');
              Toast.show({
                type: 'success',
                text1: 'Logged in Successfully',
                // props: { uuid: 'bba1a7d0-6ab2-4a0a-a76e-ebbe05ae6d70' }
              });
              dispatch(updateLoader({ loading: false }));
            })
            .catch(e => {
              console.log(e);
              dispatch(updateLoader({ loading: false }));
            });
        }
        dispatch(updateUser({ loading: false }));
      })
      .catch(e => {
        console.log("login catch error is : %s", e);
        dispatch(updateUser({ loading: false }));
        dispatch(updateLoader({ loading: false }));
        let result = transformToFormikErrors(e.response.data.errors);
        setErrors(result);
      });
  };

  return (
    <Layout>
      <ScrollView contentContainerStyle={styles.scrollview}>
        <View style={styles.container}>
          <Card style={styles.formWrapper}>
            <Formik
              initialValues={initialValues}
              validationSchema={LoginSchema}
              onSubmit={handleLogin}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <>
                  <View style={styles.iconWrapper}>
                    <Image source={AppIcon} style={styles.appIcon} />
                  </View>
                  <Input
                    testID="Login.Username"
                    placeholder="Username"
                    onChangeText={handleChange('user_name')}
                    onBlur={handleBlur('user_name')}
                    value={values.user_name}
                    keyboardType="email-address"
                    error={
                      errors.user_name && touched.user_name
                        ? errors.user_name
                        : ''
                    }
                  />
                  <Input
                    testID="Login.Password"
                    placeholder="Password"
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    secureTextEntry
                    error={
                      errors.password && touched.password ? errors.password : ''
                    }
                  />
                  <Input
                    testID="Login.Url"
                    placeholder="Url"
                    onChangeText={handleChange('url')}
                    onBlur={handleBlur('url')}
                    value={values.url}
                    keyboardType="url"
                    error={errors.url && touched.url ? errors.url : ''}
                  />
                  <Button
                    text="Login"
                    isLoading={loading}
                    onPress={handleSubmit}
                  // testID="Login.Button"
                  />
                </>
              )}
            </Formik>
          </Card>
        </View>
      </ScrollView>
    </Layout>
  );
};

export default Login;

const styles = StyleSheet.create({
  scrollview: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formWrapper: {
    width: '90%',
  },
  iconWrapper: {
    alignItems: 'center',
    marginBottom: 20,
  },
  appIcon: {
    width: 50,
    height: 50,
  },
});
