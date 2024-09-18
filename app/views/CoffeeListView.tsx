// app/views/CoffeeListView.tsx

import React from 'react';
import { View, FlatList } from 'react-native';
import Coffee from '../models/Coffee';
import CoffeeItem from './CoffeeItem';
import CoffeeService from '../services/CoffeeService';

interface CoffeeListProps {
  onCoffeeSelect: (coffee: Coffee) => void;
}

const CoffeeListView: React.FC<CoffeeListProps> = ({ onCoffeeSelect }) => {
  const coffees = CoffeeService.getAllCoffees();

  return (
    <View>
      <FlatList
        data={coffees}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CoffeeItem coffee={item} onPress={onCoffeeSelect} />
        )}
      />
    </View>
  );
};

export default CoffeeListView;
