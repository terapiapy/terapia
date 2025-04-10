import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CuentaScreen = ({navigation}) => {
  // Función para manejar la navegación
  const handlePress = (url) => {
    Linking.openURL(url).catch(err => console.error("No se pudo abrir la URL:", err));
  };

  return (
    <View style={styles.container}>
          <TouchableOpacity style={styles.button} onPress= {() =>navigation.navigate('Políticas de Privacidad')}>
              <Ionicons name="person-outline" size={20} color="black" />
              <Text style={styles.buttonText}>Políticas de Privacidad</Text>
              <Ionicons name="arrow-forward" size={20} color="black" />
            </TouchableOpacity>
      
            <TouchableOpacity style={styles.button } onPress= {() =>navigation.navigate('Términos y Condiciones')}>
              <Ionicons name="card" size={20} color="black" />
              <Text style={styles.buttonText}>Términos y servicios</Text>
              <Ionicons name="arrow-forward" size={20} color="black" />
            </TouchableOpacity>
      
            <TouchableOpacity style={styles.button} onPress= {() =>navigation.navigate('olvido')}>
              <Ionicons name="cash" size={20} color="black" />
              <Text style={styles.buttonText}>Cambiar Contraseña</Text>
              <Ionicons name="arrow-forward" size={20} color="black" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
              <Ionicons name="cash" size={20} color="black" />
              <Text style={styles.buttonText}>Eliminar</Text>
              <Ionicons name="arrow-forward" size={20} color="black" />
            </TouchableOpacity>
    </View>
  );
};

const OptionButton = ({ icon, text, url, color = '#333' }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={() => handlePress(url)}>
      <Ionicons name={icon} size={24} color={color} style={styles.icon} />
      <Text style={[styles.buttonText, { color }]}>{text}</Text>
      <Ionicons name="chevron-forward" size={24} color={color} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  icon: {
    marginRight: 15,
  },
  buttonText: {
    flex: 1,
    fontSize: 16,
  },
});

export default CuentaScreen;
