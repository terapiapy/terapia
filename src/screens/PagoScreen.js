import React, {useState} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PagoScreen = ({ navigation, route }) => {
  //const { therapist, date, time, duration, price } = route.params;
  const [therapist, setTherapists] = useState([
        { id: '1', date: '03/10/2024', duration: '1 hora', time: '09:30', name: 'Maria Carolina', lastname: 'Pereira Colman', specialty: 'Psicóloga', price: '50$', rating: 4.5, image: require('../../assets/esp1.png') },
        { id: '2', date: '03/10/2024', duration: '1 hora', time: '09:30', name: 'Juan Pérez', lastname: 'González', specialty: 'Psicoterapeuta', price: '40$', rating: 4.2, image: require('../../assets/esp1.png') },
        { id: '3', date: '03/10/2024', duration: '1 hora', time: '09:30', name: 'Ana López', lastname: 'Gutiérrez', specialty: 'Psicóloga Clínica', price: '60$', rating: 4.8, image: require('../../assets/esp1.png') },
        { id: '4', date: '03/10/2024', duration: '1 hora', time: '09:30', name: 'Carlos Martínez', lastname: 'Rivas', specialty: 'Psiquiatra', price: '70$', rating: 4.3, image: require('../../assets/esp1.png') },
      ]);
  return (
    <View style={styles.container}>
      {/* Cabecera */}
      <View style={styles.header}>
        <Text style={styles.title}>Pago Exitoso</Text>
        <Ionicons name="checkmark-circle" size={80} color="green" />
      </View>
      
      {/* Mensaje */}
      <Text style={styles.message}>Tu pago ha sido procesado con éxito.</Text>

      {/* Especialista */}
      <Text style={styles.therapistName}>{therapist.name} {therapist.lastname}</Text>

      {/* Detalles de la cita */}
      <View style={styles.card}>
        <View style={styles.row}>
          <View style={styles.column}><Text style={styles.label}>Fecha:</Text><Text style={styles.value}>{therapist.date}</Text></View>
          <View style={styles.column}><Text style={styles.label}>Hora:</Text><Text style={styles.value}>{therapist.time}</Text></View>
        </View>
        <View style={styles.row}>
          <View style={styles.column}><Text style={styles.label}>Duración:</Text><Text style={styles.value}>{therapist.duration}</Text></View>
          <View style={styles.column}><Text style={styles.label}>Precio:</Text><Text style={styles.value}>{therapist.price}</Text></View>
        </View>
      </View>

      {/* Espacio en blanco */}
      <View style={styles.spacer} />

      {/* Botones */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Volver</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.primaryButton]} onPress={() => navigation.navigate('')}>
          <Text style={styles.buttonText}>Ver Cita</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: 20, backgroundColor: '#fff' },
  header: { alignItems: 'center', marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: 'green' },
  message: { fontSize: 16, textAlign: 'center', marginVertical: 10 },
  therapistName: { fontSize: 20, fontWeight: 'bold', marginVertical: 10 },
  card: { width: '100%', padding: 20, backgroundColor: '#f8f8f8', borderRadius: 10, marginBottom: 20 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 },
  column: { width: '45%' },
  label: { fontSize: 16, fontWeight: 'bold' },
  value: { fontSize: 16, color: '#555' },
  spacer: { height: 50 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
  button: { flex: 1, padding: 15, backgroundColor: '#ccc', borderRadius: 8, alignItems: 'center', marginHorizontal: 5 },
  primaryButton: { backgroundColor: 'green' },
  buttonText: { fontSize: 16, color: '#fff', fontWeight: 'bold' },
});

export default PagoScreen;
