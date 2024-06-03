import React from 'react';
import {Text, View, Button} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import {useSelector} from 'react-redux';

// import {getNews} from '../services';
// import {requestNewToken} from '../utils/token';
// import {RootState} from '../store/store';

// const Base_URL = 'http://10.0.2.2:4001/';
import Demo from './Demo'

const TabDemo = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Demo} />
      <Tab.Screen name="Settings" component={Demo} />
    </Tab.Navigator>
  );
};

export default TabDemo;
