import React, { useState }  from 'react';
import { View, Text,TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SvgLogo from '../../assets/logo.svg'; // Asegúrate de importar correctamente tu imagen SVG.

const OlvidoScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
      <View style={styles.content}>
          <Text style={styles.title}>
            Resetear contraseña 
          </Text>
          <Text style={styles.parrafo}>
            Ingresa tu correo eléctronico
          </Text>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Correo eléctronico"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <TouchableOpacity style={styles.boton} onPress={() => navigation.navigate('Confirmar')}>
            <Text style={styles.botonText}>Guardar</Text>
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
  header: {
    alignItems: 'center', // ✅ Centra los elementos
    justifyContent: 'center',
    marginTop: 20,
  },
  logoTextContainer: {
    flexDirection: 'row', // ✅ Logo y "erapia" en la misma línea
    alignItems: 'center', // ✅ Alinear verticalmente
  },
  logov: {
    width: 74,
    height: 105,
    marginRight: 8, // ✅ Espacio entre logo y texto
  },
  headerTexte: {
    color: '#5D5791',
    fontFamily: 'eurofurence',
    fontSize: 36,
    fontWeight: 'bold',
  },
  headerTexto: {
    color: '#E4DFFF',
    fontFamily: 'Roboto',
    fontSize: 24,
    fontWeight: '500',
    marginTop: 4, // ✅ Espacio entre "erapia" y "Online"
  },
  content: {
    width: 313
  },
  title: {
    color: '#1C1B20',
    textAlign: 'center',
    fontFamily: 'Roboto',
    fontSize: 28,
    fontStyle: '500',
    fontWeight: 400,
    lineHeight: 36
  },
  parrafo: {
    color: '#78767A',
    textAlign: 'center',
    fontFamily: 'Roboto',
    fontSize: 14,
    fontStyle: '500',
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
    width: '100%',
    height: 45,
    borderColor: '#5D5791',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  link: {
    color: '#5D5791',
    textAlign: 'center',
    marginVertical: 8,
    textDecorationLine: 'underline',
  },
  boton: {
    margin: 60,
    backgroundColor: '#5D5791',
    padding: 10,
    borderRadius: 20,
    width: 199,
    height: 40,
  },
  botonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default OlvidoScreen;
