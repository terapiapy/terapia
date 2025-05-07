import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import SvgLogo from '../../assets/logo.svg'; // Asegúrate de importar correctamente tu imagen SVG
import { AuthContext } from '../../context/AuthContext';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext); // Contexto de autenticación
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor, completa todos los campos');
      return;
    }

    setLoading(true);

    try {
      console.log('Iniciando login con:', email, password);
      const response = await fetch('https://apisterapia.onrender.com/api/usuarios/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        const { token, nombreusuario, apellido } = data;
        login(data); // Guarda los datos del usuario en el contexto
        console.log('Datos recibidos del servidor:', data);
        console.log(`Login exitoso: ${nombreusuario} ${apellido}`);
        Alert.alert(
          'Bienvenido',
          `Hola ${nombreusuario} ${apellido}, bienvenido a Terapia Online!`,
          [{ text: 'Continuar', onPress: () => navigation.replace('HomeTabs') }]
        );
      } else {
        console.error('Error en la autenticación:', data.error);
        Alert.alert('Error', data.error || 'Credenciales incorrectas');
      }
    } catch (error) {
      console.error('Error de red:', error);
      Alert.alert('Error', 'Ocurrió un problema con el servidor. Por favor, intenta más tarde.');
    } finally {
      setLoading(false);
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
          <Text style={styles.title}>Bienvenido</Text>
          <Text style={styles.parrafo}>Utiliza tus credenciales para iniciar sesión</Text>
          {/* Formulario de Login */}
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Correo electrónico"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>

          {/* Enlaces y botones */}
          <TouchableOpacity onPress={() => navigation.navigate('Olvide mi contraseña')}>
            <Text style={styles.link1}>Ólvide mi contraseña</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.boton} onPress={handleLogin} disabled={loading}>
            <Text style={styles.botonText}>{loading ? 'Iniciando...' : 'Iniciar Sesión'}</Text>
          </TouchableOpacity>


          <TouchableOpacity onPress={() => navigation.navigate('RegistroScreen')}>
            <Text style={styles.link2}>¿No tienes cuenta?  Regístrate</Text>
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
    flex: 1,
    width: '100%',
    marginTop:-140,
    padding:35,
    margin:10,
    justifyContent: 'center',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30
  },
  title: {
    textAlign: 'center',
    fontFamily:'Roboto',
    fontSize: 28,
    fontStyle:'normal',
    fontWeight: '400',
    lineHeight: 36,
    color: '#5D5791',
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
    marginBottom: 10,
    alignSelf: 'center',
    
  },
  input: {
    width: '95%',
    height: 45,
    borderColor: '#5D5791',
    borderWidth: 1,
    borderRadius: 2,
    paddingHorizontal: 10,
    marginTop:10,
    marginBottom: 10,
  },
  link1: {
    color: '#5D5791',
    textAlign: 'center',
    marginLeft: 100, 
    marginTop: -16,
    marginBottom:25,
    textDecorationLine: 'none',
  },
  link2: {
    color: '#5D5791',
    textAlign: 'center', 
    marginLeft:-15,
    marginTop:10,
    textDecorationLine: 'none',
  },
  boton: {
    backgroundColor: '#5D5791',
    padding: 10,
    marginRight:15,
    borderRadius: 20,
    alignSelf: 'center',
    width: '95%',
  },
  botonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default LoginScreen;
