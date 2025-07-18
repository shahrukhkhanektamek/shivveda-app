import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  useWindowDimensions,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import theme from '../../StyleSheet/theme';

import PageHeader from '../../navBar/pageHeader';

import RenderHtml from 'react-native-render-html';



import { postData, apiUrl } from '../../component/api';
const urls=apiUrl();

export function WalletScreen({ navigation, extraData=[] }){
    const { width } = useWindowDimensions();
    const [deposit, setdeposit] = useState(0);
    const [commision_wallet, setcommision_wallet] = useState(0);
    const [wallet, setwallet] = useState(0);

  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const fetchData = async (pagep) => {
      try {
        const response = await postData({"page":pagep}, urls.walletList, "GET", navigation, extraData);
        if(response.status==200)
        {
          const data = response.data.list; 
          setdeposit(response.data.deposit);
          setcommision_wallet(response.data.commision_wallet);
          setwallet(response.data.wallet);
          setData(prevData => pagep === 0 ? data : [...prevData, ...data]);
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
        style={{flex:1,backgroundColor:'white'}}
        ListHeaderComponent={
          <>
            <PageHeader pageTitle="Wallet" navigation={navigation} />

            <View style={theme.themeBg}>

            

                <View style={[theme.card]}>
                    <View style={[theme.cardBody]}>
                        
                        <View style={[theme.col12]}>
                            <View style={[styles.walletBox]}>
                                <Icon name='inr' style={[styles.inrIcon]}/>
                                <Text style={[styles.walletPrice]}>{deposit}</Text>
                                <Text style={[styles.walletBoxText]}>Deposit</Text>
                            </View>
                        </View>
                        <View style={[theme.col12]}>
                            <View style={[styles.walletBox]}>
                                <Icon name='inr' style={[styles.inrIcon]}/>
                                <Text style={[styles.walletPrice]}>{commision_wallet}</Text>
                                <Text style={[styles.walletBoxText]}>Earning</Text>
                            </View>
                        </View>
                        <View style={[theme.col12]}>
                            <View style={[styles.walletBox]}>
                                <Icon name='inr' style={[styles.inrIcon]}/>
                                <Text style={[styles.walletPrice]}>{wallet}</Text>
                                <Text style={[styles.walletBoxText]}>Total</Text>
                            </View>
                        </View>

                    </View>
                </View>
                
                <FlatList
                  data={data} // Array of items
                  keyExtractor={(item) => item.id} // Unique key for each item
                  renderItem={({ item }) => ( // Function to render each item
                        <View style={[theme.cardRow, theme.row]}>
                            <View style={[theme.col8]}>
                                <Text style={[styles.txrDate]}>{item.add_date_time}</Text>
                                <RenderHtml
                                    contentWidth={width}
                                    source={{ html: item.message }} // Render HTML content
                                />
                                {/* <Text style={[styles.paymentMessage]}>{item.message}</Text> */}
                            </View>
                            {item.type==1?
                                <View style={[theme.col4,]}><Text style={[styles.amount, theme.textSuccess]}>+ {item.amount}</Text></View>
                                :
                                <View style={[theme.col4,]}><Text style={[styles.amount, theme.textDanger]}>- {item.amount}</Text></View>
                            }
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

