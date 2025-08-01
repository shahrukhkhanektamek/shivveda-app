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
import PageLoding from '../../../component/PageLoding';

import { postData, apiUrl } from '../../../component/api';
const urls=apiUrl();

export function OrderScreen({ navigation, extraData=[] }){


    const [type, settype] = useState('');
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const [isLoading, setisLoading] = useState(true);

    const [refreshing, setRefreshing] = useState(false);
    const fetchData = async (pagep) => {
        try {
            const response = await postData({"page":pagep,"status":type}, urls.orderList, "GET", navigation, extraData);
            if(response.status==200)
            {
            const data = response.data; 
            setData(prevData => pagep === 0 ? data : [...prevData, ...data]);

            }
            setisLoading(false) 
        } catch (error) {
            console.error("API call failed:", error);
        }
    };

    const selectType = (newtype) => {
        settype(newtype);
        setPage(0);
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
    }, [page, type]);
    const handleLoadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
    };

    const priceFormat = (value) => {
        return `₹${parseFloat(value).toFixed(2)}`;
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
                <PageHeader pageTitle="My Orders" navigation={navigation} />
                <View style={theme.themeBg}>

                    <View style={[theme.card]}>
                        

                        <ScrollView 
                        showsHorizontalScrollIndicator={false} 
                        contentContainerStyle={{ flexDirection: "row" }}
                        horizontal={true}>
                            
                            <TouchableOpacity style={theme.tabButton}  onPress={() => selectType('')} >
                                <Text style={theme.tabButtonText}>All</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={theme.tabButton}  onPress={() => selectType(0)} >
                                <Text style={theme.tabButtonText}>Confirm</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={theme.tabButton}  onPress={() => selectType(1)} >
                                <Text style={theme.tabButtonText}>Proccess</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={theme.tabButton}  onPress={() => selectType(2)} >
                                <Text style={theme.tabButtonText}>Shipped</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={theme.tabButton}  onPress={() => selectType(3)} >
                                <Text style={theme.tabButtonText}>Delivered</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={theme.tabButton}  onPress={() => selectType(4)} >
                                <Text style={theme.tabButtonText}>Cancel</Text>
                            </TouchableOpacity>
                            
                        </ScrollView>

                    </View>


        {data.map((item) => (
          <React.Fragment key={item.id}>
                <TouchableOpacity
                    style={styles.cell}
                    onPress={() => navigation.navigate("OrderDetail",{"data":item})}
                >
                    <View style={[theme.cardRow, theme.row]}>
                        <View style={[theme.col10]}>
                            <View style={[theme.row]}>
                                <Text style={[theme.cardRowBold]}>Order ID:</Text>
                                <Text style={[theme.cardRowText]}>#{item.order_id}</Text>
                            </View>
                            <View style={[theme.row]}>
                                <Text style={[theme.cardRowBold]}>Order Date:</Text>
                                <Text style={[theme.cardRowText]}>{item.add_date_time1}</Text>
                            </View>
                            <View style={[theme.row]}>
                                <Text style={[theme.cardRowBold]}>Name:</Text>
                                <Text style={[theme.cardRowText]}>{item.name}</Text>
                            </View>
                            <View style={[theme.row]}>
                                <Text style={[theme.cardRowBold]}>Email:</Text>
                                <Text style={[theme.cardRowText]}>{item.email}</Text>
                            </View>
                            <View style={[theme.row]}>
                                <Text style={[theme.cardRowBold]}>Mobile:</Text>
                                <Text style={[theme.cardRowText]}>{item.phone}</Text>
                            </View>
                            <View style={[theme.row]}>
                                <Text style={[theme.cardRowBold]}>Amount:</Text>
                                <Text style={[theme.cardRowText]}>{item.final_amount}</Text>
                            </View>
                        </View>

                {item.status==0?(
                    <View style={[theme.col2]}><Text style={[theme.statusSuccess]}>Confirm</Text></View>
                ):item.status==1?(
                    <View style={[theme.col2]}><Text style={[theme.statusSuccess]}>Proccess</Text></View>
                ):item.status==2?(
                    <View style={[theme.col2]}><Text style={[theme.statusSuccess]}>Shipped</Text></View>
                ):item.status==3?(
                    <View style={[theme.col2]}><Text style={[theme.statusSuccess]}>Delivered</Text></View>
                ):item.status==4?(
                    <View style={[theme.col2]}><Text style={[theme.statusSuccess]}>Cancel</Text></View>
                ):null
                }

                    </View>
                </TouchableOpacity>
          </React.Fragment>
        ))}




                    

                    

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

