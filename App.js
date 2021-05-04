import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import React from 'react';
import { Text, View } from 'react-native';
import Routes from './src/routes';
import { NavigationContainer } from '@react-navigation/native';
import { Host, Portal } from 'react-native-portalize';
import 'react-native-gesture-handler';
export default function App() {
  const [fontsLoaded] = Font.useFonts({
    'Dosis-Bold': require('./assets/fonts/Dosis-Bold.ttf'),
    'Dosis-SemiBold': require('./assets/fonts/Dosis-SemiBold.ttf'),
    'Dosis-Regular': require('./assets/fonts/Dosis-Regular.ttf'),
    'Dosis-ExtraBold': require('./assets/fonts/Dosis-ExtraBold.ttf'),
    'Dosis-ExtraLight': require('./assets/fonts/Dosis-ExtraLight.ttf'),
    'Dosis-Light': require('./assets/fonts/Dosis-Light.ttf'),
    'Dosis-Medium': require('./assets/fonts/Dosis-Medium.ttf'),
    'UbuntuCondensed-Regular': require('./assets/fonts/UbuntuCondensed-Regular.ttf'),
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      <Host>
      <Routes/>
      </Host>
    </NavigationContainer>
    
  );
}