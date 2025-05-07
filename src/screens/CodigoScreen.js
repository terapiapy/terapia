import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const CodigoScreen = ({ navigation, route }) => {
  const [code, setCode] = useState(['', '', '', '']);
  const inputs = useRef([]);
  const {email} = route.params;

  const handleChange = (text, index) => {
    let newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    // Pasar al siguiente input automáticamente
    if (text && index < 3) {
      inputs.current[index + 1].focus();
    }
  };

    const handleVerify = async () => {
      try {
        const response = await fetch('https://apisterapia.onrender.com/api/usuarios/reset-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });
  
        const data = await response.json();
  
        if (response.ok && data.exists) {
          // Enviar código al correo
          await fetch('https://apisterapia.onrender.com/api/usuarios/verify-code', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
          });
  
          Alert.alert('✅ Código enviado', 'Revisa tu correo electrónico.');
          navigation.navigate('Mia Datos', { email });
        } else {
          Alert.alert('❌ Error', 'El correo no está registrado.');
        }
      } catch (error) {
        console.error('Error al verificar usuario:', error);
        Alert.alert('❌ Error', 'Hubo un problema al verificar el usuario.');
      }
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

      <TouchableOpacity style={styles.boton} onPress= {handleVerify}>
        <Text style={styles.botonText}>Continuar</Text>
      </TouchableOpacity>
    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    width: 375,
    height: 812,
    backgroundColor: '#FFF',
  },
  title: {
    marginTop:40,
    fontSize: 28,
    fontWeight: '400',
    fontFamily:'Roboto',
    fontStyle: 'normal',
    lineHeight: 36,
    textAlign:'center',
    color: '#5D5791',
  },
  subtitle: {
    width:'70%',
    margin:50,
    textAlign: 'center',
    fontFamily: 'Roboto',
    fontSize: 14,
    fontStyle:'normal',
    fontWeight: '400',
    lineHeight: 20,
    letterSpacing:0.25,
    color: '#787680',
    textAlign: 'center',
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '65%',
    margin: 50,
    marginTop:5
  },
  input: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: '#5D5791',
    textAlign: 'center',
    fontSize: 24,
    borderRadius: 5
  },
  boton: {
    backgroundColor: '#5D5791',
    padding: 10,
    marginTop: 0,
    margin:40,
    borderRadius: 20,
    width: '70%',
    alignItems: 'center'
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
