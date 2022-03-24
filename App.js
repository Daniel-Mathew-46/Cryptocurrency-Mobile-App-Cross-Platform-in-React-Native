import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {COLORS} from './constants'
import CryptoDetail from './screens/CryptoDetail'
import Tabs from './navigation/Tabs';
import Transaction from './screens/Transaction';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white}/>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Tabs}/>
        <Stack.Screen name="CryptoDetail" component={CryptoDetail} />
        <Stack.Screen name="Transactions" component={Transaction} />
      </Stack.Navigator> 
    </NavigationContainer>
  );
}

