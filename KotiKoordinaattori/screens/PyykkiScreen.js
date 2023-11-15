import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import CheckBox from 'expo-checkbox'
import { Calendar } from 'react-native-calendars';
import { firestore, addDoc, getDoc, query, onSnapshot, orderBy, deleteDoc, doc, setDoc,updateDoc } from '../Firebase/Config';
import {getDocs, collection} from 'firebase/firestore';


export default function PyykkiScreen() {
  const navigation = useNavigation();
  const [reservedDates, setReservedDates] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedReservations, setSelectedReservations] = useState([]);
  const [confirmedReservations, setConfirmedReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
// Function to fetch reserved and available dates from Firestore
const fetchReservedDates = async () => {
  try {
    const reservationsCollection = collection(firestore, 'reservations');
    const reservationsQuery = await getDocs(reservationsCollection);
    const reservedDatesData = {};
    
    
    reservationsQuery.forEach((doc) => {
      const date = doc.id; // Assuming the date is stored as the document ID
      const reservations = doc.data().reservations || [];
    });

    // Fetch available dates
    const availableReservationsCollection = collection(firestore, 'availableReservations');
    const availableReservationsQuery = await getDocs(availableReservationsCollection);
    
    availableReservationsQuery.forEach((doc) => {
      const data = doc.id;
      const parts = data.split(' ');
      const date = parts[0];
      console.log(date)
      if (!reservedDatesData[date]) {
        reservedDatesData[date] = {
          marked: true,
          dotColor: 'green', // Available dates have a green dot
        };
      }
      fullInfo.push(data)
    });
    setReservedDates(reservedDatesData);
  } catch (error) {
    console.error('Error fetching:', error);
  }
};
useEffect(() => {
  fetchReservedDates();
}, []); // Fetch reserved and available dates on component mount

const handleDayPress = (day) => {
  const selectedDay = reservedDates[day.dateString];
  
  setSelectedDate(day.dateString);
  setSelectedReservations(
    selectedDay
      ? (selectedDay.reservations || []).map((time) => ({ time, checked: false }))
      : []
  );
};

{selectedReservations.length > 0 ? (
  selectedReservations.map((reservation, index) => (
    <View key={index} style={styles.reservationRow}>
      <CheckBox
        value={reservation.checked}
        onValueChange={() => handleCheckboxToggle(index)}
        style={styles.checkbox}
      />
      <Text style={styles.reservationText}>{reservation.time}</Text>
    </View>
  ))
) : (
  <Text style={styles.noReservationsText}>Ei vapaita vuoroja.</Text>
)}

  const handleCheckboxToggle = (index) => {
    const updatedReservations = [...selectedReservations];
    updatedReservations[index].checked = !updatedReservations[index].checked;
    setSelectedReservations(updatedReservations);
  };
 
  const handleConfirmReservation = async () => {
    console.log(fullInfo)
    if (reservedDates[selectedDate] && reservedDates[selectedDate].dotColor === 'green') {
      // Add the confirmed reservation to Firestore
      const reservationRef = doc(firestore, 'reservations', fullInfo[0].toString()); // Use the appropriate collection path
      const reservationDoc = await getDoc(reservationRef);
  
      if (reservationDoc.exists()) {
        // Update existing reservations
        await updateDoc(reservationRef, {
          reservations: [...reservationDoc.data().reservations, ...selectedReservations.map((reservation) => reservation.time)],
        });
      } else {
        // Create a new document for the date
        await setDoc(reservationRef, { reservations: selectedReservations.map((reservation) => reservation.time) });
      }
  
      const availableReservationsRef = doc(firestore, 'availableReservations', fullInfo[0].toString());
      await deleteDoc(availableReservationsRef);

      // Update local state
      setConfirmedReservations((prevReservations) => [...prevReservations, ...selectedReservations]);
      setSelectedReservations([]); // Clear selected reservations
  
      alert('Vuoro varattu');
      navigation.navigate('KotiKoordinaattori', { confirmedReservations });
    } else {
      alert('Ei vapaita vuoroja kyseiselle päivälle.');
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pyykki Screen</Text>
      <View style={styles.content}>
        <Calendar onDayPress={handleDayPress} markedDates={reservedDates} />
        {selectedDate && (
          <View style={styles.selectedDateContainer}>
            <Text style={styles.selectedDateText}>{`Avoimet vuorot:\n${selectedDate}`}</Text>
            {selectedReservations.length > 0 ? (
              selectedReservations.map((reservation, index) => (
                <View key={index} style={styles.reservationRow}>
                  <CheckBox
                    value={reservation.checked}
                    onValueChange={() => handleCheckboxToggle(index)}
                    style={styles.checkbox}
                  />
                </View>
              ))
            ) : (
              <>
                <Text style={styles.noReservationsText}>
                  {reservedDates[selectedDate]?.dotColor === 'green' ? 'Vapaa vuoro' : 'Ei vapaita vuoroja.'}
                </Text>
                {reservedDates[selectedDate]?.dotColor === 'green' && (
                  <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmReservation}>
                    <Text style={styles.confirmButtonText}>VAHVISTA VARAUS</Text>
                  </TouchableOpacity>
                )}
              </>
            )}
          </View>
        )}
      </View>
    </View>
  );
}

const fullInfo = [];

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
});
