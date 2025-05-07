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
          {especialista?.nombresespecialista}{"\n"}{especialista?.apellidosespecialista}
        </Text>
         <Text style={ styles.espec }>{especialista.especialidad || 'Psicología Clínica'}</Text>
      </View>

      {/* Descripción */}
      <Text style={styles.description}>La sala de espera virtual se habilitará
      5 minutos antes de la consulta</Text>

      {/* Información de la Cita */}
      <Text style={styles.sectionTitle}>Información de la Cita</Text>
      <View style={styles.card}>
        <Text style={styles.cardText}>Fecha: {horario?.fecha}</Text>
        <Text style={styles.cardText}>Hora: {horario?.hora}</Text>
        <Text style={styles.cardText}>Duración: {especialista?.experiencia} minutos</Text>
        <Text style={styles.cardText}>Precio: ${sesion.idreserva?.monto}</Text>
        <Text style={styles.cardText}>Modalidad: Online</Text>
        <Text style={styles.cardText}>Forma de Pago: {sesion.idreserva?.metodopago}</Text>
      </View>

      {/* Botón para entrar a la sesión */}
      <TouchableOpacity
        style={styles.enterButton}
        onPress={() => navigation.navigate('Final Sesión', {idsesion})}
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
    width: 100,
    height: 100,
    borderRadius: 20, 
    marginRight: 15 
  },
  therapistName: {
    fontSize: 16,
    fontWeight: 500,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    lineHeight: 24,
    letterSpacing: 0.15
  },
  espec: {
    fontFamily: 'Roboto',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: 16,
    letterSpacing:0.4,
    marginLeft: -115,
    marginTop: 80
  },
  description: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 20,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: 24,
    letterSpacing: 0.15,
    color: '#563A70'
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 500,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    lineHeight:24,
    letterSpacing: 0.15,
    marginBottom: 10,
    color: '#5D5791'
  },
  card: {
    backgroundColor: '#FCF8FF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderColor: '#E4DFFF',
    borderWidth: 1
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
    fontSize: 14,
    fontWeight: 500,
    fontFamily: 'Roboto',
    fontStyle:'normal',
    lineHeight: 20,
    letterSpacing: 0.1
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
    fontSize: 14,
    fontWeight: 500,
    fontFamily: 'Roboto',
    fontStyle:'normal',
    lineHeight: 20,
    letterSpacing: 0.1
  },
});

export default DetalleSesionScreen;
