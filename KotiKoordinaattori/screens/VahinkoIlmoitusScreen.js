import React, { useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Alert,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  View,
  Text,
  ScrollView,
} from "react-native";
import emailjs from "@emailjs/browser";
import styles from "../components/AppStyles";

export default function VahinkoIlmoitusScreen() {
  const [user_name, setUserName] = useState("");
  const [user_email, setUserEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigation = useNavigation();

  //Navigate to homepage
  const homeScreen = () => {
    navigation.navigate("KotiKoordinaattori");
  };

  //Alert the user that the mail is sent
  const sendAlert = () => {
    Alert.alert("Vahinkoilmoitus", "Lähetetty");
  };

  //Function to check that email is correct
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  //Function to send an email from the contact form
  const sendEmail = () => {
    //Check if all boxes are filled
    if (
      user_name.trim() === "" ||
      user_email.trim() === "" ||
      message.trim() === ""
    ) {
      Alert.alert("Virhe", "Täytä kaikki kentät");
      return;
    }

    //Check that email is in correct form
    if (!validateEmail(user_email)) {
      Alert.alert("Virhe", "Virheellinen sähköpostiosoite");
      return;
    }

    //Parameters send to email
    const templateParams = {
      user_name,
      user_email,
      message,
    };

    //Emailjs for sending an email to kotikoordinattoritest@gmail.com
    emailjs
      .send(
        "service_w5y6a0b",
        "template_er8elil",
        templateParams,
        "9BTlcOOlVqj2oUvST"
      )
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
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>Tee vahinkoilmoitus</Text>
      <SafeAreaView style={styles.inputContainer}>
        <View style={styles.inputRow}>
          {/* Input fields for name and email*/}
          <TextInput
            style={styles.inputField}
            onChangeText={(text) => setUserName(text)}
            placeholder="Nimi*"
          />
          <TextInput
            style={styles.inputField}
            onChangeText={(text) => setUserEmail(text)}
            placeholder="Sähköposti*"
          />
        </View>
        {/* Input Field for message */}
        <TextInput
          style={styles.messageInput}
          onChangeText={(text) => setMessage(text)}
          placeholder="Viesti*"
          multiline={true}
          numberOfLines={6}
        />
        {/* Send button */}
        <TouchableOpacity style={styles.button} onPress={sendEmail}>
          <Text style={styles.buttonText}>Lähetä</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ScrollView>
  );
}
