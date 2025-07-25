import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import theme from '../StyleSheet/theme';

import PageHeader from '../navBar/pageHeader';
import Footer from '../navBar/footerBar';

import { postData, apiUrl } from '../component/api';
const urls=apiUrl();

export function SettingScreen ({ navigation, extraData=[] }){
  const [textMessages, setTextMessages] = React.useState(true);

  const handleLogout = async () => {
    var filedata = {};
    const response = await postData(filedata, urls.logout,"GET", navigation,extraData);
    };
  return (
    
    <View flex={1}>
        <PageHeader pageTitle="Setting" navigation={navigation} />

        <ScrollView style={[theme.themeBg]}>   
          
              {/* Account Section */}
              <View style={styles.section}>


                {/* <Text style={styles.sectionTitle}>Account</Text> */}

                  <TouchableOpacity style={styles.optionRow} onPress={() => navigation.navigate('Profile')}>
                    <Ionicons name={'person'} size={30} style={theme.inputIcon} />
                    <Text style={styles.optionText}>Update Profile</Text>
                    <Ionicons name="chevron-forward" size={30} style={theme.inputIcon} />
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.optionRow} onPress={() => navigation.navigate('ChangePassword')}>
                    <Ionicons name={'lock-closed-outline'} size={30} style={theme.inputIcon} />
                    <Text style={styles.optionText}>Change Password</Text>
                    <Ionicons name="chevron-forward" size={30} style={theme.inputIcon} />
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.optionRow} onPress={() => navigation.navigate('Kyc')}>
                    <Ionicons name={'id-card'} size={30} style={theme.inputIcon} />
                    <Text style={styles.optionText}>Kyc</Text>
                    <Ionicons name="chevron-forward" size={30} style={theme.inputIcon} />
                  </TouchableOpacity>

            

                  <TouchableOpacity style={styles.optionRow} onPress={handleLogout}>
                    <Ionicons name={'log-out-outline'} size={30} style={theme.inputIcon} />
                    <Text style={styles.optionText}>Sign Out</Text>
                    <Ionicons name="chevron-forward" size={30} style={theme.inputIcon} />
                  </TouchableOpacity>

              </View>

              {/* More Options Section */}
              {/* <View style={styles.section}>
                
                <View style={styles.toggleRow}>
                  <Text style={styles.optionText}>Notification</Text>
                  <Switch
                    value={textMessages}
                    onValueChange={setTextMessages}
                    thumbColor={textMessages ? '#4CD964' : '#E5E5EA'}
                    trackColor={{ false: '#E5E5EA', true: '#A6F5C1' }}
                  />
                </View>
                
                
              </View> */}
          
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    marginTop:15
  }, 
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  optionText: {
    fontSize: 20,
    marginLeft: 12,
    flex: 1,
    color:'gray'
  },  
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
});

