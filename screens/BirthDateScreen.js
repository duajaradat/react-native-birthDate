import React, {useState, useRef} from 'react';
import moment from 'moment';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  SafeAreaView,
} from 'react-native';

function BirthdayScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [renderOnFocus, setRenderOnFocus] = useState(false);

  const [monthPlaceHolder, setMonthPlaceholder] = useState('MM');
  const [dayPlaceholder, setDayPlaceholder] = useState('DD');
  const [yearPlaceHolder, setYearPlaceholder] = useState('YYYY');

  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [year, setYear] = useState('');

  const monthRef = useRef();
  const dayRef = useRef();
  const yearRef = useRef();

  moment.updateLocale(moment.locale(), {invalidDate: ''});
  const monthName = moment(month, 'M').format('MMMM');
  const dayHandler = day => {
    dayValid = moment().date(day);
    console.log(dayValid);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleName}>What's your birthdate?</Text>

      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text style={styles.qtext}>Why do we ask this?</Text>
      </TouchableOpacity>

      <Modal
        style={styles.modal}
        visible={modalVisible}
        animationType="fade"
        presentationStyle="pageSheet">
        <SafeAreaView>
          <View style={{backgroundColor: '#050e38'}}>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text>X</Text>
            </TouchableOpacity>
            <View>
              <Text>What's your birthdate</Text>
              <Text>Why do we ask this?</Text>
              <Text>
                We ask you this question in order to verify your identity for
                your online brokerage account application.
              </Text>
            </View>
          </View>
        </SafeAreaView>
      </Modal>

      <View style={styles.dateContainer}>
        <View style={styles.textInputView}>
          <TextInput
            maxLength={2}
            value={month}
            ref={monthRef}
            textAlign="center"
            style={styles.input}
            keyboardType="number-pad"
            returnKeyType="next"
            placeholder={monthPlaceHolder}
            placeholderTextColor="#e4e5ed"
            onChangeText={month => {
              setMonth(month);
              //   if (month.length === 2 && month >= '01' && month <= '12') {
              //     dayRef.current.focus();
              //   }
            }}
            onFocus={() => {
              setRenderOnFocus(true);
              setMonthPlaceholder('');
            }}
            onBlur={() => setRenderOnFocus(false)}
          />
          {renderOnFocus && month === '' && (
            <Text style={styles.greenText}>Month</Text>
          )}

          <Text style={styles.greenText}>{month && monthName}</Text>
        </View>

        <View style={styles.textInputView}>
          <TextInput
            maxLength={2}
            value={day}
            ref={dayRef}
            textAlign="center"
            style={styles.input}
            keyboardType="number-pad"
            placeholder={dayPlaceholder}
            placeholderTextColor="#e4e5ed"
            onChangeText={day => {
              setDay(day);
              if (day.length === 2 && day >= '01' && day <= '31') {
                yearRef.current.focus();
              }
            }}
            onFocus={() => {
              setRenderOnFocus(true);
              setDayPlaceholder('');
            }}
            onBlur={() => setRenderOnFocus(false)}
          />
          {/* {renderOnFocus && day === '' && (
            <Text style={styles.greenText}>Day</Text>
          )} */}
        </View>

        <View style={styles.textInputView}>
          <TextInput
            ref={yearRef}
            style={styles.input}
            placeholder={yearPlaceHolder}
            keyboardType="number-pad"
            maxLength={4}
            placeholderTextColor="#e4e5ed"
            textAlign="center"
            onChangeText={year => {
              setYear(year);
            }}
            value={year}
            onFocus={() => {
              //   setRenderOnFocus(true);
              setYearPlaceholder('');
            }}
          />
        </View>
      </View>
      {/* <Button title="Continue" style={styles.btn} /> */}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 25,
    paddingHorizontal: 25,
  },
  safeScreen: {
    backgroundColor: '#050e38',
    flexDirection: 'row',
  },
  modal: {
    flex: 1,
    backgroundColor: '#050e38',
    margin: 0,
  },
  titleName: {
    color: 'white',
    fontSize: 21,
    marginBottom: 20,
    letterSpacing: 1,
    fontFamily: 'Fredoka',
  },

  qtext: {
    color: '#00FAAF',
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 1,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },

  textInputView: {
    height: 50,
    marginRight: 15,
  },
  input: {
    borderColor: '#161d40',
    backgroundColor: '#161d40',
    width: 60,
    borderRadius: 8,
    color: '#e4e5ed',
    fontWeight: '500',
    fontSize: 19,
    height: 50,
  },
  greenText: {
    color: '#00FAAF',
    textAlign: 'center',
    marginTop: 10,
  },
  error: {
    color: 'tomato',
  },
  btn: {
    backgroundColor: '#00FAAF',
    color: 'navyblue',
    borderRadius: 8,
  },
});

export default BirthdayScreen;
