import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PoliticaScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Actualizado</Text>
      <Text style={styles.paragraph}>
        Este documento ha sido actualizado recientemente para mejorar la claridad y transparencia de nuestras políticas.
      </Text>

      <Text style={styles.title}>Términos y Condiciones</Text>
      <Text style={styles.paragraph}>
        Al utilizar nuestra aplicación, aceptas cumplir con nuestros términos y condiciones establecidos en este documento.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'left',
  },
  paragraph: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
    textAlign: 'left',
  },
});

export default PoliticaScreen;
