import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import theme from '../../StyleSheet/theme';
import GradientStyles from '../../StyleSheet/GradientStyles';

import { postData, apiUrl } from '../../component/api';
const urls=apiUrl();


export function RegisterOtpScreen({ navigation, route, extraData=[] }) {

  const id=route.params.id;
  const otpLength = 4; // Number of OTP digits
  const [otp, setOtp] = useState(Array(otpLength).fill(''));
  const inputs = useRef([]);

  const handleChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Automatically move to the next input
    if (text && index < otpLength - 1) {
      inputs.current[index + 1].focus();
    }
  };

  const handleBackspace = (text, index) => {
    if (text === '' && index > 0) {
      inputs.current[index - 1].focus();
    }
  };



  let otp2 = otp.join('');
  const handleOtp = async () => {
    const filedata = {
      "id":id,
      "otp":otp2,
    };
    const response = await postData(filedata, urls.register,"POST", navigation,extraData);
    // if(response.status==200 && response.action!='register')
    // {
    //   navigation.navigate('CreatePassword',{"user_id":response.data.user_id})
    // }
  };

  return (
    <View style={theme.authBackground} >
      <View style={theme.authcontainer}>

        <Image source={require('../../assets/logo.png')}  />        

        <Text style={theme.authtitle}>Enter Otp!</Text>



        <View style={styles.inputContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputs.current[index] = ref)}
            style={styles.input}
            keyboardType="numeric"
            maxLength={1}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === 'Backspace') {
                handleBackspace(text, index);
              }
            }}
          />
        ))}
      </View>
      


        <LinearGradient
          colors={GradientStyles.auth.colors}
          style={theme.authbutton}
        >
          <TouchableOpacity style={theme.button} onPress={handleOtp}>
            <Text style={theme.authbuttonText}>Submit Otp</Text>
          </TouchableOpacity>
        </LinearGradient>




       
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    width: 50,
    height: 50,
    textAlign: 'center',
    fontSize: 18,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    marginHorizontal: 5,
  },
  otpText: {
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
});