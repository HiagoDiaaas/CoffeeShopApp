import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CoffeeService from '../services/CoffeeService';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  CoffeeList: undefined;
  CoffeeDetail: { coffeeId: number };
};

type Props = NativeStackScreenProps<RootStackParamList, 'CoffeeDetail'>;

const CoffeeDetailView: React.FC<Props> = ({ route }) => {
  const { coffeeId } = route.params;
  const coffee = CoffeeService.getCoffeeById(coffeeId);

  if (!coffee) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Coffee not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{coffee.name}</Text>
      <Text style={styles.description}>{coffee.description}</Text>
      <Text style={styles.price}>Price: ${coffee.price.toFixed(2)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  name: {
    fontSize: 24,
    color: '#333',
  },
  description: {
    marginVertical: 10,
    fontSize: 16,
    color: '#666',
  },
  price: {
    fontSize: 18,
    color: '#333',
  },
  error: {
    fontSize: 18,
    color: 'red',
  },
});

export default CoffeeDetailView;
