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
      <View style={styles.box}>
      <TouchableOpacity style={styles.button} onPress= {() =>navigation.navigate('Políticas de Privacidad')}>
              <Ionicons name="shield-checkmark" size={20} color="black" />
              <Text style={styles.buttonText}>Políticas de Privacidad</Text>
              <Ionicons name="play" size={20} color="black" />
            </TouchableOpacity>
      
            <TouchableOpacity style={styles.button } onPress= {() =>navigation.navigate('Términos y Condiciones')}>
              <Ionicons name="document-text" size={20} color="black" />
              <Text style={styles.buttonText}>Términos y servicios</Text>
              <Ionicons name="play" size={20} color="black" />
            </TouchableOpacity>
      
            <TouchableOpacity style={styles.button} onPress= {() =>navigation.navigate('olvido')}>
              <Ionicons name="pencil" size={20} color="black" />
              <Text style={styles.buttonText}>Cambiar Contraseña</Text>
              <Ionicons name="play" size={20} color="black" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
              <Ionicons name="trash" size={20} color="black" />
              <Text style={styles.buttonText}>Eliminar</Text>
              <Ionicons name="play" size={20} color="black" />
            </TouchableOpacity>
      </View>  
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
  box:{
    marginTop: 15
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
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

export default CuentaScreen;
