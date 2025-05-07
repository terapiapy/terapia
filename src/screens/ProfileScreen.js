import React, {useContext} from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../../context/AuthContext';

const ProfileScreen = ({navigation}) => {
  const { user } = useContext(AuthContext); // Contexto del usuario

  return (
    <ScrollView style={styles.container}>
      {/* Cabecera */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Mi Perfil</Text>
      </View>

      {/* Foto de usuario y nombre */}
      <View style={styles.userInfo}>
        <Image source={user.foto ? { uri: user.foto } : require('../../assets/avatar.png')} style={styles.avatar} />
        <View style={styles.userDetails}>
          <Text style={styles.userName}>{user.nombre}{"\n"}{user.apellido}</Text>
        </View>
      </View>

      {/* Título "Cuenta" */}
      <Text style={styles.sectionTitle}>Cuenta</Text>

      {/* Botones de "Cuenta" */}
      <TouchableOpacity style={styles.button} onPress= {() =>navigation.navigate('Editar Perfil')}>
        <Ionicons name="person-outline" size={20} color="black" />
        <Text style={styles.buttonText}>Perfil</Text>
        <Ionicons name="play" size={20} color="black" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress= {() =>navigation.navigate('Mi Cuenta')}>
        <Ionicons name="card" size={20} color="black" />
        <Text style={styles.buttonText}>Mi cuenta</Text>
        <Ionicons name="play" size={20} color="black" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress= {() =>navigation.navigate('Métodos de Pago')}>
        <Ionicons name="cash" size={20} color="black" />
        <Text style={styles.buttonText}>Metodos de pagos</Text>
        <Ionicons name="play" size={20} color="black" />
      </TouchableOpacity>

      {/* Título "Aplicación" */}
      <Text style={styles.sectionTitle}>Aplicación</Text>

      {/* Botones de "Aplicación" */}
      <TouchableOpacity style={styles.button}>
        <Ionicons name="help-circle" size={20} color="black" />
        <Text style={styles.buttonText}>Centro de ayuda</Text>
        <Ionicons name="play" size={20} color="black" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress= {() =>navigation.navigate('LoginScreen')}>
        <Ionicons name="log-out" size={20} color="black" />
        <Text style={styles.buttonText}>Cerrar sesión</Text>
        <Ionicons name="play" size={20} color="black" />
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginTop: 10,
    marginBottom: 20
  },
  headerText: {
    fontSize: 32,
    fontWeight: 400,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    lineHeight: 40,
    color:'#5D5791'
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontFamily: 'Roboto',
    fontSize: 22,
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight:28
  },
  userEmail: {
    fontSize: 16,
    color: '#777',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 400,
    fontFamily: 'Roboto',
    lineHeight:24,
    letterSpacing: 0.5,
    marginTop: 20,
    marginBottom: 10,
    color: '#5D5791'
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: 24,
    letterSpacing: 0.5,
    marginLeft: 10,
    flex: 1,
  },
});

export default ProfileScreen;
