import React from 'react';
import { Button, ScrollView, StyleSheet, Text, TextInput, View, SafeAreaView } from 'react-native';
import { firestore, collection, addDoc,serverTimestamp, MESSAGES } from '../Firebase/Config';
import { useEffect, useState } from 'react';
import { querySnapshot, onSnapshot, query, orderBy } from 'firebase/firestore';
import { convertFirebaseTimeStampToJS } from '../helpers/Functions';
import styles from '../components/AppStyles';

export default function IlmoitusTauluScreen() {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')

  useEffect(() => {
    const q = query(collection(firestore,MESSAGES), orderBy('created','desc'))

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tempMessages = [];
    
      querySnapshot.forEach((doc) => {
        const messageObject = {
          id: doc.id,
          text: doc.data().text,
          created: convertFirebaseTimeStampToJS(doc.data().created)
        }
        tempMessages.push(messageObject)
      });
      setMessages(tempMessages);
    });
    return () => {
      unsubscribe()
    }
  }, [])
  

  const save = async() => {
    const docRef = await addDoc(collection(firestore,MESSAGES),{
      text: newMessage,
      created: serverTimestamp()
    }).catch (error => console.log(error))

    setNewMessage('')
    console.log('Message saved.')
  }


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.taloyhtiotitle}>Taloyhtiömme ilmoittaa</Text>
        {
          messages.map((message) => (
            <View style={styles.message} key={message.id}>
              <Text style={styles.messageCreated}>{message.created}</Text>
              <Text style = {styles.messageInfo}>{message.text}</Text>
            </View>
          ))
        }
      </ScrollView>
      <TextInput placeholder='Send message...' value={newMessage} onChangeText={text => setNewMessage(text)}/>
      <Button title= "Send" type="button" onPress={save}/>
    </SafeAreaView>
  );
}

