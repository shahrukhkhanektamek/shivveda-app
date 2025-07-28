import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import theme from '../../StyleSheet/theme';

import PageHeader from '../../navBar/pageHeader';

import LinearGradient from 'react-native-linear-gradient';
import GradientStyles from '../../StyleSheet/GradientStyles';

import { postData, apiUrl, showSuccessMessage } from '../../component/api';
const urls=apiUrl();

import CountryPicker from '../../component/CountryPicker';
import PlacementPicker from '../../component/PlacementPicker';
import StatePicker from '../../component/StatePicker';



export function NewRegisterScreen({ navigation, extraData=[] }){


  const [selectedCountry, setSelectedCountry] = useState();
  const [selectedState, setSelectedState] = useState();
  const [sponser_id, setsponser_id] = useState();
  const [sponser_name, setsponser_name] = useState();
  const [sponser, setSponser] = useState('');
  const [selectedPlacement, setSelectedPlacement] = useState();
  const [name, setname] = useState();
  const [lname, setlname] = useState();
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
        "lname":lname,
        "email":email,
        "phone":phone,
        "address":address,
        "country":selectedCountry,
        "state":selectedState,
        "city":city,
        "password":password,
        "confirm_password":cpassword
    };

    
    if(!sponser_id) showSuccessMessage("Wrong Sponser ID", extraData, 0);
    else if(!name) showSuccessMessage("Enter Name", extraData, 0);
    else if(!phone) showSuccessMessage("Enter Phone", extraData, 0);
    else if(!password) showSuccessMessage("Enter Password", extraData, 0);
    else if(!confirm_password) showSuccessMessage("Enter Confirm Password", extraData, 0);

    return false;

    const response = await postData(filedata, urls.newRegister,"POST", navigation,extraData);
    if(response.status==200)
    {
      navigation.navigate("Home")
    }
  };

  const fetchSponserDetail = async (sponser_id) => {
    try {
      setSponser([])
      setsponser_id()
      if(!sponser_id) return false;
      const response = await postData({"sponser_id":sponser_id}, urls.checkSponser, "POST", navigation, extraData);
      if(response.status==200)
      {
        const data = response.data; 
        setSponser(data)
        setsponser_id(sponser_id)
      }
      else{
        setSponser([])
      }
    } catch (error) {
      console.error("API call failed:", error);
    }
  };




  return (
    <View flex={1}>
      <PageHeader pageTitle="New Register" navigation={navigation} />
      <ScrollView style={theme.themeBg}>
    


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
                onChangeText={ (text) => fetchSponserDetail(text)}
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
                value={sponser?.name}
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
              <Icon name="user" size={20} style={theme.inputIcon} />
              <TextInput
                style={theme.input}
                placeholder="Last Name"
                placeholderTextColor="#999"
                value={lname}
                onChangeText={setlname}
              />
            </View>
          </View>

          <View style={[theme.col12]}>
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
            <CountryPicker style={[theme.inputContainer]}
             selectedCountry={selectedCountry} 
             setSelectedCountry={setSelectedCountry}
             extraData={extraData}
              />
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

          <View style={[theme.col6]}>
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

          <View style={[theme.col6]}>
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
              <Text style={theme.authbuttonText}>Submit</Text>
            </TouchableOpacity>
          </LinearGradient>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // paddingHorizontal: 16,
  },
  settingIcon:{
    position:'absolute',
    right:0,
    top:0
  },
  header: {
    flexDirection: 'row',
    // marginTop: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileImageSection:{
    textAlign:'center',
    alignItems:'center'
  },
  headerInfo: {
    marginLeft: 0,
    flex: 1,
    backgroundColor:'#f0eff5',
    marginLeft:-16,
    marginRight:-16,
    paddingHorizontal:25,
    paddingVertical:50
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign:'center',
    marginTop:15
  },
  title: {
    color: '#666',
    marginVertical: 4,
    textAlign:'center'
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 8,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#666',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
    alignItems:'center'
  },
  actionButton: {
    alignItems: 'center',
  },
  actionLabel: {
    marginTop: 4,
    fontSize: 12,
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  aboutText: {
    color: '#666',
  },
  friendItem: {
    marginRight: 16,
    alignItems: 'center',
  },
  friendImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  friendName: {
    marginTop: 4,
    fontSize: 12,
    textAlign: 'center',
  },
  photoItem: {
    width: 100,
    height: 100,
    margin: 4,
  },
});

