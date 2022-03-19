import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import BirthDateScreen from './screens/BirthDateScreen';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <BirthDateScreen />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#050e38',
    flex: 1,
  },
});
