import React, { useState } from 'react';
import { View } from 'react-native';
import AlertMessage from './AlertMessage'; 
import Loader from './Loader'; 
import useGlobalState from '../../component/useGlobalState';

const FooterScreen = ({ children, navigation }) => {

  const extraData = useGlobalState();
 
  return ( 
    <View style={{ flex: 1 }}>
      {React.cloneElement(children, { extraData })}
      <AlertMessage extraData={extraData} />
      <Loader extraData={extraData} />
    </View> 
  );
};

export default FooterScreen;
