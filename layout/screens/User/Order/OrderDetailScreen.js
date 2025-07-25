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

export function OrderDetailScreen({ navigation, extraData=[], route }){
    const orderData = (route.params).data;
    

    const [cartDetail, setcartDetail] = useState([]);
    const [type, settype] = useState('');
    const [walletUseAmount, setwalletUseAmount] = useState('');
    const [payAbleAmount, setpayAbleAmount] = useState('');
    const [data, setData] = useState([]);
    const [orderProducts, setorderProducts] = useState([]);
    const [page, setPage] = useState(0);
    const [refreshing, setRefreshing] = useState(false);
    const [isLoading, setisLoading] = useState(true);

    const fetchData = async (pagep) => {
        try {
            const response = await postData({"id":orderData.id}, urls.orderDetail, "GET", navigation, extraData);
            if(response.status==200)
            {
                const data = response.data; 
                const orderProducts = response.orderProducts; 
                setData(data);
                setorderProducts(orderProducts);
                setcartDetail(JSON.parse(data.amount_detail));
                console.log(cartDetail); 
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


  const downloadInvoice = () => {
    // You can integrate file download logic here using RNFS or open a PDF URL
    alert('Invoice download feature coming soon!');
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
                <PageHeader pageTitle="My Orders Detail" navigation={navigation} />
                <View style={theme.themeBg}>

                    <View style={[theme.card]}>
                      <Text style={styles.sectionTitle}>Shipping Address</Text>
                      <Text style={styles.addressText}>Name: {data.name}</Text>
                      <Text style={styles.addressText}>Email: {data.email}</Text>
                      <Text style={styles.addressText}>Phone: {data.phone}</Text>
                      <Text style={styles.addressText}>State: {data.state_name}</Text>
                      <Text style={styles.addressText}>City: {data.city}</Text>
                      <Text style={styles.addressText}>Address: {data.address}</Text>
                    </View>


                    <View style={[theme.card]}>
                        <View style={[theme.cardHeader]}>
                            <Text style={[theme.cardHeaderText]}>Order Products</Text>
                        </View>
                        <View style={[theme.row]}>                            
                            {orderProducts.map((item) => (
                                <View key={item.id.toString()} style={styles.card} width={'100%'}>
                                    <View style={styles.details}>
                                        <Text style={styles.name}>{item.name}</Text>
                                        <Text style={styles.price}>{priceFormat(item.price)} x {item.qty}</Text>
                                        <Text style={styles.total}>Total: {priceFormat(item.price * item.qty)}</Text>
                                    </View>
                                </View>
                            ))}
                        </View> 
                        

                        <View style={styles.table}>
                            <View style={styles.row}>
                                <Text style={styles.cellLabel}>Cart Total</Text>
                                <Text style={styles.cellValue}>{priceFormat(data.amount)}</Text>
                            </View>
            
                            <View style={styles.row}>
                            <Text style={styles.cellLabel}>Gst</Text>
                            <Text style={styles.cellValue}>{priceFormat(data.gst)}</Text>
                            </View>
            
                            <View style={styles.row}>
                            <Text style={styles.cellLabel}>Final Amount</Text>
                            <Text style={styles.cellValue}>{priceFormat(data.final_amount)}</Text>
                            </View>
            
                            {/* {data.wallet_use && ( */}
                            <>
                                <View style={styles.row}>
                                <Text style={styles.cellLabel}>Wallet Use</Text>
                                <Text style={styles.cellValue}>-<Text>{priceFormat(walletUseAmount || 0)}</Text></Text>
                                </View>
            
                                <View style={styles.row}>
                                <Text style={styles.cellLabel}>Payable Amount</Text>
                                <Text style={styles.cellValue}>{priceFormat(data.final_amount-data.wallet_amount)}</Text>
                                </View>
                            </>
                            {/* )}  */}
                        </View> 
                    

                    </View>


                   
                </View>
                </>
                }
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />


<View style={{ padding: 20 }}>
    <TouchableOpacity
      onPress={downloadInvoice}
      style={styles.downloadButton}
    >
      <Icon name="download" size={18} color="#fff" />
      <Text style={styles.downloadButtonText}> Download Invoice</Text>
    </TouchableOpacity>
  </View>





      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  details: {
    width: '100%',
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    color: '#555',
    marginBottom: 2,
  },
  total: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000',
  },
  table: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginTop: 16,
    backgroundColor: '#fafafa',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  cellLabel: {
    fontWeight: '600',
    color: '#444',
    fontSize: 14,
  },
  cellValue: {
    color: '#222',
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    paddingBottom: 4,
  },
  addressText: {
    fontSize: 14,
    color: '#444',
    marginBottom: 2,
  },


  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007bff',
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 10,
  },
  downloadButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
  



});
