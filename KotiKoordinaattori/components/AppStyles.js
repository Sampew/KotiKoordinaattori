import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';



const styles = StyleSheet.create({
    
  //TODO muokkaa kaikki sopiviksi, duplicate stylet poistettu
    
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    content: {
      alignItems: 'center',
    },
    selectedDateContainer: {
      marginTop: 20,
      alignItems: 'center',
    },
    selectedDateText: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    reservationRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 5,
    },
    checkbox: {
      marginRight: 10,
    },
    reservationText: {
      fontSize: 16,
    },
    confirmButton: {
      backgroundColor: 'lightblue',
      padding: 10,
      borderRadius: 5,
      marginTop: 10,
    },
    confirmButtonText: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    noReservationsText: {
      fontSize: 16,
      marginTop: 10,
    },
    similarDaysText: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 10,
    },
    similarDayItem: {
      fontSize: 16,
      color: 'black', 
      marginLeft: 20, 
    },
    container: {
      paddingTop: Constants.statusBarHeight,
      flex : 1,
      backgroundcolor: "fff"
    },
    message:
    {
      padding: 10,
      marginTop: 10,
      marginBottom : 10,
      backgroundColor: "f5f5f5",
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 5,
      marginLeft: 10,
      marginRight: 10,
    },
    messageInfo: {
      fontSize: 12
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
    
  })

    export default styles;