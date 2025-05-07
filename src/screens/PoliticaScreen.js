import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';

const PoliticaScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Actualizado el : 01/01/2023</Text>
      <Text style={styles.paragraph}>
      Antes de utilizar nuestros servicios, por favor, lee atentamente las siguientes políticas y condiciones.
      </Text>
      <Text style={styles.title1}>Políticas de privacidad</Text>
      <Text style={styles.paragraph}>
      1. Confidencialidad: En Terapia Online, valoramos la confidencialidad de tus sesiones terapéuticas. Todas las conversaciones entre tú y tu psicólogo son privadas y confidenciales, y están protegidas por la ley. No compartiremos tu información personal o el contenido de tus sesiones sin tu consentimiento explícito, excepto en los casos en que estemos legalmente obligados a hacerlo.{"\n"}
      2. Uso adecuado: Al utilizar Terapia Online, te comprometes a utilizar la plataforma de manera adecuada y respetuosa. Esto incluye tratar a tu psicólogo y a otros usuarios con cortesía y consideración, y abstenerse de participar en comportamientos inapropiados, como el acoso, la discriminación o el abuso verbal.{"\n"}
      3. Sesiones programadas: Las sesiones de terapia en línea se programarán previamente entre tú y tu psicólogo a través de la plataforma. Es importante llegar a tiempo a tus citas programadas y comunicarte con tu psicólogo si necesitas cancelar o reprogramar una sesión.{"\n"}
      4. Tarifas y pagos: El costo de las sesiones de terapia en línea se determinará según las tarifas establecidas por tu psicólogo. Las tarifas pueden variar según la duración de la sesión y otros factores. Los pagos se procesarán a través de la plataforma de Terapia Online de manera segura y confiable.{"\n"}
      5. Limitaciones del servicio: Terapia Online proporciona un servicio de consultas virtuales de psicología, pero no sustituye la atención médica o psiquiátrica de emergencia. Si estás experimentando una crisis o emergencia médica, por favor, busca ayuda de inmediato llamando a los servicios de emergencia de tu área o acudiendo al hospital más cercano.{"\n"}
      6. Responsabilidad del usuario: Al utilizar Terapia Online, aceptas la responsabilidad de tu propio bienestar y tomas decisiones informadas sobre tu tratamiento. Tu psicólogo está aquí para apoyarte y proporcionarte orientación, pero eres tú quien tiene la responsabilidad final de seguir las recomendaciones y estrategias de tratamiento.
      Al utilizar los servicios de Terapia Online, aceptas estas políticas y condiciones. Si tienes alguna pregunta o inquietud, no dudes en comunicarte con nosotros. ¡Gracias por confiar en nosotros para tu cuidado de salud mental!{"\n"}
      Atentamente,{"\n"}
      El equipo de Terapia Online
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontFamily: 'Roboto',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight:24,
    letterSpacing: 0.15,
    marginBottom: 10,
    textAlign: 'left',
    color:'#C9C5D0'
  },
  title1: {
    fontFamily: 'Roboto',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: 600,
    lineHeight:20,
    letterSpacing: 0.1,
    marginBottom: 10,
    textAlign: 'left',
    color:'#5D5791'
  },
  paragraph: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
    textAlign: 'justify',
  },
});

export default PoliticaScreen;
