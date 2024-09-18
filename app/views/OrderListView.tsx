import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Button, StyleSheet } from 'react-native';
import Order from '../models/Order';

interface OrderListProps {
  orders: Order[];
  navigation: any;
}

const OrderListView: React.FC<OrderListProps> = ({ orders, navigation }) => {
  const renderItem = ({ item }: { item: Order }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate('OrderDetail', { order: item })}
    >
      <Text style={styles.itemText}>Order ID: {item.id}</Text>
      <Text style={styles.itemText}>
        Total Price: ${item.getTotalPrice().toFixed(2)}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {orders.length === 0 ? (
        <Text style={styles.emptyText}>No orders available. Add some!</Text>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      )}
      <Button
        title="Add Order"
        onPress={() => navigation.navigate('AddOrder')}
      />
    </View>
  );
};

export default OrderListView;

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
