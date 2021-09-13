import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import store from './store/store';
import { Provider } from 'react-redux';
import { RootStackScreens } from './screens/Navigation';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStackScreens />
      </NavigationContainer>
    </Provider>
  );
};
