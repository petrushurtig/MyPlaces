import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import MapView, { Marker} from 'react-native-maps';
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
import * as Location from 'expo-location';

const Stack = createStackNavigator();

export default function MapScreen({route, navigation}) {
    const [lat, setLat] = useState(null);
    const [long, setLong] = useState(null); 
    const { address } = route.params;
    address.split('');
    console.log(address)
    useEffect(() => {
        getRegion();
    }, []);

    const getRegion = () => {
        var url = "http://www.mapquestapi.com/geocoding/v1/address?key=ntGiB5xeGwAEUqKTkfmUsT5MSjlIj0De&location=" + address.replace(/\s+/g, ',');
        fetch(url)
        .then((res) => res.json())
        .then((res) => {
            console.log(url)
          setLat(Number(res.results[0].locations[0].latLng.lat));
          console.log("lat" + lat);
          setLong(Number(res.results[0].locations[0].latLng.lng));
          console.log("long" + long)
        })
    }
   const [number1, number2] = [Number(lat), Number(long)];

    return (
        <View style={styles.container}>
          <MapView 
          style={{   height:'80%', width:'90%' }}
          region={{
            latitude: number1,
            longitude: number2,
            latitudeDelta: 0.0322,
            longitudeDelta: 0.0221,
            }} >
            <Marker
            coordinate={{
            latitude: number1,
            longitude: number2}}
            pinColor="red"
            title={address}
            ></Marker>
          </MapView>
          <View style={{width:'90%', margin:5}}>
          <Button onPress={getRegion} title="Show"></Button>
          </View>
        </View>
      );
    
        }
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      }
    });
