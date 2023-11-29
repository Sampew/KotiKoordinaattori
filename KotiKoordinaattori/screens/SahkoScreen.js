import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import styles from '../components/AppStyles';
import fetch from 'node-fetch';

export default function SahkoScreen() {
  const LATEST_PRICES_ENDPOINT = 'https://api.porssisahko.net/v1/latest-prices.json';
  const [currentPrice, setCurrentPrice] = useState(null);
  const [hourlyPrices, setHourlyPrices] = useState([]);

  async function fetchLatestPriceData() {
    const response = await fetch(LATEST_PRICES_ENDPOINT);
    return response.json();
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchLatestPriceData();
        const now = new Date();
        const currentHourPrice = data.prices.find(
          (price) => new Date(price.startDate) <= now && new Date(price.endDate) > now
        );

        setCurrentPrice(currentHourPrice ? currentHourPrice.price : 'Ei saatavilla');
        setHourlyPrices(data.prices);
      } catch (e) {
        console.error(`Hinnan haku epäonnistui, syy: ${e}`);
      }
    }

    fetchData();
  }, []);

  const getPriceColor = (price) => {
    return price > 8 ? 'red' : 'green'; //8snt KWH noin saa kiinteitä sähkösopimuksia
  };
//<Text style={styles.text}>Tervetuloa PörssiSähkö -sivulle!</Text>   41 rivi
  return (
    <View style={styles.container}>
         
      <Text style={[styles.message, { color: getPriceColor(currentPrice) }]}>
        Tämänhetkinen hinta: {currentPrice} snt / kWh (sis. alv)
      </Text>
      <ScrollView>
  {hourlyPrices.map((priceEntry, index) => (
    <View key={index} style={styles.row}>
        <Text style={[styles.message]}>
      <Text style={styles.date}>
        {new Date(priceEntry.startDate).toLocaleDateString()}{' '}
        {new Date(priceEntry.startDate).toLocaleTimeString()}{'         '} 
      </Text>
      <Text style={[styles.messageInfo, { color: getPriceColor(priceEntry.price) }]}>
        {priceEntry.price} snt / kWh
      </Text>
      </Text>
    </View>
  ))}
</ScrollView>
    </View>
  );
}
