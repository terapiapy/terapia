import React, { useContext, useState, useEffect } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
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
        if (!session.idreserva || !session.idreserva.idespecialista || !session.idreserva.idhorario) {
          console.warn('Reserva incompleta en sesión:', session._id);
          return null; // O devolver un objeto vacío si quieres manejarlo diferente
        }
      
        const especialista = session.idreserva.idespecialista;
        const horario = session.idreserva.idhorario;
      
        return {
          id: session._id,
          name: especialista.nombresespecialista,
          lastname: especialista.apellidosespecialista,
          specialty: especialista.especialidad || "Especialidad no disponible",
          date: horario.fecha || "Fecha no disponible",
          time: horario.hora || "Hora no disponible",
          image: especialista.foto ? { uri: especialista.foto } : require('../../assets/avatar1.png'),
          price: session.idreserva.monto || "Precio no disponible",
          rating: especialista.rating || "Sin calificación",
        };
      }).filter(session => session !== null); // Esto elimina los nulos

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
        image: therapy.imagen && therapy.imagen.includes('http')? { uri: therapy.imagen }: require('../../assets/avatar1.png')
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
        <Image source={user.foto ? { uri: user.foto } : require('../../assets/avatar.png')} style={styles.avatar} />
        <View>
          <Text style={styles.userName}>Hola, {user.nombre}!</Text>
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
      {sessions.length === 0 ? (
        // Si no hay sesiones, mostramos este card con el mensaje y el botón de "Buscar"
        <View style={styles.card}>
          <Text style={styles.noSessionsText}>No tienes sesiones</Text>
          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => navigation.navigate('Buscar')}
          >
            <Text style={styles.searchButtonText}>Buscar</Text>
          </TouchableOpacity>
        </View>
      ) : (
        // Si hay sesiones, mostramos la lista de sesiones
        <FlatList 
          horizontal 
          data={sessions} 
          keyExtractor={(item) => item.id.toString()} 
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
                <Text style={styles.cardSpecialty}>{item.specialty.substring(16)}</Text>
                <Text style={styles.cardPrice}>📅 {item.date}   ⏰{item.time}</Text>
              </View>
              <View style={styles.cardRatingContainer}>
                <Text style={styles.cardRating}>{item.rating}</Text>
                <Ionicons name="star" size={20} color="#FFD700" />
              </View>
            </TouchableOpacity>
          )}
        />
      )}

      {/* TIPOS DE TERAPIA */}
      <Text style={styles.sectionTitle}>Tipos de terapia</Text>
      <FlatList
        horizontal
        data={therapies}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Enfoque de terapia', { therapyId: item.id })} // Pasar el ID de la terapia
            style={styles.therapyCard}
          >
            <Image source={item.image} style={styles.therapyIcon} />
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

  },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    margin: 20,
    marginTop: 60 
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
    color: '#5D5791',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    lineHeight: 24,
    letterSpacing: 0.15 
  },
  welcomeText: {
    fontFamily:'Roboto',  
    fontSize: 14,
    fontStyle: 'normal',
    lineHeight: 20,
    letterSpacing:0.25, 
    color: '#78767A',
    fontWeight:'400' 
  },
  banner: { 
    height: 170,
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#FCF8FF', 
    borderColor: '#47464F' ,
    borderWidth:1,
    padding: 15, 
    borderRadius: 12, 
    marginTop:0,
    margin: 17 
  },
  bannerText: { 
    flex: 1, 
    fontFamily: 'Roboto',
    fontSize: 20,
    fontWeight: 400,
    fontStyle: 'normal',
    lineHeight: 26,
    color: '#47464F',
    marginRight:-50
  },
  bannerImage: { 
    width: 190, 
    height: 171,
    marginRight:-8 
  },
  sectionTitle: {
    color: '#5D5791', 
    fontSize: 22, 
    fontWeight: '400', 
    marginTop:0,
    margin: 17
  },
  card: {
    flexDirection: 'row',
    margin: 15,
    marginTop:0,
    borderWidth: 1,
    borderColor: '#5D5791',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center', 
    backgroundColor: '#E4DFFF'
  },
  noSessionsText: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  searchButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  cardImageContainer: {
    marginRight: 10,
    marginBottom:5,
  },
  cardImage: {
    width: 60,
    height: 70,
    borderRadius: 4,
    marginTop:-30
  },
  cardInfo: {
    width:'60%',
    flex: 1,
  },
  cardName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2
  },
  cardSpecialty: {
    width:'60%',
    fontSize: 16,
    color: '#5D5791',
    marginBottom: 2 
  },
  cardPrice: {
    fontSize: 16,
    color: '#333',
    marginLeft: -69, 
    marginTop: 10,
    padding:5,
    borderRadius: 8, 
    backgroundColor: '#FFF'
  },
  cardRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center', // Alinea el icono de la estrella y la puntuación
    marginTop: -79,
    marginLeft: 49,
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 5
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
    width: 75, 
    height: 75, 
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
