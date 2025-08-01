import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import PageHeader from '../../../navBar/pageHeader';
import { TreeScreen } from './TreeScreen';
import { LeftTeamScreen } from './LeftTeamScreen';
import { RightTeamScreen } from './RightTeamScreen';
import { DirectTeamScreen } from './DirectTeamScreen';

const Tab = createMaterialTopTabNavigator();
const screenWidth = Dimensions.get('window').width;

export function TeamScreen({ navigation, extraData = [] }) {
  return (
    <View style={{ flex: 1 }}>
      {/* Header Section */}
      <PageHeader pageTitle="Team" navigation={navigation} />

      {/* Tabs Section */}
      <View style={{ flex: 1 }}>
        <Tab.Navigator
          initialLayout={{ width: screenWidth }} // ✅ Ensures tab width is known for correct indicator behavior
          screenOptions={{
            swipeEnabled: false, // ✅ Prevent swipe tab change
            tabBarStyle: styles.tabBar,
            tabBarLabelStyle: styles.tabLabel,
            tabBarIndicatorStyle: styles.tabIndicator,
          }}
        >
          <Tab.Screen name="Tree" component={TreeScreen} initialParams={{ extraData }} />
          <Tab.Screen name="Direct Team" component={DirectTeamScreen} initialParams={{ extraData }} />
          <Tab.Screen name="Left Team" component={LeftTeamScreen} initialParams={{ extraData }} />
          <Tab.Screen name="Right Team" component={RightTeamScreen} initialParams={{ extraData }} />
        </Tab.Navigator>
      </View>
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
