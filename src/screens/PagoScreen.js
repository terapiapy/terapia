import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PagoScreen = ({ navigation, route }) => {
  const { reserva } = route.params; // recibimos la reserva
  const [sesion, setSesion] = useState(null);

  // Crear sesión al cargar la pantalla
  useEffect(() => {
    const crearSesion = async () => {
      try {
        const response = await fetch('https://apisterapia.onrender.com/api/sesiones/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            idusuario: reserva.idusuario,
            idespecialista: reserva.idespecialista,
            idhorario: reserva.idhorario,
            idreserva: reserva._id,
          }),
        });

        const data = await response.json();
        if (response.ok) {
          console.log('✅ Sesión creada:', data.sesion);
  
          // Paso 2: Obtener la sesión con populate
          const sesionResponse = await fetch(`https://apisterapia.onrender.com/api/sesiones/${data.sesion._id}`);
          const sesionCompleta = await sesionResponse.json();
  
          console.log('📥 Sesión completa:', sesionCompleta);
  
          if (sesionResponse.ok) {
            setSesion(sesionCompleta); // guardamos la sesión con datos poblados
          } else {
            console.error('❌ Error al obtener sesión completa:', sesionCompleta.error);
          }
        } else {
          console.error('❌ Error al crear sesión:', data.error);
        }
      } catch (error) {
        console.error('🔥 Error en crearSesion:', error.message);
      }
      console.log(reserva);
    };

    crearSesion();
  }, [reserva]);
  const especialista = sesion?.idreserva?.idespecialista;
  const horario = sesion?.idreserva?.idhorario;
  const monto = sesion?.idreserva?.monto;
  if (!sesion) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Creando tu cita...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Cabecera */}
      <View style={styles.header}>
        <Ionicons name="checkmark-circle" size={90} color="#5D5791" />
        <Text style={styles.title}>Pago Exitoso</Text>
      </View>

      {/* Mensaje */}
      <Text style={styles.message}>Tu cita ha sido reservada con</Text>

      {/* Especialista */}
      <Text style={styles.therapistName}>
          Psic. {especialista?.nombresespecialista}{especialista?.apellidosespecialista}
      </Text>

      {/* Detalles de la cita */}
      <View style={styles.card}>
              <View style={styles.row}>
                <View style={styles.column}>
                  <View style={styles.iconLabel}>
                    <Ionicons name="calendar-outline" size={20} color="#5D5791" />
                    <Text style={styles.label}>Fecha</Text>
                  </View>
                  <Text style={styles.val}>{horario.fecha}</Text>
                </View>
                <View style={styles.column}>
                  <View style={styles.iconLabel}>
                    <Ionicons name="time-outline" size={20} color="#5D5791" />
                    <Text style={styles.label}>Hora</Text>
                  </View>
                  <Text style={styles.val}>{horario.hora} hs.</Text>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.column}>
                  <View style={styles.iconLabel}>
                    <Ionicons name="alarm-outline" size={20} color="#5D5791" />
                    <Text style={styles.label}>Duración</Text>
                  </View>
                  <Text style={styles.val}>{especialista.experiencia} min</Text>
                </View>
                <View style={styles.column}>
                  <View style={styles.iconLabel}>
                    <Ionicons name="cash" size={20} color="#5D5791" />
                    <Text style={styles.label}>Precio</Text>
                  </View>
                  <Text style={styles.val}>{especialista.precio}.000 Gs.</Text>
                </View>
              </View>
            </View>

      {/* Botones */}
      
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Volver</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.primaryButton]}
          onPress={() => navigation.navigate('Detalle Sesión', { idsesion: sesion._id })}
        >
          <Text style={styles.buttonText1}>Ver Cita</Text>
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
    backgroundColor: '#fff' 
  },
  header: { 
    alignItems: 'center', 
    marginBottom: 20 
  },
  title: 
  {
    marginTop:20,
    fontFamily:'Roboto', 
    fontSize: 28, 
    fontWeight: 400,
    fontStyle: 'normal',
    color: '#5D5791',
    lineHeight: 36 
  },
  message: { 
    fontFamily:'Roboto',
    fontSize: 16, 
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight:24,
    letterSpacing: 0.5,
    textAlign: 'center', 
    margin: 20,
    marginTop:-15 
  },
  therapistName: { 
    color: '#5D5791',
    fontFamily: 'Roboto',
    fontSize: 16, 
    fontWeight: 500,
    fontStyle: 'normal',
    lineHeight:24,
    letterSpacing:0.15, 
    margin: 2 
  },
  card: {
    borderWidth: 1,
    borderColor: '#5D5791',
    borderRadius: 8, 
    backgroundColor: '#ffffff', 
    padding: 15,
    borderRadius: 10, 
    marginBottom: 20,
    marginTop:10 
  },
  row: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 10 },
  column: { 
    width: '48%' },
  label: { 
    fontFamily: 'Roboto',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: 16,
    letterSpacing: 0.4 
  },
  iconLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5, // Espacio entre icono y texto
  },  
  spacer: { 
    height: 50 
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '115%',
    backgroundColor: '#F8F8F8',
    alignItems: 'center', 
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    flexDirection: 'row', // Organiza los botones en fila
    justifyContent: 'space-between', // Distribuye los botones con espacio entre ellos
  },
  button: {
    flex: 1, // Hace que los botones ocupen el mismo espacio
    paddingVertical: 15,
    borderRadius: 50,
    alignItems: 'center',
    borderColor:'#5D5791',
    borderWidth:1,
    backgroundColor: '#FFFFFF', // Color base
    marginHorizontal: 5, // Espacio entre los botones
  },
  primaryButton: {
    backgroundColor: '#5D5791', // Color diferente para botón principal
  },
  buttonText: {
    color: '#5D5791',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonText1: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PagoScreen;
