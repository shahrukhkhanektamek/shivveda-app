import React, { useState } from 'react';
import { View } from 'react-native';
import AlertMessage from './AlertMessage'; 
import Loader from './Loader';
import SideBar from '../../navBar/sideBar';
import FooterBar from '../../navBar/footerBar';
import useGlobalState from '../../component/useGlobalState';


const FooterSidebarScreen = ({ children, navigation }) => {

  const extraData = useGlobalState();

  return ( 
    <View style={{ flex: 1 }}>
      {React.cloneElement(children, { extraData })}
      <AlertMessage extraData={extraData} />
      <FooterBar navigation={navigation}/>
      <SideBar navigation={navigation} extraData={extraData} />
      <Loader extraData={extraData} />
    </View> 
  );
};

export default FooterSidebarScreen;
