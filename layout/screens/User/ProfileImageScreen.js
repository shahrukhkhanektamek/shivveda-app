import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

import theme from '../../StyleSheet/theme';

import PageHeader from '../../navBar/pageHeader';



import { postData, apiUrl, convertToBase64 } from '../../component/api';
const urls=apiUrl();


export function ProfileImageScreen({ navigation, extraData=[] }){


  const [imageUri, setImageUri] = useState(null);
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: true,
        includeBase64: true, // optional if you want base64
      });
      setImageUri(image.path);
      uploadImage(image);
    } catch (error) {
      console.log('Image selection cancelled or failed', error);
    }
  };
 
  const uploadImage = async (image) => {

    try {
      const filedata = {
        "image": await convertToBase64(image.path)
      };
        
        const response = await postData(filedata, urls.updateProfileImage, "POST", navigation, extraData);

        } catch (error) {
            console.error("API call failed:", error);
        }
  };

  return (
    <View flex={1}>

      <PageHeader pageTitle="Profile Image" navigation={navigation} />

      <View style={[styles.buttonContainer]}>
        <TouchableOpacity style={[styles.button, theme.mt20]} onPress={pickImage} >
          <Text style={styles.buttonText}>Select and Crop Image</Text>
        </TouchableOpacity>
      </View>

      {uploading && <ActivityIndicator size="large" color="#27ae60" />}

      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          style={styles.imagePreview}
          resizeMode="cover"
        />
      )}
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  buttonContainer:{
    textAlign:'center',
    display:'flex'
  },
  button: {
    backgroundColor: '#27ae60',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    width:'100%',
    justifyContent:'center',
    textAlign:'center'
  },
  buttonText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  imagePreview: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginTop: 10,
  },
});
