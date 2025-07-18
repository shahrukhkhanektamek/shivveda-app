import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import theme from '../../StyleSheet/theme';

import PageHeader from '../../navBar/pageHeader';

import LinearGradient from 'react-native-linear-gradient';
import GradientStyles from '../../StyleSheet/GradientStyles';
import { launchImageLibrary } from 'react-native-image-picker';

import PaymentModePicker from '../../component/PaymentModePicker';

import { postData, apiUrl } from '../../component/api';
const urls=apiUrl();

export function DepositPayScreen({ navigation, route, extraData=[] }){

  const amount = route.params.data.amount;
  const amountString = route.params.data.amountString;
  const qr = route.params.data.qr;
  const upi = route.params.data.upi;
  const [selectedPaymentMode, setSelectedPaymentMode] = useState("Select Payment Mode");
  const [uploadScreenshot, setUploadScreenshot] = useState(null);
  const [paymentScreenshot, setPaymentScreenshot] = useState(null);
  

  const chooseImage = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, async (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const imageUri = response.assets[0].uri;
        const image64 = await convertToBase64(imageUri);
        setUploadScreenshot(image64);
        setPaymentScreenshot(response.assets[0].uri);
      }
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await postData({"amount":amount,"payment_mode":selectedPaymentMode,"image":uploadScreenshot}, urls.depositSubmit, "POST", navigation, extraData);
      if(response.status==200)
      {
        const data = response.data; 
        setUploadScreenshot('');        
        navigation.navigate("DepositList")
      }
    } catch (error) {
      console.error("API call failed:", error);
    }
  };
  


  return ( 
    <View flex={1}>
      <PageHeader pageTitle="Deposit Pay" navigation={navigation} />
      <ScrollView style={theme.themeBg}>

        <View style={[theme.card]}>
            <View style={[theme.cardBody, styles.cardBody]}>
                
                <Text style={[styles.amount]}>Pay {amountString}</Text>
                <Text style={[styles.p]}>Pay to given address. Send Payment Proof for approval to company.</Text>

                <Image
                    source={{ uri: qr }}
                    style={styles.qr}
                />

                <Text style={[styles.upi]}>{upi}</Text>
                

                <View style={[theme.col12]}>
                  <PaymentModePicker style={[theme.inputContainer]} selectedPaymentMode={selectedPaymentMode} setSelectedPaymentMode={setSelectedPaymentMode} extraData={extraData} />              
                </View>
                <View style={[theme.col12]}>
                  <TouchableOpacity style={styles.uploadBtn} onPress={chooseImage}>
                    <Text style={styles.uploadText}>Choose File</Text>
                  </TouchableOpacity>
                  {paymentScreenshot && <Image source={{ uri: paymentScreenshot }} style={styles.preview} />}
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
        

        


        

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  cardBody:{
        alignItems:'center',
        textAlign:'center',        
    },
    qr:{
      width:250,
      height:250,
    },
    amount:{
        fontSize:15,
        fontWeight:'bold'
    },
});

