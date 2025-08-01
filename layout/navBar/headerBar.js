import React, {useState} from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import theme from '../StyleSheet/theme';

import { MMKV } from 'react-native-mmkv';
const storage = new MMKV();


const Header = ({extraData=[]}) => {
  const [userDetail, setuserDetail] = useState(JSON.parse(storage.getString('user')));
  return (
    <View style={styles.header}>
      <View style={styles.container}>
        <View style={styles.headerContent}>
          
          {/* Back Button */}
          <TouchableOpacity style={styles.backButton} onPress={() => extraData.sidebar.setSideBar(true)}>
            <Icon name="bars" size={20} style={theme.barsIcon} />
          </TouchableOpacity>          

          {/* Notification Button */}
          <TouchableOpacity style={styles.notificationButton} onPress={() => {}}>
            <Image source={require('../assets/logo.png')} style={[theme.headerLogo]} />
          </TouchableOpacity>

          {/* Title */}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Hi! {userDetail.name}</Text>
            
          </View>

        </View>
      </View>
      <View style={styles.navbarBorder} />
    </View>
  );
};

const styles = {
  header: {
    backgroundColor: '#fff',
  },
  container: {
    paddingHorizontal: 16,
    paddingVertical: 0,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    padding: 10,
  },
  titleContainer: {
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  notificationButton: {
    paddingVertical:5,
  },
  navbarBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
};

export default Header;
