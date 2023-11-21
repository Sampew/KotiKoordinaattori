import React from 'react';
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
          name="KotiKoordinaattori"
          component={HomeScreen}
          options={{
            headerStyle: {
              backgroundColor: 'cornflowerblue',
            },
            headerTitleStyle: {
              fontSize: 24,
              color: 'black',
            },
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
            },
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
          <Stack.Screen name="PorssiSahko" component={SahkoScreen} options={{
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