import React, {useState, useRef} from 'react';
import moment from 'moment';
import {
  View,
  Text,
  Button,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';

function BirthdayScreen({navigation}) {
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
  const dayName = moment(day, 'D').format('DDDD');

  const dayHandler = day => {
    console.log(dayName);
  };

  const goBack = event => {
    if (!day && event.nativeEvent.key === 'Backspace' && dayRef.current) {
      monthRef.current.focus();
    } else if (
      !year &&
      event.nativeEvent.key === 'Backspace' &&
      yearRef.current
    ) {
      dayRef.current.focus();
    }
  };
  return (
    <SafeAreaView style={styles.safeScreen}>
      <View style={styles.container}>
        <Text style={styles.titleName}>What's your birthdate?</Text>

        <TouchableOpacity onPress={() => navigation.navigate('Modal')}>
          <Text style={styles.qtext}>Why do we ask this?</Text>
        </TouchableOpacity>

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
                if (month.length === 2 && month >= '01' && month <= '12') {
                  dayRef.current.focus();
                }
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
              onKeyPress={event => goBack(event)}
            />
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
              onKeyPress={event => goBack(event)}
              onChangeText={year => {
                setYear(year);
              }}
              value={year}
              onFocus={() => {
                setYearPlaceholder('');
              }}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingVertical: 25,
    paddingHorizontal: 25,
    backgroundColor: '#050e38',
  },
  safeScreen: {
    flex: 1,
    backgroundColor: '#050e38',
  },
  modal: {
    flex: 1,
    backgroundColor: '#050e38',
    margin: 0,
  },
  titleName: {
    color: 'white',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
    letterSpacing: 1,
    fontFamily: 'Rubik-VariableFont_wght',
  },

  qtext: {
    color: '#00FAAF',
    fontSize: 16,
    fontWeight: '600',
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
