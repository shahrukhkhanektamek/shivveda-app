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

export function CreatePasswordScreen({ navigation, route, extraData=[] }) {

  const user_id = route.params.user_id;
  
  const [password, setPassword] = useState(''); 
  const [cpassword, setCpassword] = useState(''); 

   

  const handleLogin = async () => {
    // if (!username || !password) {
    //   Alert.alert('Error', 'Please enter username and password');
    //   return;
    // }
    const filedata = {
      "username":user_id,
      "npassword":password,
      "cpassword":cpassword
    };
    const response = await postData(filedata, urls.createPassword,"POST", navigation,extraData);
    

  };


  return (
    <View style={theme.authBackground} >
      <View style={theme.authcontainer}>

        <Image source={require('../../assets/logo.png')}  />        

        <Text style={theme.authtitle}>Create Password</Text>

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

        <View style={theme.authinputContainer}>
          <Icon name="lock" size={20} style={theme.authinputIcon} />
          <TextInput
            style={theme.authinput}
            placeholder="Confirm Password"
            placeholderTextColor="#999"
            secureTextEntry
            value={cpassword}
            onChangeText={setCpassword}
          />
        </View>

        

        <LinearGradient
          colors={GradientStyles.auth.colors}
          style={theme.authbutton}
        >
          <TouchableOpacity style={theme.button} onPress={handleLogin}>
            <Text style={theme.authbuttonText}>Submit</Text>
          </TouchableOpacity>
        </LinearGradient>



      </View>
    </View>
  );
}