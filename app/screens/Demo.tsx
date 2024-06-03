import React, {useState, useCallback, useRef, useMemo} from 'react';
import {Text, View, Button, StyleSheet, Linking, ScrollView, Switch, Image} from 'react-native';
import { Code, useCameraDevice, useCodeScanner} from 'react-native-vision-camera'
import { Camera, CameraPermissionStatus } from 'react-native-vision-camera'

import {useDispatch} from 'react-redux';
import {clearUser} from '../store/userSlice';
import {removeSecureValue} from '../utils/keyChain';

import {useTheme} from '../theme/useTheme';
import Layout from './Layout';
import Card from '../components/Card';
import MenuItem from '../components/MenuItem';
import { Dropdown, IDropdownRef } from 'react-native-element-dropdown';
import { AutocompleteDropdown, TAutocompleteDropdownItem } from 'react-native-autocomplete-dropdown'

export const generateDataSet = (n = 450) => {
  return new Array(n)
    .fill({ id: '1', title: 'test' })
    .map((item, i) => ({ ...item, id: i.toString(), title: item.title + i }))
}

const data = [
  { label: 'Item 1', value: '1' },
  { label: 'Item 2', value: '2' },
  { label: 'Item 3', value: '3' },
  { label: 'Item 4', value: '4' },
  { label: 'Item 5', value: '5' },
  { label: 'Item 6', value: '6' },
  { label: 'Item 7', value: '7' },
  { label: 'Item 8', value: '8' },
];

const DropdownComponent = () => {
  const [value, setValue] = useState<string>();
  const ref = useRef<IDropdownRef>(null);

  return (
    <View style={styles.row}>
      <Dropdown
        ref={ref}
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Dropdown 2"
        searchPlaceholder="Search..."
        value={value}
        onChange={(item) => {
          setValue(item.value);
        }}
        onChangeText={() => {}} // Keep search keyword
      />
      <View style={styles.button}>
        <Button
          title="Open"
          onPress={() => {
            ref.current?.open();
          }}
        />
      </View>
    </View>
  );
};

const Demo = () =>{
  const device = useCameraDevice('back')
  const [selectedItem, setSelectedItem] = useState<TAutocompleteDropdownItem | null>(null)
  const dataSet = useMemo(generateDataSet, [])


  const [cameraPermissionStatus, setCameraPermissionStatus] = useState<CameraPermissionStatus>('not-determined')
  const [selectedLanguage, setSelectedLanguage] = useState();
   
  const {theme, toggleTheme} = useTheme();
  const dispatch = useDispatch();

  const requestCameraPermission = useCallback(async () => {
    const permission = await Camera.requestCameraPermission()
    if (permission === 'denied') await Linking.openSettings()
    setCameraPermissionStatus(permission)
  }, [])
  // const isShowingAlert = useRef(false)

  const onCodeScanned = useCallback((codes: Code[]) => {
    console.log(`Scanned ${codes.length} codes:`, codes)
    const value = codes[0]?.value
    if (value == null) return
    // if (isShowingAlert.current) return
    // showCodeAlert(value, () => {
    //   isShowingAlert.current = false
    // })
    // isShowingAlert.current = true
  }, [])

  // 5. Initialize the Code Scanner to scan QR codes and Barcodes
  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13', 'code-128'],
    onCodeScanned: onCodeScanned,
  })

  if (device == null) return (<View> asdf</View>);
  return (
    <Layout>
      <ScrollView
        style={[styles.contentContainer, {backgroundColor: theme.layoutBg}]}>
        <Card style={{backgroundColor: theme.cardBg}}>
          <View>
            <AutocompleteDropdown
              clearOnFocus={false}
              closeOnBlur={true}
              initialValue={{ id: '2' }} // or just '2'
              onSelectItem={item => setSelectedItem(item)}
              dataSet={dataSet}
              onChangeText={(value: any) => {

                setSelectedItem({id: '4', title: value})
              }}
              // on={(value) =>{
              //   setSelectedItem({id: '4', title: value})
              // }}
              ItemSeparatorComponent={<View style={{ height: 1, width: '100%', backgroundColor: '#d8e1e6' }} />}
            />
            <Text style={{ color: '#668', fontSize: 13 }}>Selected item: {JSON.stringify(selectedItem)}</Text>
          </View>
        </Card>
      </ScrollView>
    </Layout>
  );
}

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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdown: {
    flex: 1,
    margin: 16,
    height: 50,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  button: {
    marginHorizontal: 16,
  }
});

export default Demo;
