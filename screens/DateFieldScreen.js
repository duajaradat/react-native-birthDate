import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import MonthDateYearField from 'react-native-datefield';

function BirthdayScreen(props) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.titleName}>What's your birthdate?</Text>

      <TouchableOpacity onPress={() => setIsVisible(true)}>
        <Text style={styles.askWhy}>Why do we ask this?</Text>
      </TouchableOpacity>

      <View style={styles.dateContainer}>
        <MonthDateYearField
          labelDate="DD"
          labelMonth="MM"
          labelYear="YYYY"
          styleInput={styles.input}
          containerStyle={styles.inputContainer}
          minimumDate={new Date(1900, 1, 1)}
          maximumDate={new Date()}
          placeholderTextColor="white"
          // handleErrors={() => console.log('ERROR')}
          onSubmit={value => console.log(value)}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050e38',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  titleName: {
    color: 'white',
    fontSize: 25,
    marginBottom: 20,
    letterSpacing: 1,
  },
  askWhy: {color: '#00FAAF', fontSize: 16, letterSpacing: 1},
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    // marginTop: 50,
  },
  dateInput: {
    borderColor: 'white',
    // margin: 5,
    color: 'white',
  },
  input: {
    width: '25%',
    // opacity: 0.6,
    borderRadius: 8,
    borderColor: '#050e38',
    borderWidth: 1,
    marginTop: 20,
    marginBottom: 20,
    color: 'white',
    fontWeight: '500',
    fontSize: 19,
  },
  inputContainer: {
    marginTop: 20,
    // backgroundColor: '#050e38',
  },
});
// export const green = '#00FAAF'
// export const greenLight = '#13DFAE'
export default BirthdayScreen;
