import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { AuthContext } from '../../context/AuthContext';
const ReservaScreen = ({ route, navigation }) => {
  const { idEspecialista, idHorario } = route.params;
  const { user } = useContext(AuthContext); // Traes todo el objeto user
  const [especialista, setEspecialista] = useState(null);
  const [horario, setHorario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPayment, setSelectedPayment] = useState('');

  useEffect(() => {
    console.log('ID Especialista:', idEspecialista);
    console.log('ID Horario:', idHorario);
    
    const fetchData = async () => {
      try {
        // Obtener datos del especialista
        const resEspecialista = await fetch(`https://apisterapia.onrender.com/api/especialistas/porid/${idEspecialista}`);
        const dataEspecialista = await resEspecialista.json();
        console.log('Datos del especialista:', dataEspecialista);
        setEspecialista(dataEspecialista);
  
        // Obtener datos del horario
        const resHorario = await fetch(`https://apisterapia.onrender.com/api/horarios/${idHorario}`);
        const dataHorario = await resHorario.json();
        console.log('Datos del horario:', dataHorario);
        setHorario(dataHorario);
  
      } catch (error) {
        console.error('Error al cargar los datos:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [idEspecialista, idHorario]);
  
  const handlePagar = async () => {
    try {
      const reservaData = {
        idusuario:user?.id,
        idhorario: idHorario,
        idespecialista: idEspecialista,
        monto: especialista.precio,
        metodopago: selectedPayment,
      };
        console.log(reservaData);
      // Enviar la reserva al backend
      const response = await fetch('https://apisterapia.onrender.com/api/reservas/crear', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservaData),
      });

      const data = await response.json();
      if (data.success) {
        // Navegar a la pantalla de pago con la reserva
        navigation.navigate('Pago', { reserva: data.reserva });
      } else {
        alert('Hubo un error al realizar la reserva');
      }
    } catch (error) {
      console.error('Error al guardar la reserva:', error);
    }
  };
  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#5D5791" />
      </View>
    );
  }

  if (!especialista || !horario) {
    return (
      <View style={styles.errorContainer}>
        <Text style={{ color: 'red' }}>No se pudieron cargar los datos del especialista o el horario.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Cabecera */}
      <View style={styles.header}>
        <Image source={{ uri: especialista.foto }} style={styles.image} />
        <View style={styles.headerText}>
          <Text style={styles.name}>{especialista.nombresespecialista} {especialista.apellidosespecialista}</Text>
        </View>
      </View>

      {/* Sección Detalles */}
      <Text style={styles.sectionTitle}>Detalles</Text>
      <View style={styles.card}>
        <View style={styles.row}>
          <View style={styles.column}><Text style={styles.label}>Fecha</Text><Text>{horario.fecha}</Text></View>
          <View style={styles.column}><Text style={styles.label}>Hora</Text><Text>{horario.hora}</Text></View>
        </View>
        <View style={styles.row}>
          <View style={styles.column}><Text style={styles.label}>Duración</Text><Text>{especialista.experiencia}</Text></View>
          <View style={styles.column}><Text style={styles.label}>Precio</Text><Text>{especialista.precio}</Text></View>
        </View>
      </View>

      {/* Sección Forma de Pago */}
      <Text style={styles.sectionTitle}>Forma de Pago</Text>
      <View style={styles.paymentOption}>
        <Checkbox
          status={selectedPayment === 'billetera terapia' ? 'checked' : 'unchecked'}
          onPress={() => setSelectedPayment('billetera terapia')}
        />
        <Text>Billetera Terapia</Text>
      </View>
      <View style={styles.paymentOption}>
        <Checkbox
          status={selectedPayment === 'pagopar' ? 'checked' : 'unchecked'}
          onPress={() => setSelectedPayment('pagopar')}
        />
        <Text>Pago Par</Text>
      </View>
      <TouchableOpacity style={styles.addCardButton}>
        <Text style={styles.addCardText}>Agregar Tarjeta</Text>
      </TouchableOpacity>

      {/* Pie de Página */}
      <TouchableOpacity style={styles.payButton} onPress={handlePagar}>
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
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default ReservaScreen;
