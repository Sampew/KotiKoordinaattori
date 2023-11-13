import React from 'react';
import {Alert,Button, SafeAreaView, TextInput,View, Text, StyleSheet, Dimensions } from 'react-native';

export default function VahinkoIlmoitusScreen() {

  const [text, onChangeText] = React.useState('');
  const sendAlert = () => {
    Alert.alert('Vahinkoilmoitus', 'Lähetetty');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tee vahinkoilmoitus</Text>
      <SafeAreaView>
        < TextInput
          style={styles.input}
          multiline={true}
          numberOfLines={20}
          onChangeText={onChangeText}
          value={text}
        />
      </SafeAreaView>
      <Button title={'Lähetä'} onPress={sendAlert} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgray', 
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  content: {
    alignItems: 'center',
  },
  input: {
    height: 500,
    width: 400,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'white',
    textAlignVertical: 'top'
  }
});
