import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ProfileScreen = ({navigation}) => {
  return (
    <ScrollView style={styles.container}>
      {/* Cabecera */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Perfil</Text>
      </View>

      {/* Foto de usuario y nombre */}
      <View style={styles.userInfo}>
        <Image source={require('../../assets/avatar.png')} style={styles.avatar} />
        <View style={styles.userDetails}>
          <Text style={styles.userName}>Juan Pérez</Text>
          <Text style={styles.userEmail}>juan.perez@example.com</Text>
        </View>
      </View>

      {/* Título "Cuenta" */}
      <Text style={styles.sectionTitle}>Cuenta</Text>

      {/* Botones de "Cuenta" */}
      <TouchableOpacity style={styles.button} onPress= {() =>navigation.navigate('Editar Perfil')}>
        <Ionicons name="person-outline" size={20} color="black" />
        <Text style={styles.buttonText}>Perfil</Text>
        <Ionicons name="arrow-forward" size={20} color="black" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress= {() =>navigation.navigate('Mi Cuenta')}>
        <Ionicons name="card" size={20} color="black" />
        <Text style={styles.buttonText}>Mi cuenta</Text>
        <Ionicons name="arrow-forward" size={20} color="black" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress= {() =>navigation.navigate('Métodos de Pago')}>
        <Ionicons name="cash" size={20} color="black" />
        <Text style={styles.buttonText}>Metodos de pagos</Text>
        <Ionicons name="arrow-forward" size={20} color="black" />
      </TouchableOpacity>

      {/* Título "Aplicación" */}
      <Text style={styles.sectionTitle}>Aplicación</Text>

      {/* Botones de "Aplicación" */}
      <TouchableOpacity style={styles.button}>
        <Ionicons name="help-circle" size={20} color="black" />
        <Text style={styles.buttonText}>Centro de ayuda</Text>
        <Ionicons name="arrow-forward" size={20} color="black" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress= {() =>navigation.navigate('LoginScreen')}>
        <Ionicons name="log-out" size={20} color="black" />
        <Text style={styles.buttonText}>Cerrar sesión</Text>
        <Ionicons name="arrow-forward" size={20} color="black" />
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
    marginBottom: 20,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
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
    fontSize: 22,
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize: 16,
    color: '#777',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
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
    fontSize: 18,
    marginLeft: 10,
    flex: 1,
  },
});

export default ProfileScreen;
