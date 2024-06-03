/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import ReduxProvider from './app/store';

import {useColorScheme} from 'react-native';
import {ThemeProvider} from './app/theme/useTheme';
import {NoInternetToast} from './app/components/NoInternet';
import {AutocompleteDropdownContextProvider} from 'react-native-autocomplete-dropdown';
import Toast from 'react-native-toast-message';
// import { ToastConfig } from './app/components/Toast/toastConfig';
// Navigation
import RootNavigation from './app/routes/RootNavigation';

let Root = function App() {
  return (
    <AutocompleteDropdownContextProvider>
      <SafeAreaProvider>
        <ReduxProvider>
          <ThemeProvider>
            <RootNavigation />
            <NoInternetToast />
            <Toast position="top" />
          </ThemeProvider>
        </ReduxProvider>
      </SafeAreaProvider>
    </AutocompleteDropdownContextProvider>
  );
};

export default Root;
