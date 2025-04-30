import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';

const DetalleSesionScreen = ({ route, navigation }) => {
  const { idsesion } = route.params;
  const [sesion, setSesion] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSesion = async () => {
      try {
        const response = await fetch(`https://apisterapia.onrender.com/api/sesiones/${idsesion}`);
        const data = await response.json();
        if (response.ok) {
          setSesion(data);
        } else {
          console.error('Error al obtener la sesión:', data.error);
        }
      } catch (error) {
        console.error('Error de red:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSesion();
  }, [idsesion]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="green" />
        <Text>Cargando detalles de la sesión...</Text>
      </View>
    );
  }

  if (!sesion) {
    return (
      <View style={styles.container}>
        <Text style={{ color: 'red' }}>No se pudo cargar la información de la sesión.</Text>
      </View>
    );
  }

  const especialista = sesion.idreserva?.idespecialista;
  const horario = sesion.idreserva?.idhorario;
  const usuario = sesion.idreserva?.idusuario;

  return (
    <View style={styles.container}>
      {/* Cabecera */}
      <View style={styles.header}>
        <Image
          source={
            especialista?.foto
              ? { uri: especialista.foto }
              : require('../../assets/avatar1.png')
          }
          style={styles.therapistImage}
        />
        <Text style={styles.therapistName}>
          {especialista?.nombresespecialista} {"\n"}{especialista?.apellidosespecialista}
        </Text>
      </View>

      {/* Descripción */}
      <Text style={styles.description}>Tu cita está programada. Revisa los detalles a continuación.</Text>

      {/* Información de la Cita */}
      <Text style={styles.sectionTitle}>Información de la Cita</Text>
      <View style={styles.card}>
        <Text style={styles.cardText}>📅 Fecha: {horario?.fecha}</Text>
        <Text style={styles.cardText}>⏰ Hora: {horario?.hora}</Text>
        <Text style={styles.cardText}>⏳ Duración: 1 hora</Text>
        <Text style={styles.cardText}>💰 Precio: ${sesion.idreserva?.monto}</Text>
        <Text style={styles.cardText}>🖥️ Modalidad: Online</Text>
        <Text style={styles.cardText}>💳 Forma de Pago: {sesion.idreserva?.metodopago}</Text>
      </View>

      {/* Botón para entrar a la sesión */}
      <TouchableOpacity
        style={styles.enterButton}
        onPress={() => navigation.navigate('Final Sesión')}
      >
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
    backgroundColor: '#5D5791',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 20,
  },
  enterButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#FCF8FF',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    borderColor:'#5D5791',
    borderWidth: 1,  
  },
  cancelButtonText: {
    color: '#5D5791',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default DetalleSesionScreen;
