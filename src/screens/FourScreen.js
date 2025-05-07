import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import SvgLogo from '../../assets/logo.svg'; // Asegúrate de importar correctamente tu imagen SVG.

const FourScreen = ({ navigation }) => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoTextContainer}>
          <SvgLogo style={styles.logov} />
          <Text style={styles.headerTexte}>erapia</Text>
        </View>
        <Text style={styles.headerTexto}>online</Text>
      </View>
        <View style={styles.middleContent}>
          <Image source={require('../../assets/img4.png')} style={styles.imageI} />
          <Image source={require('../../assets/img5.png')} style={styles.imageD} />
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>
            Agenda consultas de acuerdo a tu tiempo
          </Text>
          <Text style={styles.parrafo}>
            Descubre una amplia variedad de terapeutas con
            diversas especiliadades y enfoques.
          </Text>
          <TouchableOpacity style={styles.boton} onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={styles.botonText}>Continuar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 375,
    height: 812,
    backgroundColor: '#FFF',
  },
  header: {
    alignItems: 'center', // ✅ Centra los elementos
    justifyContent: 'center',
    margin: 30
  },
  logoTextContainer: {
    marginTop:35,
    flexDirection: 'row', // ✅ Logo y "erapia" en la misma línea
    alignItems: 'center', // ✅ Alinear verticalmente
  },
  logov: {
    width: 74,
    height: 105,
    marginRight: -15, // ✅ Espacio entre logo y texto
  },
  headerTexte: {
    marginTop:-15,
    color: '#5D5791',
    fontFamily: 'eurofurence',
    fontSize: 46,
    fontWeight: '500',
    fontStyle:'normal',
  },
  headerTexto: {
    color: '#E4DFFF',
    fontFamily: 'Roboto',
    fontSize: 24,
    fontWeight: '500',
    marginTop: -35, // ✅ Espacio entre "erapia" y "Online"
    marginLeft:125
  },
  middleContent: {
    marginTop:5,
    flexDirection: 'row', // ✅ Alinea las imágenes en fila (horizontal)
    justifyContent: 'center', // ✅ Centra las imágenes en el eje horizontal
    alignItems: 'center', // ✅ Alinea las imágenes en el eje vertical
    marginVertical: 20, // Espaciado arriba y abajo
  },
  imageI: {
    width: 120,
    height: 170,
    marginRight: -50, // ✅ Espacio entre las imágenes
    borderColor: '#5D5791',
  },
  imageD: {
    width: 130,
    height: 170,
    marginRight:15,
    marginTop:20,
    borderColor: '#5D5791',
  },
  content: {
    width: 313
  },
  title: {
    textAlign: 'center',
    fontFamily: 'Roboto',
    fontSize: 27,
    fontWeight: '400',
    fontStyle:'normal',
    lineHeight: 36,
    color: '#1C1B20',
    marginTop: 5, 
    marginLeft:55,
  },
  parrafo: {
    color: '#78767A',
    textAlign: 'center',
    fontFamily: 'Roboto',
    fontSize: 14,
    fontStyle: 120,
    fontWeight: 400,
    lineHeight: 20,
    letterSpacing: 0.25,
    marginTop:15,
    marginLeft:25
  },
  boton: {
        
    margin: 75,
    backgroundColor: '#5D5791',
    padding: 10,
    borderRadius: 20,
    width: 199,
    height: 40,
  },
  botonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default FourScreen;
