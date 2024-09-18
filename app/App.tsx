/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

// app/App.tsx

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CoffeeListView from './views/CoffeeListView';
import CoffeeDetailView from './views/CoffeeDetailView';

type RootStackParamList = {
  CoffeeList: undefined;
  CoffeeDetail: { coffeeId: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="CoffeeList">
      <Stack.Screen
        name="CoffeeList"
        component={CoffeeListView}
        options={{ title: 'Coffee Shop' }}
      />
      <Stack.Screen
        name="CoffeeDetail"
        component={CoffeeDetailView}
        options={{ title: 'Coffee Details' }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
