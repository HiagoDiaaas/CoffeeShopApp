import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import Coffee from '../models/Coffee';

interface AddCoffeeProps {
  addCoffee: (coffee: Coffee) => void;
  navigation: any;
}

const AddCoffeeView: React.FC<AddCoffeeProps> = ({ addCoffee, navigation }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const handleAddCoffee = () => {
    if (name.trim() === '' || price.trim() === '') {
      alert('Please enter a coffee name and price.');
      return;
    }

    const newCoffee = new Coffee(
      Date.now(),
      name,
      description,
      parseFloat(price)
    );
    addCoffee(newCoffee);
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
      <Button title="Add Coffee" onPress={handleAddCoffee} />
    </View>
  );
};

export default AddCoffeeView;

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

