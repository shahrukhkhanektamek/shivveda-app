import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Alert
} from 'react-native';
import PageHeader from '../../navBar/pageHeader';
import { postData, apiUrl } from '../../component/api';

const urls = apiUrl();

export function CheckoutScreen({ navigation, extraData = [] }) {
    const [cartItems, setCartItems] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        fetchCartItems();
    }, []);
 
    const fetchCartItems = async () => {
        try {
            const response = await postData({}, urls.cartList, "GET", navigation, extraData);
            if (response.status === 200) {
                setCartItems(response.data.cartDetail.cartProducts);
                calculateTotal(response.data.items);
            }
        } catch (error) {
            console.error("Cart API Error:", error);
        }
    };

    const calculateTotal = (items) => {
        let total = 0;
        setTotalAmount(total);
    };

    const handlePlaceOrder = async () => {
        try {
            const response = await postData({}, urls.placeOrder, "POST", navigation, extraData);
            if (response.status === 200) {
                Alert.alert("Success", "Your order has been placed successfully!");
                navigation.navigate("Home");
            }
        } catch (error) {
            console.error("Order API Error:", error);
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.details}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.price}>${item.sale_price} x {item.qty}</Text>
                <Text style={styles.total}>Total: ${item.sale_price * item.qty}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <PageHeader pageTitle="Checkout" navigation={navigation} />
            <FlatList
                data={cartItems}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.list}
            />
            <View style={styles.summary}>
                <Text style={styles.totalAmount}>Total: {totalAmount}</Text>
                <TouchableOpacity style={styles.orderButton} onPress={handlePlaceOrder}>
                    <Text style={styles.orderText}>Place Order</Text>
                </TouchableOpacity>
            </View>
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
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 10,
    },
    details: {
        flex: 1,
        marginLeft: 15,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    price: {
        fontSize: 16,
        color: '#555',
    },
    total: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    summary: {
        padding: 20,
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        elevation: 10,
    },
    totalAmount: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    orderButton: {
        backgroundColor: '#27ae60',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    orderText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default CheckoutScreen;