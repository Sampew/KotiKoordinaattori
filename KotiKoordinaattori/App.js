import React from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import SaunavuoroScreen from './screens/SaunaScreen';
import IlmoitusTauluScreen from './screens/IlmoitusTauluScreen';
import PyykkiScreen from './screens/PyykkiScreen';
import VahinkoIlmoitusScreen from './screens/VahinkoIlmoitusScreen';
import SahkoScreen from './screens/SahkoScreen';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="KotiKoordinaattori">
        <Stack.Screen
          name=' '
          component={HomeScreen}
          options={{
            headerStyle: {
              backgroundColor: 'cornflowerblue',
              headerTitle: null,
            },
            headerLeft: () => (
              <Image
                source={require('./assets/KotiKoordinaattori_Logo2.png')}
                style={{ 
                  width: 120,
                  height: 100,
                  marginLeft: 10,
                  resizeMode: 'contain',
                  position: 'absolute',
                  top: -50, 
                  left: 0,
                }}
              />
            ),
          }}
        />
        <Stack.Screen name="Saunavuoro" component={SaunavuoroScreen} options={{
            headerStyle: {
              backgroundColor: 'cornflowerblue',
            },
            headerTitleStyle: {
              fontSize: 24,
              color: 'black',
            },
          }} />
        <Stack.Screen name="IlmoitusTaulu" component={IlmoitusTauluScreen} options={{
            headerStyle: {
              backgroundColor: 'cornflowerblue',
            },
            headerTitleStyle: {
              fontSize: 24,
              color: 'black',
            }
          }}/>
        <Stack.Screen name="PyykkiVaraus" component={PyykkiScreen} options={{
            headerStyle: {
              backgroundColor: 'cornflowerblue',
            },
            headerTitleStyle: {
              fontSize: 24,
              color: 'black',
            },
          }}/>
        <Stack.Screen name="VahinkoIlmoitusTaulu" component={VahinkoIlmoitusScreen} options={{
            headerStyle: {
              backgroundColor: 'cornflowerblue',
            },
            headerTitleStyle: {
              fontSize: 24,
              color: 'black',
            },
          }}/>
          <Stack.Screen name="PörssiSähkö" component={SahkoScreen} options={{
            headerStyle: {
              backgroundColor: 'cornflowerblue',
            },
            headerTitleStyle: {
              fontSize: 24,
              color: 'black',
            },
          }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}