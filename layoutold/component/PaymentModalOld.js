import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  Image,
  StyleSheet,
  Alert,
  Modal
} from 'react-native';
// import Modal from 'react-native-modal';
// import Clipboard from '@react-native-clipboard/clipboard';
import { launchImageLibrary } from 'react-native-image-picker';

const PaymentModal = ({ isVisible, onClose, cartDetail, upi }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const upiUrl = `upi://pay?pa=${upi}&am=${cartDetail.cartFinalAmount}&cu=INR`;
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
    upiUrl
  )}&size=300x300`;

  const handleCopy = () => {
    Clipboard.setString(upi);
    Alert.alert('Copied', 'UPI ID copied to clipboard');
  };

  const pickImage = async () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.assets && response.assets.length > 0) {
        setSelectedImage(response.assets[0].uri);
      }
    });
  };

  const handleSubmit = () => {
    // Upload logic goes here
    Alert.alert('Submitted', 'Payment screenshot submitted!');
    onClose();
  };

  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose}>
      <View style={styles.modalContainer}>
        {/* Close Button */}
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeText}>×</Text>
        </TouchableOpacity>

        {/* QR Code */}
        <Image
          source={{ uri: qrImageUrl }}
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
          ₹{parseFloat(cartDetail.cartFinalAmount).toFixed(2)}
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
          <TouchableOpacity onPress={pickImage} style={styles.uploadBox}>
            <Text style={styles.uploadText}>Choose Image</Text>
          </TouchableOpacity>
          {selectedImage && (
            <Image source={{ uri: selectedImage }} style={styles.preview} />
          )}
        </View>

        {/* Footer Buttons */}
        <View style={styles.footer}>
          <TouchableOpacity onPress={onClose} style={styles.closeFooterButton}>
            <Text>Close</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
            <Text style={{ color: 'white' }}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default PaymentModal;

const styles = StyleSheet.create({
    modalContainer: {
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 16,
    },
    closeButton: {
      alignSelf: 'flex-end',
    },
    closeText: {
      fontSize: 24,
    },
    qrImage: {
      width: 250,
      height: 250,
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
  