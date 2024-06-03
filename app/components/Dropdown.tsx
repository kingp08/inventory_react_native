import React, {useState} from 'react';
import {useMemo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';

import {useTheme} from '../theme/useTheme';
import {spacing, typeSizes} from '../theme/theme';

import {DropDownType} from '../types/components';

// const data: any = {
//   itemType: [
//     {label: 'Regular/Raw', value: '1'},
//     {label: 'Assembly', value: '2'},
//   ],
//   source: [
//     {label: 'Person', value: '1'},
//     {label: 'Company', value: '2'},
//   ],
//   destination: [
//     {label: 'destination1-r1', value: '1'},
//     {label: '', value: '2'},
//   ],
// };

const DropdownComponent = ({
  placeholder,
  name,
  navigation,
  data = {},
  list = [],
  value,
  onChange,
  onBlur,
  search = false,
  error,
}: DropDownType) => {
  const {theme} = useTheme();
  const [query, setQuery] = useState(value);
  const [isFocus, setIsFocus] = useState(false);

  const filteredList = useMemo(() => {
    if (search === false) return list;
    if (!query || !list.length) {
      return [];
    }
    const regex = new RegExp(`${query.trim()}`, 'i');
    return list.filter((e: any) => e.name.search(regex) >= 0);
  }, [list, query]);

  const renderLabel = () => {
    if (query || isFocus) {
      return (
        <Text style={[styles.label, isFocus && {color: theme.color}]}>
          {placeholder}
        </Text>
      );
    }
    return null;
  };

  // const dataset = data[name];
  return (
    <View style={{...styles.container, backgroundColor: theme?.cardBg}}>
      {renderLabel()}
      <Dropdown
        style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
        placeholderStyle={[styles.placeholderStyle, {color: theme.color}]}
        selectedTextStyle={[styles.selectedTextStyle, {color: theme.color}]}
        inputSearchStyle={[styles.inputSearchStyle, {color: theme.color}]}
        iconStyle={styles.iconStyle}
        itemContainerStyle={{padding: 0, gap: 0}}
        itemTextStyle={{
          fontSize: 14,
          color: theme.color,
          height: 16,
          padding: 0,
          lineHeight: 16,
          margin: 0,
        }}
        data={list}
        search={search}
        maxHeight={300}
        labelField="name"
        valueField="name"
        placeholder={!isFocus ? placeholder : '...'}
        searchPlaceholder="Search..."
        value={value}
        // onChangeText={(val: string)=>{
        //     setQuery(val)
        //     // dataset.itemType.push({ label: val, value: '1' })
        // }}
        onFocus={() => setIsFocus(true)}
        onBlur={() => {
          setIsFocus(false);
        }}
        onChange={(item: any) => {
          onChange(item.name);
          if (item.name === "assembly") {
            navigation.navigate('Kit/Bom', { productCode: data.productCode, returnUrl: data.returnUrl });
          }
          setIsFocus(false);
        }}
      />
      {error ? (
        <Text style={[styles.error, {color: theme.error}]}>{error}</Text>
      ) : null}
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: 'white',
    padding: 4,
    marginVertical: 2,
    flex:1,
  },
  dropdown: {
    height: 42,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: 'white',
  },
  icon: {
    marginRight: 5,
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
  placeholderStyle: {
    fontSize: 14,
    textAlign: 'center'
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
  error: {
    paddingLeft: 8,
    fontSize: typeSizes.FONT_SIZE_SMALL,
  },
});
