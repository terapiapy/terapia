import React, { useState, useRef, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { mediaDevices, RTCPeerConnection, RTCView } from 'react-native-webrtc';
import io from 'socket.io-client';

// Configuración del servidor de señalización
const socket = io('https://tu-servidor-socket.io');

const configuration = {
  iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
};

const SalaScreen = () => {
  const [stream, setStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const peerConnection = useRef(new RTCPeerConnection(configuration));

  useEffect(() => {
    startCall();
    socket.on('offer', handleOffer);
    socket.on('answer', handleAnswer);
    socket.on('ice-candidate', handleICECandidate);
    return () => peerConnection.current.close();
  }, []);

  const startCall = async () => {
    const localStream = await mediaDevices.getUserMedia({ video: true, audio: true });
    setStream(localStream);
    localStream.getTracks().forEach(track => peerConnection.current.addTrack(track, localStream));

    peerConnection.current.ontrack = event => setRemoteStream(event.streams[0]);
    peerConnection.current.onicecandidate = event => event.candidate && socket.emit('ice-candidate', event.candidate);
    
    const offer = await peerConnection.current.createOffer();
    await peerConnection.current.setLocalDescription(offer);
    socket.emit('offer', offer);
  };

  const handleOffer = async offer => {
    await peerConnection.current.setRemoteDescription(offer);
    const answer = await peerConnection.current.createAnswer();
    await peerConnection.current.setLocalDescription(answer);
    socket.emit('answer', answer);
  };

  const handleAnswer = async answer => {
    await peerConnection.current.setRemoteDescription(answer);
  };

  const handleICECandidate = async candidate => {
    await peerConnection.current.addIceCandidate(candidate);
  };

  return (
    <View style={styles.container}>
      {stream && <RTCView streamURL={stream.toURL()} style={styles.video} />}
      {remoteStream && <RTCView streamURL={remoteStream.toURL()} style={styles.video} />}
      <TouchableOpacity style={styles.button} onPress={() => peerConnection.current.close()}>
        <Text style={styles.buttonText}>Finalizar Llamada</Text>
      </TouchableOpacity>
    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' },
  video: { width: '100%', height: '50%' },
  button: { backgroundColor: 'red', padding: 15, borderRadius: 10, marginTop: 20 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default SalaScreen;
