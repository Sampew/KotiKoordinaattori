import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import CheckBox from "expo-checkbox";
import { Calendar } from "react-native-calendars";
import {
  firestore,
  collection,
  getDoc,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "../Firebase/Config";
import styles from "../components/AppStyles";

export default function PyykkiScreen() {
  const navigation = useNavigation();
  const [reservedDates, setReservedDates] = useState({});
  const [similarDays, setSimilarDays] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedReservations, setSelectedReservations] = useState([]);
  const [confirmedReservations, setConfirmedReservations] = useState([]);
  const [fullInfo, setFullInfo] = useState([]);
  const [getCorrect, setCorrect] = useState([]);
  const [getType, setType] = useState([]);
  const [getTypeNro, setTypeNro] = useState([]);

  const fetchAvailableDates = async () => {
    try {
      const reservedDatesData = {};
      const availableReservationsCollection = collection(
        firestore,
        "availableReservations"
      );
      const availableReservationsQuery = await getDocs(
        availableReservationsCollection
      );
      const localFullInfo = [];
      const currentDate = new Date();

      availableReservationsQuery.forEach((doc) => {
        const data = doc.id;
        const parts = data.split(" ");
        const date = parts[0];
        const type = parts[2];
        const typeNro = parts[3];

        setType(type);
        setTypeNro(typeNro);

        const dateParts = date.split("-");
        const reservationDate = new Date(
          dateParts[0],
          dateParts[1] - 1,
          dateParts[2]
        );

        if (reservationDate >= currentDate) {
          if (!reservedDatesData[date]) {
            reservedDatesData[date] = {
              marked: true,
              dotColor: "green",
            };
          }
          localFullInfo.push(data);
        }
      });

      setFullInfo(localFullInfo);
      setReservedDates(reservedDatesData);
    } catch (error) {
      console.error("Error fetching:", error);
    }
  };

  useEffect(() => {
    fetchAvailableDates();
  }, []);

  const handleCheckboxToggle = (time) => {
    const updatedReservations = selectedReservations.map((reservation) => {
      if (reservation.time === time) {
        return { ...reservation, checked: !reservation.checked };
      }
      return reservation;
    });
    const updatedSimilarDays = similarDays.map((day) => {
      if (day.time === time) {
        return { ...day, checked: !day.checked };
      }
      return day;
    });
    setSelectedReservations(updatedReservations);
    setSimilarDays(updatedSimilarDays);
    setCorrect(selectedDate + " " + time + " " + getType + " " + getTypeNro);
  };

  const handleConfirmReservation = async () => {
    if (
      reservedDates[selectedDate] &&
      reservedDates[selectedDate].dotColor === "green"
    ) {
      const reservationRef = doc(firestore, "reservations", getCorrect);
      const reservationDoc = await getDoc(reservationRef);

      if (reservationDoc.exists()) {
        await updateDoc(reservationRef, {
          reservations: [
            ...reservationDoc.data().reservations,
            ...selectedReservations.map((reservation) => reservation.time),
          ],
        });
      } else {
        await setDoc(reservationRef, {
          reservations: selectedReservations.map(
            (reservation) => reservation.time
          ),
        });
      }

      const availableReservationsRef = doc(
        firestore,
        "availableReservations",
        fullInfo[0].toString()
      );
      await deleteDoc(availableReservationsRef);

      setConfirmedReservations((prevReservations) => [
        ...prevReservations,
        ...selectedReservations,
      ]);
      setSelectedReservations([]);

      Alert.alert("Hienoa", "Vuoro varattu");
      navigation.navigate("KotiKoordinaattori", { confirmedReservations });
    } else {
      Alert.alert("Virhe", "Ei vapaita vuoroja kyseiselle päivälle.");
    }
  };

  const handleDayPress = (day) => {
    const selectedDay = reservedDates[day.dateString];
    setSelectedDate(day.dateString);

    const matchingDays = fullInfo
      .filter((info) => {
        const parts = info.split(" ");
        const date = parts[0];
        return date === day.dateString;
      })
      .map((day) => ({ time: day.split(" ")[1], checked: false }));

    if (matchingDays.length > 0) {
      setSimilarDays(matchingDays);
      setSelectedReservations(matchingDays);
    } else {
      setSimilarDays([]);
      setSelectedReservations([]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Varauskalenteri</Text>
      <View style={styles.content}>
        <Calendar onDayPress={handleDayPress} markedDates={reservedDates} />
        {selectedDate && (
          <View style={styles.selectedDateContainer}>
            <Text
              style={styles.selectedDateText}
            >{`Avoimet vuorot: ${selectedDate}`}</Text>
            {similarDays.map((day, index) => (
              <View key={index} style={styles.reservationRow}>
                <CheckBox
                  value={day.checked}
                  onValueChange={() => handleCheckboxToggle(day.time)}
                  style={styles.checkbox}
                />
                <Text style={styles.reservationText}>{day.time}</Text>
              </View>
            ))}
            {reservedDates[selectedDate]?.dotColor === "green" && (
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={handleConfirmReservation}
                disabled={
                  !selectedReservations.some(
                    (reservation) => reservation.checked
                  )
                }
              >
                <Text style={styles.confirmButtonText}>VAHVISTA VARAUS</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    </View>
  );
}