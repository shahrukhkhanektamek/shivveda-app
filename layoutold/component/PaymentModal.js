import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity,  Modal, StyleSheet, Image, Clipboard, Alert, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import theme from '../StyleSheet/theme';
import { launchImageLibrary } from 'react-native-image-picker';

import { postData, apiUrl, convertToBase64 } from './api';

const PaymentModal = ({ modalVisible, setModalVisible, cartFinalAmount, upi, qrcode, screenshot, setscreenshot, handlePlaceOrder, upiUrl }) => {
  
 
  const handleCopy = () => {
    Clipboard.setString(upi);
    Alert.alert("Copied!", "Copied");
  };
 
  const chooseImage = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };
    launchImageLibrary(options, async (response) => {
      console.log("Asfas")
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const imageUri = response.assets[0].uri;
        const image64 = await convertToBase64(imageUri);
        // setbankPassbook(response.assets[0].uri);
        // filedata.passbook_image = image64;
        setscreenshot(imageUri);
        console.log(screenshot)
      }
    });
  };



  return (
    
    <View>
      <Modal 
        visible={modalVisible} 
        animationType="slide" 
        transparent={true} 
        onRequestClose={() => {setModalVisible(false)}}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ width: '80%', backgroundColor: '#fff', padding: 20, borderRadius: 10 }}>
            


          <View style={styles.modalContainer}>
       

        {/* QR Code */}
        <Image
          source={{ uri: qrcode }}
          style={styles.qrImage}
          resizeMode="contain"
        />

        {/* Pay Now Button */}
        <TouchableOpacity
          onPress={() => Linking.openURL(upiUrl)}
          style={styles.payButton}
        >
          <Text style={styles.payButtonText}>Pay Now</Text>
        </TouchableOpacity>

        {/* Amount */}
        <Text style={styles.amount}>
          {(cartFinalAmount)}
        </Text>

        {/* UPI Text Copy */}
        <TouchableOpacity onPress={handleCopy}>
          <Text style={styles.upiCopy}>
            {upi} <Text style={styles.copyIcon}>📋</Text>
          </Text>
        </TouchableOpacity>

        {/* Image Picker */}
        <View style={styles.uploadSection}>
          <Text style={styles.uploadLabel}>Upload Payment Screenshot</Text>         
          <TouchableOpacity onPress={chooseImage} style={theme.fileType}>
              {screenshot ? (
              <Image source={{ uri: screenshot }} style={theme.fileTypeimage} />
              ) : (
              <Text style={theme.placeholderText}>Select Passbook Image</Text>
              )} 
          </TouchableOpacity>
        </View>

        {/* Footer Buttons */}
        <View style={styles.footer}>
            
            <TouchableOpacity 
              onPress={() => setModalVisible(false)} 
              style={{ marginTop: 20, padding: 10, backgroundColor: 'red', borderRadius: 5 }}>
              <Text style={{ color: '#fff', textAlign: 'center' }}>Close</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={handlePlaceOrder}
              style={{ marginTop: 20, padding: 10, backgroundColor: '#4CAF50', borderRadius: 5 }}>
              <Text style={{ color: '#fff', textAlign: 'center' }}>Submit</Text>
            </TouchableOpacity>

        </View>
      </View>
           






            {/* ✅ Close Button */}
            

          </View>
        </View>
      </Modal>
    </View>
   
  );
};

export default PaymentModal;


const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 0,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  closeText: {
    fontSize: 24,
  },
  qrImage: {
    width: 150,
    height: 150,
    alignSelf: 'center',
  },
  payButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 5,
    marginTop: 15,
    alignSelf: 'center',
  },
  payButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  amount: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  upiCopy: {
    textAlign: 'center',
    color: '#333',
    marginTop: 10,
  },
  copyIcon: {
    fontSize: 18,
  },
  uploadSection: {
    marginTop: 20,
  },
  uploadLabel: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  uploadBox: {
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  uploadText: {
    color: '#444',
  },
  preview: {
    width: '100%',
    height: 200,
    marginTop: 10,
    borderRadius: 6,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  closeFooterButton: {
    padding: 10,
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 6,
  },
});
