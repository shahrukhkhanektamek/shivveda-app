import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import theme from '../../StyleSheet/theme';

import PageHeader from '../../navBar/pageHeader';

import LinearGradient from 'react-native-linear-gradient';
import GradientStyles from '../../StyleSheet/GradientStyles';

import RenderHtml from 'react-native-render-html';

import { postData, apiUrl } from '../../component/api';
const urls=apiUrl();

export function WithdrawalScreen({ navigation, extraData=[] }){

    const { width } = useWindowDimensions();
    const [commision_wallet, setcommision_wallet] = useState(0);

    const [upi, setupi] = useState('');
    const [amount, setamount] = useState(0);
    const [wamount, setwamount] = useState(0);
    const withdrawDeduct = 10;



    const handleSubmit = async () => {
        try {
          const response = await postData({"upi":upi,"amount":amount}, urls.withdrawalAdd, "POST", navigation, extraData);
          if(response.status==200)
          {
            const data = response.data; 
            setupi('')
            setamount(0)
            setwamount(0)

            setPage(0);
            fetchData(page)
            
          }
        } catch (error) {
          console.error("API call failed:", error);
        }
      };
    //   setwamount(500);
      const calculateWithdrawal = (value) => {
          setamount(value)
          const amt = parseFloat(value) || 0;
          const calculatedAmount = amt - (amt / 100) * withdrawDeduct;
          setwamount(calculatedAmount.toString());
      };


  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const fetchData = async (pagep) => {
      try {
        const response = await postData({"page":pagep}, urls.withdrawalList, "GET", navigation, extraData);
        if(response.status==200)
        {
          const data = response.data.list; 
          setcommision_wallet(response.data.commision_wallet);          
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
            ListHeaderComponent={
            <>
                <PageHeader pageTitle="Withdrawal" navigation={navigation} />
                <View style={theme.themeBg}>

                    <View style={[theme.card]}>
                        <View style={[theme.cardBody, styles.walletBoxRow]}>
                            <View>
                                <View style={[styles.walletBox]}>
                                    <Icon name='inr' style={[styles.inrIcon]}/>
                                    <Text style={[styles.walletPrice]}>{commision_wallet}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={[theme.row]}>
                            <View style={[theme.col12]}>
                                <View style={theme.inputContainer}>
                                    <Icon name="star" size={20} style={theme.inputIcon} />
                                    <TextInput
                                    style={theme.input}
                                    placeholder="UPI Address"
                                    placeholderTextColor="#999"
                                    value={upi}
                                    onChangeText={setupi}
                                    />
                                </View>
                            </View>
                            <View style={[theme.col12]}>
                                <View style={theme.inputContainer}>
                                    <Icon name="star" size={20} style={theme.inputIcon} />
                                    <TextInput
                                    style={theme.input}
                                    placeholder="Enter Amount"
                                    placeholderTextColor="#999"
                                    keyboardType='decimal-pad'
                                    value={amount}
                                    onChangeText={(text) => calculateWithdrawal(text)}
                                    />
                                </View>
                            </View>
                            <View style={[theme.col12]}>
                                <View style={theme.inputContainer}>
                                    <Icon name="star" size={20} style={theme.inputIcon} />
                                    <TextInput
                                    style={theme.input}
                                    placeholder="Withdrawal Amount"
                                    placeholderTextColor="#999"
                                    value={wamount}
                                    keyboardType='decimal-pad'
                                    editable={false}
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
                                    <View style={[theme.col10]}>                
                                        <View style={[theme.row]}>
                                            <Text style={[theme.cardRowBold]}>Amount:</Text>
                                            <Text style={[theme.cardRowText]}>{item.amount}</Text>
                                        </View>
                                        <View style={[theme.row]}>
                                            <Text style={[theme.cardRowBold]}>Charge:</Text>
                                            <Text style={[theme.cardRowText]}>{item.charge}</Text>
                                        </View>
                                        <View style={[theme.row]}>
                                            <Text style={[theme.cardRowBold]}>Pay Amount:</Text>
                                            <Text style={[theme.cardRowText]}>{item.withdrawal_amount}</Text>
                                        </View>
                                        <View style={[theme.row]}>
                                            <Text style={[theme.cardRowBold]}>Date:</Text>
                                            <Text style={[theme.cardRowText]}>{item.add_date_time}</Text>
                                        </View>
                                        <View style={[theme.row]}>
                                            <Text style={[theme.cardRowBold]}>Message</Text>
                                            <RenderHtml
                                                contentWidth={width}
                                                source={{ html: item.message }} // Render HTML content
                                            />
                                        </View>
                                    </View>
                                    <View style={[theme.col2]}>
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
        justifyContent:'space-around',
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

