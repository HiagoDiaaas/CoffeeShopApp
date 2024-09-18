import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import Coffee from '../models/Coffee';

interface EditCoffeeProps {
  updateCoffee: (coffee: Coffee) => void;
  navigation: any;
  route: any;
}

const EditCoffeeView: React.FC<EditCoffeeProps> = ({
  updateCoffee,
  navigation,
  route,
}) => {
  const { coffee } = route.params;
  const [name, setName] = useState(coffee.name);
  const [description, setDescription] = useState(coffee.description);
  const [price, setPrice] = useState(coffee.price.toString());

  const handleUpdateCoffee = () => {
    if (name.trim() === '' || price.trim() === '') {
      alert('Please enter a coffee name and price.');
      return;
    }

    const updatedCoffee = new Coffee(
      coffee.id,
      name,
      description,
      parseFloat(price)
    );
    updateCoffee(updatedCoffee);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Coffee Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
        multiline
        numberOfLines={4}
      />
      <TextInput
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        style={styles.input}
        keyboardType="decimal-pad"
      />
      <Button title="Update Coffee" onPress={handleUpdateCoffee} />
    </View>
  );
};

export default EditCoffeeView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 12,
    borderRadius: 4,
  },
});

function alert(arg0: string) {
    throw new Error('Function not implemented.');
}
