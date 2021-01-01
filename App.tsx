import 'react-native-get-random-values';
import { StatusBar } from 'expo-status-bar';
import React from 'react';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as ReduxProvier } from 'react-redux';

import useCachedResources from './hooks/useCachedResources';
import Navigation from './navigation';
import { Container, Root, StyleProvider } from 'native-base';

if(__DEV__) {
  // @ts-ignore
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'))
}

// @ts-ignore
import getTheme from './native-base-theme/components';
// @ts-ignore
import material from './native-base-theme/variables/material';

import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

export default function App() {
  const { isLoadingComplete, store } = useCachedResources();

  if (!isLoadingComplete || !store) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <ReduxProvier store={store}>
          <StyleProvider style={getTheme(material)}>
            <Root>
              <StatusBar />
              <Navigation colorScheme="light" />
            </Root>
          </StyleProvider>
        </ReduxProvier>
      </SafeAreaProvider>
    );
  }
}
