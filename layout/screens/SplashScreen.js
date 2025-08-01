
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { MMKV } from 'react-native-mmkv';
const storage = new MMKV();

export function SplashScreen ({ navigation }) {

  let initialRoute2 = null;
  const token = storage.getString('token');
  if(token) initialRoute2 = 'Home';
  else initialRoute2 = 'Login';


  useEffect(() => {
    // Navigate to HomeScreen after 2 seconds 
    setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: initialRoute2 }], 
      });
    }, 2000);
  }, [navigation]);

  return (

    
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />      
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff', // Background color for splash
  },
  logo: {
    width: 200,
    height: 200, // Set the size of the logo
    marginBottom: 20,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
});
