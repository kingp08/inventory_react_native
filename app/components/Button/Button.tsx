import * as React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Card from '../Card';
import {useTheme, ThemeContextInterface} from '../../theme/useTheme';

export type ButtonProps = {
  onPress: () => void;
  text: string;
  isLoading?: boolean;
};

export const Button = ({onPress, text, isLoading = false}: ButtonProps) => {
  const {theme}: Partial<ThemeContextInterface> = useTheme();

  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      backgroundColor: isLoading
        ? theme.buttonColor.primaryInactive
        : theme.buttonColor.primary,
      borderRadius: 8,
      margin: 8,
    },
    text: {color: 'white', textAlign: 'center', fontSize: 16},
  });

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={!isLoading ? onPress : () => {}}
      activeOpacity={isLoading ? 1: 0.8}>
      {isLoading ? (
        <ActivityIndicator size={20} />
      ) : (
        <Text style={styles.text}>{text}</Text>
      )}
    </TouchableOpacity>
  );
};
