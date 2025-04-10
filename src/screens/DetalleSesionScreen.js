import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const DetalleSesionScreen = ({ route, navigation }) => {
  // Obtener los datos de la sesión desde la navegación
  //const { therapistName, therapistImage, date, time, duration, price, modality, paymentMethod } = route.params;
  const esp= [{ id: '4', date: '2025-03-28', time: '08:00', duration: '1 hora', price: '50$', therapistName: 'Maria Carolina Pereira', therapistImage: require('../../assets/esp1.png'), paymentMethod: 'Tarjeta' }];
 
  return (
    <View style={styles.container}>
      {/* Cabecera */}
      <View style={styles.header}>
        <Image source={esp.therapistImage} style={styles.therapistImage} />
        <Text style={styles.therapistName}>{esp.therapistName}</Text>
      </View>

      {/* Descripción */}
      <Text style={styles.description}>Tu cita está programada. Revisa los detalles a continuación.</Text>

      {/* Información de la Cita */}
      <Text style={styles.sectionTitle}>Información de la Cita</Text>
      <View style={styles.card}>
        <Text style={styles.cardText}>📅 Fecha: {esp.date}</Text>
        <Text style={styles.cardText}>⏰ Hora: {esp.time}</Text>
        <Text style={styles.cardText}>⏳ Duración: {esp.duration}</Text>
        <Text style={styles.cardText}>💰 Precio: {esp.price}</Text>
        <Text style={styles.cardText}>🖥️ Modalidad: {esp.modality}</Text>
        <Text style={styles.cardText}>💳 Forma de Pago: {esp.paymentMethod}</Text>
      </View>

      {/* Botón para entrar a la sesión */}
      <TouchableOpacity style={styles.enterButton}  onPress={() => navigation.navigate('Final Sesión')}>
        <Text style={styles.enterButtonText}>Entrar</Text>
      </TouchableOpacity>

      {/* Botón para cancelar la cita */}
      <TouchableOpacity style={styles.cancelButton} onPress={() => alert('Cita Cancelada')}>
        <Text style={styles.cancelButtonText}>Cancelar Cita</Text>
      </TouchableOpacity>
    </View>
  );
};

// Estilos
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
  therapistImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  therapistName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  description: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 5,
  },
  enterButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  enterButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#d9534f',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default DetalleSesionScreen;
