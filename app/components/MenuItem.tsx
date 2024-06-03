import * as React from 'react';
import {View, Pressable, Text, StyleSheet} from 'react-native';
import {useTheme} from '../theme/useTheme';
import {MenuItemPropsType} from '../types/components';

const MenuItem = ({
  label = 'Menu Item',
  onPress,
  rightItem,
}: MenuItemPropsType) => {
  const {theme} = useTheme();
  const dynamicStyles = {
    menuItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      height: 40,
      alignItems: 'center',
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: theme.layoutBg, // Use theme color here
    },
    label: {
      color: theme.color, // Use theme color for the label text
    },
  };
  return (
    <Pressable
      style={[styles.menuItem, {borderTopColor: theme.layoutBg}]}
      onPress={onPress}>
      <View>
        <Text style={dynamicStyles.label}>{label}</Text>
      </View>
      <View>{rightItem}</View>
    </Pressable>
  );
};

export default MenuItem;

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 40,
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#ccc',
  },
});
