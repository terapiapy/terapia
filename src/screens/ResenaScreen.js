import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ResenaScreen = ({navigation}) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleStarPress = (index) => {
    setRating(index + 1);
  };

  return (
    <View style={styles.container}>
      {/* Cabecera */}
      <Text style={styles.title}>Escribe una Reseña</Text>
      <Text style={styles.subtitle}>Tu opinión es importante para nosotros.</Text>

      {/* Tarjeta del especialista */}
      <View style={styles.card}>
        <Image source={require('../../assets/esp1.png')} style={styles.image} />
        <Text style={styles.name}>Maria Carolina Pereira</Text>
        <Text style={styles.specialty}>Psicología Clínica</Text>
      </View>

      {/* Puntuación con estrellas */}
      <View style={styles.starsContainer}>
        {[...Array(5)].map((_, index) => (
          <TouchableOpacity key={index} onPress={() => handleStarPress(index)}>
            <Ionicons
              name={index < rating ? 'star' : 'star-outline'}
              size={30}
              color={index < rating ? '#FFD700' : '#ccc'}
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* Campo de texto para comentario */}
      <TextInput
        style={styles.input}
        placeholder="Escribe tu comentario aquí..."
        value={comment}
        onChangeText={setComment}
        multiline
      />

      {/* Botón de enviar */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Resumen Sesión')}>
        <Text style={styles.buttonText}>Enviar Reseña</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  specialty: {
    fontSize: 16,
    color: '#555',
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 100,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#5D5791',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ResenaScreen;
