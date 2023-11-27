import React from 'react';
import { Image } from 'react-native';
import { NavigationContainer, DrawerActions} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './screens/HomeScreen';
import SaunavuoroScreen from './screens/SaunaScreen';
import IlmoitusTauluScreen from './screens/IlmoitusTauluScreen';
import PyykkiScreen from './screens/PyykkiScreen';
import VahinkoIlmoitusScreen from './screens/VahinkoIlmoitusScreen';
import SahkoScreen from './screens/SahkoScreen';
import {menuunfold} from 'antd'
const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();

/*
function kotiStackNavigator(){
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
}
*/


function KotiDrawer() {

  const toggleDrawer = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

  const screenOptions = {
    headerStyle: {
      backgroundColor: 'cornflowerblue',
    },
    headerRight: () => (
    <TouchableOpacity onPress={toggleDrawer}>
      <MenuUnfoldOutlined style={{ fontSize: '24px', color: '#000', marginRight: 10 }} />
    </TouchableOpacity>
    ),
  };

  return (
    <Drawer.Navigator initialRouteName="KotiKoordinaattori">
      <Stack.Screen
          name='KotiKoordinaattori'
          component={HomeScreen}
          options={{
            headerStyle: {
              backgroundColor: 'cornflowerblue',
              
            },
            headerRight: () => (
              <Image
                source={require('./assets/KotiKoordinaattori_Logo2.png')}
                style={{ 
                  width: 120,
                  height: 100,
                  marginLeft: 10,
                  resizeMode: 'contain',
                  position: 'relative',
                  top: 0, 
                  left: -160,
                }}
              />
            ),
            drawerLabel: 'Kotisivu',
            headerTitle: '',
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
            drawerLabel: 'Saunavuoron varaus',
            headerTitle: 'Saunavuoron varaus',
          }} />
        <Stack.Screen name="IlmoitusTaulu" component={IlmoitusTauluScreen} options={{
            headerStyle: {
              backgroundColor: 'cornflowerblue',
            },
            headerTitleStyle: {
              fontSize: 24,
              color: 'black',
            },
            drawerLabel: 'Ilmoitustaulu',
            headerTitle: 'Ilmoitustaulu',
          }}/>
        <Stack.Screen name="PyykkiVaraus" component={PyykkiScreen} options={{
            headerStyle: {
              backgroundColor: 'cornflowerblue',
            },
            headerTitleStyle: {
              fontSize: 24,
              color: 'black',
            },
            drawerLabel: 'Pyykkivuoron varaus',
            headerTitle: 'Pyykkivuoron varaus',
          }}/>
        <Stack.Screen name="VahinkoIlmoitusTaulu" component={VahinkoIlmoitusScreen} options={{
            headerStyle: {
              backgroundColor: 'cornflowerblue',
            },
            headerTitleStyle: {
              fontSize: 24,
              color: 'black',
            },
            drawerLabel: 'Vahinkoilmoitus',
            headerTitle: 'Vahinkoilmoitus',
          }}/>
          <Stack.Screen name="PörssiSähkö" component={SahkoScreen} options={{
            headerStyle: {
              backgroundColor: 'cornflowerblue',
            },
            headerTitleStyle: {
              fontSize: 24,
              color: 'black',
            },
            drawerLabel: 'Pörssisähkön hinta',
            headerTitle: 'Pörssisähkön hinta',
          }}/>
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <KotiDrawer/>
    </NavigationContainer>
  );
}