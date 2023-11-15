import React, {useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {Alert,TouchableOpacity, SafeAreaView, TextInput,View, Text, StyleSheet, Keyboard, ScrollView } from 'react-native';
import emailjs from '@emailjs/browser';



export default function VahinkoIlmoitusScreen() {

  const [user_name, setUserName] = useState('');
  const [user_email, setUserEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigation = useNavigation();

  //Navigate to homepage
  const homeScreen = () => {
    navigation.navigate('KotiKoordinaattori');
  };

  //Alert the user that the mail is sent
  const sendAlert = () => {
    Alert.alert('Vahinkoilmoitus', 'Lähetetty');
  };

  //Function to check that email is correct
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  //Function to send an email from the contact form
  const sendEmail = () => {

    //Check if all boxes are filled
    if (user_name.trim() === '' || user_email.trim() === '' || message.trim() === '') {
      Alert.alert('Error', 'Please fill in all the required fields.');
      return;
    }

    //Check that email is in correct form
    if (!validateEmail(user_email)) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return;
    }

    //Parameters send to email
    const templateParams = {
      user_name,
      user_email,
      message,
    };

    //Emailjs for sending an email to kotikoordinattoritest@gmail.com
    emailjs.send('service_w5y6a0b', 'template_er8elil', templateParams, '9BTlcOOlVqj2oUvST')
      .then((result) => {
        console.log(result);
        sendAlert();
        homeScreen();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    //Scrollview when you press around the keyboard it hides
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>Tee vahinkoilmoitus</Text>
      <SafeAreaView style={styles.inputContainer}>
        <View style={styles.inputRow}>
          {/* Input fields for name and email*/}
          <TextInput
            style={styles.inputField}
            onChangeText={(text) => setUserName(text)}
            placeholder='Name*'
          />
          <TextInput
            style={styles.inputField}
            onChangeText={(text) => setUserEmail(text)}
            placeholder='Email*'
          />
        </View>
          {/* Input Field for message */}
        <TextInput
          style={ styles.messageInput}
          onChangeText={(text) => setMessage(text)}
          placeholder='Message*'
          multiline={true}
          numberOfLines={6}
        />
        {/* Send button */}
        <TouchableOpacity style={styles.button} onPress={sendEmail}>
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ScrollView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    width: '80%',
    alignSelf: 'center',
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  inputField: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  messageInput: {
    textAlignVertical: 'top',
    padding: 10,
    paddingTop: 10,
    alignSelf: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    height: '50%',
    width: '100%',
    margin: 12,
    borderWidth: 1,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
