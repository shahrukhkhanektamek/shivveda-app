import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import theme from '../../../StyleSheet/theme';

import PageHeader from '../../../navBar/pageHeader';


export function OrderScreen({ navigation, extraData=[] }){


    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
      // setPage(0);
      setRefreshing(true);
      setRefreshing(false);
      // fetchPosts(page);
    }, []);




  return (
    <View flex={1}>
        
        <FlatList
            ListHeaderComponent={
            <>
                <PageHeader pageTitle="My Orders" navigation={navigation} />
                <View style={theme.themeBg}>

                    <View style={[theme.card]}>
                        

                        <ScrollView 
                        showsHorizontalScrollIndicator={false} 
                        contentContainerStyle={{ flexDirection: "row" }}
                        horizontal={true}>
                            
                            <TouchableOpacity style={theme.tabButton} >
                                <Text style={theme.tabButtonText}>All</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={theme.tabButton} >
                                <Text style={theme.tabButtonText}>Confirm</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={theme.tabButton} >
                                <Text style={theme.tabButtonText}>Proccess</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={theme.tabButton} >
                                <Text style={theme.tabButtonText}>Shipped</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={theme.tabButton} >
                                <Text style={theme.tabButtonText}>Delivered</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={theme.tabButton} >
                                <Text style={theme.tabButtonText}>Cancel</Text>
                            </TouchableOpacity>
                            
                        </ScrollView>

                    </View>


                    <View style={[theme.cardRow, theme.row]}>
                        <View style={[theme.col10]}>
                            <View style={[theme.row]}>
                              <Text style={[theme.cardRowBold]}>Order ID:</Text>
                              <Text style={[theme.cardRowText]}>54654654654</Text>
                            </View>
                            <View style={[theme.row]}>
                              <Text style={[theme.cardRowBold]}>Order Date:</Text>
                              <Text style={[theme.cardRowText]}>10 Jan, 2025</Text>
                            </View>
                            <View style={[theme.row]}>
                              <Text style={[theme.cardRowBold]}>Name:</Text>
                              <Text style={[theme.cardRowText]}>Shahrukh</Text>
                            </View>
                            <View style={[theme.row]}>
                              <Text style={[theme.cardRowBold]}>Email:</Text>
                              <Text style={[theme.cardRowText]}>test@gmail.com</Text>
                            </View>
                            <View style={[theme.row]}>
                              <Text style={[theme.cardRowBold]}>Mobile:</Text>
                              <Text style={[theme.cardRowText]}>1234567890</Text>
                            </View>
                            <View style={[theme.row]}>
                              <Text style={[theme.cardRowBold]}>Amount:</Text>
                              <Text style={[theme.cardRowText]}>500.00</Text>
                            </View>
                        </View>
                        <View style={[theme.col2]}><Text style={[theme.statusSuccess]}>Paid</Text></View>
                    </View>

                    

                </View>
                </>
                }
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />








      
    </View>
  );
};

const styles = StyleSheet.create({
    walletBoxRow:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        textAlign:'center'
    },
    walletBox:{
        borderWidth:1,
        padding:10,
        borderRadius:5,
    },
    inrIcon:{
        fontSize:20,
        fontWeight:'bold',
        textAlign:'center',
    },
    walletPrice:{
        fontSize:20,
        fontWeight:'bold',
        textAlign:'center',
    },
    walletBoxText:{
        fontSize:17,
        fontWeight:'bold',
        textAlign:'center',
    },
    textDeviderPlus:{
        fontSize:50,
        fontWeight:'bold',
        textAlign:'center',
    },
    amount:{
        textAlign:'right'
    }
});

