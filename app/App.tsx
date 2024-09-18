/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AsyncStorage from '@react-native-async-storage/async-storage';

// Import your views
import CoffeeListView from './views/CoffeeListView';
import CoffeeDetailView from './views/CoffeeDetailView';
import AddCoffeeView from './views/AddCoffeeView';
import EditCoffeeView from './views/EditCoffeeView';

// Import the Coffee class
import Coffee from './models/Coffee';

type RootStackParamList = {
  CoffeeList: undefined;
  CoffeeDetail: { coffee: Coffee };
  AddCoffee: undefined;
  EditCoffee: { coffee: Coffee };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  const [coffees, setCoffees] = useState<Coffee[]>([]);

  // Load coffees from AsyncStorage on mount
  useEffect(() => {
    const loadCoffees = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('coffees');
        if (jsonValue != null) {
          const parsedCoffees = JSON.parse(jsonValue);
          const loadedCoffees = parsedCoffees.map(
            (coffeeData: any) =>
              new Coffee(
                coffeeData.id,
                coffeeData.name,
                coffeeData.description,
                coffeeData.price
              )
          );
          setCoffees(loadedCoffees);
        }
      } catch (e) {
        console.error('Failed to load coffees.', e);
      }
    };

    loadCoffees();
  }, []);

  // Save coffees to AsyncStorage whenever they change
  useEffect(() => {
    const saveCoffees = async () => {
      try {
        const jsonValue = JSON.stringify(coffees);
        await AsyncStorage.setItem('coffees', jsonValue);
      } catch (e) {
        console.error('Failed to save coffees.', e);
      }
    };

    saveCoffees();
  }, [coffees]);

  const addCoffee = (coffee: Coffee) => {
    setCoffees([...coffees, coffee]);
  };

  const updateCoffee = (updatedCoffee: Coffee) => {
    setCoffees(
      coffees.map((coffee) =>
        coffee.id === updatedCoffee.id ? updatedCoffee : coffee
      )
    );
  };

  const deleteCoffee = (id: number) => {
    setCoffees(coffees.filter((coffee) => coffee.id !== id));
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="CoffeeList">
        <Stack.Screen name="CoffeeList" options={{ title: 'Coffees' }}>
          {(props) => <CoffeeListView {...props} coffees={coffees} />}
        </Stack.Screen>
        <Stack.Screen name="CoffeeDetail" options={{ title: 'Coffee Details' }}>
          {(props) => (
            <CoffeeDetailView {...props} deleteCoffee={deleteCoffee} />
          )}
        </Stack.Screen>
        <Stack.Screen name="AddCoffee" options={{ title: 'Add New Coffee' }}>
          {(props) => <AddCoffeeView {...props} addCoffee={addCoffee} />}
        </Stack.Screen>
        <Stack.Screen name="EditCoffee" options={{ title: 'Edit Coffee' }}>
          {(props) => (
            <EditCoffeeView {...props} updateCoffee={updateCoffee} />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

