import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  CheckBox,
  TextInput,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import { launchImageLibrary } from 'react-native-image-picker';
import StatePicker from '../../component/StatePicker';
import PageHeader from '../../navBar/pageHeader';
import { postData, apiUrl, convertToBase64 } from '../../component/api';
import theme from '../../StyleSheet/theme';
import PageLoding from '../../component/PageLoding';
const urls = apiUrl();

import { MMKV } from 'react-native-mmkv';
import PaymentModal from '../../component/PaymentModal';
const storage = new MMKV();

export function CheckoutScreen({ navigation, extraData = [] }) {

    const [userDetail, setuserDetail] = useState(JSON.parse(storage.getString('user')));

    const [modalVisible, setModalVisible] = useState(false);

  const [cartItems, setCartItems] = useState([]);
  const [cartDetail, setcartDetail] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [walletUseAmount, setwalletUseAmount] = useState(0);
  const [payAbleAmount, setpayAbleAmount] = useState(0);
  const [payable_amount_int, setpayable_amount_int] = useState(0);
  const [qrcode, setqrcode] = useState(0);
  const [upi, setupi] = useState('');
  const [upiUrl, setupiUrl] = useState('');

  const [selectedState, setSelectedState] = useState();
  const [name, setname] = useState();
  const [email, setemail] = useState();
  const [phone, setphone] = useState();
  const [address, setaddress] = useState();
  const [city, setcity] = useState();
  const [pincode, setpincode] = useState();

  const [screenshot, setscreenshot] = useState('');

  const [useWallet, setUseWallet] = useState(false);
  const [payment_mode, setpayment_mode] = useState(0);

  const [isLoading, setisLoading] = useState(true);

  const handleWalletToggle = () => {
    setUseWallet(!useWallet);
    if(!useWallet) setpayment_mode(1)
    else setpayment_mode(0)
    
    // use_wallet();

 
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  useEffect(() => {
    use_wallet();
  }, [payment_mode]);

  const priceFormat = (value) => {
    return `₹${parseFloat(value).toFixed(2)}`;
  };
  const fetchCartItems = async () => {
    try {
      const response = await postData({}, urls.cartList, "GET", navigation, extraData);
      if (response.status === 200) {
        setCartItems(response.data.cartDetail.cartProducts);
        calculateTotal(response.data.items);
        setcartDetail(response.data.cartDetail);
      }
    } catch (error) {
      console.error("Cart API Error:", error);
    }
  };
  const use_wallet = async () => {
    try {
      const response = await postData({"payment_mode":payment_mode}, urls.useWallet, "POST", navigation, extraData);
      if (response.status === 200) {
        
        setwalletUseAmount(response.data.wallet_amount)
        setpayAbleAmount(response.data.payable_amount)
        setqrcode(response.image)
        setupi(response.upi)
        setupiUrl(response.upiUrl)
      }
      setisLoading(false)
    } catch (error) {
      console.error("Cart API Error:", error);
    }
  };

  const calculateTotal = (items) => {
    let total = 0;
    items?.forEach((item) => {
      total += Number(item.sale_price) * Number(item.qty);
    });
    setTotalAmount(total);
  };

  const handlePlaceOrder = async () => {
    try {
        let fileData = {
            "payment_mode":payment_mode,
            "name":name,
            "email":email,
            "phone":phone,
            "state":selectedState,
            "city":city,
            "pincode":pincode,
            "address":address,
        };
        Object.assign(fileData, { image: await convertToBase64(screenshot)});

        // console.log(fileData);

      const response = await postData(fileData, urls.checkout, "POST", navigation, extraData);
      if (response.status === 200) {
        Alert.alert("Success", "Your order has been placed successfully!");
        navigation.navigate("Home");
      }
      
    } catch (error) {
      console.error("Order API Error:", error);
    }
  };



  const handleImagePick = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.assets && response.assets.length > 0) {
        setSelectedImage(response.assets[0].uri);
      }
    });
  };
  const handleModalSubmit = () => {
    Alert.alert("Submitted", "Payment screenshot submitted!");
    setModalVisible(false);
  };

  if (isLoading) {
    return ( 
        <PageLoding />          
    );
  }


  return (
    <View style={styles.container}>
      <PageHeader pageTitle="Checkout" navigation={navigation} />

      <ScrollView contentContainerStyle={styles.list}>
        {cartItems.map((item) => (
          <View key={item.id.toString()} style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.details}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>{priceFormat(item.sale_price)} x {item.qty}</Text>
              <Text style={styles.total}>Total: {priceFormat(item.sale_price * item.qty)}</Text>
            </View>
          </View>
        ))}

        <View style={[theme.row, theme.card]}>
            <View style={styles.table}>
                <View style={styles.row}>
                <Text style={styles.cellLabel}>Cart Total</Text>
                <Text style={styles.cellValue}>{(cartDetail.cartTotal)}</Text>
                </View>

                <View style={styles.row}>
                <Text style={styles.cellLabel}>Gst</Text>
                <Text style={styles.cellValue}>{cartDetail.gst}</Text>
                </View>

                <View style={styles.row}>
                <Text style={styles.cellLabel}>Final Amount</Text>
                <Text style={styles.cellValue}>{(cartDetail.cartFinalAmount)}</Text>
                </View>

                {useWallet && (
                <>
                    <View style={styles.row}>
                    <Text style={styles.cellLabel}>Wallet Use</Text>
                    <Text style={styles.cellValue}>-<Text>{(walletUseAmount || 0)}</Text></Text>
                    </View>

                    <View style={styles.row}>
                    <Text style={styles.cellLabel}>Payable Amount</Text>
                    <Text style={styles.cellValue}>{(payAbleAmount)}</Text>
                    </View>
                </>
                )} 
            </View>

            {/* <Text style={styles.totalBV}>Total BV: {cartDetail.totalBv}</Text> */}

            {userDetail?.is_paid && (
            <TouchableOpacity
                onPress={handleWalletToggle}
                style={[
                styles.walletButton,
                useWallet ? styles.walletButtonActive : styles.walletButtonInactive
                ]}
            >
                <Text style={styles.walletButtonText}>
                {useWallet ? '✓ Using Repurchase Wallet' : 'Use Repurchase Wallet'}
                </Text>
            </TouchableOpacity>
            )}
        </View>
        <View style={[theme.row, theme.card]}>
            <View style={[theme.col6]}>                    
                <View style={theme.inputContainer}>
                <Icon name="user" size={20} style={theme.inputIcon} />
                <TextInput
                    style={theme.input}
                    placeholder="Name"
                    placeholderTextColor="#999"
                    value={name}
                    onChangeText={setname}
                />
                </View>
            </View>
            <View style={[theme.col6]}>                    
                <View style={theme.inputContainer}>
                <Icon name="user" size={20} style={theme.inputIcon} />
                <TextInput
                    style={theme.input}
                    placeholder="Mobile"
                    placeholderTextColor="#999"
                    value={phone}
                    onChangeText={setphone}
                />
                </View>
            </View>
            <View style={[theme.col12]}>                    
                <View style={theme.inputContainer}>
                <Icon name="user" size={20} style={theme.inputIcon} />
                <TextInput
                    style={theme.input}
                    placeholder="Email"
                    placeholderTextColor="#999"
                    value={email}
                    onChangeText={setemail}
                />
                </View>
            </View>
            
            <View style={[theme.col6]}>
              <StatePicker style={[theme.inputContainer]}
                selectedState={selectedState} 
                setSelectedState={setSelectedState}
                extraData={extraData}
              />
          </View>

          <View style={[theme.col6]}>
            <View style={theme.inputContainer}>
              
              <Icon name="map" size={20} style={theme.inputIcon} />
              <TextInput
                style={theme.input}
                placeholder="City"
                placeholderTextColor="#999"
                value={city}
                onChangeText={setcity}
              />
            </View>
          </View>
          
          <View style={[theme.col12]}>
            <View style={theme.inputContainer}>
              <Icon name="circle" size={20} style={theme.inputIcon} />
              <TextInput
                style={theme.input}
                placeholder="Picode"
                placeholderTextColor="#999"
                value={pincode}
                onChangeText={setpincode}
              />
            </View>
          </View>
          
          <View style={[theme.col12]}>
            <View style={theme.inputContainer}>
              <Icon name="home" size={20} style={theme.inputIcon} />
              <TextInput
                style={theme.input}
                placeholder="Address"
                placeholderTextColor="#999"
                value={address}
                onChangeText={setaddress}
              />
            </View>
          </View>


          
        </View>

      </ScrollView>


    


            <PaymentModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                cartFinalAmount={payAbleAmount}
                upi={upi}
                qrcode={qrcode}
                screenshot={screenshot}
                setscreenshot={setscreenshot}
                handlePlaceOrder={handlePlaceOrder}
                upiUrl={upiUrl}
                />

      <View style={styles.summary}>
        <TouchableOpacity style={styles.orderButton}
        //  onPress={handlePlaceOrder}
         onPress={() => setModalVisible(true)}
         >
          <Text style={styles.orderText}>Payment Now</Text>
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
    paddingBottom: 10,
    paddingTop: 10,
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
    padding: 10,
    backgroundColor: '#fff',
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  orderButton: {
    backgroundColor: '#27ae60',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  orderText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },


  
  table: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
    width:'100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  cellLabel: {
    fontWeight: 'bold',
    color: '#333',
  },
  cellValue: {
    color: '#333',
  },
  totalBV: {
    textAlign: 'center',
    fontSize: 16,
    marginVertical: 12,
    fontWeight: 'bold',
  },
  walletContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  walletLabel: {
    marginLeft: 8,
    fontSize: 16,
    color: 'green',
  },

  walletButton: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    alignItems: 'center',
  },
  
  walletButtonActive: {
    backgroundColor: '#28a745', // green
  },
  
  walletButtonInactive: {
    backgroundColor: '#ccc', // gray
  },
  
  walletButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },

});

export default CheckoutScreen;
