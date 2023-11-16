import React from 'react';
import { View, Text,  } from 'react-native';
import styles from '../components/AppStyles';


export default function SaunaScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sauna Screen</Text>
      <View style={styles.content}>
        <Text>Saunan varaus sisältö.</Text>
      </View>
    </View>
  );
}


