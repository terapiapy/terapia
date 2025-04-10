import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [therapists, setTherapists] = useState([]);

  useEffect(() => {
    fetch('https://apisterapia.onrender.com/api/especialistas')
      .then(response => response.json())
      .then(data => setTherapists(data))
      .catch(error => console.error('Error al cargar los especialistas:', error));
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredTherapists = therapists.filter(item =>
    item.nombresespecialista.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.apellidosespecialista.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.especialidad.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Cabecera */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Terapeutas</Text>
      </View>

      {/* Input de búsqueda */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar terapeuta..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      {/* Listado de terapeutas */}
      <FlatList
        data={filteredTherapists}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.card}
            onPress={() => navigation.navigate('Detalle Especialista', { idEspecialista: item._id })}
          >
            <View style={styles.cardImageContainer}>
              <Image 
                source={require('../../assets/esp1.png')} // Puedes cambiar esto si luego usas fotos reales
                style={styles.cardImage} 
              />
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.cardName}>{item.nombresespecialista}</Text>
              <Text style={styles.cardName}>{item.apellidosespecialista}</Text>
              <Text style={styles.cardSpecialty}>{item.especialidad}</Text>
              <Text style={styles.cardPrice}>Precio: ${item.precio}</Text>
            </View>
            <View style={styles.cardRatingContainer}>
              <Text style={styles.cardRating}>{item.rating}</Text>
              <Ionicons name="star" size={20} color="#FFD700" />
            </View>
          </TouchableOpacity>
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
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginTop:18,
    marginBottom: 20 
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop:18,
  },
  searchContainer: {
    marginBottom: 20,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
  },
  card: {
    flexDirection: 'row',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    backgroundColor: 'white',
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
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  cardSpecialty: {
    fontSize: 16,
    color: '#5D5791',
    marginBottom: 2,
  },
  cardPrice: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  cardRatingContainer: {
    marginBottom: 68,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardRating: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 5,
  },
});

export default SearchScreen;
