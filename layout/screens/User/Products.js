import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  RefreshControl
} from 'react-native';
import PageHeader from '../../navBar/pageHeader';
import Icon from 'react-native-vector-icons/FontAwesome';
import { postData, apiUrl } from '../../component/api';
import theme from '../../StyleSheet/theme';
import PageLoding from '../../component/PageLoding';
const urls = apiUrl();

export function ProductsScreen({ navigation, extraData = [] }) {
    const [quantities, setQuantities] = useState({});
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);  
    const [refreshing, setRefreshing] = useState(false);
    const [cartNotEmpty, setCartNotEmpty] = useState(0);
    const [cartTotalBv, setCartTotalBv] = useState(0);
    const [isLoading, setisLoading] = useState(true);

    const handleIncrement = (id) => {
        setQuantities(prev => {
            const currentQty = Number(prev[id]) || 0;
            const newQuantity = currentQty + 1;
            const updated = { ...prev, [id]: newQuantity };
            handleAddCart(id, newQuantity);
            return updated;
        });
    };
    
    const handleDecrement = (id) => {
        setQuantities(prev => {
            const currentQty = Number(prev[id]) || 0;
            const newQuantity = currentQty > 0 ? currentQty - 1 : 0;
            const updated = { ...prev, [id]: newQuantity };
            handleAddCart(id, newQuantity);
            return updated;
        });
    };

    const handleAddCart = async (id, qty) => { 
        try {
            if (qty !== '' && id) {
                const filedata = { id, qty };
                const response = await postData(filedata, urls.cartAdd, "POST", navigation, extraData);
                if (response.status === 200) {
                    const cartData = response.data;
                    setCartNotEmpty(cartData.cartDetail?.cartCount || 0);
                    setCartTotalBv(cartData.cartDetail?.totalBv)
                }
            }
        } catch (error) {
            console.error("Cart API Error:", error);
        }
    };

    const checkoutCheck = async () => {
        try {
            const response = await postData({}, urls.checkoutCheck, "POST", navigation, extraData);
            if (response.status === 200) {
                navigation.navigate("Checkout")
            } 
        } catch (error) {
            console.error("API call failed:", error);
        }
    };

    const fetchData = async () => {
        try {
            const response = await postData({}, urls.productList, "GET", navigation, extraData);
            if (response.status === 200) {
                const productList = response.data.list;
                setData(productList);
                
                const updatedQuantities = {};
                productList.forEach((pro) => {
                    updatedQuantities[pro.id] = pro.qty || 0;
                });
                setQuantities(updatedQuantities);
                
                if (response.data.cartDetail) {
                    setCartNotEmpty(response.data.cartDetail.cartCount || 0);
                    setCartTotalBv(response.data.cartDetail?.totalBv)
                }
            } 
            setisLoading(false)
        } catch (error) {
            console.error("API call failed:", error);
        }
    };

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchData().then(() => setRefreshing(false));
        setQuantities({});
    }, []);

    useEffect(() => {
        setQuantities({});
        fetchData();
    }, []);

    const handleLoadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchData(nextPage);              
    };


    if (isLoading) {
        return ( 
            <PageLoding />          
        );
      }
    

    const renderProduct = ({ item }) => (
        <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.details}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.price}>MRP: {item.real_price}</Text>
                <Text style={styles.price}>DP: {item.sale_price}</Text>
                <Text style={styles.price}>BV: {item.bv}</Text>

                <View style={styles.buttonGroup}>
                    <TouchableOpacity onPress={() => handleDecrement(item.id)} style={styles.button}>
                        <Icon name="minus" size={20} color="white" />
                    </TouchableOpacity>
                    <TextInput
                        style={styles.input}
                        value={String(quantities[item.id] || 0)}
                        editable={false}
                    />
                    <TouchableOpacity onPress={() => handleIncrement(item.id)} style={styles.button}>
                        <Icon name="plus" size={20} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <PageHeader pageTitle="Products" navigation={navigation} />
            <FlatList
                data={data}
                renderItem={renderProduct}
                keyExtractor={(item, index) => `${item.id}-${index}`}
                contentContainerStyle={styles.list}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                showsVerticalScrollIndicator={false}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
            />
            
            {cartNotEmpty !== 0 &&
                <>
                <View style={[theme.row, styles.cartButton]}>
                    <View style={[theme.col8]}>
                        <Text style={styles.bvText}>Total BV:<Text style={[styles.bvText]}>{cartTotalBv}</Text></Text>
                    </View>
                    <View style={[theme.col4]}>
                        <TouchableOpacity  onPress={checkoutCheck}>
                            <Text style={styles.cartText}>Go to Cart</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                </>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
    },
    list: {
        paddingBottom: 80,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 15,
        margin: 10,
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },
    image: {
        width: 110,
        height: 110,
        borderRadius: 10,
    },
    details: {
        flex: 1,
        marginLeft: 15,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    price: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
        backgroundColor: '#27ae60',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        alignSelf: 'flex-start',
        overflow: 'hidden',
        marginBottom: 4
    },
    buttonGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 12,
    },
    button: {
        backgroundColor: '#27ae60',
        padding: 12,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 8,
    },
    input: {
        width: 50,
        height: 40,
        textAlign: 'center',
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        color: '#333',
        backgroundColor: '#f8f9fa',
    },
    cartButton: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#4cb748',
        padding: 10,
        borderRadius: 0,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 1,
    },
    cartText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign:'right',
    },
    bvText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign:'left',
    },
});

export default ProductsScreen;
