import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

import theme from '../StyleSheet/theme';
import GradientStyles from '../StyleSheet/GradientStyles';

export function ProfileUpdate({ navigation }) {
  return (
      <View>
        
        <View style={[theme.row, theme.pageTitle]}>
          <Icon name="arrow-back" style={theme.pageTitleArrow} />
          <Text style={theme.pageTitleText}>Profile Update</Text>
        </View>

        <ScrollView>
          <View style={theme.container}>

            <View style={theme.inputContainer}>
              <TextInput
                style={theme.input}
                placeholder="Name"
                placeholderTextColor="#999"
                keyboardType="email-address"
              />
            </View>


            <View style={theme.inputContainer}>
              <TextInput
                style={theme.input}
                placeholder="Email"
                placeholderTextColor="#999"
                keyboardType="email-address"
              />
            </View>

            <View style={theme.inputContainer}>
              <TextInput
                style={theme.input}
                placeholder="Mobile"
                placeholderTextColor="#999"
                keyboardType="email-address"
              />
            </View>

            <View style={theme.inputContainer}>
              <TextInput
                style={theme.input}
                placeholder="Password"
                placeholderTextColor="#999"
                secureTextEntry
              />
            </View>

            <View style={theme.inputContainer}>
              <TextInput
                style={theme.input}
                placeholder="Confirm Password"
                placeholderTextColor="#999"
                secureTextEntry
              />
            </View>



            <LinearGradient 
              style={theme.buttonGreen} 
              colors={GradientStyles.primary.colors}
              start={GradientStyles.primary.start}
              end={GradientStyles.primary.end}>          
              <TouchableOpacity style={theme.btnInner} onPress={() => navigation.navigate('Home')}>
                <Text style={theme.buttonText}>Update</Text>
              </TouchableOpacity>
            </LinearGradient>

          </View>
          
        </ScrollView>
      </View>
    
  );
}
