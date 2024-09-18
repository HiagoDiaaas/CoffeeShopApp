// app/views/AddOrderView.tsx

import React, { useState } from 'react';
import { View, FlatList, Button, StyleSheet, Alert } from 'react-native';
import Coffee from '../models/Coffee';
import CoffeeService from '../services/CoffeeService';
import CoffeeItem from './CoffeeItem';
import Order from '../models/Order';

interface AddOrderProps {
  addOrder: (order: Order) => void;
  navigation: any;
}

const AddOrderView: React.FC<AddOrderProps> = ({ addOrder, navigation }) => {
  const [selectedCoffees, setSelectedCoffees] = useState<Coffee[]>([]);

  const coffees = CoffeeService.getAllCoffees();

  const toggleCoffeeSelection = (coffee: Coffee) => {
    if (selectedCoffees.some((c) => c.id === coffee.id)) {
      setSelectedCoffees(selectedCoffees.filter((c) => c.id !== coffee.id));
    } else {
      setSelectedCoffees([...selectedCoffees, coffee]);
    }
  };

  const isCoffeeSelected = (coffee: Coffee) => {
    return selectedCoffees.some((c) => c.id === coffee.id);
  };

  const handleAddOrder = () => {
    if (selectedCoffees.length === 0) {
      Alert.alert('No Coffee Selected', 'Please select at least one coffee.');
      return;
    }

    const newOrder = new Order(Date.now(), selectedCoffees);
    addOrder(newOrder);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={coffees}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CoffeeItem
            coffee={item}
            onPress={toggleCoffeeSelection}
            selected={isCoffeeSelected(item)}
          />
        )}
        extraData={selectedCoffees}
      />
      <Button title="Add Order" onPress={handleAddOrder} />
    </View>
  );
};

export default AddOrderView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
