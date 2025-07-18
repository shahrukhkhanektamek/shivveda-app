import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';

import theme from '../../StyleSheet/theme';
import GradientStyles from '../../StyleSheet/GradientStyles';

import { postData, apiUrl } from '../../component/api';
const urls=apiUrl();

export function ForgotScreen({ navigation, extraData=[] }) {
  const [username, setUsername] = useState('');

  const handleForgot = async () => {
    // if (!username || !password) {
    //   Alert.alert('Error', 'Please enter username and password');
    //   return;
    // }
    const filedata = {
      "username":username,
    };
    const response = await postData(filedata, urls.sendOtp,"POST", navigation,extraData);
    if(response.status==200)
    {
      navigation.navigate('Otp',{"id":response.data.id});
    }

  };

  return (
    <View style={theme.authBackground} >
      <View style={theme.authcontainer}>

        <Image source={require('../../assets/logo.png')}  />        

        <Text style={theme.authtitle}>Welcome Back!</Text>

        <View style={theme.authinputContainer}>
          <Icon name="user" size={20} style={theme.authinputIcon} />
          <TextInput
            style={theme.authinput}
            placeholder="Username"
            placeholderTextColor="#999"
            value={username}
            onChangeText={setUsername}
          />
        </View>

       
        

        <LinearGradient
          colors={GradientStyles.auth.colors}
          style={theme.authbutton}
        >
          <TouchableOpacity style={theme.button} onPress={handleForgot}>
            <Text style={theme.authbuttonText}>Send Otp</Text>
          </TouchableOpacity>
        </LinearGradient>




        <Text style={theme.authsignupText}>
          If you have account{' '}
          <Text style={theme.authsignupLink} onPress={() => navigation.navigate('Login')}>
            Login
          </Text>
        </Text>
      </View>
    </View>
  );
}