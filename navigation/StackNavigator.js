import React from 'react';

import BirthDateScreen from '../screens/BirthDateScreen';
import ModalScreen from '../screens/ModalScreen';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Birthdate" component={BirthDateScreen} />
      <Stack.Screen
        options={{presentation: 'modal'}}
        name="Modal"
        component={ModalScreen}
      />
    </Stack.Navigator>
  );
}
export default StackNavigator;
