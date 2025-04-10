import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import SvgLogo from '../../assets/logo.svg';

const RegistroScreen = ({ navigation }) => {
  
  const [usuario, setUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  


  const registrarUsuario = async () => {
    if (!email || !password || !usuario) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    try {
      const response = await fetch('https://apisterapia.onrender.com/api/usuarios/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, nombreusuario: usuario }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Éxito', 'Usuario registrado con éxito');
        navigation.navigate('Código');
      } else {
        Alert.alert('Error', data.error || 'No se pudo registrar el usuario');
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un problema al conectar con el servidor');
    }
  };
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.logoTextContainer}>
            <SvgLogo style={styles.logov} />
            <Text style={styles.headerTexte}>erapia</Text>
          </View>
          <Text style={styles.headerTexto}>Online</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>Registro</Text>
          <Text style={styles.parrafo}>Completa los campos</Text>
          <View style={styles.form}>
          <TextInput
              style={styles.input}
              placeholder="Nombre de Usuario"
              value={usuario}
              onChangeText={setUsuario}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>
          <TouchableOpacity style={styles.boton} onPress={registrarUsuario}>
            <Text style={styles.botonText}>Continuar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={styles.link}>¿Tienes cuenta? Iniciar Sesión</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logoTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logov: {
    width: 74,
    height: 105,
    marginRight: 8,
  },
  headerTexte: {
    color: '#5D5791',
    fontSize: 36,
    fontWeight: 'bold',
  },
  headerTexto: {
    color: '#E4DFFF',
    fontSize: 24,
    fontWeight: '500',
  },
  content: {
    alignItems: 'center',
  },
  title: {
    color: '#1C1B20',
    fontSize: 28,
    fontWeight: '500',
  },
  parrafo: {
    color: '#78767A',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
  },
  form: {
    width: '100%',
    maxWidth: 300,
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
    backgroundColor: '#5D5791',
    padding: 10,
    borderRadius: 20,
    width: 199,
    height: 40,
    justifyContent: 'center',
  },
  botonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default RegistroScreen;
