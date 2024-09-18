import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Coffee from '../../models/Coffee';

interface CoffeeItemProps {
  coffee: Coffee;
  onPress: (coffee: Coffee) => void;
}

const CoffeeItem: React.FC<CoffeeItemProps> = ({ coffee, onPress }) => (
  <TouchableOpacity onPress={() => onPress(coffee)} style={styles.container}>
    <Text style={styles.name}>{coffee.name}</Text>
    <Text style={styles.price}>${coffee.price.toFixed(2)}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  name: {
    fontSize: 18,
    color: '#333',
  },
  price: {
    color: '#999',
    marginTop: 5,
  },
});

export default CoffeeItem;
