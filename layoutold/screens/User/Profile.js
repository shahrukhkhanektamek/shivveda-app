import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  RefreshControl
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Picker } from '@react-native-picker/picker';
import theme from '../../StyleSheet/theme';

import PageHeader from '../../navBar/pageHeader';

import LinearGradient from 'react-native-linear-gradient';
import GradientStyles from '../../StyleSheet/GradientStyles';

import CountryPicker from '../../component/CountryPicker';
import StatePicker from '../../component/StatePicker';

import { postData, apiUrl } from '../../component/api';
const urls=apiUrl();

export function ProfileScreen({ navigation, extraData=[] }){


  



  const [selectedCountry, setSelectedCountry] = useState();
  const [selectedState, setSelectedState] = useState();
  const [name, setname] = useState();
  const [lname, setlname] = useState();
  const [email, setemail] = useState();
  const [phone, setphone] = useState();
  const [address, setaddress] = useState();
  const [city, setcity] = useState();
  const [user_id, setuser_id] = useState();
  


  const handleSubmit = async () => {  
    try {

        const filedata = {
          "name":name,
          "lname":lname,
          "email":email,
          // "phone":phone,
          "address":address,
          "country":selectedCountry,
          "state":selectedState,
          "city":city
      };
    
      // console.log(filedata);

        const response = await postData(filedata, urls.updateProfile, "POST", navigation, extraData);
        if(response.status==200)
            {
                const data = response.data;
                setData(data);
            }
        } catch (error) {
            console.error("API call failed:", error);
        }
  };
    
    
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false); 
  const fetchData = async () => { 
      try {
        const response = await postData({}, urls.getProfile, "GET", navigation, extraData);
        if(response.status==200)
        {
          const data = response.data; 
          setData(data);
          setname(data.name)
          setlname(data.lname)
          setemail(data.email) 
          setphone(data.phone) 
          setaddress(data.address)
          setSelectedState(data.state)
          setcity(data.city)
          setuser_id(data.user_id)
        } 
      } catch (error) {
        console.error("API call failed:", error);
      }
  };
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setRefreshing(false);
    fetchData()
  }, []);
  useEffect(() => {
      fetchData();
  }, []);
  const handleLoadMore = () => {
      fetchData();
  };





  


  return (
    <View flex={1}>
      <PageHeader pageTitle="Profile" navigation={navigation} />
      <ScrollView style={theme.themeBg}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      showsVerticalScrollIndicator={false}
      >

        <View style={styles.header}>


          <View style={styles.headerInfo}>

              <View style={[theme.row, theme.m0]}>
                  <Icon name='cog' size={20} style={styles.settingIcon} onPress={() => navigation.navigate('Setting')} />
                  <View style={[theme.col2, styles.actions, theme.mt10]}>
                    
                  </View>
                  <View style={[theme.col8, styles.profileImageSection]}>
                      <Image
                      source={require('../../assets/user.jpg')}
                      style={styles.profileImage}
                      />
                      <Text style={styles.name}>{name}</Text>
                      <Text style={styles.title}>My ID.:- {user_id}</Text>
                  </View>
                  <View style={[theme.col2, styles.actions]}>
                      
                  </View>
              </View>

              {data.kyc_step!=1?              
                <View style={theme.alertBox}>
                  <Icon name="exclamation-circle" size={24} color="#FFA500" />
                  <View style={theme.alerttextContainer}>
                    <Text style={theme.alertText}>Complete your KYC to unlock all features.</Text>
                    <Text style={theme.alertsubText}>Your profile is incomplete.</Text>
                  </View>
                  <TouchableOpacity  style={theme.alertbutton} onPress={() => navigation.navigate('Kyc')}>
                    <Text style={theme.alertbuttonText}>Complete KYC</Text>
                  </TouchableOpacity>
                </View>
                :null
              }

              
          </View>
        </View>
        {/* Action Buttons */}
        


        <View style={[theme.row]}>
            
            
            {/* <View style={[theme.col6]}>
              <View style={theme.inputContainer}>
                <Icon name="star" size={20} style={theme.inputIcon} />
                <TextInput
                  style={theme.input}
                  placeholder="Sponser ID."
                  placeholderTextColor="#999"
                  editable={false}
                  value={data.sponser_id}
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
                  editable={false}
                  value={data.sponser_name}
                />
              </View>
            </View> */}


            
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
                  onChange={setemail}
                />
              </View>
            </View>

            <View style={[theme.col6]}>
              <CountryPicker 
                style={[theme.inputContainer]} 
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
                  onChange={setphone}
                  keyboardType='numeric'
                />
              </View>
            </View>

            <View style={[theme.col6]}>
              <StatePicker 
                style={[theme.inputContainer]} 
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
                  onChange={setcity}
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
                  onChange={setaddress}
                />
              </View>
            </View>

            


        </View>


        <LinearGradient
            colors={GradientStyles.auth.colors}
            style={theme.authbutton}
          >
            <TouchableOpacity style={theme.button} onPress={handleSubmit}>
              <Text style={theme.authbuttonText}>Update Profile</Text>
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

