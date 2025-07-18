import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import theme from '../../StyleSheet/theme';

import PageHeader from '../../navBar/pageHeader';

import LinearGradient from 'react-native-linear-gradient';
import GradientStyles from '../../StyleSheet/GradientStyles';

import { postData, apiUrl } from '../../component/api';
const urls=apiUrl();

export function DepositListScreen({ navigation, extraData=[] }){

    const [amount, setamount] = useState(0);
    const [min_deposit, setmin_deposit] = useState(0);
    
    
    
    
    
    
    const handleSubmit = async () => {
        try {
            const response = await postData({"amount":amount}, urls.depositAdd, "POST", navigation, extraData);
            if(response.status==200)
                {
                    const data = response.data; 
                    setamount(0)
                    navigation.navigate("DepositPay",{"data":data})
                }
            } catch (error) {
                console.error("API call failed:", error);
            }
        };
        
        
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const [refreshing, setRefreshing] = useState(false);
    const fetchData = async (pagep) => {
        try {
          const response = await postData({"page":pagep}, urls.depositList, "POST", navigation, extraData);
          if(response.status==200)
          {
            const data = response.data; 
            setData(prevData => pagep === 0 ? data : [...prevData, ...data]);
            setmin_deposit(response.min_deposit)
          } 
        } catch (error) {
          console.error("API call failed:", error);
        }
    };
    const onRefresh = useCallback(() => {
      setPage(0);
      setRefreshing(true);
      setRefreshing(false);
      fetchData(page)
    }, []);
    useEffect(() => {
        fetchData(page);
    }, []);
    const handleLoadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchData(nextPage);              
    };



  return (
    <View flex={1}>
    
        <FlatList
            ListHeaderComponent={
            <>
                <PageHeader pageTitle={`Deposit (Min Amount ${min_deposit})`} navigation={navigation} />
                <View style={[theme.themeBg]}>
                    <View style={[theme.card]}>
                        <View style={[theme.cardBody]}>
                            <View style={[theme.col12]}>
                                <View style={theme.inputContainer}>
                                    <Icon name="inr" size={20} style={theme.inputIcon} />
                                    <TextInput
                                    style={theme.input}
                                    placeholder="Amount"
                                    placeholderTextColor="#999"
                                    value={amount}
                                    onChangeText={setamount}
                                    keyboardType='decimal-pad'
                                    />
                                </View>
                            </View>
                            
                            <LinearGradient
                                colors={GradientStyles.auth.colors}
                                style={theme.authbutton}
                            >
                                <TouchableOpacity style={theme.button} onPress={handleSubmit}>
                                <Text style={theme.authbuttonText}>Submit</Text>
                                </TouchableOpacity>
                            </LinearGradient>

                        </View>
                    </View>
                    
                    <FlatList
                        data={data} // Array of items
                        keyExtractor={(item) => item.id} // Unique key for each item
                        renderItem={({ item }) => ( // Function to render each item
                            <View style={[theme.cardRow, theme.row]}>
                                <View style={[theme.col2]}><Icon name="inr" style={[styles.roundCircule]} /></View>
                                <View style={[theme.col7]}>
                                    <Text style={[theme.cardRowTitle]}>#{item.request_id}</Text>
                                    <Text style={[styles.paymentMode]}>{item.payment_mode}</Text>
                                    <Text style={[styles.txrDate]}>{item.add_date_time}</Text>
                                    {
                                        item.status==0?
                                            <Text style={[theme.statusInfo]}>{item.statusText}</Text>
                                        :item.status==1?
                                            <Text style={[theme.statusSuccess]}>{item.statusText}</Text>
                                        :item.status==2?
                                            <Text style={[theme.statusDanger]}>{item.statusText}</Text>
                                        :null
                                    }
                                </View>
                                <View style={[theme.col3]}><Text style={[styles.amount]}>{item.amount}</Text></View>
                            </View>                 
                            )}
                        />

                    

                </View>
            </>
            }
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
      
    </View>
  );
};

const styles = StyleSheet.create({
    roundCircule:{
        flexDirection:'row',
        backgroundColor:'green',
        width:40,
        height:40,
        color:'white',
        borderRadius:50,
        alignItems:'center',
        textAlign:'center',
        fontWeight:'bold',
        elevation:1,
        fontSize:25
    },
    amount:{
        fontSize:15,
        fontWeight:'bold'
    },
});

