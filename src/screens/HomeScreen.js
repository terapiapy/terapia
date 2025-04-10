import React, { useContext, useState, useEffect } from 'react';
import { View, Text, Image, FlatList, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';
const HomeScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext); // Contexto del usuario
  const [sessions, setSessions] = useState([]);
  const [therapies, setTherapies] = useState([]);
  const [loading, setLoading] = useState(true);
  // Función para obtener las sesiones del usuario logueado
  const fetchSessions = async () => {
    try {
      const response = await fetch(`https://apisterapia.onrender.com/api/sesiones/usuario/${user.id}`);
      const data = await response.json();
      
    
      if (!data || !data.sesionesProximas || data.sesionesProximas.length === 0) {
        console.warn('No hay próximas sesiones disponibles.');

        setSessions([]);
        return;
      }

      const formattedSessions = data.sesionesProximas.map((session) => {
        const especialista = session.idreserva.idespecialista;
        const horario = session.idreserva.idhorario;
       

        return {
          id: session._id,
          name: `${especialista.nombresespecialista}`, 
          lastname: `${especialista.apellidosespecialista}`,
          specialty: especialista.especialidad || "Especialidad no disponible",
          date: horario.fecha || "Fecha no disponible",
          time: horario.hora || "Hora no disponible",
          image: especialista.foto && especialista.foto.includes('http')
            ? { uri: especialista.foto } 
            : require('../../assets/avatar1.png'), // Imagen local si no es URL válida
          //image: especialista.foto ? { uri: especialista.foto } : require('../../assets/avatar1.png'),
          price: session.idreserva.monto || "Precio no disponible",
          rating: especialista.rating || "Sin calificación",
        };
      });

      setSessions(formattedSessions);
    } catch (error) {
      console.error('Error al obtener las sesiones:', error);
    }
  };

  // Función para obtener las terapias
  const fetchTherapies = async () => {
    try {
      const response = await fetch('https://apisterapia.onrender.com/api/tipoterapias'); // Ajusta la URL del endpoint
      const data = await response.json();

      // Mapeo de datos
      const formattedTherapies = data.map((therapy) => ({
        id: therapy._id,
        title: therapy.tituloterapia,
        description: therapy.descripcion,
        procedure: therapy.procedimiento,
        image: therapy.imagen ? { uri: therapy.imagen } : require('../../assets/avatar1.png')
      }));

      setTherapies(formattedTherapies);
    } catch (error) {
      console.error('Error al obtener las terapias:', error);
    }
  };

  // Llamar a las APIs
  useEffect(() => {
    console.log('Valor de user._id:', user?.id);
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchSessions(), fetchTherapies()]);
      setLoading(false);
    };
    fetchData();
  }, [user.id]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#5D5791" />
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* CABECERA */}
      <View style={styles.header}>
      <Image
          source={require('../../assets/avatar.png')}
          style={styles.avatar}
      />
        <View>
          <Text style={styles.userName}>Hola, {user.nombreusuario} {user.apellido}!</Text>
          <Text style={styles.welcomeText}>Bienvenido a tu espacio terapia online.</Text>
        </View>
      </View>

      {/* BANNER */}
      <View style={styles.banner}>
        <Text style={styles.bannerText}>Estamos aquí para ayudarte en tu viaje hacia el bienestar emocional</Text>
        <Image source={require('../../assets/banner.png')} style={styles.bannerImage} />
      </View>

      {/* PRÓXIMAS SESIONES */}
      <Text style={styles.sectionTitle}>Próxima sesión</Text>
      <FlatList horizontal data={sessions} keyExtractor={(item) => item.id} 
          renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Sesiones')}
            style={styles.card}
          >
            <View style={styles.cardImageContainer}>
              <Image 
                source={item.image} 
                style={styles.cardImage} 
              />
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.cardName}>{item.name}</Text>
              <Text style={styles.cardName}>{item.lastname}</Text>
              <Text style={styles.cardSpecialty}>{item.specialty}</Text>
              <Text style={styles.cardPrice}>{item.date} - {item.time}</Text>
            </View>
            <View style={styles.cardRatingContainer}>
              <Text style={styles.cardRating}>{item.rating}</Text>
              <Ionicons name="star" size={20} color="#FFD700" />
            </View>
          </TouchableOpacity>
        )}
      />

      {/* TIPOS DE TERAPIA */}
      <Text style={styles.sectionTitle}>Tipos de terapia</Text>
      <FlatList
        horizontal
        data={therapies}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Detalle', { therapyId: item.id })} // Pasar el ID de la terapia
            style={styles.therapyCard}
          >
            <Image source={typeof item.image === 'string' && item.image.length > 0 ? { uri: item.image } 
              : require('../../assets/avatar1.png')} style={styles.therapyIcon} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff', 
    padding: 20 
  },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginTop:18,
    marginBottom: 20 
  },
  avatar: { 
    width: 50, 
    height: 50, 
    borderRadius: 25, 
    marginRight: 10 
  },
  userName: { 
    fontSize: 16, 
    fontWeight: '500',
    color: '#5D5791' 
  },
  welcomeText: { 
    fontSize: 12, 
    color: '#78767A',
    fontWeight:'400' 
  },
  banner: { 
    height: 170,
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#FCF8FF', 
    borderColor: '#C9C5D0',
    padding: 15, 
    borderRadius: 12, 
    marginBottom: 17 
  },
  bannerText: { 
    flex: 1, 
    fontSize: 16,
    fontWeight: 400,
    color: '#47464F',
    alignItems: 'left'
  },
  bannerImage: { 
    width: 75, 
    height: 85 
  },
  sectionTitle: {
    color: '#5D5791', 
    fontSize: 22, 
    fontWeight: '400', 
    marginVertical: 10.

  },
  card: {
    flexDirection: 'row',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#5D5791',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center', // Aseguramos que los elementos de la tarjeta estén alineados correctamente
    backgroundColor: '#E4DFFF', // Puedes ajustar el color de fondo si es necesario
  },
  cardImageContainer: {
    marginRight: 10,
    marginBottom:5,
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  cardInfo: {
    flex: 1,
  },
  cardName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2, // Agrega un poco de espacio entre el nombre y la especialidad
  },
  cardSpecialty: {
    fontSize: 16,
    color: '#5D5791',
    marginBottom: 2, // Agrega espacio para que no se vea amontonado
  },
  cardPrice: {
    fontSize: 16,
    color: '#333',
    marginBottom: 2, // Espacio entre el precio y la puntuación
  },
  cardRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center', // Alinea el icono de la estrella y la puntuación
    marginBottom: 68,
  },
  cardRating: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 5, // Espacio entre la puntuación y la estrella
  },
  therapyCard: { 
    alignItems: 'center', 
    marginRight: 20, 
    marginTop: 10
  },
  therapyIcon: { 
    width: 79, 
    height: 83, 
    borderRadius: 25 
  },
  therapyTitle: { 
    fontSize: 14, 
    marginTop: 5, 
    textAlign: 'center' 
  },
  loadingContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
});

export default HomeScreen;
