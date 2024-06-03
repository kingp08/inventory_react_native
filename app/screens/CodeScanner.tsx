import React, {useCallback} from 'react';
import {View} from 'react-native';
import {StyleSheet} from 'react-native';

import {useDispatch} from 'react-redux';

import {
  Code,
  useCameraDevice,
  useCodeScanner,
} from 'react-native-vision-camera';
import {Camera} from 'react-native-vision-camera';

// import {clearUser} from '../store/userSlice';
// import {removeSecureValue} from '../utils/keyChain';

// import {useTheme} from '../theme/useTheme';
import Layout from '../components/Layout';

const CodeScanner = (props: any) => {
  const {route, navigation} = props;
  const {returnUrl = '', fieldName = ''} = route.params;
  // const dispatch = useDispatch();

  const device = useCameraDevice('back');
  // const isShowingAlert = useRef(false)

  const onCodeScanned = useCallback(
    (codes: Code[]) => {
      const value = codes[0]?.value;
      console.log(
        JSON.stringify(
          [
            `Scanned ${codes.length} codes:${codes}`,
            `returnUrl: ${returnUrl}`,
            `fieldName: ${fieldName}`,
            `value: ${value}`,
          ],
          null,
          2,
        ),
      );

      if (value == null) {
        return;
      }

      if (returnUrl) {
        navigation.navigate(returnUrl, {fieldName: fieldName, value: value});
      } else {
        navigation.goBack({fieldName: value});
      }
      // route?.params?.onGoBack(value);
      // if (isShowingAlert.current) return
      // showCodeAlert(value, () => {
      //   isShowingAlert.current = false
      // })
      // isShowingAlert.current = true
    },
    [fieldName, navigation, returnUrl],
  );

  // 5. Initialize the Code Scanner to scan QR codes and Barcodes
  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13', 'code-128'],
    onCodeScanned: onCodeScanned,
  });
  // const handleLogout = () => {
  //   // Remove both access token and refresh token from Local
  //   removeSecureValue('token');
  //   removeSecureValue('refresh_token');
  //   // Remove access token from redux store
  //   dispatch(clearUser());
  // };

  if (!device) return <View />;
  return (
    <Layout>
      <View
        style={{
          padding: 50,
          flex: 1,
          // alignItems: 'center',
          backgroundColor: '#cccccc',
          // justifyContent: 'center',
          paddingTop: 150,
        }}>
        <View style={{borderWidth: 2, borderColor: 'blue'}}>
          <Camera
            // style={StyleSheet.absoluteFill}
            style={{
              width: '100%',
              height: 200,
            }}
            device={device}
            isActive={true}
            codeScanner={codeScanner}
            orientation={'portrait'} //export type Orientation = 'portrait' | 'portrait-upside-down' | 'landscape-left' | 'landscape-right'
          />
        </View>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    paddingVertical: 30,
    paddingHorizontal: 12,
  },
  header: {
    paddingLeft: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
  },
  btnHamburger: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  avatarRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    marginRight: 10,
  },
});

export default CodeScanner;
