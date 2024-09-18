import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { View, FlatList, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import coffeeViewModel from '../viewmodels/CoffeeViewModel';
import CoffeeItem from './components/CoffeeItem';
import Coffee from '../models/Coffee';

type RootStackParamList = {
  CoffeeList: undefined;
  CoffeeDetail: { coffeeId: number };
};

type Props = NativeStackScreenProps<RootStackParamList, 'CoffeeList'>;

const CoffeeListView: React.FC<Props> = observer(({ navigation }) => {
  useEffect(() => {
    coffeeViewModel.fetchCoffees();
  }, []);

  const handlePress = (coffee: Coffee) => {
    navigation.navigate('CoffeeDetail', { coffeeId: coffee.id });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={coffeeViewModel.coffees.slice()}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <CoffeeItem coffee={item} onPress={handlePress} />}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CoffeeListView;
