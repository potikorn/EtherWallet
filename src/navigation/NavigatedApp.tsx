import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import HomeScreen from '../screens/Homescreen';
import {createStackNavigator} from '@react-navigation/stack';
import AuthScreen from '../screens/AuthScreen';
import CreateMnemonic from '../screens/CreateMnemonic';
import RecoveryWallet from '../screens/RecoveryWallet';

const Stack = createStackNavigator();

const NavigationContainerTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
  },
};

const NavigatedApp = () => {
  useEffect(() => {
    // Stuff which runs once when the App mounts
    // Dismiss SplashScreen
    // SplashScreen.hide()
  }, []);

  return (
    <NavigationContainer theme={NavigationContainerTheme}>
      <Stack.Navigator
        initialRouteName="Auth"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Auth" component={AuthScreen} />
        <Stack.Screen name="Create" component={CreateMnemonic} />
        <Stack.Screen name="Recovery" component={RecoveryWallet} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigatedApp;
