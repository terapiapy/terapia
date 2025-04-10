import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const FinalSesionScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Cabecera con ícono de reloj */}
      <View style={styles.header}>
        <Ionicons name="time-outline" size={60} color="#5D5791" />
        <Text style={styles.title}>Sesión Culminada</Text>
      </View>

      {/* Mensajes */}
      <Text style={styles.paragraph}>Gracias por completar tu sesión.</Text>
      <Text style={styles.paragraph}>Esperamos que haya sido de gran ayuda.</Text>

      {/* Tarjeta con información del especialista */}
      <View style={styles.card}>
        <Image source={require('../../assets/esp1.png')} style={styles.image} />
        <View style={styles.cardInfo}>
          <Text style={styles.name}>Maria Carolina Pereira</Text>
          <Text style={styles.specialty}>Psicóloga Clínica</Text>
        </View>
      </View>

      {/* Espacio en blanco */}
      <View style={{ flex: 1 }} />

      {/* Botones en el pie de la pantalla */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Detalle Sesión')}>
          <Text style={styles.buttonText}>Volver al inicio</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.reviewButton]} onPress={() => navigation.navigate('Reseña')}>
          <Text style={styles.buttonText}>Escribir reseña</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5D5791',
    marginTop: 10,
  },
  paragraph: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    padding: 10,
    marginVertical: 20,
    width: '100%',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 10,
  },
  cardInfo: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  specialty: {
    fontSize: 16,
    color: '#5D5791',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: '#5D5791',
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  reviewButton: {
    backgroundColor: '#FF914D',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default FinalSesionScreen;
