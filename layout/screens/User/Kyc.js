import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { launchImageLibrary } from 'react-native-image-picker';
import theme from '../../StyleSheet/theme';
import Footer from '../../navBar/footerBar';
import PageHeader from '../../navBar/pageHeader';

import LinearGradient from 'react-native-linear-gradient';
import GradientStyles from '../../StyleSheet/GradientStyles';


import AccounTypePicker from '../../component/AccounTypePicker';

import { postData, apiUrl } from '../../component/api';
const urls=apiUrl();


export function KycScreen({ navigation, extraData=[] }){


  const [kyc, setkyc] = useState([]);

  






  const [selectedAccountType, setSelectedAccountType] = useState();
  const [kycStatus, setkycStatus] = useState();
  const [bank_holder_name, setbank_holder_name] = useState();
  const [bank_name, setbank_name] = useState();
  const [account_number, setaccount_number] = useState();
  const [ifsc, setifsc] = useState();
  const [pan, setpan] = useState();
  const [rg_mobile, setrg_mobile] = useState();
  const [rg_email, setrg_email] = useState();
  const [address, setaddress] = useState();
  const filedata = {
      
  };


  const handleSubmit = async () => {  
    try {
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
    
    
  
  const [refreshing, setRefreshing] = useState(false);
  const fetchData = async () => {
      try {
        const response = await postData({}, urls.kycDetail, "GET", navigation, extraData);
        if(response.status==200)
        {
          const data = response.data; 
          setkycStatus(response.kycStatus);
          setkyc(data);
          setbank_holder_name(data.bank_holder_name);
          setbank_name(data.bank_name);
          setaccount_number(data.account_number);
          setifsc(data.ifsc);
          setpan(data.pan);
          setrg_mobile(data.rg_mobile);
          setrg_email(data.rg_email);
          setaddress(data.bank_holder_name);
          setSelectedAccountType(data.account_type);
                
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
        <PageHeader pageTitle="Kyc" navigation={navigation} />

        <ScrollView style={[theme.themeBg]}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        showsVerticalScrollIndicator={false}
        >

            <View style={[theme.row]}>
                
            {kycStatus==1?
                <View style={[theme.alertBox, theme.alertSuccess, theme.mt20]}>
                    <Icon name="check-circle" size={24} color="#FFA500" />
                    <View style={theme.alerttextContainer}>
                        <Text style={theme.alertText}>Your Kyc Is Approved. You can change your kyc.</Text>
                    </View>
                </View>
                :kycStatus==0?
                <View style={[theme.alertBox, theme.alertInfo, theme.mt20]}>
                    <Icon name="exclamation-circle" size={24} color="#FFA500" />
                    <View style={theme.alerttextContainer}>
                        <Text style={theme.alertText}>Update Your Kyc</Text>
                    </View>
                </View>
                :kycStatus==2?
                <View style={[theme.alertBox, theme.alertInfo, theme.mt20]}>
                    <Icon name="exclamation-circle" size={24} color="#FFA500" />
                    <View style={theme.alerttextContainer}>
                        <Text style={theme.alertText}>Your Kyc Is Under Review</Text>
                    </View>
                </View>
                :kycStatus==3?
                <View style={[theme.alertBox, theme.alertDanger, theme.mt20]}>
                    <Icon name="times-circle" size={24} color="#FFA500" />
                    <View style={theme.alerttextContainer}>
                        <Text style={theme.alertText}>Your Kyc Rejected!</Text>
                    </View>
                </View>
                :null
            }


                
                            
                <View style={[theme.col12]}>
                    <View style={theme.inputContainer}>
                    <Icon name="user" size={20} style={theme.inputIcon} />
                    <TextInput
                        style={theme.input}
                        placeholder="Your Name as per Bank Account"
                        placeholderTextColor="#999"
                        value={bank_holder_name}
                        onChangeText={setbank_holder_name}
                    />
                    </View>
                </View>

                <View style={[theme.col12]}>
                    <View style={theme.inputContainer}>
                    <Icon name="university" size={20} style={theme.inputIcon} />
                    <TextInput
                        style={theme.input}
                        placeholder="Bank Name"
                        placeholderTextColor="#999"
                        value={bank_name}
                        onChangeText={setbank_name}
                    />
                    </View>
                </View>

                <View style={[theme.col12]}>
                    <View style={theme.inputContainer}>
                    <Icon name="user" size={20} style={theme.inputIcon} />
                    <TextInput
                        style={theme.input}
                        placeholder="Account Number"
                        placeholderTextColor="#999"
                        value={account_number}
                        onChangeText={setaccount_number}
                    />
                    </View>
                </View>

                <View style={[theme.col6]}>
                <AccounTypePicker 
                    style={[theme.inputContainer]} 
                    selectedAccountType={selectedAccountType} 
                    setSelectedAccountType={setSelectedAccountType} 
                    extraData={extraData}
                />
                </View>

                <View style={[theme.col6]}>
                    <View style={theme.inputContainer}>
                    <Icon name="key" size={20} style={theme.inputIcon} />
                    <TextInput
                        style={theme.input}
                        placeholder="IFSC"
                        placeholderTextColor="#999"
                        value={ifsc}
                        onChangeText={setifsc}
                    />
                    </View>
                </View>

                <View style={[theme.col12]}>
                    <View style={theme.inputContainer}>
                    <Icon name="id-card" size={20} style={theme.inputIcon} />
                    <TextInput
                        style={theme.input}
                        placeholder="PAN Card"
                        placeholderTextColor="#999"
                        value={pan}
                        onChangeText={setpan}
                    />
                    </View>
                </View>
                
                <View style={[theme.col12]}>
                    <View style={theme.inputContainer}>
                    <Icon name="phone" size={20} style={theme.inputIcon} />
                    <TextInput
                        style={theme.input}
                        placeholder="Bank Registered Mobile"
                        placeholderTextColor="#999"
                        value={rg_mobile}
                        onChangeText={setrg_mobile}
                    />
                    </View>
                </View>

                <View style={[theme.col12]}>
                    <View style={theme.inputContainer}>
                    <Icon name="envelope" size={20} style={theme.inputIcon} />
                    <TextInput
                        style={theme.input}
                        placeholder="Bank Registered Email"
                        placeholderTextColor="#999"
                        value={rg_email}
                        onChangeText={setrg_email}
                    />
                    </View>
                </View>

                <View style={[theme.col12]}>
                    <View style={theme.inputContainer}>
                    <Icon name="map-marker" size={20} style={theme.inputIcon} />
                    <TextInput
                        style={theme.input}
                        placeholder="Address"
                        placeholderTextColor="#999"
                        value={address}
                        onChangeText={setaddress}
                    />
                    </View>
                </View>
                

                

                

                

                

                
                
                {/* <View style={[theme.col12]}>
                    <Text style={theme.label}>Bank Passbook Image</Text>
                    <TouchableOpacity onPress={chooseImage} style={theme.fileType}>
                        {bankPassbookImage ? (
                        <Image source={{ uri: bankPassbookImage }} style={theme.fileTypeimage} />
                        ) : (
                        <Text style={theme.placeholderText}>Select Bank Passbook Image</Text>
                        )}
                    </TouchableOpacity>
                </View> */}

                

                

            

            </View>
            
            {
                kycStatus!=2?
                <LinearGradient
                    colors={GradientStyles.auth.colors}
                    style={theme.authbutton}
                    >
                    <TouchableOpacity style={theme.button} onPress={() => navigation.navigate('Home')}>
                        {kycStatus==0?
                            <Text style={theme.authbuttonText}>Submit</Text>
                            :kycStatus==1?
                            <Text style={theme.authbuttonText}>Update Kyc</Text>
                            :kycStatus==3?
                            <Text style={theme.authbuttonText}>Update Kyc</Text>
                            :null
                        }
                    </TouchableOpacity>
                </LinearGradient>
                :null
            }

        </ScrollView>
        <Footer navigation={navigation}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
 

});

