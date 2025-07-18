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

import { postData, apiUrl } from '../../component/api';
const urls=apiUrl();


export function EarningScreen({ navigation, extraData=[] }){

    const { width } = useWindowDimensions();

    const [type, settype] = useState('');
    const [paid, setpaid] = useState(0);
    const [unpaid, setunpaid] = useState(0);

    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const [refreshing, setRefreshing] = useState(false);
    const fetchData = async (pagep) => {
        try {
            const response = await postData({"page":pagep,"type":type}, urls.earningList, "GET", navigation, extraData);
            if(response.status==200)
            {
            const data = response.data.list; 
            setData(prevData => pagep === 0 ? data : [...prevData, ...data]);

            setpaid(response.data.paid);
            setunpaid(response.data.unPaid);
            } 
        } catch (error) {
            console.error("API call failed:", error);
        }
    };

    const selectType = (type) => {
        setPage(0);
        settype(type);
        fetchData(page)
    };

    const onRefresh = useCallback(() => {
        setPage(0);
        settype('')
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
                <PageHeader pageTitle="Earnings" navigation={navigation} />
                <View style={theme.themeBg}>

                    <View style={[theme.card]}>
                        <View style={[theme.cardBody, styles.walletBoxRow]}>
                            
                            <View style={[theme.scol3]}>
                                <View style={[styles.walletBox]}>
                                    <Icon name='inr' style={[styles.inrIcon]}/>
                                    <Text style={[styles.walletPrice]}>{paid}</Text>
                                    <Text style={[styles.walletBoxText]}>Total Paid Payout</Text>
                                </View>
                            </View>
                            
                            
                        
                            <View style={[theme.scol3]}>
                                <View style={[styles.walletBox]}>
                                    <Icon name='inr' style={[styles.inrIcon]}/>
                                    <Text style={[styles.walletPrice]}>{unpaid}</Text>
                                    <Text style={[styles.walletBoxText]}>Total Unpaid Payout</Text>
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
                        </ScrollView>

                    </View>

                    <FlatList
                        data={data} // Array of items
                        keyExtractor={(item) => item.id} // Unique key for each item
                        renderItem={({ item }) => ( // Function to render each item

                                <View style={[theme.cardRow, theme.row]}>
                                    <View style={[theme.col8]}>
                                        <Text style={[styles.txrDate]}>{item.package_payment_date_time}</Text>
                                        {
                                            item.payment==0?
                                                <Text style={[theme.statusDanger]}>Unpaid</Text>
                                            :item.payment==1?
                                                <Text style={[theme.statusSuccess]}>Paid</Text>
                                            :null
                                        }
                                        <RenderHtml
                                            contentWidth={width}
                                            source={{ html: item.message }} // Render HTML content
                                        />
                                    </View>
                                    <View style={[theme.col4]}><Text style={[styles.amount, theme.textSuccess]}>{item.final_amount}</Text></View>
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

