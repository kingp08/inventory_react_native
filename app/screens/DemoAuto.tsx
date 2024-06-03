import React from 'react';
import {
  Platform,
  StyleSheet,
  View,
  SafeAreaView,
} from 'react-native';

import AutoCompleteNScanInput from '../components/ScanItem';
import DropDown from '../components/Dropdown';

function StarWarsMoveFinder({navigation}: {navigation: any}): React.ReactElement {

  return (
    <SafeAreaView style={styles.saveView}>
      <View>
        <AutoCompleteNScanInput navigation={navigation} placeholder='aaa'/>
        <AutoCompleteNScanInput navigation={navigation} placeholder='bbb'/>
        <DropDown placeholder='ccc' name='source'/>
        <View style={{backgroundColor: 'red', height: 100, width: 100, zIndex: 0}}/>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  saveView: {
    flex: 1,
  },
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
        marginTop: 25,
      },
      default: {
        marginTop: 0,
      },
    }),
  },
  itemText: {
    fontSize: 15,
    margin: 2,
  },
  descriptionContainer: {
    // `backgroundColor` needs to be set otherwise the
    // autocomplete input will disappear on text input.
    backgroundColor: '#F5FCFF',
    marginTop: 8,
  },
  infoText: {
    textAlign: 'center',
  },
  autocompleteContainer: {
    // Hack required to make the autocomplete
    // work on Andrdoid
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1,
    padding: 5,
  },
});
export default StarWarsMoveFinder;
