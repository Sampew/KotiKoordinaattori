import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import {View, Text, StyleSheet, StatusBar, SafeAreaView, TouchableOpacity, Dimensions, ActivityIndicator} from 'react-native';
import { getDocs, collection } from 'firebase/firestore';
import { firestore } from '../Firebase/Config';
import styles from '../components/AppStyles';

export default function HomeScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { confirmedReservations } = route.params || { confirmedReservations: [] };
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReservations = async () => {
    try {
      const reservationsCollection = collection(firestore, 'reservations');
      const reservationsQuery = await getDocs(reservationsCollection);
      const reservationsData = [];

      reservationsQuery.forEach((doc) => {
        const data = doc.id;
        reservationsData.push(data || []);
      });

      setReservations(reservationsData);
    } catch (error) {
      console.error('Error fetching reservations:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const saunaScreen = () => {
    navigation.navigate('Saunavuoro');
  };

  const vahinkoScreen = () => {
    navigation.navigate('VahinkoIlmoitusTaulu');
  };

  const pyykkiScreen = () => {
    navigation.navigate('PyykkiVaraus');
  };

  const ilmoitusScreen = () => {
    navigation.navigate('IlmoitusTaulu');
  };

  const sahkoScreen = () => {
    navigation.navigate('PörssiSähkö');
  };
  
  const cameraScreen = () => {
    navigation.navigate('Camera')
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.mainContent}>
        <Text style={styles.welcomeText}>Tervetuloa</Text>
        <Text style={styles.welcomeText}>KotiKoordinaattoriin!</Text>
        <View style={styles.buttonGroup}>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.customButton} onPress={saunaScreen}>
              <Text style={styles.buttonText}>VARAA</Text>
              <Text style={styles.buttonText}>SAUNAVUORO</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.customButton} onPress={ilmoitusScreen}>
              <Text style={styles.buttonText}>ILMOITUSTAULU</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.customButton} onPress={pyykkiScreen}>
              <Text style={styles.buttonText}>VARAA</Text>
              <Text style={styles.buttonText}>PYYKKIVUORO</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.customButton} onPress={vahinkoScreen}>
              <Text style={styles.buttonText}>TEE VAHINKO-</Text>
              <Text style={styles.buttonText}>ILMOITUS</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.customButton} onPress={sahkoScreen}>
              <Text style={styles.buttonText}>PÖRSSISÄHKÖN</Text>
              <Text style={styles.buttonText}>HINTA</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.customButton} onPress={cameraScreen}>
              <Text style={styles.buttonText}>KAMERA</Text>
            </TouchableOpacity>

          </View>
        </View>
        <Text style={styles.varausText}>Tulevat varaukset:</Text>
        <View style={styles.reservationContainer}>
          {loading ? (
            <ActivityIndicator size="small" color="black" />
          ) : reservations.length > 0 ? (
            reservations.map((reservation, index) => (
              <View key={index} style={styles.reservationItem}>
                <Text style={styles.reservationText}>{reservation}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.noReservationsText}>Ei varattuja vuoroja</Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}