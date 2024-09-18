import React from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import Order from '../models/Order';
import Coffee from '../models/Coffee';

interface OrderDetailProps {
  deleteOrder: (id: number) => void;
  navigation: any;
  route: any;
}

const OrderDetailView: React.FC<OrderDetailProps> = ({
  deleteOrder,
  navigation,
  route,
}) => {
  const { order } = route.params as { order: Order };

  const handleDeleteOrder = () => {
    deleteOrder(order.id);
    navigation.goBack();
  };

  const handleEditOrder = () => {
    navigation.navigate('EditOrder', { order });
  };

  const renderCoffeeItem = ({ item }: { item: Coffee }) => (
    <View style={styles.coffeeItem}>
      <Text style={styles.coffeeName}>{item.name}</Text>
      <Text style={styles.coffeePrice}>${item.price.toFixed(2)}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order ID: {order.id}</Text>
      <FlatList
        data={order.coffees}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderCoffeeItem}
      />
      <Text style={styles.totalPrice}>
        Total Price: ${order.getTotalPrice().toFixed(2)}
      </Text>
      <Button title="Edit Order" onPress={handleEditOrder} />
      <Button title="Delete Order" onPress={handleDeleteOrder} color="red" />
    </View>
  );
};

export default OrderDetailView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 12,
  },
  coffeeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  coffeeName: {
    fontSize: 18,
  },
  coffeePrice: {
    fontSize: 18,
  },
  totalPrice: {
    fontSize: 20,
    marginVertical: 12,
    fontWeight: 'bold',
  },
});
