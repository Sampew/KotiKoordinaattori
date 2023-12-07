import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, Text, Linking, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import styles from '../components/AppStyles';

const CameraComponent = ({ isVisible, onCapture, onClose }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [isScanning, setIsScanning] = useState(true);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    if (isScanning) {
      setIsScanning(false);
      if (Linking.canOpenURL(data)) {
        Alert.alert(
          'Avaa',
          `Haluatko siirtyä osoitteeseen: ${data}`,
          [
            { text: 'Sulje', onPress: onClose, style: 'cancel' },
            { text: 'Siirry', onPress: () => {
              Linking.openURL(data);
              onClose();
            }}
          ],
          { cancelable: false }
        );
      } else {
        alert('Viallinen osoite');
        onClose();
      }
    }
  };
  

  if (!isVisible) return null;

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        ref={cameraRef}
        onBarCodeScanned={isScanning ? handleBarCodeScanned : undefined}
      />
      <TouchableOpacity style={styles.captureButton} onPress={onClose}>
        <Text style={styles.cameraText}>Sulje</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CameraComponent;