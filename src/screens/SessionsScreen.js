import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SessionsScreen = () => {
  const navigation = useNavigation();
  const [filter, setFilter] = useState('upcoming');
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await fetch('https://apisterapia.onrender.com/api/sesiones/');
        const data = await response.json();

        const mapped = data.map(item => {
          const rawDate = item.idreserva.idhorario.fecha; // formato: dd/mm/yyyy
          const [day, month, year] = rawDate.split('/');
          const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`; // yyyy-mm-dd

          return {
            id: item._id,
            date: formattedDate,
            time: item.idreserva.idhorario.hora,
            duration: '1 hora',
            price: `${item.idreserva.monto}$`,
            therapistName: `${item.idreserva.idespecialista.nombresespecialista} ${item.idreserva.idespecialista.apellidosespecialista}`,
            therapistImage: require('../../assets/esp1.png'), // Sustituye si luego hay una URL válida
            fullData: item
          };
        });

        setSessions(mapped);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching sessions:', error);
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);

  const today = new Date().toISOString().split('T')[0];

  const filteredSessions = sessions.filter(session =>
    filter === 'upcoming' ? session.date >= today : session.date < today
  );

  const renderHeader = () => (
    <>
      <View style={styles.header}>
        <Text style={styles.headerText}>Sesiones</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, filter === 'upcoming' && styles.activeButton]}
          onPress={() => setFilter('upcoming')}
        >
          <Text style={styles.buttonText}>Próximo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, filter === 'past' && styles.activeButton]}
          onPress={() => setFilter('past')}
        >
          <Text style={styles.buttonText}>Anteriores</Text>
        </TouchableOpacity>
      </View>
    </>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#5D5791" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={renderHeader}
        data={filteredSessions}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardImageContainer}>
              <Image source={item.therapistImage} style={styles.cardImage} />
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.cardName}>Terapeuta: {item.therapistName}</Text>
              <Text style={styles.cardDate}>Fecha: {item.date}</Text>
              <Text style={styles.cardTime}>Hora: {item.time}</Text>
              <Text style={styles.cardDuration}>Duración: {item.duration}</Text>
              <Text style={styles.cardPrice}>Precio: {item.price}</Text>
              {filter === 'upcoming' && (
                <TouchableOpacity
                  style={styles.startButton}
                  onPress={() => navigation.navigate('Detalle Sesión', { session: item.fullData })}
                >
                  <Text style={styles.startButtonText}>Iniciar</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginTop: 18,
    marginBottom: 20 
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop:18,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#ccc',
    borderRadius: 8,
  },
  activeButton: {
    backgroundColor: '#5D5791',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  card: {
    flexDirection: 'row',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
  },
  cardImageContainer: {
    marginRight: 10,
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
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardDate: {
    fontSize: 16,
    color: '#5D5791',
  },
  cardTime: {
    fontSize: 16,
    color: '#333',
  },
  cardDuration: {
    fontSize: 16,
    color: '#333',
  },
  cardPrice: {
    fontSize: 16,
    color: '#333',
  },
  startButton: {
    marginTop: 10,
    backgroundColor: '#28A745',
    paddingVertical: 8,
    borderRadius: 5,
    alignItems: 'center',
  },
  startButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SessionsScreen;
