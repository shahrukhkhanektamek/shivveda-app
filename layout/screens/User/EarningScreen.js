import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  useWindowDimensions,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import theme from '../../StyleSheet/theme';

import PageHeader from '../../navBar/pageHeader';
import RenderHtml from 'react-native-render-html';
import PageLoding from '../../component/PageLoding';
import { postData, apiUrl } from '../../component/api';
const urls=apiUrl();


export function EarningScreen({ navigation, extraData=[] }){

    const { width } = useWindowDimensions();

    const [type, settype] = useState('');
    const [paid, setpaid] = useState(0);
    const [unpaid, setunpaid] = useState(0);

    const [data, setData] = useState([]);
    const [amountdata, setamountData] = useState([]);
    const [page, setPage] = useState(0);
    const [refreshing, setRefreshing] = useState(false);
    const [isLoading, setisLoading] = useState(true);

    const fetchData = async (pagep, typep) => {
        try {
            const response = await postData({"page":pagep,"type":typep}, urls.earningList, "GET", navigation, extraData);
            if(response.status==200)
            {
                const data = response.data.list; 
                setamountData(response.data);
                setData(prevData => pagep === 0 ? data : [...prevData, ...data]);

                setpaid(response.data.paid);
                setunpaid(response.data.unPaid);
            } 
            setisLoading(false)
        } catch (error) {
            console.error("API call failed:", error);
        }
    };

    const selectType = (newtype) => {
        settype(newtype);
        setPage(0);
        // fetchData(page, newtype)
    };

    const onRefresh = useCallback(() => {
        setPage(0);
        settype('')
        setRefreshing(true);
        setRefreshing(false);
        fetchData(page, type)
    }, []);
    useEffect(() => {
        fetchData(page, type);
    }, [page, type]);
    const handleLoadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        // fetchData(nextPage, type);
    };

    if (isLoading) {
        return ( 
            <PageLoding />          
        );
      }
    
    


  return (
    <View flex={1}>
        
        <FlatList
            ListHeaderComponent={
            <>
                <PageHeader pageTitle="Earnings" navigation={navigation} />
                <View style={theme.themeBg}>

                    <View style={[theme.card]}>
                        <View style={[theme.cardBody, theme.row]}>
                            
                            <View style={[theme.col6, theme.mb5]}>
                                <View style={[styles.walletBox]}>
                                    <Text style={[styles.walletPrice]}>{amountdata.totalEarning}</Text>
                                    <Text style={[styles.walletBoxText]}>Total Eearning</Text>
                                </View>
                            </View>
                            
                            <View style={[theme.col6, theme.mb5]}>
                                <View style={[styles.walletBox]}>
                                    <Text style={[styles.walletPrice]}>{amountdata.totalTds}</Text>
                                    <Text style={[styles.walletBoxText]}>Total TDS</Text>
                                </View>
                            </View>
                            
                            <View style={[theme.col6, theme.mb5]}>
                                <View style={[styles.walletBox]}>
                                    <Text style={[styles.walletPrice]}>{amountdata.totalWallet}</Text>
                                    <Text style={[styles.walletBoxText]}>Total R. Wallet</Text>
                                </View>
                            </View>
                            
                            <View style={[theme.col6, theme.mb5]}>
                                <View style={[styles.walletBox]}>
                                    <Text style={[styles.walletPrice]}>{amountdata.finalEarning}</Text>
                                    <Text style={[styles.walletBoxText]}>Total Final Earning</Text>
                                </View>
                            </View>
                            
                            <View style={[theme.col6, theme.mb5]}>
                                <View style={[styles.walletBox]}>
                                    <Text style={[styles.walletPrice]}>{amountdata.unPaid}</Text>
                                    <Text style={[styles.walletBoxText]}>Total Unpaid Payout</Text>
                                </View>
                            </View>
                            
                            <View style={[theme.col6, theme.mb5]}>
                                <View style={[styles.walletBox]}>
                                    <Text style={[styles.walletPrice]}>{amountdata.paid}</Text>
                                    <Text style={[styles.walletBoxText]}>Total Paid Payout</Text>
                                </View>
                            </View>
                            
                           
                            
                            
                        
                            

                        </View>
                        



                        <ScrollView 
                        showsHorizontalScrollIndicator={false} 
                        contentContainerStyle={{ flexDirection: "row" }}
                        horizontal={true}>
                            <TouchableOpacity style={theme.tabButton} onPress={() => selectType('')} >
                                <Text style={theme.tabButtonText}>All</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={theme.tabButton} onPress={() => selectType(1)} >
                                <Text style={theme.tabButtonText}>Direct Income</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={theme.tabButton} onPress={() => selectType(2)} >
                                <Text style={theme.tabButtonText}>Pair Income</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={theme.tabButton} onPress={() => selectType(3)} >
                                <Text style={theme.tabButtonText}>Downline Income</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={theme.tabButton} onPress={() => selectType(4)} >
                                <Text style={theme.tabButtonText}>Upline Income</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={theme.tabButton} onPress={() => selectType(5)} >
                                <Text style={theme.tabButtonText}>Rank Bonus Income</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={theme.tabButton} onPress={() => selectType(6)} >
                                <Text style={theme.tabButtonText}>Repurchase Income</Text>
                            </TouchableOpacity>
                        </ScrollView>

                    </View>

                    <FlatList
                        data={data} // Array of items
                        keyExtractor={(item) => item.id} // Unique key for each item
                        renderItem={({ item }) => ( // Function to render each item

                                <View style={[theme.cardRow, theme.row]}>
                                    <View style={[theme.col12]}>
                                        <Text style={[styles.txrDate]}>{item.add_date_time2}</Text>
                                        <Text style={[styles.amountText]}>Amount: {item.amount}</Text>
                                        <Text style={[styles.amountText]}>TDS: {item.tds_amount}</Text>
                                        <Text style={[styles.amountText]}>R. Wallet: {item.wallet_amount}</Text>
                                        <Text style={[styles.amountText]}>Final Amount: {item.final_amount}</Text>
                                        <Text style={[theme.statusSuccess]}>{item.type_text}</Text>
                                    </View>
                                </View>
                                          
                            )}
                            onEndReached={handleLoadMore}
                            onEndReachedThreshold={0.5}
                        />

                    

                    

                </View>
                </>
                }
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
     
    </View>
  );
};

const styles = StyleSheet.create({
    amountText:{
        fontSize:15,
        marginBottom:5,
        justifyContent:'space-between',
        display:'flex',
        fontWeight:'bold'
    },
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

