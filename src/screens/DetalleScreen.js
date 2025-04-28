import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import TabNavigator from '../../TabNavigator'; // Asegúrate de que la ruta sea correcta

const DetalleScreen = ({ route }) => {
  const { therapyId } = route.params; // Recibe el ID de la terapia desde HomeScreen
  const [therapy, setTherapy] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTherapyDetails = async () => {
      try {
        const response = await fetch(`https://apisterapia.onrender.com/api/tipoterapias/${therapyId}`);
        const data = await response.json();
        setTherapy(data);
      } catch (error) {
        console.error('Error al obtener detalles de la terapia:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTherapyDetails();
  }, [therapyId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#5D5791" />
        <Text>Cargando detalles...</Text>
      </View>
    );
  }

  if (!therapy) {
    return (
      <View style={styles.loadingContainer}>
        <Text>No se encontraron detalles de la terapia.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Foto de tipo terapia */}
        <View style={styles.therapyHeader}>
        <Image source={therapy.imagen ? { uri: therapy.imagen } : require('../../assets/avatar1.png')} style={styles.therapyImage} />

          <Text style={styles.therapyName}>{therapy.tituloterapia}</Text>
        </View>

        {/* Título y párrafo "Qué es" */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>¿Qué es?</Text>
          <Text style={styles.sectionText}>{therapy.descripcion}</Text>
        </View>

        {/* Título y párrafo "Cómo funciona" */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>¿Cómo funciona?</Text>
          <Text style={styles.sectionText}>{therapy.procedimiento}</Text>
        </View>
      </ScrollView>

      {/* TabNavigator en el pie de la pantalla */}
      <TabNavigator />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between', // Asegura que el TabNavigator esté al pie de la pantalla
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    padding: 20,
  },
  therapyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  therapyImage: {
    width: 79,
    height: 83,
    borderRadius: 30,
    marginRight: 15,
  },
  therapyName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#5D5791'
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {   
    color: '#5D5791',
    fontSize: 22,
    fontWeight: '400',
    marginBottom: 10,

  },
  sectionText: {
    fontSize: 14,
    fontWeight:'400',
    textAlign: 'justify',
    color: '#78767A',
  },
  loadingContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
});

export default DetalleScreen;
