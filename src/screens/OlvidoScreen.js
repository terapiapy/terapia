import React, { useState }  from 'react';
import { View, Text,TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SvgLogo from '../../assets/logo.svg'; // Asegúrate de importar correctamente tu imagen SVG.

const OlvidoScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const handleSendCode = async () => {
    try {
      const response = await fetch('https://apisterapia.onrender.com/api/usuarios/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('✅ Código enviado', 'Revisa tu correo electrónico.');
        navigation.navigate('Codigo de verificación', { email });
      } else {
        Alert.alert('❌ Error', data.error || 'No se pudo enviar el código.');
      }
    } catch (error) {
      console.error('Error al enviar código:', error);
      Alert.alert('❌ Error', 'Hubo un problema al enviar el código.');
    }
  };
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
      <View style={styles.content}>
          <Text style={styles.title}>
            Resetear contraseña 
          </Text>
          <Text style={styles.parrafo}>
            Ingresa tu correo electrónico
          </Text>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Correo eléctronico"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <TouchableOpacity style={styles.boton} onPress={() => navigation.navigate('Codigo de verificación', {email})}>
            <Text style={styles.botonText}>Enviar</Text>
          </TouchableOpacity>
      </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 375,
    height: 812,
    backgroundColor: '#FFF',
  },
  content: {
    margin:30,
    marginTop:40,
    width: 313
  },
  title: {
    color: '#5D5791',
    textAlign: 'center',
    fontFamily: 'Roboto',
    fontSize: 28,
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: 36
  },
  parrafo: {
    marginTop:35,
    marginBottom:30,
    color: '#787680',
    textAlign: 'center',
    fontFamily: 'Roboto',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: 20,
    letterSpacing: 0.25
  },
  form: {
    width: '100%',
    maxWidth: 300,
    marginBottom: 10,
  },
  input: {
    width: '90%',
    height: 45,
    borderColor: '#5D5791',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    margin: 20
  },
  link: {
    color: '#5D5791',
    textAlign: 'center',
    marginVertical: 8,
    textDecorationLine: 'underline',
  },
  boton: {
    marginTop:20,
    margin: 10,
    backgroundColor: '#5D5791',
    padding: 10,
    borderRadius: 20,
    width: '90%',
    height: 40,
  },
  botonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default OlvidoScreen;
