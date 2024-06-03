import React, {useState} from 'react';

//import all the components we are going to use
import {
  Switch,
  View,
  Text,
  StyleSheet
} from 'react-native';

import { ThemeContextInterface, useTheme } from '../theme/useTheme';
import { TSwitchItem } from '../types/components';

const SwitchItem = (
  {
    onLabel,
    offLabel,
    isSwitchOn,
    onSwitch
  }: TSwitchItem
) => {
  const {theme}: Partial<ThemeContextInterface> = useTheme();

  const toggleSwitch = (value: boolean) => {
    console.log('clicked Switch value', value)
    //To handle switch toggle
    onSwitch(!value);
    //State changes according to switch
  };

  return (
   <View style={styles.container}>
      {/*To show Switch state*/}
      <Text>
        {isSwitchOn ? onLabel : offLabel}
      </Text>
      {/*Setting the default value of state*/}
      {/*On change of switch onValueChange will be triggered*/}
      <View style={styles.switchContainer}>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isSwitchOn ? theme.buttonColor.primary : '#f4f3f4'}
          // ios_backgroundColor="#3e3e3e"
          style={{marginTop: 30}}
          onValueChange={toggleSwitch}
          value={isSwitchOn}
        />
      </View>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  switchContainer: {
    // width: 100,
    // transform: [{ scaleX: 2 }]
  }
});

export default SwitchItem;