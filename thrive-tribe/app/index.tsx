import React from 'react';
import { Provider } from 'react-redux';
import store from '../src/store';
import { NativeBaseProvider } from 'native-base';
import AppNavigator from '../src/navigation/AppNavigator';

export default function App() {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
          <AppNavigator />
      </NativeBaseProvider>
    </Provider>
  );
}
