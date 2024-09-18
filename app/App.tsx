/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

// app/App.tsx

import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AsyncStorage from '@react-native-async-storage/async-storage';

// Import your views
import CoffeeListView from './views/CoffeeListView';
import OrderDetailView from './views/OrderDetailView';
import AddOrderView from './views/AddOrderView';
import EditOrderView from './views/EditOrderView';

// Import models
import Order from './models/Order';
import OrderListView from './views/OrderListView';

type RootStackParamList = {
  OrderList: undefined;
  OrderDetail: { order: Order };
  AddOrder: undefined;
  EditOrder: { order: Order };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  // Load orders from AsyncStorage on mount
  useEffect(() => {
    const loadOrders = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('orders');
        if (jsonValue != null) {
          const parsedOrders = JSON.parse(jsonValue);
          const loadedOrders = parsedOrders.map(
            (orderData: any) =>
              new Order(
                orderData.id,
                orderData.coffees
              )
          );
          setOrders(loadedOrders);
        }
      } catch (e) {
        console.error('Failed to load orders.', e);
      }
    };

    loadOrders();
  }, []);

  // Save orders to AsyncStorage whenever they change
  useEffect(() => {
    const saveOrders = async () => {
      try {
        const jsonValue = JSON.stringify(orders);
        await AsyncStorage.setItem('orders', jsonValue);
      } catch (e) {
        console.error('Failed to save orders.', e);
      }
    };

    saveOrders();
  }, [orders]);

  const addOrder = (order: Order) => {
    setOrders([...orders, order]);
  };

  const updateOrder = (updatedOrder: Order) => {
    setOrders(
      orders.map((order) =>
        order.id === updatedOrder.id ? updatedOrder : order
      )
    );
  };

  const deleteOrder = (id: number) => {
    setOrders(orders.filter((order) => order.id !== id));
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="OrderList">
        <Stack.Screen name="OrderList" options={{ title: 'Orders' }}>
          {(props) => (
            <OrderListView {...props} orders={orders} />
          )}
        </Stack.Screen>
        <Stack.Screen name="OrderDetail" options={{ title: 'Order Details' }}>
          {(props) => (
            <OrderDetailView {...props} deleteOrder={deleteOrder} />
          )}
        </Stack.Screen>
        <Stack.Screen name="AddOrder" options={{ title: 'Add New Order' }}>
          {(props) => (
            <AddOrderView {...props} addOrder={addOrder} />
          )}
        </Stack.Screen>
        <Stack.Screen name="EditOrder" options={{ title: 'Edit Order' }}>
          {(props) => (
            <EditOrderView {...props} updateOrder={updateOrder} />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
