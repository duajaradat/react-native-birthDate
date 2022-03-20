import React, {useState, useRef} from 'react';
import moment from 'moment';
import {
  View,
  Text,
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

  const [disabled, setDisabled] = useState(true);

  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [year, setYear] = useState('');

  const [error, setError] = useState(false);

  const monthRef = useRef();
  const dayRef = useRef();
  const yearRef = useRef();

  moment.updateLocale(moment.locale(), {invalidDate: ''});
  const monthName = moment(month, 'M').format('MMMM');

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

  const MAX_VALID_YR = 2022;
  const MIN_VALID_YR = 1900;

  const isLeap = year => {
    return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
  };
  const isValidDate = (d, m, y) => {
    if (y > MAX_VALID_YR || y < MIN_VALID_YR) return false;
    if (m < 1 || m > 12) return false;
    if (d < 1 || d > 31) return false;

    if (m == 2) {
      if (isLeap(y)) return d <= 29;
      else return d <= 28;
    }

    if (m == 4 || m == 6 || m == 9 || m == 11) return d <= 30;

    return true;
  };
  const ageHandle = year => {
    let today = new Date();
    let birthDate = new Date(year);
    let age = today.getFullYear() - birthDate.getFullYear();
    console.log(age);
    if (age >= 18) {
      return true;
    } else {
      return false;
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
                  if (isValidDate(day, month, 2022)) {
                    yearRef.current.focus();
                  }
                }
              }}
              onFocus={() => {
                setRenderOnFocus(true);
                setDayPlaceholder('');
              }}
              onBlur={() => setRenderOnFocus(false)}
              onKeyPress={event => goBack(event)}
            />
            {renderOnFocus && dayPlaceholder === '' && (
              <Text style={styles.greenText}>Day</Text>
            )}
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
                if (year.length === 4 && year >= '1900' && year <= '2022') {
                  if (isValidDate(day, month, year)) {
                    if (ageHandle(year)) {
                      setDisabled(false);
                    } else {
                      setError(true);
                    }
                  }
                }
              }}
              value={year}
              onFocus={() => {
                setYearPlaceholder('');
                setRenderOnFocus(true);
              }}
              onBlur={() => setRenderOnFocus(false)}
            />
            {renderOnFocus && yearPlaceHolder === '' && (
              <Text style={styles.greenText}>Year</Text>
            )}
          </View>
        </View>
        <View style={{marginTop: 50}}>
          {error ? (
            <Text style={styles.error}>
              We are sorry but you must be 18 years or older to proceed.
            </Text>
          ) : (
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.birthDateText}>
                {moment([year, month, day]).format('MMMM Do YYYY')}
              </Text>
            </View>
          )}
        </View>
      </View>
      <TouchableOpacity disabled={disabled}>
        <View style={disabled ? styles.disabled : styles.btnContainer}>
          <Text style={styles.btn}>Continue</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#050e38',
    flex: 1,
  },
  safeScreen: {
    flex: 1,
    paddingVertical: 25,
    paddingHorizontal: 25,
    justifyContent: 'space-between',
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
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 1,
    fontFamily: 'Rubik-VariableFont_wght',
  },
  birthDateText: {
    color: '#00FAAF',
    fontSize: 17,
    fontWeight: '600',
    fontFamily: 'Rubik-VariableFont_wght',
  },
  btn: {
    fontSize: 17,
    color: '#050e38',
  },
  btnContainer: {
    backgroundColor: '#00FAAF',
    borderRadius: 10,
    width: '100%',
    height: 65,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabled: {
    backgroundColor: 'grey',
    borderRadius: 10,
    width: '100%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BirthdayScreen;
