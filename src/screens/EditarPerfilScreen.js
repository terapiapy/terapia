import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { AuthContext } from '../../context/AuthContext';

const EditarPerfilScreen = () => {
  const { user } = useContext(AuthContext); // Contexto del usuario
  const [cedula, setCedula] = useState(user.cedula || '');
  const [nombres, setNombres] = useState(user.nombre || '');
  const [apellidos, setApellidos] = useState(user.apellido || '');
  const [fechaNacimiento, setFechaNacimiento] = useState(user.fechanacimiento || '');
  const [sexo, setSexo] = useState(user.sexo || '');
  const [correo, setCorreo] = useState(user.email || '');


  const handleGuardar = async () => {
    try {
      const response = await fetch(`https://apisterapia.onrender.com/api/usuarios/update/${user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cedula,
          nombres,
          apellidos,
          fechanacimiento: fechaNacimiento,
          sexo,
          email: correo,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert('Perfil actualizado correctamente');
      } else {
        alert(`Error al actualizar: ${data.error || 'Intenta de nuevo'}`);
      }
    } catch (error) {
      console.error('Error de red:', error);
      alert('Hubo un error al actualizar el perfil.');
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Datos Personales</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Número de Cédula</Text>
        <TextInput
          style={styles.input}
          value={cedula}
          onChangeText={setCedula}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nombres</Text>
        <TextInput
          style={styles.input}
          value={nombres}
          onChangeText={setNombres}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Apellidos</Text>
        <TextInput
          style={styles.input}
          value={apellidos}
          onChangeText={setApellidos}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Fecha de Nacimiento</Text>
        <TextInput
          style={styles.input}
          value={fechaNacimiento}
          onChangeText={setFechaNacimiento}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Sexo</Text>
        <View style={styles.pickerContainer}>
          <Picker selectedValue={sexo} onValueChange={(itemValue) => setSexo(itemValue)}>
            <Picker.Item label={sexo} value={sexo} />
            <Picker.Item label="Masculino" value="M" />
            <Picker.Item label="Femenino" value="F" />
          </Picker>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Correo Electrónico</Text>
        <TextInput
          style={styles.input}
          value={correo}
          onChangeText={setCorreo}
          keyboardType="email-address"
        />
      </View>
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.bookButton} 
          onPress={handleGuardar}
        >
        <Text style={styles.bookButtonText}>Guardar</Text>
        </TouchableOpacity>
            
      </View>
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
    fontSize: 16,
    fontWeight: 500,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    lineHeight: 24,
    letterSpacing: 0.15,
    marginBottom: 20,
    textAlign: 'left',
    color: '#5D5791'
  },
  inputContainer: {
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Roboto',
    fontWeight:400,
    fontStyle: 'normal',
    lineHeight:24,
    letterSpacing:0.15,
    color: '#666',
    marginBottom: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 5,
    fontSize: 14,
    fontFamily: 'Roboto',
    fontWeight:400,
    fontStyle: 'normal'
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '115%',
    backgroundColor: '#F8F8F8',
    alignItems: 'center', 
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  bookButton: { 
    width:'90%',
    backgroundColor: '#5D5791',
    margin: 10, 
    padding:15,
    borderRadius:50  
  },
  bookButtonText: {
    textAlign: 'center', 
    color: '#FFFFFF', 
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    lineHeight: 20,
    letterSpacing:0.1 
  },
});

export default EditarPerfilScreen;
