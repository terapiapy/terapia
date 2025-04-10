import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Checkbox } from 'react-native-paper';

const ReservaScreen = ({ route, navigation }) => {
  const [therapist, setTherapists] = useState([
      { id: '1', name: 'Maria Carolina', lastname: 'Pereira Colman', specialty: 'Psicóloga', price: '50$', rating: 4.5, image: require('../../assets/esp1.png') },
      { id: '2', name: 'Juan Pérez', lastname: 'González', specialty: 'Psicoterapeuta', price: '40$', rating: 4.2, image: require('../../assets/esp1.png') },
      { id: '3', name: 'Ana López', lastname: 'Gutiérrez', specialty: 'Psicóloga Clínica', price: '60$', rating: 4.8, image: require('../../assets/esp1.png') },
      { id: '4', name: 'Carlos Martínez', lastname: 'Rivas', specialty: 'Psiquiatra', price: '70$', rating: 4.3, image: require('../../assets/esp1.png') },
    ]);
  const [selectedPayment, setSelectedPayment] = useState(null);

 

  return (
    <View style={styles.container}>
      {/* Cabecera */}
      <View style={styles.header}>
        <Image source={{ uri: therapist.image }} style={styles.image} />
        <View style={styles.headerText}>
          <Text style={styles.name}>{therapist.name} {therapist.lastname}</Text>
        </View>
      </View>

      {/* Sección Detalles */}
      <Text style={styles.sectionTitle}>Detalles</Text>
      <View style={styles.card}>
        <View style={styles.row}>
          <View style={styles.column}><Text style={styles.label}>Fecha</Text><Text>{therapist.date}</Text></View>
          <View style={styles.column}><Text style={styles.label}>Hora</Text><Text>{therapist.time}</Text></View>
        </View>
        <View style={styles.row}>
          <View style={styles.column}><Text style={styles.label}>Duración</Text><Text>60 minutos</Text></View>
          <View style={styles.column}><Text style={styles.label}>Precio</Text><Text>{therapist.price}</Text></View>
        </View>
      </View>

      {/* Sección Forma de Pago */}
      <Text style={styles.sectionTitle}>Forma de Pago</Text>
      <View style={styles.paymentOption}>
        <Checkbox
          status={selectedPayment === 'billetera' ? 'checked' : 'unchecked'}
          onPress={() => setSelectedPayment('billetera')}
        />
        <Text>Billetera Terapia</Text>
      </View>
      <View style={styles.paymentOption}>
        <Checkbox
          status={selectedPayment === 'pagoPar' ? 'checked' : 'unchecked'}
          onPress={() => setSelectedPayment('pagoPar')}
        />
        <Text>Pago Par</Text>
      </View>
      <TouchableOpacity style={styles.addCardButton}>
        <Text style={styles.addCardText}>Agregar Tarjeta</Text>
      </TouchableOpacity>

      {/* Pie de Página */}
      <TouchableOpacity style={styles.payButton} onPress={() => navigation.navigate('Pago')}>
        <Text style={styles.payButtonText}>Pagar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20,
     backgroundColor: '#fff' },
  header: { 
    flexDirection: 'row', 
    marginBottom: 20 },
  image: { 
    width: 100,
    height: 100, 
    borderRadius: 50, 
    marginRight: 15 },
  headerText: { 
    justifyContent: 'center' },
  name: { 
    fontSize: 20, 
    fontWeight: 'bold' },
  sectionTitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginVertical: 10 },
  card: { 
    backgroundColor: '#f8f8f8', 
    padding: 15,
    borderRadius: 10, 
    marginBottom: 20 },
  row: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 10 },
  column: { 
    width: '48%' },
  label: { 
    fontWeight: 'bold' },
  paymentOption: { 
    flexDirection: 'row', 
    alignItems: 'center',
     marginBottom: 10 },
  addCardButton: { 
    backgroundColor: '#5D5791', 
    padding: 15, 
    borderRadius: 8, 
    alignItems: 'center', 
    marginBottom: 20 },
  addCardText: { 
    color: 'white', 
    fontSize: 16 },
  payButton: { 
    backgroundColor: '#5D5791', 
    padding: 15, 
    borderRadius: 8, 
    alignItems: 'center' },
  payButtonText: { 
    color: 'white', 
    fontSize: 18, 
    fontWeight: 'bold' },
});

export default ReservaScreen;
