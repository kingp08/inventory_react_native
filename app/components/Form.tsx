import React from 'react';
import {StyleSheet, View, Text, TextInput} from 'react-native';
import {useTheme} from '../theme/useTheme';
import {spacing, typeSizes} from '../theme/theme';
import {InputPropsType} from '../types/components';

const Input = ({style, error, ...rest}: InputPropsType) => {
  const {theme} = useTheme();
  return (
    <View style={styles.inputWrp}>
      <TextInput
        placeholderTextColor={'#cccccc'}
        {...rest}
        style={[
          styles.input,
          {color: theme.color, borderColor: theme.layoutBg},
          {...style},
        ]}
      />
      {error ? (
        <Text style={[styles.error, {color: theme.error}]}>{error}</Text>
      ) : null}
    </View>
  );
};

export {Input};

const styles = StyleSheet.create({
  inputWrp: {
    marginBottom: spacing.cardMarginB,
  },
  input: {
    height: 45,
    borderColor: '#ff0000',
    borderWidth: 2, //StyleSheet.hairlineWidth,
    borderRadius: spacing.borderRadius,
    paddingLeft: 12,
  },
  error: {
    paddingLeft: 12,
    fontSize: typeSizes.FONT_SIZE_SMALL,
  },
});
