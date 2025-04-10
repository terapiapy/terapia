import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Cargar datos de sesión almacenados al iniciar la app
  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        console.log('Usuario almacenado en AsyncStorage:', storedUser); // Para depurar
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Error cargando datos del usuario:", error);
      }
    };
    loadUser();
  }, []);

  // Iniciar sesión
  const login = async (userData) => {
    setUser(userData);
    await AsyncStorage.setItem('user', JSON.stringify(userData)); // Guardar en almacenamiento local
  };

  // Cerrar sesión
  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem('user'); // Eliminar datos de sesión
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
