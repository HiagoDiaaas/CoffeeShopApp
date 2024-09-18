import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Coffee from '../models/Coffee';

interface CoffeeItemProps {
  coffee: Coffee;
  onPress: (coffee: Coffee) => void;
  selected?: boolean;
}

const CoffeeItem: React.FC<CoffeeItemProps> = ({ coffee, onPress, selected = false }) => (
  <TouchableOpacity
    onPress={() => onPress(coffee)}
    style={[styles.container, selected && styles.selectedContainer]}
  >
    <Text style={styles.name}>{coffee.name}</Text>
    <Text style={styles.price}>${coffee.price.toFixed(2)}</Text>
  </TouchableOpacity>
);

export default CoffeeItem;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  selectedContainer: {
    backgroundColor: '#d0f0c0', // Light green when selected
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
