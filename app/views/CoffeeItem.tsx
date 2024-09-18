import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Coffee from '../models/Coffee';

interface CoffeeItemProps {
  coffee: Coffee;
  onPress: (coffee: Coffee) => void;
  selected?: boolean;
}

const CoffeeItem: React.FC<CoffeeItemProps> = ({ coffee, onPress, selected }) => (
  <TouchableOpacity onPress={() => onPress(coffee)} style={styles.container}>
    <Text style={styles.name}>{coffee.name}</Text>
    <Text style={styles.price}>${coffee.price.toFixed(2)}</Text>
    {selected && <Text style={styles.selected}>Selected</Text>}
  </TouchableOpacity>
);

export default CoffeeItem;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fff',
  },
  name: {
    fontSize: 18,
    color: '#333',
  },
  price: {
    color: '#999',
    marginTop: 5,
  },
  selected: {
    color: 'green',
    fontWeight: 'bold',
    marginTop: 5,
  },
});
