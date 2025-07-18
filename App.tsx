import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';



import NormalScreen from './layout/screens/Theme/NormalScreen';
import FooterScreen from './layout/screens/Theme/FooterScreen';
import FooterSidebarScreen from './layout/screens/Theme/FooterSidebarScreen';

import { SplashScreen } from './layout/screens/SplashScreen';
import { LoginScreen } from './layout/screens/auth/Login';
import { SignUpScreen } from './layout/screens/auth/SignUp';
import { OtpScreen } from './layout/screens/auth/Otp';
import { RegisterOtpScreen } from './layout/screens/auth/RegisterOtp';
import { ForgotScreen } from './layout/screens/auth/Forgot';
import { ChangePassword } from './layout/screens/auth/ChangePassword';
import { CreatePasswordScreen } from './layout/screens/auth/CreatePassword';

import { ProfileScreen } from './layout/screens/User/Profile';
import { SettingScreen } from './layout/screens/Setting';



import { HomeScreen } from './layout/screens/User/Home';
import { NewRegisterScreen } from './layout/screens/User/NewRegisterScreen';
import { AccountActivationScreen } from './layout/screens/User/AccountActivationScreen';
import { DepositListScreen } from './layout/screens/User/DepositListScreen';
import { DepositPayScreen } from './layout/screens/User/DepositPayScreen';

// teem
import { TeamScreen } from './layout/screens/User/Team/TeamScreen';

import { WalletScreen } from './layout/screens/User/WalletScreen';
import { WithdrawalScreen } from './layout/screens/User/WithdrawalScreen';
import { EarningScreen } from './layout/screens/User/EarningScreen';

// support
import { SupportScreen } from './layout/screens/User/Support/SupportScreen';

// order
import { OrderScreen } from './layout/screens/User/Order/OrderScreen';

import { ProductsScreen } from './layout/screens/User/Products';
import { CheckoutScreen } from './layout/screens/User/Checkout';


import { KycScreen } from './layout/screens/User/Kyc';

 

const Stack = createStackNavigator(); 


import { MMKV } from 'react-native-mmkv';
const storage = new MMKV();
let initialRoute2 = null;
function App() {

  const token = storage.getString('token');
  if(token) initialRoute2 = 'Home';
  else initialRoute2 = 'Login';
  
  initialRoute2 = 'Splash';
  

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
           headerShown: false,
           animation: 'slide_from_right',
           }}
        initialRouteName={initialRoute2}>
       
        <Stack.Screen name="Splash">
          {props => (
            <NormalScreen {...props}>
              <SplashScreen {...props} />
            </NormalScreen>
          )}
        </Stack.Screen>

        {/* Auth Screens */}
        <Stack.Screen name="Login">
          {props => (
            <NormalScreen {...props}>
              <LoginScreen {...props} />
            </NormalScreen>
          )}
        </Stack.Screen>
        <Stack.Screen name="Forgot">
          {props => (
            <NormalScreen {...props}>
              <ForgotScreen {...props} />
            </NormalScreen>
          )}
        </Stack.Screen>
        <Stack.Screen name="SignUp">
          {props => (
            <NormalScreen {...props}>
              <SignUpScreen {...props} />
            </NormalScreen>
          )}
        </Stack.Screen>
        <Stack.Screen name="Otp">
          {props => (
            <NormalScreen {...props}>
              <OtpScreen {...props} />
            </NormalScreen>
          )}
        </Stack.Screen>
        <Stack.Screen name="RegisterOtp">
          {props => (
            <NormalScreen {...props}>
              <RegisterOtpScreen {...props} />
            </NormalScreen>
          )}
        </Stack.Screen>
        <Stack.Screen name="CreatePassword">
          {props => (
            <NormalScreen {...props}>
              <CreatePasswordScreen {...props} />
            </NormalScreen>
          )}
        </Stack.Screen>

        <Stack.Screen name="Profile">
          {props => (
            <NormalScreen {...props}>
              <ProfileScreen {...props} />
            </NormalScreen>
          )}
        </Stack.Screen>
        <Stack.Screen name="ChangePassword">
          {props => (
            <NormalScreen {...props}>
              <ChangePassword {...props} />
            </NormalScreen>
          )}
        </Stack.Screen>
        <Stack.Screen name="Setting">
          {props => (
            <NormalScreen {...props}>
              <SettingScreen {...props} />
            </NormalScreen>
          )}
        </Stack.Screen>

       
        <Stack.Screen name="Home">
          {props => (
            <FooterSidebarScreen {...props}> 
              <HomeScreen {...props} />
            </FooterSidebarScreen>
          )}
        </Stack.Screen>
        <Stack.Screen name="NewRegister">
          {props => (
            <NormalScreen {...props}> 
              <NewRegisterScreen {...props} />
            </NormalScreen>
          )}
        </Stack.Screen>
        <Stack.Screen name="AccountActivation">
          {props => (
            <NormalScreen {...props}> 
              <AccountActivationScreen {...props} />
            </NormalScreen>
          )}
        </Stack.Screen>
        <Stack.Screen name="DepositList">
          {props => (
            <NormalScreen {...props}> 
              <DepositListScreen {...props} />
            </NormalScreen>
          )}
        </Stack.Screen>
        <Stack.Screen name="DepositPay">
          {props => (
            <NormalScreen {...props}> 
              <DepositPayScreen {...props} />
            </NormalScreen>
          )}
        </Stack.Screen>
        
        <Stack.Screen name="Team">
          {props => (
            <NormalScreen {...props}> 
              <TeamScreen {...props} />
            </NormalScreen>
          )}
        </Stack.Screen>

        <Stack.Screen name="Wallet">
          {props => (
            <NormalScreen {...props}> 
              <WalletScreen {...props} />
            </NormalScreen>
          )}
        </Stack.Screen>

        <Stack.Screen name="Withdrawal">
          {props => (
            <NormalScreen {...props}> 
              <WithdrawalScreen {...props} />
            </NormalScreen>
          )}
        </Stack.Screen>

        <Stack.Screen name="Earning">
          {props => (
            <NormalScreen {...props}> 
              <EarningScreen {...props} />
            </NormalScreen>
          )}
        </Stack.Screen>

        <Stack.Screen name="Support">
          {props => (
            <NormalScreen {...props}> 
              <SupportScreen {...props} />
            </NormalScreen>
          )}
        </Stack.Screen>

        <Stack.Screen name="Order">
          {props => (
            <NormalScreen {...props}> 
              <OrderScreen {...props} />
            </NormalScreen>
          )}
        </Stack.Screen>

        <Stack.Screen name="Products">
          {props => (
            <NormalScreen {...props}> 
              <ProductsScreen {...props} />
            </NormalScreen>
          )}
        </Stack.Screen>
        <Stack.Screen name="Checkout">
          {props => (
            <NormalScreen {...props}> 
              <CheckoutScreen {...props} />
            </NormalScreen>
          )}
        </Stack.Screen>

        <Stack.Screen name="Kyc">
          {props => (
            <NormalScreen {...props}> 
              <KycScreen {...props} />
            </NormalScreen>
          )}
        </Stack.Screen>

        
        



      </Stack.Navigator>     
    </NavigationContainer>
  );
}

export default App;
