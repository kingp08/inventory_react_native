import Autocomplete from 'react-native-autocomplete-input';
import React, {useEffect, useState, useCallback} from 'react';
import Modal from 'react-native-modal';

import {
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Linking,
} from 'react-native';

import {useCameraDevice} from 'react-native-vision-camera';
import {Camera, CameraPermissionStatus} from 'react-native-vision-camera';
import {useTheme} from '../theme/useTheme';
import {AutocompleteNScanInputType} from '../types/components';
import Card from './Card';
import {Button} from './Button/Button';
import {Input} from './Form';

const ScanInput = ({
  fieldName,
  enableButton,
  navigation,
  placeholder = 'Place Holder',
  style,
  data,
  onChange,
  onBlur,
  error,
  value,
  displayName = 'name',
}: AutocompleteNScanInputType): React.ReactElement => {
  const {theme} = useTheme();
  const [visible, setVisible] = useState(false);

  const [query, setQuery] = useState('');

  const filterData = (list: Array<any>, query: string) => {
    if (!query || !list.length) {
      return [];
    }
    const regex = new RegExp(`${query.trim()}`, 'i');
    return list.filter((e: any) => {
      return e[displayName] ? e[displayName].search(regex) >= 0 : [];
    });
  };

  const queriedData = React.useMemo(
    () => filterData(data, value),
    [data, value],
  );

  const device = useCameraDevice('back');
  const [cameraPermissionStatus, setCameraPermissionStatus] =
    useState<CameraPermissionStatus>('not-determined');

  const requestCameraPermission = useCallback(async () => {
    const permission = await Camera.requestCameraPermission();
    // console.log(`Camera permission status: ${permission}`);

    if (permission === 'denied') await Linking.openSettings();
    if (permission === 'granted') {
      navigation.navigate('CodeScanner', {
        fieldName,
        returnUrl: 'Receiving',
      });
    }
    setCameraPermissionStatus(permission);
  }, []);

  const compareValues = (A: string, B: string) => {
    return A.toLowerCase() === B.toLowerCase().trim();
  };

  const suggestions: any = React.useMemo(() => {
    return queriedData.length >= 1 &&
      compareValues(queriedData[0][displayName] ?? '', value)
      ? [] // Close suggestion list
      : queriedData.length > 7
      ? queriedData.slice(0, 7)
      : queriedData;
  }, [queriedData, value]);

  const placeholderText = placeholder;

  const openCodeScanner = () => {
    if (cameraPermissionStatus !== 'granted') {
      requestCameraPermission();
    } else {
      navigation.navigate('CodeScanner', {
       fieldName,
       returnUrl: 'Receiving'
      });
      setVisible(false);
    }
  };

  const handleGoBack = (scannedValue: string) => {
    setQuery(scannedValue);
  };
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 16,
  };

  return (
    <>
      <View
        style={{
          ...styles.container,
          flex: 1,
          flexDirection: 'row',
          backgroundColor: 'transparent',
        }}>
        <View style={{flex: 1, flexGrow: 1}}>
          <Input
            placeholder={placeholder}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            keyboardType="email-address"
            error={error}
            style={styles.scanInput}
          />
        </View>
        <TouchableOpacity
          style={[
            styles.scanButton,
            {
              backgroundColor: enableButton
                ? theme.buttonColor.primary
                : theme.buttonColor.primaryInactive,
            },
          ]}
          onPress={enableButton ? showModal : () => {}}
          activeOpacity={enableButton ? 0.8 : 1}>
          <Text style={styles.text}>WT</Text>
        </TouchableOpacity>
        {/* </View> */}
      </View>
      <Modal isVisible={visible} onDismiss={hideModal}>
        {/* style={containerStyle}> */}
        <View style={{...styles.modalContainerStyle}}>
          <View style={styles.autocompleteContainer}>
            <Autocomplete
              scrollEnabled={false}
              style={styles.autocompleteContent}
              inputContainerStyle={styles.autocompleteInput}
              editable={true}
              autoCorrect={false}
              data={suggestions}
              value={query}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholderTextColor={'#cccccc'}
              // placeholder={placeholderText}
              placeholder='Select Embedded Device'
              flatListProps={{
                scrollEnabled: false,
                keyboardShouldPersistTaps: 'always',
                keyExtractor: (e: any) => e?.id?.toString() ?? '',
                renderItem: ({item}: {item: any}) => (
                  <TouchableOpacity onPress={() => onChange(item[displayName])}>
                    <View style={styles.itemTextContainer}>
                      <Text style={[styles.itemText, {color: theme.text}]}>
                        {item[displayName]}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ),
              }}
            />
            <TouchableOpacity
              style={[
                styles.scanButton,
                {backgroundColor: theme.buttonColor.primary ?? 'purple'},
              ]}
              onPress={openCodeScanner}
              activeOpacity={0.8}>
              <Text style={styles.text}>SCAN</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginTop: 50,
              // flexDirection: 'row',
              // justifyContent: 'flex-end',
            }}>
            <Button onPress={hideModal} text="Capture Weight" />
            {/* <Button onPress={hideModal} text="Cancel" /> */}
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  saveView: {
    flex: 1,
  },
  modalContainerStyle: {
    borderRadius: 8,
    backgroundColor: 'white',
  },
  container: {
    position: 'relative',
    backgroundColor: '#F5FCFF',
    flex: 1,

    // Android requiers padding to avoid overlapping
    // with content and autocomplete
    // paddingTop: 50,

    // Make space for the default top bar
    ...Platform.select({
      android: {
        marginTop: 8,
      },
      default: {
        marginTop: 0,
      },
    }),
  },
  itemTextContainer: {
    // height: 24,
    width: '100%',
  },
  itemText: {
    fontSize: 14,
    lineHeight: 28,
    padding: 4,
    marginTop: 4,
    marginBottom: 4,
  },
  autocompleteContainer: {
    // Hack required to make the autocomplete
    // work on Andrdoid
    backgroundColor: 'transparent',
    width: '100%',
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1,
    padding: 4,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    display: 'flex',
  },
  autocompleteInput: {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  autocompleteContent: {
    flex: 1,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  text: {
    color: 'white',
    fontSize: 12,
  },

  scanInput: {
    flex: 1,
    flexGrow: 1,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 8,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 8,
    borderColor: '#cccccc',
    borderWidth: 1,
    height: 42,
  },

  scanButton: {
    flex: 1,
    flexGrow: 0,
    flexBasis: 50,
    padding: 4,
    paddingTop: 8,
    paddingBottom: 8,
    width: 50,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    // margin: 'auto',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    // marginLeft: 8,
  },
});
export default ScanInput;
