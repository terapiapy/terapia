import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MultiSelect } from 'react-native-element-dropdown';

const MetodoPagoScreen = () => {
  const [selectedItems, setSelectedItems] = useState([]);

  const options = [
    { label: 'Opción 1', value: '1' },
    { label: 'Opción 2', value: '2' },
    { label: 'Opción 3', value: '3' },
    { label: 'Opción 4', value: '4' },
    { label: 'Opción 5', value: '5' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecciona varias opciones</Text>

      <MultiSelect
        data={options}
        labelField="label"
        valueField="value"
        placeholder="Selecciona opciones"
        value={selectedItems}
        onChange={setSelectedItems}
        selectedStyle={styles.selectedStyle}
      />

      <TouchableOpacity style={styles.button} onPress={() => console.log('Valores seleccionados:', selectedItems)}>
        <Text style={styles.buttonText}>Confirmar Selección</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  selectedStyle: {
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
    padding: 5,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#5D5791',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default MetodoPagoScreen;
