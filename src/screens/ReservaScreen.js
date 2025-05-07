import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
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
          <Text style={styles.name}>{especialista.nombresespecialista}{"\n"}{especialista.apellidosespecialista}</Text>
          <Text style={ styles.espec }>{especialista.especialidad || 'Psicología Clínica'}</Text>
        </View>
      </View>

      {/* Sección Detalles */}
      <Text style={styles.sectionTitle}>Detalles</Text>
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

      {/* Sección Forma de Pago */}
      <Text style={styles.sectionTitle}>Forma de Pago</Text>
      <View style={styles.paymentOption}>
        <TouchableOpacity onPress={() => setSelectedPayment('billetera terapia')} style={[styles.circle, selectedPayment === 'billetera terapia' && styles.checked]}>
          {selectedPayment === 'billetera terapia' && <View style={styles.innerCircle} />}
        </TouchableOpacity>
        <Text>Billetera Terapia</Text>
      </View>

      <View style={styles.paymentOption}>
        <TouchableOpacity onPress={() => setSelectedPayment('pagopar')} style={[styles.circle, selectedPayment === 'pagopar' && styles.checked]}>
          {selectedPayment === 'pagopar' && <View style={styles.innerCircle} />}
        </TouchableOpacity>
        <Text>Pago Par</Text>
      </View>

      <TouchableOpacity style={styles.addCardButton}>
        <Text style={styles.addCardText}>Agregar Tarjeta</Text>
      </TouchableOpacity>

      {/* Pie de Página */}
      <View style={styles.footer}>
        <TouchableOpacity 
                style={styles.bookButton} 
                onPress={handlePagar}
        >
        <Text style={styles.bookButtonText}>Pagar</Text>
        </TouchableOpacity>
      
      </View>
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
    marginBottom: 20 
  },
  image: { 
    width: 100,
    height: 100,
    borderRadius: 20, 
    marginRight: 15 
  },
  headerText: { 
    justifyContent: 'center' },
  name: { 
    fontSize: 20, 
    fontWeight: 'bold' },
    espec: {
      fontFamily: 'Roboto',
      fontSize: 12,
      fontStyle: 'normal',
      fontWeight: 400,
      lineHeight: 16,
      letterSpacing:0.4
    },
  sectionTitle: { 
    fontFamily:'Roboto',
    fontSize: 16, 
    fontWeight: 500, 
    fontStyle: 'normal',
    lineHeight: 24,
    letterSpacing: 0.15,
    color:'#5D5791'
  },
  card: {
    borderWidth: 1,
    borderColor: '#5D5791',
    borderRadius: 8, 
    backgroundColor: '#E4DFFF', 
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
  val:{
    fontFamily:'Roboto',
    fontSize:16,
    fontStyle:'normal',
    fontWeight:500,
    lineHeight: 24,
    letterSpacing: 0.15,
    color: '#5D5791'
  },
  paymentOption: { 
    flexDirection: 'row', 
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 5 
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#5D5791',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 7
  },
  innerCircle: {
    width: 16,
    height: 16,
    borderRadius: 7.5,
    backgroundColor: '#5D5791',
  },
  checked: {
    borderColor: '#5D5791',
  },
  addCardButton: { 
    borderColor: '#5D5791', 
    borderWidth: 1,
    padding: 15, 
    borderRadius: 50, 
    alignItems: 'center', 
    marginBottom: 20 
  },
  addCardText: { 
    fontFamily:'Roboto',
    color: '#5D5791', 
    fontSize: 16 
  },
  payButton: { 
    backgroundColor: '#5D5791', 
    padding: 15, 
    borderRadius: 8, 
    alignItems: 'center' 
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
  },
  bookButton: { 
    width:'90%',
    backgroundColor: '#5D5791',
    margin: 10, 
    padding:15,
    borderRadius:50  
  },
  bookButtonText: {
    textAlign: 'center', 
    color: '#FFFFFF', 
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    lineHeight: 20,
    letterSpacing:0.1 
  },
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
