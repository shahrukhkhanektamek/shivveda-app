import React, {useState} from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';

import theme from '../../StyleSheet/theme';
import GradientStyles from '../../StyleSheet/GradientStyles';
import PageHeader from '../../navBar/pageHeader';

import { postData, apiUrl } from '../../component/api';
const urls=apiUrl();


export function ChangePassword({ navigation, extraData=[] }) {

  const [password, setPassword] = useState(''); 
  const [cpassword, setCpassword] = useState(''); 

  const handleSubmit = async () => {
    const filedata = {
      "password":password,
      "cpassword":cpassword
    };
    const response = await postData(filedata, urls.updatePassword,"POST", navigation,extraData);
    if(response.status==200)    
    {
      setPassword('');
      setCpassword('');
      navigation.navigate('Home');
    }

  };

  return (
      <View flex={1}>
        
        <PageHeader pageTitle="Change Password" navigation={navigation} />

        <ScrollView>
          <View style={theme.container}>

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
              <TouchableOpacity style={theme.button} onPress={handleSubmit}>
                <Text style={theme.authbuttonText}>Update Password</Text>
              </TouchableOpacity>
            </LinearGradient>

          </View>
          
        </ScrollView>
      </View>
    
  );
}
