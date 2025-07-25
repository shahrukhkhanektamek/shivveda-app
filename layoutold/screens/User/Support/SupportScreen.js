import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import PageHeader from '../../../navBar/pageHeader';
import { AddSupportScreen } from './AddSupportScreen';
import { AllSupportScreen } from './AllSupportScreen';

const Tab = createMaterialTopTabNavigator();

export function SupportScreen({ navigation, extraData=[] }) {
  return (
    <View style={{ flex: 1 }}>
      <PageHeader pageTitle="Support" navigation={navigation} />
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: styles.tabBar,
          tabBarLabelStyle: styles.tabLabel,
          tabBarIndicatorStyle: styles.tabIndicator,
        }}
      >
        <Tab.Screen name="All Ticket" component={AllSupportScreen} initialParams={{ extraData }} />
        <Tab.Screen name="Add Ticket" component={AddSupportScreen} initialParams={{ extraData }} />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#f8f9fa',
    elevation: 3,
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'none',
  },
  tabIndicator: {
    backgroundColor: '#007bff',
    height: 3,
  },
});


