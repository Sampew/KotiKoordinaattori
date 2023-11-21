import styles from '../components/AppStyles'
import React from 'react';
import { View, Text } from 'react-native';

export default function SahkoScreen() {

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tervetuloa PorssiSahko -sivulle!</Text>
      {/* Add your components, data fetching, or other functionality here */}
    </View>
  );
};