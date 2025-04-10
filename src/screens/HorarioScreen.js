import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
//import DateTimePicker from 'react-native-material-datetime-picker';

const HorarioScreen = ({ route, navigation }) => {
  const [therapist, setTherapists] = useState([
      { id: '1', name: 'Maria Carolina', lastname: 'Pereira Colman', specialty: 'Psicóloga', price: '50$', rating: 4.5, image: require('../../assets/esp1.png') },
      { id: '2', name: 'Juan Pérez', lastname: 'González', specialty: 'Psicoterapeuta', price: '40$', rating: 4.2, image: require('../../assets/esp1.png') },
      { id: '3', name: 'Ana López', lastname: 'Gutiérrez', specialty: 'Psicóloga Clínica', price: '60$', rating: 4.8, image: require('../../assets/esp1.png') },
      { id: '4', name: 'Carlos Martínez', lastname: 'Rivas', specialty: 'Psiquiatra', price: '70$', rating: 4.3, image: require('../../assets/esp1.png') },
    ]);
  const availableHours = ['10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM'];

  return (
    <View style={styles.container}>
      {/* Cabecera */}
      <View style={styles.header}>
        <Image source={therapist.image} style={styles.profileImage} />
        <View style={styles.headerInfo}>
          <Text style={styles.name}>{therapist.name} {therapist.lastname}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>{therapist.rating}</Text>
            <Ionicons name="star" size={20} color="#FFD700" />
          </View>
        </View>
      </View>

      

      {/* Sección de Horas */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Selecciona una hora</Text>
        <View style={styles.hoursContainer}>
          {availableHours.map((hour, index) => (
            <TouchableOpacity key={index} style={styles.hourBox}>
              <Text style={styles.hourText}>{hour}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Botón de Agendar Cita */}
      <TouchableOpacity style={styles.bookButton} onPress={() => navigation.navigate('Pago')}>
        <Text style={styles.bookButtonText}>Agendar cita</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F8F8F8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  headerInfo: {
    marginLeft: 15,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  rating: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 5,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  calendarButton: {
    backgroundColor: '#5D5791',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  calendarText: {
    color: 'white',
    fontSize: 16,
  },
  hoursContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  hourBox: {
    backgroundColor: '#5D5791',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    width: '30%',
    alignItems: 'center',
  },
  hourText: {
    color: 'white',
    fontSize: 16,
  },
  bookButton: {
    backgroundColor: '#5D5791',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  bookButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HorarioScreen;
