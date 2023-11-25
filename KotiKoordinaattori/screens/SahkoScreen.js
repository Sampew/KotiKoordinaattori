import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import styles from '../components/AppStyles';
import fetch from 'node-fetch';

export default function SahkoScreen() {
  const LATEST_PRICES_ENDPOINT = 'https://api.porssisahko.net/v1/latest-prices.json';
  const [price, setPrice] = useState(null);

  async function fetchLatestPriceData() {
    const response = await fetch(LATEST_PRICES_ENDPOINT);
    return response.json();
  }
  

  function getPriceForDate(date, prices) {
    const matchingPriceEntry = prices.find(
      (price) => new Date(price.startDate) <= date && new Date(price.endDate) > date
    );

    if (!matchingPriceEntry) {
      throw 'Price for the requested date is missing';
    }

    return matchingPriceEntry.price;
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const { prices } = await fetchLatestPriceData();
        const now = new Date();
        const currentPrice = getPriceForDate(now, prices);
        setPrice(currentPrice);
      } catch (e) {
        console.error(`Hinnan haku epäonnistui, syy: ${e}`);
      }
    }

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.messageInfo}>Tervetuloa PörssiSähkö -sivulle!</Text>
      {price && <Text style={styles.message}>Hinta nyt: {price} snt / kWh (sis. alv)</Text>}
    </View>
  );
}
