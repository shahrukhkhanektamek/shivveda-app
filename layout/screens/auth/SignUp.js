import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';

import theme from '../../StyleSheet/theme';
import GradientStyles from '../../StyleSheet/GradientStyles';
import CountryPicker from '../../component/CountryPicker';
import PlacementPicker from '../../component/PlacementPicker';
import StatePicker from '../../component/StatePicker';

import { postData, apiUrl } from '../../component/api';
const urls=apiUrl();


export function SignUpScreen({ navigation, extraData=[] }) {


  const [selectedCountry, setSelectedCountry] = useState();
  const [selectedState, setSelectedState] = useState();
  const [sponser_id, setsponser_id] = useState();
  const [sponser_name, setsponser_name] = useState();
  const [selectedPlacement, setSelectedPlacement] = useState();
  const [name, setname] = useState();
  const [email, setemail] = useState();
  const [phone, setphone] = useState();
  const [address, setaddress] = useState();
  const [city, setcity] = useState();
  const [password, setpassword] = useState();
  const [cpassword, setcpassword] = useState();
  


  const handleSubmit = async () => {
    const filedata = {
        "sponser_id":sponser_id,
        "placement":selectedPlacement,
        "name":name,
        "email":email,
        "phone":phone,
        "address":address,
        "country":selectedCountry,
        "state":selectedState,
        "city":city,
        "password":password,
        "cpassword":cpassword
    };
    const response = await postData(filedata, urls.registerOtpSend,"POST", navigation,extraData);
    if(response.status==200)
    {
      navigation.navigate('RegisterOtp',{"id":response.data.id});
    }

  };
 

  return (
    <View style={theme.authBackground} >
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={theme.authcontainer}>

        <Image source={require('../../assets/logo.png')}  />
        <Text style={theme.authtitle}>Create Account!</Text>


        <View style={[theme.row]}>
          

          <View style={[theme.col12]}>
            <PlacementPicker style={[theme.inputContainer]} selectedPlacement={selectedPlacement} setSelectedPlacement={setSelectedPlacement} />            
          </View>
          
          <View style={[theme.col6]}>
            <View style={theme.inputContainer}>
              <Icon name="star" size={20} style={theme.inputIcon} />
              <TextInput
                style={theme.input}
                placeholder="Sponser ID."
                placeholderTextColor="#999"
                value={sponser_id}
                onChangeText={setsponser_id}
              />
            </View>
          </View>


          <View style={[theme.col6]}>
            <View style={theme.inputContainer}>
              <Icon name="star" size={20} style={theme.inputIcon} />
              <TextInput
                style={theme.input}
                placeholder="Sponser Name"
                placeholderTextColor="#999"
                value={sponser_name}
                onChangeText={setsponser_name}
              />
            </View>
          </View>


          
          <View style={[theme.col6]}>
            <View style={theme.inputContainer}>
              <Icon name="user" size={20} style={theme.inputIcon} />
              <TextInput
                style={theme.input}
                placeholder="Name"
                placeholderTextColor="#999"
                value={name}
                onChangeText={setname}
              />
            </View>
          </View>

          <View style={[theme.col6]}>
            <View style={theme.inputContainer}>
              <Icon name="envelope" size={20} style={theme.inputIcon} />
              <TextInput
                style={theme.input}
                placeholder="Email"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setemail}
              />
            </View>
          </View>


          <View style={[theme.col6]}>
            <CountryPicker style={[theme.inputContainer]} selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} />            
          </View>

          <View style={[theme.col6]}>
            <View style={theme.inputContainer}>
              <Icon name="phone" size={20} style={theme.inputIcon} />
              <TextInput
                style={theme.input}
                placeholder="Mobile"
                placeholderTextColor="#999"
                value={phone}
                onChangeText={setphone}
              />
            </View>
          </View>

          
          <View style={[theme.col6]}>
              <StatePicker style={[theme.inputContainer]}
                selectedState={selectedState} 
                setSelectedState={setSelectedState}
                extraData={extraData}
              />
          </View>

          <View style={[theme.col6]}>
            <View style={theme.inputContainer}>
              <Icon name="map" size={20} style={theme.inputIcon} />
              <TextInput
                style={theme.input}
                placeholder="City"
                placeholderTextColor="#999"
                value={city}
                onChangeText={setcity}
              />
            </View>
          </View>

          <View style={[theme.col12]}>
            <View style={theme.inputContainer}>
              <Icon name="home" size={20} style={theme.inputIcon} />
              <TextInput
                style={theme.input}
                placeholder="Address"
                placeholderTextColor="#999"
                value={address}
                onChangeText={setaddress}
              />
            </View>
          </View>

          <View style={[theme.col12]}>
            <View style={theme.authinputContainer}>
              <Icon name="lock" size={20} style={theme.inputIcon} />
              <TextInput
                style={theme.authinput}
                placeholder="Password"
                placeholderTextColor="#999"
                secureTextEntry
                value={password}
                onChangeText={setpassword}
              />
            </View>
          </View>

          <View style={[theme.col12]}>
            <View style={theme.authinputContainer}>
              <Icon name="lock" size={20} style={theme.inputIcon} />
              <TextInput
                style={theme.authinput}
                placeholder="Confirm Password"
                placeholderTextColor="#999"
                secureTextEntry
                value={cpassword}
                onChangeText={setcpassword}
              />
            </View>
          </View>


        </View>



        

        <LinearGradient
          colors={GradientStyles.auth.colors}
          style={theme.authbutton}
        >
          <TouchableOpacity style={theme.button} onPress={handleSubmit}>
            <Text style={theme.authbuttonText}>Create Account</Text>
          </TouchableOpacity>
        </LinearGradient>




      </View>
      </ScrollView>

    </View>
  );
}