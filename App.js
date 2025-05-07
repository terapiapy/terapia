import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './src/screens/MainScreen';
import SecondScreen from './src/screens/SecondScreen';
import ThreeScreen from './src/screens/ThreeScreen';
import FourScreen from './src/screens/FourScreen';
import RegistroScreen from './src/screens/RegistroScreen';
import LoginScreen from './src/screens/LoginScreen';
import CodigoScreen from './src/screens/CodigoScreen';
import CompletarScreen from './src/screens/CompletarScreen';
import OlvidoScreen from './src/screens/OlvidoScreen';
import ConfirmarScreen from './src/screens/ConfirmarScreen';
import ResetearScreen from './src/screens/ResetearScreen';
import DetalleScreen from './src/screens/DetalleScreen';
import DetalleEspecialistaScreen from './src/screens/DetalleEspecialistaScreen';
import HorarioScreen from './src/screens/HorarioScreen';
import ReservaScreen from './src/screens/ReservaScreen';
import PagoScreen from './src/screens/PagoScreen';
import DetalleSesionScreen from './src/screens/DetalleSesionScreen';
//import SalaScreen from './src/screens/SalaScreen';
import FinalSesionScreen from './src/screens/FinalSesionScreen';
import ResenaScreen from './src/screens/ResenaScreen';
import ResumenSesionScreen from './src/screens/ResumenSesionScreen';
import EditarPerfilScreen from './src/screens/EditarPerfilScreen';
import CuentaScreen from './src/screens/CuentaScreen';
import MetodoPagoScreen from './src/screens/MetodoPagoScreen';
import PoliticaScreen from './src/screens/PoliticaScreen';
import TerminoScreen from './src/screens/TerminoScreen';
import TabNavigator from './TabNavigator';
import { AuthProvider } from './context/AuthContext';
const Stack = createStackNavigator();

const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="MainScreen">
          <Stack.Screen 
            name="MainScreen" 
            component={MainScreen} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="SecondScreen" 
            component={SecondScreen} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="ThreeScreen" 
            component={ThreeScreen} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="FourScreen" 
            component={FourScreen} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="RegistroScreen" 
            component={RegistroScreen} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="LoginScreen" 
            component={LoginScreen} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="Código" 
            component={CodigoScreen} 
            options={{ headerShown: true }} 
          />
          <Stack.Screen 
            name="Mis Datos" 
            component={CompletarScreen} 
            options={{ headerShown: true }} 
          />
          <Stack.Screen 
            name="Olvide mi contraseña" 
            component={OlvidoScreen} 
            options={{ headerShown: true }} 
          />
          <Stack.Screen 
            name="Codigo de verificación" 
            component={ConfirmarScreen} 
            options={{ headerShown: true }} 
          />
          <Stack.Screen 
            name="Resetear" 
            component={ResetearScreen} 
            options={{ headerShown: true }} 
          />
          <Stack.Screen 
            name="HomeTabs" 
            component={TabNavigator} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="Enfoque de terapia" 
            component={DetalleScreen} 
            options={{ headerShown: true }} 
          />
          <Stack.Screen 
            name="Detalle Especialista" 
            component={DetalleEspecialistaScreen} 
            options={{ headerShown: true }} 
          />
          <Stack.Screen 
            name="Horario" 
            component={HorarioScreen} 
            options={{ headerShown: true }} 
          />
          <Stack.Screen 
            name="Reserva" 
            component={ReservaScreen} 
            options={{ headerShown: true }} 
          />
          <Stack.Screen 
            name="Pago" 
            component={PagoScreen} 
            options={{ headerShown: true }} 
          />
          <Stack.Screen 
            name="Detalle Sesión" 
            component={DetalleSesionScreen} 
            options={{ headerShown: true }} 
          />
          <Stack.Screen 
            name="Final Sesión" 
            component={FinalSesionScreen} 
            options={{ headerShown: true }} 
          />
          <Stack.Screen 
            name="Reseña" 
            component={ResenaScreen} 
            options={{ headerShown: true }} 
          />
          <Stack.Screen 
            name="Resumen Sesión" 
            component={ResumenSesionScreen} 
            options={{ headerShown: true }} 
          />
          <Stack.Screen 
            name="Editar Perfil" 
            component={EditarPerfilScreen} 
            options={{ headerShown: true }} 
          />
          <Stack.Screen 
            name="Mi Cuenta" 
            component={CuentaScreen} 
            options={{ headerShown: true }} 
          />
          <Stack.Screen 
            name="Métodos de Pago" 
            component={MetodoPagoScreen} 
            options={{ headerShown: true }} 
          />
          <Stack.Screen 
            name="Políticas de Privacidad" 
            component={PoliticaScreen} 
            options={{ headerShown: true }} 
          />
          <Stack.Screen 
            name="Términos y Condiciones" 
            component={TerminoScreen} 
            options={{ headerShown: true }} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo1: {
    width: 70,
    height: 70,
    position: 'absolute',
    zIndex: 1,  // Logo 1 estará detrás
    right: '24%',  // Ajusta esta propiedad para colocar logo1 en el lado derecho de logo2
  },
  logo2: {
    width: 100,
    height: 100,
    zIndex: 2,  // Logo 2 estará delante
  }
});

export default App;
