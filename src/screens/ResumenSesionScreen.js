import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ResumenSesionScreen = () => {
  return (
    <View style={styles.container}>
      {/* Cabecera con imagen y datos del especialista */}
      <View style={styles.header}>
        <Image source={require('../../assets/esp1.png')} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.name}>Maria Carolina Pereira</Text>
          <Text style={styles.specialty}>Psicología Clínica</Text>
          <Text style={styles.rating}>⭐⭐⭐⭐⭐ 4.8</Text>
        </View>
      </View>

      {/* Fecha y hora de la sesión */}
      <Text style={styles.sessionInfo}>Fecha: 10 de Abril de 2024</Text>
      <Text style={styles.sessionInfo}>Hora: 09:30 AM</Text>

      {/* Descripción */}
      <Text style={styles.description}>
        La sesión ha finalizado exitosamente. Esperamos que haya sido de gran ayuda.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  info: {
    marginLeft: 15,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  specialty: {
    fontSize: 16,
    color: '#555',
  },
  rating: {
    fontSize: 16,
    color: '#ffb400',
  },
  sessionInfo: {
    fontSize: 18,
    marginVertical: 5,
  },
  description: {
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center',
  },
});

export default ResumenSesionScreen;
