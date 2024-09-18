import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Button,
  StyleSheet,
} from 'react-native';
import Coffee from '../models/Coffee';

interface CoffeeListProps {
  coffees: Coffee[];
  navigation: any;
}

const CoffeeListView: React.FC<CoffeeListProps> = ({ coffees, navigation }) => {
  const renderItem = ({ item }: { item: Coffee }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate('CoffeeDetail', { coffee: item })}
    >
      <Text style={styles.itemText}>
        {item.name} - ${item.price.toFixed(2)}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {coffees.length === 0 ? (
        <Text style={styles.emptyText}>No coffees available. Add some!</Text>
      ) : (
        <FlatList
          data={coffees}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      )}
      <Button
        title="Add Coffee"
        onPress={() => navigation.navigate('AddCoffee')}
      />
    </View>
  );
};

export default CoffeeListView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  itemContainer: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 18,
  },
  emptyText: {
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 16,
  },
});