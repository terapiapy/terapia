import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';

const TerminoScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Actualizado el : 01/01/2023</Text>
      <Text style={styles.paragraph}>
        Al utilizar la Aplicación y los Servicios, aceptas estos Términos en su totalidad. Si no estás de acuerdo con estos Términos, por favor, abstente de utilizar la Aplicación y los Servicios.
      </Text>

      <Text style={styles.title1}>Términos y condiciones</Text>
      <Text style={styles.paragraph}>
        1. Uso de la Aplicación: Terapia Online proporciona una plataforma tecnológica que permite a los usuarios programar y participar en consultas virtuales con psicólogos. Al utilizar la Aplicación, aceptas cumplir con todas las leyes y regulaciones aplicables y aceptas no utilizar la Aplicación con fines ilegales o no autorizados.{"\n"}
        2. Registro de la Cuenta: Para utilizar ciertas funciones de la Aplicación, es posible que necesites registrarte y crear una cuenta. Al registrarte, aceptas proporcionar información precisa y actualizada sobre ti mismo, y aceptas mantener la confidencialidad de tu contraseña de cuenta.{"\n"}
        3. Privacidad: Terapia Online valora tu privacidad y se compromete a proteger tus datos personales. Consulta nuestra Política de Privacidad para obtener más información sobre cómo recopilamos, utilizamos y protegemos tus datos.{"\n"}
        4. Propiedad Intelectual: La Aplicación y todos sus contenidos, incluyendo pero no limitado a textos, gráficos, logotipos, imágenes y software, son propiedad de Terapia Online y están protegidos por las leyes de propiedad intelectual. No puedes copiar, modificar, distribuir, transmitir, mostrar, publicar o vender ningún contenido de la Aplicación sin el consentimiento previo por escrito de Terapia Online.{"\n"}
        5. Limitación de Responsabilidad: Terapia Online no se hace responsable de ningún daño directo, indirecto, incidental, especial o consecuente que surja del uso o la imposibilidad de utilizar la Aplicación o los Servicios. Los Servicios se proporcionan "tal cual" y "según estén disponibles", sin garantía de ningún tipo, ya sea expresa o implícita.{"\n"}
        6. Modificaciones: Terapia Online se reserva el derecho de modificar o actualizar estos Términos en cualquier momento sin previo aviso. Se te notificará de cualquier cambio a estos Términos mediante la publicación de los Términos revisados en la Aplicación. El uso continuado de la Aplicación y los Servicios después de cualquier modificación constituye tu aceptación de los Términos modificados.{"\n"}
        7. Ley Aplicable: Estos Términos se regirán e interpretarán de acuerdo con las leyes del país donde está registrada la empresa Terapia Online.
        Al utilizar la Aplicación y los Servicios, aceptas estos Términos en su totalidad. Si tienes alguna pregunta o inquietud sobre estos Términos, por favor, contáctan
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

export default TerminoScreen;
