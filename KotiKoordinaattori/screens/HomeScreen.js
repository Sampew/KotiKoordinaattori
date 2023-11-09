import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Button,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

export default function HomeScreen() {
    const navigation = useNavigation();

    const saunaScreen = () => {
        navigation.navigate('Saunavuoro'); 
      };

      const vahinkoScreen = () => {
        navigation.navigate('VahinkoIlmoitusTaulu'); 
      };

      const pyykkiScreen = () => {
        navigation.navigate('PyykkiVaraus'); 
      };

      const ilmoitusScreen = () => {
        navigation.navigate('IlmoitusTaulu'); 
      };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.mainContent}>
        <Text style={styles.welcomeText}>Tervetuloa KotiKoordinaattoriin</Text>      
        <View style={styles.buttonGroup}>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.customButton} onPress={saunaScreen}>
              <Text style={styles.buttonText}>VARAA SAUNAVUORO</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.customButton} onPress={ilmoitusScreen}>
              <Text style={styles.buttonText}>ILMOITUSTAULU</Text>
            </TouchableOpacity>
            </View>
            <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.customButton} onPress={pyykkiScreen}>
              <Text style={styles.buttonText}>VARAA PYYKKIVUORO</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.customButton} onPress={vahinkoScreen}>
              <Text style={styles.buttonText}>TEE VAHINKOILMOITUS</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgray',
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonGroup: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  buttonSeparator: {
    width: 10,
  },
  welcomeText: {
    fontSize: 24,
    color: 'cornflowerblue',
    bottom: 150
  },
  customButton: {
    backgroundColor: 'cornflowerblue',
    width: 200,
    height: 40,
    borderRadius: 5,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  }
});
