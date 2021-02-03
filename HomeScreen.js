import React, { useState, useEffect, useRef} from 'react';
import { StyleSheet, Text, View, FlatList, TextInput } from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
import { Header, Input, Button, Icon, ListItem, ThemeProvider } from 'react-native-elements';
import * as SQLite from 'expo-sqlite';

const Stack = createStackNavigator();
const db = SQLite.openDatabase('placesdb.db');

export default function HomeScreen({navigation}) {
    const [address, setAddress] = useState('');
    const [places, setPlaces] = useState([]);  

    useEffect(() => {
        db.transaction(tx => {
          tx.executeSql('create table if not exists places (id integer primary key not null, address text);');
        }, null, updateList);
      }, []);
      
      const saveItem = () => {
        db.transaction(tx => {
          tx.executeSql('insert into places (address) values (?);', [address]);
        }, null, updateList)
      }
      
      const updateList = () => {
        db.transaction(tx => {
          tx.executeSql('select * from places;', [], (_, { rows }) => 
          setPlaces(rows._array)
          );
        });
      }
      
      const deleteItem = (id) => {
        db.transaction(
          tx => {
            tx.executeSql('delete from places where id = ?;', [id]);
          }, null, updateList
        )
      }
      
      const listSeparator = () => {
        return (
          <View
          style={{
            height:5,
            width: '80%',
            backgroundColor: '#fff',
            marginLeft: '10%'
          }}/>
        );
      };
      const renderItem = ({ item }) => (
      
        <ListItem bottomDivider onLongPress={() => deleteItem(item.id)} >
          <ListItem.Content>
              <View style={{
                  width: 320,
                  paddingVertical:15,
                  paddingHorizontal: 10,
                  flexDirection: 'row',
                  justifyContent:'space-between',  
              }}>
            <ListItem.Subtitle style={{fontWeight:'bold'}}>{item.address}</ListItem.Subtitle>
            <ListItem.Subtitle>show on map</ListItem.Subtitle>
            <ListItem.Chevron color="blue"  onPress={() => navigation.navigate('Map', {address: item.address})}><Text style={{color:"yellow"}}>"sdf"</Text></ListItem.Chevron>
            </View>
          </ListItem.Content>
        </ListItem>
       
      )
     
    return (
    <ThemeProvider>
        <View style={styles.container}>
        
        <Input
            style={{ borderBottomColor:'blue', borderBottomWidth:1}}
            placeholder="Type in address"
            label="PLACEFINDER"
            onChangeText={(address) => setAddress(address)}
            value={address}></Input>
        
        <View style={{ width:'90%'}}>
        <Button raised icon={{type:'material', name: 'save', color: 'white', size: 30,}} title='Save' onPress={saveItem} />
        </View>
        <FlatList
            style={{margin: '5%', width:'90%'}}
            keyExtractor={item => item.id.toString()}
            data={places}
            ItemSeparatorComponent={listSeparator}
            renderItem ={renderItem}></FlatList>
        </View>
    </ThemeProvider>
    );
    };
const styles = StyleSheet.create({
    container: {
      padding:5,  
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });