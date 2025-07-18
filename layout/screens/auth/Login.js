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

export function LoginScreen({ navigation, extraData=[] }) {


  const [username, setUsername] = useState('');
  const [password, setPassword] = useState(''); 

   extraData = Object.assign(extraData, {"user":{
        "setUsername":setUsername,
        "setPassword":setPassword,
      },});

  const handleLogin = async () => {
    // if (!username || !password) {
    //   Alert.alert('Error', 'Please enter username and password');
    //   return;
    // }
    const filedata = {
      "username":username,
      "password":password
    };
    const response = await postData(filedata, urls.login,"POST", navigation,extraData);

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

        <View style={theme.authinputContainer}>
          <Icon name="lock" size={20} style={theme.authinputIcon} />
          <TextInput
            style={theme.authinput}
            placeholder="Password"
            placeholderTextColor="#999"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <View style={theme.authrow}>
          <TouchableOpacity onPress={() => navigation.navigate('Forgot')}>
            <Text style={theme.authforgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <LinearGradient
          colors={GradientStyles.auth.colors}
          style={theme.authbutton}
        >
          <TouchableOpacity style={theme.button} onPress={handleLogin}>
            <Text style={theme.authbuttonText}>Sign in Account</Text>
          </TouchableOpacity>
        </LinearGradient>




        <Text style={theme.authsignupText}>
          If you have no account{' '}
          <Text style={theme.authsignupLink} onPress={() => navigation.navigate('SignUp')}>
            Sign Up
          </Text>
        </Text>
      </View>
    </View>
  );
}