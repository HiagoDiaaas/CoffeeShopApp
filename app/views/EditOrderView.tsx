import React, { useState } from 'react';
import { View, FlatList, Button, StyleSheet, Alert } from 'react-native';
import Coffee from '../models/Coffee';
import CoffeeService from '../services/CoffeeService';
import CoffeeItem from './CoffeeItem';
import Order from '../models/Order';

interface EditOrderProps {
  updateOrder: (order: Order) => void;
  navigation: any;
  route: any;
}

const EditOrderView: React.FC<EditOrderProps> = ({
  updateOrder,
  navigation,
  route,
}) => {
  const { order } = route.params as { order: Order };
  const [selectedCoffees, setSelectedCoffees] = useState<Coffee[]>(order.coffees);

  const coffees = CoffeeService.getAllCoffees();

  const toggleCoffeeSelection = (coffee: Coffee) => {
    if (selectedCoffees.some((c) => c.id === coffee.id)) {
      // Remove coffee from selection
      setSelectedCoffees(selectedCoffees.filter((c) => c.id !== coffee.id));
    } else {
      // Add coffee to selection
      setSelectedCoffees([...selectedCoffees, coffee]);
    }
  };

  const isCoffeeSelected = (coffee: Coffee) => {
    return selectedCoffees.some((c) => c.id === coffee.id);
  };

  const handleUpdateOrder = () => {
    if (selectedCoffees.length === 0) {
      Alert.alert('No Coffee Selected', 'Please select at least one coffee.');
      return;
    }

    const updatedOrder = new Order(order.id, selectedCoffees);
    updateOrder(updatedOrder);
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
      <Button title="Update Order" onPress={handleUpdateOrder} />
    </View>
  );
};

export default EditOrderView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
