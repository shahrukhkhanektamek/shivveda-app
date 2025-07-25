import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  RefreshControl,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Picker } from '@react-native-picker/picker';
import theme from '../../StyleSheet/theme';

import PageHeader from '../../navBar/pageHeader';

import LinearGradient from 'react-native-linear-gradient';
import GradientStyles from '../../StyleSheet/GradientStyles';

import PackagePicker from '../../component/PackagePicker';
import { postData, apiUrl } from '../../component/api';
const urls=apiUrl();

export function AccountActivationScreen({ navigation, extraData=[] }){


  const [selectedPackage, setSelectedPackage] = useState("Select Package");
  const [data, setData] = useState([]);
  const [sponser_id, setsponser_id] = useState('');
  const [sponser_name, setsponser_name] = useState('');
  const [sponser, setSponser] = useState('');

  const handleValueChange = (itemValue) => {
    setSelectedPackage(itemValue);
  };

  const fetchData = async () => {
    try {
      const response = await postData({}, urls.walletList, "GET", navigation, extraData);
      if(response.status==200)
      {
        const data = response.data; 
        setData(data)
      } 
    } catch (error) {
      console.error("API call failed:", error);
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
  const handleSubmit = async () => {
    try {
      const response = await postData({"member_id":sponser_id,"package":selectedPackage}, urls.accountActivation, "POST", navigation, extraData);
      if(response.status==200)
      {
        const data = response.data; 
        setSponser([])
        navigation.navigate("Home")
      }
    } catch (error) {
      console.error("API call failed:", error);
    }
  };



  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setRefreshing(false);
    fetchData();
  }, []);
  useEffect(() => {
    fetchData(); 
  }, []); 


  return (
    <View flex={1}>
      <PageHeader pageTitle="Account Activation" navigation={navigation} />
      <ScrollView style={theme.themeBg} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>

        <View style={styles.header}>
            <View style={styles.headerInfo}>
                <View style={theme.alertBox}>
                    <Icon name="inr" size={24} color="#FFA500" />
                    <Text style={theme.alertText}>{data.commision_wallet}</Text>
                </View>
            </View> 
        </View>
        {/* Action Buttons */}
        


        <View style={[theme.row]}>
            
            
            <View style={[theme.col6]}>
              <View style={theme.inputContainer}>
                <Icon name="star" size={20} style={theme.inputIcon} />
                <TextInput
                  style={theme.input}
                  placeholder="Member ID."
                  placeholderTextColor="#999"
                  onChangeText={ (text) => fetchSponserDetail(text)}
                  keyboardType='numeric'
                />
              </View>
            </View>


            <View style={[theme.col6]}>
              <View style={theme.inputContainer}>
                <Icon name="user" size={20} style={theme.inputIcon} />
                <TextInput
                  style={theme.input}
                  placeholder="Member Name"
                  placeholderTextColor="#999"
                  value={sponser?.name}
                  keyboardType='default'
                />
              </View>
            </View>


           

            <View style={[theme.col12]}>
              <PackagePicker style={[theme.inputContainer]} selectedPackage={selectedPackage} setSelectedPackage={setSelectedPackage} extraData={extraData} />              
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

