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

const NormalInput = ({
  fieldName,
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
    return list.filter((e: any) => e[displayName].search(regex) >= 0);
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

  const renderLabel = () => {
    return (
      <Text style={styles.label}>
        {placeholder}
      </Text>
    );
  };

  return (
    <>
      <View
        style={{
          ...styles.container,
          flex: 1,
          marginBottom:-10,
          flexDirection: 'row',
          backgroundColor: 'transparent',
        }}>
        {renderLabel()}
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
              placeholder={placeholderText}
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
          </View>
          <View
            style={{
              marginTop: 50,
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}>
            <Button onPress={hideModal} text="OK" />
            <Button onPress={hideModal} text="CANCEL" />
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
    marginLeft: 4,
    marginRight: 4,
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
    // width: '100%',
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
    // width: '100%',
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
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    borderColor: '#cccccc',
    borderWidth: 1,
    height: 42,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 12,
    top: -6,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 11,
    color:'#9B9A9A'
  },
});
export default NormalInput;
