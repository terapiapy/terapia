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
            <Text style={styles.headerName}>{therapist.nombresespecialista} {"\n"}{therapist.apellidosespecialista}</Text>
            <Text style={styles.cardSpecialty}>{therapist.especialidad}</Text>
          </View>
        </View>

        {/* Cards */}
        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Precio</Text>
            <Text style={styles.cardValue}>Gs.{therapist.precio || 'N/A'}.000</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Duración</Text>
            <Text style={styles.cardValue}>{therapist.experiencia || '60'} min.</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Rating</Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.cardValue}>{`${therapist.rating || '4.5'}/5`}</Text>
              <Ionicons name="star" size={16} color="#FFD700" marginLeft="-13" />
            </View>
          </View>
        </View>

        {/* Especialidades */}
        <Text style={styles.sectionTitle}>Especialidades</Text>
        <Text style={ styles.espec }>{therapist.especialidad || 'Psicología Clínica'}</Text>

        {/* Biografía */}
        <Text style={styles.sectionTitle}>Biografía</Text>
        <Text style={styles.bio}>{therapist.biografia || 'Sin descripción disponible.'}</Text>

        {/* Fechas disponibles dinámicas */}
        <View style={styles.availableDatesContainer}>
          <Text style={styles.sectionFecha}>Fechas disponibles</Text>
          <View style={styles.dateItem}>
            <TouchableOpacity onPress={() => navigation.navigate('Horario')}>
              <Text style={styles.viewAll}></Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.buttonsContainer}>
          {horarios.map((item, index) => {
            const isSelected = selectedHorario?._id === item._id;

            return (
              <View key={index} style={styles.timeSlotsContainer}>
                <TouchableOpacity
                  style={[styles.timeSlot, isSelected && styles.selectedSlot]}
                  onPress={() => setSelectedHorario(item)}
                >
                  <Text style={[styles.dayText, isSelected && styles.selectedText]}>{item.dia}</Text>
                  <Text style={[styles.dateText, isSelected && styles.selectedText]}>{item.fecha.slice(0, 2)}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.timeSlot, isSelected && styles.selectedSlot]}
                  onPress={() => setSelectedHorario(item)}
                >
                  <Text style={[styles.timeSlotText, isSelected && styles.selectedText]}>{`${item.hora}`}</Text>
                </TouchableOpacity>
              </View>
            );
          })}
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
    borderRadius: 20, 
    marginRight: 15 
  },
  headerTextContainer: { 
    justifyContent: 'center' 
  },
  headerName: { 
    fontSize: 16, 
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    lineHeight: 24,
    letterSpacing: 0.15,
    fontWeight: '500' 
  },
  cardContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    paddingHorizontal: 20 
  },
  card: { 
    backgroundColor: '#fcf8ff', 
    padding: 10, 
    borderRadius: 8, 
    width: '30%',
    height: '100%', 
    alignItems: 'center' },
  cardTitle: { 
    fontSize: 11,
    fontFamily: 'Roboto',
    fontStyle:'normal',
    fontWeight: 500,
    lineHeight:16,
    letterSpacing: 0.5, 
    color: '#787680',
    textAlign: 'center' 
  },
  cardValue: { 
    width: '100%',
    fontFamily: 'Roboto',
    fontSize: 14, 
    fontStyle: 'normal',
    fontWeight: 600,
    lineHeight:16,
    letterSpacing: 0.1, 
    color: '#5D5791',
    textAlign: 'center'
  },
  cardSpecialty:{
    fontFamily: 'Roboto',
    fontSize:12,
    fontStyle: 'normal',
    fontWeight: 600,
    lineHeight:16,
    letterSpacing:0.5
  },
  ratingContainer: { 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  sectionTitle: { 
    fontSize: 12, 
    fontWeight: '400',
    fontFamily: 'Roboto',
    lineHeight: 16,
    letterSpacing: 0.4, 
    marginVertical: 10,
    color: '#787680', 
    paddingHorizontal: 20 
  },
  espec: {
    width:'60%',
    textAlign: 'center',
    borderRadius: 8,
    borderColor: '#47464F',
    borderWidth:1,
    padding: 3,
    marginLeft:20,
    fontFamily: 'Roboto',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: 16,
    letterSpacing:0.4
  },
  bio: { 
    fontSize: 16,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: 24,
    letterSpacing: 0.5, 
    textAlign: 'justify', 
    paddingHorizontal: 20, 
    marginBottom: 20 
  },
  availableDatesContainer: { 
    paddingHorizontal: 20 
  },
  dateItem: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 10 
  },
  sectionFecha: { 
    fontSize: 16, 
    fontWeight: '400',
    fontFamily: 'Roboto',
    lineHeight: 16,
    letterSpacing: 0.4, 
    color: '#5D5791'
  },
  dateText: { 
    fontSize: 16 
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
    marginTop:-20
  },
  timeSlotsContainer: {
    margin: 5,
    alignItems: 'center',
  },
  timeSlot: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 5,
    backgroundColor: '#fff',
    minWidth: 70,
    alignItems: 'center',
  },
  timeSlotText: {
    fontSize: 14,
    color: '#333',
  },
  selectedSlot: {
    backgroundColor: '#E4DFFF',
    borderColor: '#47464F',
  },
  selectedText: {
    color: '#000',
  },
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
    width:'100%',
    backgroundColor: '#5D5791',
    paddingVertical: 15,
    paddingHorizontal: 30,
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

export default DetalleEspecialistaScreen;
