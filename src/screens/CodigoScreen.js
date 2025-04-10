import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const CodigoScreen = ({ navigation }) => {
  const [code, setCode] = useState(['', '', '', '']);
  const inputs = useRef([]);

  const handleChange = (text, index) => {
    let newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    // Pasar al siguiente input automáticamente
    if (text && index < 3) {
      inputs.current[index + 1].focus();
    }
  };

  const handleVerify = () => {
    const enteredCode = code.join('');
    console.log('Código ingresado:', enteredCode);
    // Aquí puedes hacer la verificación del código
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ingresa el Código</Text>
      <Text style={styles.subtitle}>Coloca el código que le enviamos al correo proporcionado.</Text>

      <View style={styles.codeContainer}>
        {code.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.input}
            keyboardType="numeric"
            maxLength={1}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            ref={(ref) => (inputs.current[index] = ref)}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.boton} onPress= {() =>navigation.navigate('Completar')}>
        <Text style={styles.botonText}>Continuar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => console.log('Reenviar código')} style={styles.link}>
        <Text style={styles.linkText}>Reenviar código</Text>
      </TouchableOpacity>
    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1C1B20',
  },
  subtitle: {
    fontSize: 14,
    color: '#78767A',
    marginBottom: 20,
    textAlign: 'center',
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    marginBottom: 20,
  },
  input: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: '#5D5791',
    textAlign: 'center',
    fontSize: 24,
    borderRadius: 10,
  },
  boton: {
    backgroundColor: '#5D5791',
    padding: 10,
    borderRadius: 20,
    width: 150,
    alignItems: 'center',
    marginVertical: 10,
  },
  botonText: {
    color: '#fff',
    fontSize: 16,
  },
  link: {
    marginTop: 10,
  },
  linkText: {
    color: '#5D5791',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});

export default CodigoScreen;
