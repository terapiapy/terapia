import React, { useState }  from 'react';
import { View, Text,TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import SvgLogo from '../../assets/logo.svg'; // Asegúrate de importar correctamente tu imagen SVG.

  const ResetearScreen = ({ navigation }) => {
  const [password, setPassword] = useState('');
  const [confirmarPassword, setConfirmarPassword] = useState('');
  
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
      <View style={styles.content}>
          <Text style={styles.title}>
            Nueva Contraseña
          </Text>
          <Text style={styles.parrafo}>
            Ingresa tu nueva contraseña
          </Text>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
             <TextInput
              style={styles.input}
              placeholder="Confirmar Contraseña"
              value={confirmarPassword}
              onChangeText={setConfirmarPassword}
            />
           
          </View>
          <TouchableOpacity style={styles.boton} onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={styles.botonText}>Cambiar</Text>
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
    width: '90%',
    height: 45,
    borderColor: '#5D5791',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    margin: 20,
    marginBottom:0
  },
  link: {
    color: '#5D5791',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  boton: {
    margin: 20,
    marginTop: 40,
    backgroundColor: '#5D5791',
    padding: 10,
    borderRadius: 20,
    width: '85%',
    height: 40,
  },
  botonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default ResetearScreen;
