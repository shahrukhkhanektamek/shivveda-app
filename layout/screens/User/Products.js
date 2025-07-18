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

const urls = apiUrl();

export function ProductsScreen({ navigation, extraData = [] }) {
    const [quantities, setQuantities] = useState({});
    const [pId, setpId] = useState('');
    const [qty, setqty] = useState('');
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);  
    const [refreshing, setRefreshing] = useState(false);
    const [cartNotEmpty, setCartNotEmpty] = useState(0); // ✅ Track Cart Status

    // 🛠️ Handle Increment
    const handleIncrement = (id) => {
        setpId(id);
        setQuantities(prev => {
            const newQuantity = (prev[id] || 0) + 1;
            return { ...prev, [id]: newQuantity };
        });
    };

    // 🛠️ Handle Decrement
    const handleDecrement = (id) => {
        setpId(id);
        setQuantities(prev => {
            const newQuantity = prev[id] > 0 ? prev[id] - 1 : 0;
            return { ...prev, [id]: newQuantity };
        });
    }; 

    

    // ✅ `useEffect` to Call handleAddCart() AFTER qty Updates
    useEffect(() => {
        if (pId && quantities[pId] !== undefined) {
            setqty(quantities[pId]);
        }
    }, [pId, quantities]);

    useEffect(() => {
        if (pId && qty !== '') {
            handleAddCart();
        }
    }, [qty]);

    // 🛠️ Handle Add to Cart
    const handleAddCart = async () => { 
        try {
            if (qty !== '' && pId) {
                const filedata = { id: pId, qty: qty };
                const response = await postData(filedata, urls.cartAdd, "POST", navigation, extraData);
                if (response.status === 200) {
                    const cartData = response.data;
                    setCartNotEmpty(cartData.cartDetail.cartCount); // ✅ Set Cart as Not Empty
                }
            }
        } catch (error) {
            console.error("Cart API Error:", error);
        }
    };

    // 🛠️ Fetch Product List
    const fetchData = async () => {
        try {
            const response = await postData({}, urls.productList, "GET", navigation, extraData);
            if (response.status === 200) {
                setData(response.data.list);
                const updatedQuantities = {};
                data.forEach((pro) => {
                    updatedQuantities[pro.id] = pro.qty;
                });
                setQuantities(updatedQuantities);
            } 
        } catch (error) {
            console.error("API call failed:", error);
        }
    };

    // 🛠️ Refresh List
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchData().then(() => setRefreshing(false));
        setQuantities({});
        setCartNotEmpty(0); // ✅ Reset Cart Status
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

    // 🛠️ Render Product Card
    const renderProduct = ({ item }) => (
        <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.details}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.price}>{item.sale_price}</Text>
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
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.list}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                showsVerticalScrollIndicator={false}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
            />
            
            {/* ✅ Show Cart Button When Cart is Not Empty */}
            {cartNotEmpty!=0?
                <TouchableOpacity style={styles.cartButton} onPress={() => navigation.navigate('Checkout')}>
                    <Text style={styles.cartText}>Go to Cart</Text>
                </TouchableOpacity>
                :null
            }
        </View>
    );
}

// 🛠️ Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
    },
    list: {
        paddingBottom: 80, // ✅ Adjust to Prevent Overlapping with Cart Button
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
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: '#e74c3c',
        padding: 15,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
    },
    cartText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default ProductsScreen;
