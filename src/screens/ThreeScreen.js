import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { ProgressBar, Colors } from 'react-native-paper';
const ThreeScreen = ({ navigation }) => {
  return (
    <SafeAreaProvider>
      <ImageBackground
        source={require('../../assets/img2.png')}
        style={styles.container}
      >
        <SafeAreaView style={styles.innerContainer}>
          <View style={styles.content}>
            <Text style={styles.title}>
              Agenda consultas de acuerdo a tu tiempo
            </Text>
            <Text style={styles.parrafo}>
              Te ofrecemos la flexibilidad de programar consultas 
              que se ajusten a tu horario.
            </Text>
            <ProgressBar progress={1}  style={styles.progressBar} />
            <TouchableOpacity style={styles.boton} onPress={() => navigation.navigate('FourScreen')}>
              <Text style={styles.botonText}>Siguiente</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
      innerContainer: {
        flex: 1,
        justifyContent: 'flex-end',
      },
      content: {
        width: '100%',
        height: '50%',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 20,
      },
      title: {
        textAlign: 'center',
        fontFamily: 'Roboto',
        fontSize: 28,
        fontStyle:'normal',
        fontWeight: '400',
        lineHeight: 36,
        color: '#1C1B20',
        marginTop: 30
      },
      parrafo: {
        textAlign: 'center',
        marginVertical: 8,
        fontFamily: 'Roboto',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 20,
        letterSpacing: 0.25,
        color: '#78767A',
        marginBottom: 30,
        marginTop:30
      },
      progressBar: {
        marginVertical:0, // Ajusta el espacio según sea necesario
        color: '#5D5791',
      },
      boton: {
        margin: 60,
        backgroundColor: '#5D5791',
        padding: 10,
        borderRadius: 20,
        width: 199,
        height: 40,
      },
      botonText: {
        color: '#fff',
        fontFamily:'Roboto',
        fontSize: 14,
        fontStyle:'normal',
        fontWeight:'500',
        lineHeight: 20,
        letterSpacing: 0.1,
        textAlign: 'center',
      },
});

export default ThreeScreen;
