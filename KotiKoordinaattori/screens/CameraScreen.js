import React, { useState } from 'react';
import CameraComponent from '../components/Camera';
import { TouchableOpacity, Text } from 'react-native'; 
import styles from '../components/AppStyles';

const CameraScreen = ({ onPhotoTaken }) => {
  const [isCameraVisible, setIsCameraVisible] = useState(false);

  const handleCapture = () => {
    onPhotoTaken(uri);
    setIsCameraVisible(false);
  };

  const openCamera = () => {
    setIsCameraVisible(true);
  };

  const closeCamera = () => {
    setIsCameraVisible(false);
  };

  return (
    <>
    <Text style={styles.title}>Tämän kameran toimintatarkoitus hämmentää monia</Text>
      {isCameraVisible && (
        <CameraComponent
          isVisible={isCameraVisible}
          onCapture={handleCapture}
          onClose={closeCamera}
        />
      )}
      {!isCameraVisible && (
        <TouchableOpacity style={styles.button} onPress={openCamera}>
        <Text style={styles.buttonText}>Avaa</Text>
      </TouchableOpacity>
      )}
    </>
  );
};

export default CameraScreen;