// app/views/CoffeeDetailView.tsx

import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Coffee from '../models/Coffee';

interface CoffeeDetailProps {
  deleteCoffee: (id: number) => void;
  navigation: any;
  route: any;
}

const CoffeeDetailView: React.FC<CoffeeDetailProps> = ({
  deleteCoffee,
  navigation,
  route,
}) => {
  const { coffee } = route.params;

  const handleDeleteCoffee = () => {
    deleteCoffee(coffee.id);
    navigation.goBack();
  };

  const handleEditCoffee = () => {
    navigation.navigate('EditCoffee', { coffee });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{coffee.name}</Text>
      <Text style={styles.description}>{coffee.description}</Text>
      <Text style={styles.price}>Price: ${coffee.price.toFixed(2)}</Text>
      <Button title="Edit Coffee" onPress={handleEditCoffee} />
      <Button title="Delete Coffee" onPress={handleDeleteCoffee} color="red" />
    </View>
  );
};

export default CoffeeDetailView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 12,
  },
  description: {
    fontSize: 18,
    marginBottom: 12,
  },
  price: {
    fontSize: 18,
    marginBottom: 24,
  },
});
