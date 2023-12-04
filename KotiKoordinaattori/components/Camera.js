import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import styles from '../components/AppStyles';


const CameraComponent = ({ isVisible, onCapture, onClose }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      onCapture(photo.uri);
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={cameraRef} />
      <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
        <Text style={styles.cameraText}>Ota kuva</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.captureButton} onPress={onClose}>
        <Text style={styles.cameraText}>Sulje</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CameraComponent;
