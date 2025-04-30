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
        <Text style={styles.title}>Pago Exitoso</Text>
        <Ionicons name="checkmark-circle" size={80} color="#5D5791" />
      </View>

      {/* Mensaje */}
      <Text style={styles.message}>Tu pago ha sido procesado con éxito.</Text>

      {/* Especialista */}
      <Text style={styles.therapistName}>
          Especialista:{"\n"} {especialista?.nombresespecialista} {especialista?.apellidosespecialista}
      </Text>

      {/* Detalles de la cita */}
      <View style={styles.card}>
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>Fecha:</Text>
            <Text style={styles.value}>{horario?.fecha}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>Hora:</Text>
            <Text style={styles.value}>{horario?.hora}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>Precio:</Text>
            <Text style={styles.value}>${monto}</Text>
          </View>
        </View>
      </View>

      {/* Botones */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Volver</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.primaryButton]}
          onPress={() => navigation.navigate('Detalle Sesión', { idsesion: sesion._id })}
        >
          <Text style={styles.buttonText}>Ver Cita</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: 20, backgroundColor: '#fff' },
  header: { alignItems: 'center', marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#5D5791' },
  message: { fontSize: 16, textAlign: 'center', marginVertical: 10 },
  therapistName: { fontSize: 20, fontWeight: 'bold', marginVertical: 10 },
  card: { width: '100%', padding: 20, backgroundColor: '#f8f8f8', borderRadius: 10, marginBottom: 20 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 },
  column: { width: '45%' },
  label: { fontSize: 16, fontWeight: 'bold' },
  value: { fontSize: 16, color: '#555' },
  spacer: { height: 50 },
  therapistName: { fontSize: 18, fontWeight: 'bold', textAlign: 'center',},
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
  button: { flex: 1, padding: 15, backgroundColor: '#ccc', borderRadius: 8, alignItems: 'center', marginHorizontal: 5 },
  primaryButton: { backgroundColor: '#5D5791' },
  buttonText: { fontSize: 16, color: '#fff', fontWeight: 'bold' },
});

export default PagoScreen;
