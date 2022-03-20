import React from 'react';

import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

function ModalScreen({navigation}) {
  return (
    <SafeAreaView style={styles.safeScreen}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.close}>X</Text>
        </TouchableOpacity>
        <View>
          <Text style={styles.titleName}>What's your birthdate</Text>
          <Text style={styles.qtext}>Why do we ask this?</Text>
          <Text style={styles.answer}>
            We ask you this question in order to verify your identity for your
            online brokerage account application.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default ModalScreen;
const styles = StyleSheet.create({
  safeScreen: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#050e38',
    paddingVertical: 25,
    paddingHorizontal: 25,
  },
  titleName: {
    color: 'white',
    fontSize: 22,
    fontWeight: '700',
    marginTop: 10,
    marginBottom: 20,
    letterSpacing: 1,
    fontFamily: 'Rubik-VariableFont_wght',
  },
  qtext: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 1,
    marginBottom: 20,
  },
  answer: {
    color: 'white',
    fontSize: 16,
    marginTop: 20,
    fontWeight: '600',
  },
  close: {
    color: 'white',
    fontWeight: '700',
    fontSize: 20,
    fontFamily: 'Rubik-VariableFont_wght',
    textAlign: 'right',
    marginBottom: 10,
    marginRight: 10,
  },
});
