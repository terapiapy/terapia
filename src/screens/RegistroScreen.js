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
        navigation.navigate('Código',{email});
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
              placeholder="Nombre"
              value={usuario}
              onChangeText={setUsuario}
            />
            <TextInput
              style={styles.input}
              placeholder="Correo electrónico"
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
            <Text style={styles.link}>¿Tienes cuenta?  Iniciar Sesión</Text>
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
    margin: 30
  },
  logoTextContainer: {
    marginTop:35,
    flexDirection: 'row', // ✅ Logo y "erapia" en la misma línea
    alignItems: 'center', // ✅ Alinear verticalmente
  },
  logov: {
    width: 74,
    height: 105,
    marginRight: -15, // ✅ Espacio entre logo y texto
  },
  headerTexte: {
    marginTop:-15,
    color: '#5D5791',
    fontFamily: 'eurofurence',
    fontSize: 46,
    fontWeight: '500',
    fontStyle:'normal',
  },
  headerTexto: {
    color: '#E4DFFF',
    fontFamily: 'Roboto',
    fontSize: 24,
    fontWeight: '500',
    marginTop: -35, // ✅ Espacio entre "erapia" y "Online"
    marginLeft:125
  },
  content: {
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontFamily:'Roboto',
    fontSize: 28,
    fontStyle:'normal',
    fontWeight: '400',
    lineHeight: 36,
    color: '#5D5791'
  },
  parrafo: {
    width:'80%',
    marginTop:30,
    marginBottom:30,
    marginLeft:20,
    textAlign: 'center',
    fontFamily:'Roboto',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 20,
    letterSpacing: 0.25,
    color: '#78767A'
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
    marginBottom: 20,
  },
  link: {
    color: '#5D5791',
    textAlign: 'center',
    marginTop:15,
    textDecorationLine: 'none',
  },
  boton: {
    backgroundColor: '#5D5791',
    marginTop:20,
    padding: 10,
    borderRadius: 20,
    width: '80%',
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
