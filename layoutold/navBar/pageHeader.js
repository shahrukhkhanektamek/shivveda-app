import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import theme from '../StyleSheet/theme';
const PageHeader = ({pageTitle, navigation}) => {
    
  return (
    <View style={[theme.row, theme.pageTitle]}>
        <Ionicons name="arrow-back" style={theme.pageTitleArrow} onPress={() => navigation.goBack()} />
        <Text style={theme.pageTitleText}>{pageTitle}</Text>
    </View>  
  );
};

export default PageHeader;
