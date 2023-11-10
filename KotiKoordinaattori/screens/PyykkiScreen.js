import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import CheckBox from 'expo-checkbox'
import { Calendar, LocaleConfig } from 'react-native-calendars';

LocaleConfig.locales['fi'] = {
  monthNames: ['Tammikuu', 'Helmikuu', 'Maaliskuu', 'Huhtikuu', 'Toukokuu', 'Kesäkuu', 'Heinäkuu', 'Elokuu', 'Syyskuu', 'Lokakuu', 'Marraskuu', 'Joulukuu'],
  monthNamesShort: ['Tammi', 'Helmi', 'Maalis', 'Huhti', 'Touko', 'Kesä', 'Heinä', 'Elo', 'Syys', 'Loka', 'Marras', 'Joulu'],
  dayNames: ['Sunnuntai', 'Maanantai', 'Tiistai', 'Keskiviikko', 'Torstai', 'Perjantai', 'Lauantai'],
  dayNamesShort: ['Su', 'Ma', 'Ti', 'Ke', 'To', 'Pe', 'La'],
};

LocaleConfig.defaultLocale = 'fi';

export default function PyykkiScreen() {
  const navigation = useNavigation();
  const [reservedDates, setReservedDates] = useState({
    '2023-11-10': { marked: true, dotColor: 'red', selected: true, selectedColor: 'blue', reservations: ['09:00', '13:00'] },
    '2023-11-15': { marked: true, dotColor: 'red', reservations: ['10:00', '14:00'] },
  });
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedReservations, setSelectedReservations] = useState([]);
  const [confirmedReservations, setConfirmedReservations] = useState([]);

  const handleDayPress = (day) => {
    const selectedDay = reservedDates[day.dateString];

    setSelectedDate(day.dateString);
    setSelectedReservations(selectedDay ? selectedDay.reservations.map((time) => ({ time, checked: false })) : []);
  };

  const handleCheckboxToggle = (index) => {
    const updatedReservations = [...selectedReservations];
    updatedReservations[index].checked = !updatedReservations[index].checked;
    setSelectedReservations(updatedReservations);
  };

  const handleConfirmReservation = () => {
    const confirmedTimes = selectedReservations
      .filter((reservation) => reservation.checked)
      .map((reservation) => ({
        date: selectedDate,
        time: reservation.time,
      }));

    setConfirmedReservations(confirmedTimes);
    console.log('Varattu aika:', confirmedTimes);
    alert('Vuoro varattu')
    navigation.navigate('KotiKoordinaattori', { confirmedReservations: confirmedTimes });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pyykki Screen</Text>
      <View style={styles.content}>
        <Calendar onDayPress={handleDayPress} markedDates={reservedDates} />
        {selectedDate && (
          <View style={styles.selectedDateContainer}>
            <Text style={styles.selectedDateText}>{`Avoimet vuorot ${selectedDate}:`}</Text>
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
            <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmReservation}>
              <Text style={styles.confirmButtonText}>VAHVISTA VARAUS</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
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
