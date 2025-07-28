import {
  Alert
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import RNFS from 'react-native-fs';
import { MMKV } from 'react-native-mmkv';
const storage = new MMKV();




export const apiUrl = () => {
  // const mainUrl = 'http://192.168.1.61/projects/irshad/shivveda.in/api/user/';   
  const mainUrl = 'https://shivveda.in/api/user/';  
  return {
    "login":`${mainUrl}login`,
    "registerOtpSend":`${mainUrl}register-otp-send`,
    "register":`${mainUrl}register`,
    "updateProfile":`${mainUrl}update-profile`,
    "updatePassword":`${mainUrl}update-password`,
    "getProfile":`${mainUrl}get-profile`,
    "logout":`${mainUrl}logout`,
    "sendOtp":`${mainUrl}send-otp`,
    "submitOtp":`${mainUrl}submit-otp`,
    "createPassword":`${mainUrl}create-password`,
    
    "country":`${mainUrl}country`,
    "package":`${mainUrl}package`,
    "state":`${mainUrl}state`,
    "searchSponser":`${mainUrl}search-sponser`,
    "checkSponser":`${mainUrl}check-sponser`,


    "homeDetail":`${mainUrl}home-detail`,
    "keuDetail":`${mainUrl}kyc-detail`,
    "kycAdd":`${mainUrl}kyc-add`,
    "walletList":`${mainUrl}wallet-list`,
    "withdrawalList":`${mainUrl}withdrawal-list`,
    "withdrawalAdd":`${mainUrl}withdrawal-add`,
    "supportLsit":`${mainUrl}support-list`,
    "supportAdd":`${mainUrl}support-add`,
    "earningList":`${mainUrl}earning-list`,
    "lavelEarningList":`${mainUrl}lavel-earning-list`,
    "depositList":`${mainUrl}deposit-list`,
    "depositAdd":`${mainUrl}deposit-add`,
    "depositSubmit":`${mainUrl}deposit-submit`,
    "teamTree":`${mainUrl}team-tree`,
    "teamDirect":`${mainUrl}team-direct`,
    "teamLeft":`${mainUrl}team-left`,
    "teamRight":`${mainUrl}team-right`,    
    "newRegister":`${mainUrl}new-register`,
    "accountActivation":`${mainUrl}account-activation`,
    
    "productList":`${mainUrl}product-list`,

    "cartList":`${mainUrl}cart-list`,
    "cartAdd":`${mainUrl}cart-add`,
    
    "orderList":`${mainUrl}my-order`,
    "orderDetail":`${mainUrl}my-order-detail`,


    "useWallet":`${mainUrl}use-wallet`,
    "checkoutCheck":`${mainUrl}checkout-check`,
    "checkout":`${mainUrl}checkout`,

    "kycDetail":`${mainUrl}kyc-detail`,

  };
};



export const postData = async (filedata, url, method, navigation, extraData) => {

  // console.log(url)
  // return false;
  const deviceId = await DeviceInfo.getUniqueId();
  let data = '';
  if(method=='POST')  data = JSON.stringify(Object.assign(filedata, { device_id: deviceId}));
  if(method=='GET') data = '';


  if (method === 'GET' && filedata) {
    const params = new URLSearchParams({ ...filedata, device_id: deviceId }).toString();
    url += `?${params}`; // Append query parameters
  }

  extraData.loader.setShowLoader(true);
  
  
  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        "Authorization":"Bearer "+storage.getString('token'),
      },
      body: data, // Convert data to JSON string
    });    
    return await responseCheck(response, navigation, extraData);   
  } catch (error) {
    extraData.loader.setShowLoader(false);
    console.error("Failed to make POST request:", error);
    return error;
  }
};

const responseCheck = async (response, navigation, extraData) => {

  
  try {
    
    let result = [];
    if(response.status==200 || response.status==400 || response.status==401) 
      {
        result = await response.json();      
      } 
      else{ 
        result = response; 
      }
      console.log("Response:", result); 
    extraData.loader.setShowLoader(false);
     


 


    if (result.status === 200) {
      switch (result.action) {
        case "add":
          showSuccessMessage(result.message, extraData, 1);
          return result;
  
        case "login":
          showSuccessMessage(result.message, extraData, 1);
          storeLoginToken(result);
          extraData.user.setUsername('');
          extraData.user.setPassword('');
          navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }], 
          });
          return;

          case "tokenUpdate":
          case "register":
          showSuccessMessage(result.message, extraData, 1);
          storeLoginToken(result);
          navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }], 
          });
          return;

          case "placeOrder":
          showSuccessMessage(result.message, extraData, 1);
          storeLoginToken(result);
          navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }], 
          });
          return result;
          
          case "logout":
          showSuccessMessage(result.message, extraData, 1);
          storage.delete('token');
          navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }], 
          });
          return;

  
        case "return": 
          return result;
 
        case "detail":
          return result;
 
        case "list":
          return result;
  
        default:
          showSuccessMessage(result.message, extraData, 1);
          return result;
      }
    } 
    else {
      if (result.responseJSON) result = result.responseJSON;
  
      if (result.status === 400) {
        if (result.action === "login") {
          showSuccessMessage(result.message, extraData, 0);
          // storeLoginToken('');
        } else if (result.action === "edit" || result.action === "add") {
          showSuccessMessage(result.message, extraData, 0);
        } else if (result.action === "check_login") {
          return result;
        } else {
          showSuccessMessage(result.message, extraData, 0);
        }
      } 
      else if (result.status === 401) {
        // showSuccessMessage(result.message, extraData, 0);
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });
        storage.delete('token');
      } 
      else if (result.status === 419) {
        refreshScreen();
      } 
      else {
        showSuccessMessage(response.message, extraData, 0);
      } 
    }

    return result; // Return parsed JSON data
  } catch (error) {
    extraData.loader.setShowLoader(false);
    console.error("Invalid JSON response:", error);
    return error; // Return null if JSON parsing fails
  }
};

export const showSuccessMessage = (message, extraData, type) => {
  extraData.alert.setAlertMessage(message);
  extraData.alert.setShowAlert(true);
  extraData.alert.setAlertType(type);
};

const showErrorMessage = (message) => {
  Alert.alert("Error", message);
};

const storeLoginToken = (result) => {
  try {
    storage.set('token',result?.token);
    storage.set('user',JSON.stringify(result?.data));
  } catch (error) {
    console.error("Failed to save token:", error);
  }
};


export const convertToBase64 = async (uri) => {
  try {

    if(uri)
    {      
      const base64String = await RNFS.readFile(uri, 'base64');
      const base64Image = `data:image/jpeg;base64,${base64String}`; // Use correct MIME type if needed
      // console.log('Base64 Image:', base64Image);
      return base64Image;
      // You can now upload this Base64 string
      // uploadImage(base64Image);
    }
  } catch (error) {
    console.log('Error converting to Base64:', error);
  }
};