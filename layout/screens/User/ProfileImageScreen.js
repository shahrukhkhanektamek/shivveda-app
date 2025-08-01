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


import Icon from 'react-native-vector-icons/FontAwesome';
import { Picker } from '@react-native-picker/picker';
import theme from '../../StyleSheet/theme';

import PageHeader from '../../navBar/pageHeader';

import LinearGradient from 'react-native-linear-gradient';
import GradientStyles from '../../StyleSheet/GradientStyles';

import CountryPicker from '../../component/CountryPicker';
import StatePicker from '../../component/StatePicker';

import PageLoding from '../../component/PageLoding';

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

    // console.log(image.path)

    try {
      const filedata = {
        "image": await convertToBase64(image.path)
      };
        // Object.assign(filedata, { image: await convertToBase64(image.path)});

        console.log(filedata);

        return false;
        const response = await postData(filedata, urls.updateProfileImage, "POST", navigation, extraData);
        if(response.status==200)
            {
                const data = response.data;
                // setData(data);
            }

        } catch (error) {
            console.error("API call failed:", error);
        }



    // setUploading(true);
    // const formData = new FormData();
    // formData.append('croppedImage', {
    //   uri: image.path,
    //   type: image.mime,
    //   name: 'cropped_image.jpg',
    // });
    // formData.append('id', userId); // already encrypted from backend

    // try {
    //   const response = await fetch(submitUrl, {
    //     method: 'POST',
    //     body: formData,
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //     },
    //   });

    //   const json = await response.json();

    //   if (json.status === 200) {
    //     setImageUri(json.data.image);
    //     Alert.alert('Success', 'Image uploaded successfully!');
    //   } else {
    //     Alert.alert('Error', json.message || 'Upload failed');
    //   }
    // } catch (error) {
    //   console.error('Upload error:', error);
    //   Alert.alert('Error', 'Something went wrong while uploading');
    // } finally {
    //   setUploading(false);
    // }
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
