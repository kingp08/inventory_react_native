import React, {memo} from 'react';
import {View, Text} from 'react-native';
import {UOMFieldType} from '../types/components';
import AutoCompleteNScanInput from './ScanItem';
import ScanInput from './ScanInput';
import {useTheme} from '../theme/useTheme';

const UOMField = ({
  fieldName,
  navigation,
  groupName,
  data,
  value: UOMValue,
  wt_value,
  wt_data,
  onChange,
  onBlur,
  wt_onChange,
  wt_onBlur,
  style,
  error,
  wt_error,
  screenName,
  handleId,
}: UOMFieldType) => {
  const {theme} = useTheme();
  const enableButton =
    ['kilogram', 'kilograms', 'pound', 'lb', 'kg'].indexOf(UOMValue) > -1;
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#cccccc',
        position: 'relative',
        marginVertical: 6,
        borderRadius: 8,
        paddingVertical: 4,
        paddingRight: 4,
        ...style,
      }}>
      <View
        style={{
          position: 'absolute',
          top: -10,
          left: 12,
          alignItems: 'center',
          backgroundColor: theme.cardBg,
          paddingHorizontal: 4,
        }}>
        <Text style={{color: '#9B9A9A', fontSize: 11}}>{groupName}</Text>
      </View>
      <View style={{width: '50%'}}>
        <AutoCompleteNScanInput
          fieldName={fieldName}
          navigation={navigation}
          placeholder={`${groupName}`}
          label={false}
          data={data}
          onChange={onChange}
          onBlur={onBlur}
          value={UOMValue}
          screenName={screenName}
          style={style}
          error={error}
          handleId={handleId}
        />
      </View>
      <View style={{width: '50%'}}>
        <ScanInput
          enableButton={enableButton}
          navigation={navigation}
          placeholder="Enter Qty"
          data={wt_data}
          value={wt_value}
          onChange={wt_onChange}
          onBlur={wt_onBlur}
          style={style}
          error={error}
          handleId={handleId}
        />
      </View>
    </View>
  );
};

export default memo(UOMField);
