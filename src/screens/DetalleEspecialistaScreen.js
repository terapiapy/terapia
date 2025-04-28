import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Button, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const DetalleEspecialistaScreen = ({ route, navigation }) => {
  const { idEspecialista } = route.params;
  const [therapist, setTherapist] = useState(null);
  const [horarios, setHorarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedHorario, setSelectedHorario] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Datos del especialista
        const resEspecialista = await fetch(`https://apisterapia.onrender.com/api/especialistas/porid/${idEspecialista}`);
        const dataEspecialista = await resEspecialista.json();
        console.log('Datos de Especialista:', dataEspecialista); 
        setTherapist(dataEspecialista);

        // Horarios disponibles
        const resHorarios = await fetch(`https://apisterapia.onrender.com/api/horarios/especialista/${idEspecialista}`);
        const dataHorarios = await resHorarios.json();
        console.log('Datos de Horarios:', dataHorarios); // Aquí imprimimos los horarios
        setHorarios(dataHorarios);
      } catch (error) {
        console.error('Error al cargar los datos:', error);
        
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [idEspecialista]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#5D5791" />
      </View>
    );
  }

  if (!therapist) {
    return (
      <View style={styles.errorContainer}>
        <Text style={{ color: 'red' }}>No se pudo cargar el especialista.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        {/* Cabecera */}
        <View style={styles.header}>
          <Image source={{ uri: therapist.foto }} style={styles.headerImage} />
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerName}>{therapist.nombresespecialista} {therapist.apellidosespecialista}</Text>
          </View>
        </View>

        {/* Cards */}
        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Precio</Text>
            <Text style={styles.cardValue}>Gs.{therapist.precio || 'N/A'}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Duración</Text>
            <Text style={styles.cardValue}>{therapist.experiencia || '60'} minutos</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Puntuación</Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.cardValue}>{therapist.puntuacion || '4.5'}</Text>
              <Ionicons name="star" size={20} color="#FFD700" />
            </View>
          </View>
        </View>

        {/* Especialidades */}
        <Text style={styles.sectionTitle}>Especialidades</Text>
        <Text style={{ paddingHorizontal: 20 }}>{therapist.especialidad || 'Psicología Clínica'}</Text>

        {/* Biografía */}
        <Text style={styles.sectionTitle}>Biografía</Text>
        <Text style={styles.bio}>{therapist.biografia || 'Sin descripción disponible.'}</Text>

        {/* Fechas disponibles dinámicas */}
        <View style={styles.availableDatesContainer}>
          <Text style={styles.sectionTitle}>Fechas disponibles</Text>
          <View style={styles.dateItem}>
            <TouchableOpacity onPress={() => navigation.navigate('Horario')}>
              <Text style={styles.viewAll}>Ver todo</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.buttonsContainer}>
          {horarios.map((item, index) => (
            <View key={index} style={{ marginBottom: 10 }}>
              <Button
                title={`${item.dia} ${item.fecha.slice(0, 2)}`}
                onPress={() => setSelectedHorario(item)}
              />
              <Button
                title={`${item.hora}`}
                onPress={() => setSelectedHorario(item)}
                color="#5D5791" // Puedes cambiar el color para diferenciar
              />
            </View>
          ))}
        </View>

        
      </ScrollView>

      {/* Pie de página */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.bookButton} 
          onPress={() => {
            if (selectedHorario) {
              navigation.navigate('Reserva', { 
                idEspecialista,
                idHorario: selectedHorario._id
              });
            } else {
              alert('Por favor selecciona un horario primero.');
            }
          }}
        >
          <Text style={styles.bookButtonText}>Agendar cita</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
};

// ESTILOS
const styles = StyleSheet.create({
  container: { 
    flex: 1 },
  header: { 
    flexDirection: 'row', 
    padding: 20 },
  headerImage: { 
    width: 100,
    height: 100,
    borderRadius: 50, 
    marginRight: 15 },
  headerTextContainer: { 
    justifyContent: 'center' },
  headerName: { 
    fontSize: 24, 
    fontWeight: 'bold' },
  cardContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    paddingHorizontal: 20 },
  card: { 
    backgroundColor: '#fff', 
    padding: 10, 
    borderRadius: 8, 
    width: '30%', 
    alignItems: 'center' },
  cardTitle: { 
    fontSize: 16, 
    color: '#333' },
  cardValue: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#5D5791' },
  ratingContainer: { flexDirection: 'row', alignItems: 'center' },
  sectionTitle: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    marginVertical: 10, 
    paddingHorizontal: 20 },
  slider: { 
    height: 150, 
    marginHorizontal: 20 },
  bio: { 
    fontSize: 16, 
    textAlign: 'justify', 
    paddingHorizontal: 20, 
    marginBottom: 20 },
  availableDatesContainer: { 
    paddingHorizontal: 20 },
  dateItem: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 10 },
  dateText: { 
    fontSize: 16 },
  viewAll: { 
    color: '#5D5791' },
  buttonsContainer: { 
    paddingHorizontal: 20, 
    marginBottom: 20 },
  timeSlotsContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    paddingHorizontal: 20, 
    marginBottom: 20 },
  timeSlot: { 
    backgroundColor: '#5D5791', 
    padding: 10, 
    borderRadius: 8 },
  timeSlotText: { 
    color: 'white' },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#F8F8F8',
    padding: 20,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  bookButton: { 
    backgroundColor: '#5D5791',
     paddingVertical: 15,
      paddingHorizontal: 30,
       borderRadius: 8 },
  bookButtonText: { 
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

export default DetalleEspecialistaScreen;
