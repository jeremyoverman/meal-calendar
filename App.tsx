import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as ReduxProvier } from 'react-redux';
import * as Font from 'expo-font';

import useCachedResources from './hooks/useCachedResources';
import Navigation from './navigation';
import createStore from './store';
import { Container, StyleProvider } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

if(__DEV__) {
  // @ts-ignore
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'))
}

// @ts-ignore
import getTheme from './native-base-theme/components';
// @ts-ignore
import material from './native-base-theme/variables/material';
import { Store } from 'redux';

export default function App() {
  const isCacheLoadingComplete = useCachedResources();
  const [isFontLoadingComplete, setFontLoadingComplete] = useState(false);
  const [store, setStore] = useState<Store>();

  const isLoadingComplete = isCacheLoadingComplete && isFontLoadingComplete;

  useEffect(() => {
    async function loadStore() {
      setStore(await createStore());
    };

    async function loadFonts() {
      await Font.loadAsync({
        Roboto: require('native-base/Fonts/Roboto.ttf'),
        Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
        ...Ionicons.font,
      });

      setFontLoadingComplete(true);
    };

    loadFonts();
    loadStore();
  }, [])

  if (!isLoadingComplete || !store) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <ReduxProvier store={store}>
          <StyleProvider style={getTheme(material)}>
            <Container>
              <StatusBar />
              <Navigation colorScheme="light" />
            </Container>
          </StyleProvider>
        </ReduxProvier>
      </SafeAreaProvider>
    );
  }
}
