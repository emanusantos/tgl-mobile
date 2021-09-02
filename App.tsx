import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';

export default function App() {
  const RootStack = createNativeStackNavigator();

  const RootStackScreens = () => (
    <RootStack.Navigator>
      <RootStack.Screen name='Login' component={Login} options={{ headerShown: false }} />
    </RootStack.Navigator>
  );

  return (
    <NavigationContainer>
      <RootStackScreens />
    </NavigationContainer>
  );
};
