import React, { useState, useEffect, useRef } from "react";
import { View, TouchableOpacity, Text, Linking, Alert } from "react-native";
import { Camera } from "expo-camera";
import styles from "../components/AppStyles";

const CameraComponent = ({ isVisible, onCapture, onClose }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [isScanning, setIsScanning] = useState(true);
  const cameraRef = useRef(null);

  //Request camera permissions
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    if (isScanning) {
      setIsScanning(false);
      // Check for valid url
      if (Linking.canOpenURL(data)) {
        //Alert options to continue or not
        Alert.alert(
          "Avaa",
          `Haluatko siirtyä osoitteeseen: ${data}`,
          [
            { text: "Sulje", onPress: onClose, style: "cancel" },
            {
              text: "Siirry",
              onPress: () => {
                Linking.openURL(data);
                onClose();
              },
            },
          ],
          { cancelable: false }
        );
      } else {
        //Invalid address alert
        alert("Viallinen osoite");
        onClose();
      }
    }
  };

  //If component not visible return null
  if (!isVisible) return null;

  //Camera permission handling
  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  //Return the camera and close text
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
