import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Header, Input, Button, Icon, ListItem, ThemeProvider } from 'react-native-elements';
import MapView, { Marker} from 'react-native-maps';
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';


import HomeScreen from './HomeScreen';
import MapScreen from './MapScreen';




export default function App() {


const Stack = createStackNavigator();


  return (
    
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="My Places" component={HomeScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}


