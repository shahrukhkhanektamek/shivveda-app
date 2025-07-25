import React, {useState} from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
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
  const [opassword, setOpassword] = useState('');



  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);




  const handleSubmit = async () => {
    const filedata = {
      "password":password,
      "cpassword":cpassword,
      "opassword":opassword,
    };
    const response = await postData(filedata, urls.updatePassword,"POST", navigation,extraData);
    if(response.status==200)    
    {
      setPassword('');
      setCpassword('');
      setOpassword('');
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
              placeholder="Old Password"
              placeholderTextColor="#999"
              secureTextEntry={!showPassword}
              value={opassword}
              onChangeText={setOpassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Icon
                name={showPassword ? 'eye' : 'eye-slash'}
                size={20}
                style={theme.authinputIcon}
              />
            </TouchableOpacity>
          </View>

          <View style={theme.authinputContainer}>
            <Icon name="lock" size={20} style={theme.authinputIcon} />
            <TextInput
              style={theme.authinput}
              placeholder="New Password"
              placeholderTextColor="#999"
              secureTextEntry={!showNewPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)}>
              <Icon
                name={showNewPassword ? 'eye' : 'eye-slash'}
                size={20}
                style={theme.authinputIcon}
              />
            </TouchableOpacity>
          </View>

          <View style={theme.authinputContainer}>
            <Icon name="lock" size={20} style={theme.authinputIcon} />
            <TextInput
              style={theme.authinput}
              placeholder="Confirm Password"
              placeholderTextColor="#999"
              secureTextEntry={!showConfirmPassword}
              value={cpassword}
              onChangeText={setCpassword}
            />
            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              <Icon
                name={showConfirmPassword ? 'eye' : 'eye-slash'}
                size={20}
                style={theme.authinputIcon}
              />
            </TouchableOpacity>
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

const styles = StyleSheet.create({
  
  authinputContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 5,
  paddingHorizontal: 10,
  marginBottom: 10,
},

authinput: {
  flex: 1,
  padding: 10,
  color: '#000',
},

authinputIcon: {
  marginHorizontal: 8,
  color: '#999',
},


});
