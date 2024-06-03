import React, {useState, useCallback} from 'react';
// import {useDispatch, useSelector} from 'react-redux';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
} from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
// import {useCameraDevice} from 'react-native-vision-camera';
import {Camera, CameraPermissionStatus} from 'react-native-vision-camera';
import {useTheme} from '../theme/useTheme';
import {typeSizes} from '../theme/theme';
import {AutocompleteNScanInputType} from '../types/components';

// import {getItemInventories} from '../services';
// import {RootState} from '../store/store';
// import {activeItemInventoryReceived} from '../store/itemSlice';

const AutoCompleteNScanInput = ({
  screenName = 'Receiving',
  fieldName,
  navigation,
  label = true,
  placeholder = 'Place Holder',
  isEditable = true,
  enableButton = true,
  value,
  onChange,
  onBlur,
  data = [],
  style = {},
  displayName = 'name',
  handleId,
  error,
}: AutocompleteNScanInputType): React.ReactElement => {
  // const dispatch = useDispatch();
  const {theme} = useTheme();
  // interface ItemType {
  //   [key: string]: string;
  // }
  // const [itemData, setItemData] = useState<ItemType>({});
  // const user = useSelector((state: RootState) => state.user);
  // const activeItemInventory = useSelector(
  //   (state: RootState) => state.item.activeItemInventory,
  // );
  // console.log('=====> activeItemInventory===>', activeItemInventory)

  const compareValues = (A: string, B: string) => {
    return A.toLowerCase() === B.toLowerCase().trim();
  };

  const filterData = useCallback(
    (list: Array<any>, query: string) => {
      if (!query || !list.length) {
        return [];
      }

      // Escape special characters in the query string
      const escapedQuery = query.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      // Create a case-insensitive regular expression
      const regex = new RegExp(escapedQuery, 'i');

      // Filter the list based on the regular expression
      return list.filter((e: any) => {
        return regex.test(e[displayName]);
      });
    },
    [displayName],
  );
  const queriedData = React.useMemo(
    () => filterData(data, value),

    [data, filterData, value],
  );

  // const device = useCameraDevice('back');
  const [cameraPermissionStatus, setCameraPermissionStatus] =
    useState<CameraPermissionStatus>('not-determined');

  const requestCameraPermission = useCallback(async () => {
    const permission = await Camera.requestCameraPermission();
    // console.log(`Camera permission status: ${permission}`);

    if (permission === 'denied') {
      await Linking.openSettings();
    }
    if (permission === 'granted') {
      navigation.push('CodeScanner', {
        fieldName,
        returnUrl: screenName,
      });
    }
    setCameraPermissionStatus(permission);
  }, [fieldName, navigation, screenName]);

  // const suggestions: any = React.useMemo(async () => {
  //   if (
  //     fieldName === 'productCode' &&
  //     compareValues(queriedData[0][displayName] ?? '', value)
  //   ) {
  //     const selectedItemInventoryRes = await getItemInventories(user, {id: queriedData[0].id})
  //     console.log('======> selectedItem Inventory', selectedItemInventoryRes?.data)
  //   }

  //  return (queriedData.length >= 1 &&
  //     compareValues(queriedData[0][displayName] ?? '', value)
  //     ? [] // Close suggestion list in case movie title matches query
  //     : queriedData.length > 7
  //     ? queriedData.slice(0, 7)
  //     : queriedData);
  // }, [queriedData, value]);

  const suggestions: any = React.useMemo(() => {
    return queriedData.length >= 1 &&
      compareValues(queriedData[0][displayName] ?? '', value)
      ? [] // Close suggestion list
      : queriedData.length > 7
      ? queriedData.slice(0, 7)
      : queriedData;
  }, [displayName, queriedData, value]);

  // useEffect(() => {
  //   const fetchCurrentInventoryById = async () => {
  //     if (
  //       fieldName === 'productCode' &&
  //       compareValues(queriedData[0][displayName] ?? '', value)
  //     ) {
  //       const selectedItemInventoryRes = await getItemInventories(user, {
  //         id: queriedData[0].id,
  //       });
  //       console.log("-------selectedItemInventoryRes-------", selectedItemInventoryRes)
  //       // dispatch(activeItemInventoryReceived(selectedItemInventoryRes?.data));
  //     }
  //   };
  //   fetchCurrentInventoryById();
  // }, [queriedData, value]);
  const placeholderText = placeholder;

  const openCodeScanner = () => {
    if (cameraPermissionStatus !== 'granted') {
      requestCameraPermission();
    } else {
      navigation.push('CodeScanner', {
        fieldName,
        returnUrl: screenName,
      });
    }
  };

  const renderLabel = () => {
    if (label) {
      return <Text style={[styles.label]}>{placeholder}</Text>;
    }
    return null;
  };

  return (
    <View
      style={{...styles.container, backgroundColor: theme.cardBg, ...style}}>
      {renderLabel()}
      <View style={styles.autocompleteContainer}>
        <Autocomplete
          scrollEnabled={false}
          style={[
            styles.autocompleteContent,
            {color: theme.color},
            // eslint-disable-next-line react-native/no-inline-styles
            {backgroundColor: isEditable ? '#fff' : '#eee'},
          ]}
          placeholderTextColor={'#cccccc'}
          inputContainerStyle={styles.autocompleteInput}
          editable={isEditable}
          autoCorrect={false}
          data={suggestions}
          value={value}
          onChangeText={onChange}
          onBlur={onBlur}
          placeholder={placeholderText}
          flatListProps={{
            scrollEnabled: false,
            keyboardShouldPersistTaps: 'always',
            keyExtractor: (e: any) => e?.id?.toString() ?? '',
            renderItem: ({item}: {item: any}) => (
              <TouchableOpacity
                onPress={() => {
                  console.log('-----item data-----', item);
                  item.id && handleId(item.id);
                  onChange(item[displayName]);
                }}>
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
          style={{
            ...styles.scanButton,
            backgroundColor: enableButton
              ? theme.buttonColor.primary
              : theme.buttonColor.primaryInactive,
          }}
          onPress={enableButton ? openCodeScanner : () => {}}
          activeOpacity={enableButton ? 0.8 : 1}>
          <Text style={styles.text}>SCAN</Text>
        </TouchableOpacity>
      </View>
      {error ? (
        <Text style={[styles.error, {color: theme.error}]}>{error}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: '#F5FCFF',
    flex: 1,
    zIndex: 2,

    // Android requiers padding to avoid overlapping
    // with content and autocomplete
    paddingTop: 50,

    // Make space for the default top bar
    ...Platform.select({
      android: {
        marginVertical: 2,
      },
      default: {
        marginTop: 0,
        marginVertical: 0,
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
  },
  autocompleteInput: {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  autocompleteContent: {
    flex: 1,
    paddingLeft: 12,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  text: {
    color: 'white',
    fontSize: 12,
  },
  scanButton: {
    flex: 1,
    flexGrow: 0,
    flexBasis: 50,
    backgroundColor: 'blue',
    padding: 4,
    paddingTop: 8,
    paddingBottom: 8,
    width: 50,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    // marginLeft: 8,
  },
  error: {
    fontSize: typeSizes.FONT_SIZE_SMALL,
    paddingLeft: 8,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 12,
    top: -6,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 11,
    color: '#9B9A9A',
  },
});
export default AutoCompleteNScanInput;
