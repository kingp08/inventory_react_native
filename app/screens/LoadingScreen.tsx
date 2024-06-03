import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const LoadingAnimation = () => {
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.indicatorWrapper}>
        <ActivityIndicator size="large" style={styles.indicator}/>
        <Text style={styles.indicatorText}>Loading...</Text>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  indicatorWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  indicator: {},
  indicatorText: {
    fontSize: 18,
    marginTop: 12,
  },
});

export default LoadingAnimation;