import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
} from 'react-native';
import theme from '../../../StyleSheet/theme';
import { WebView } from 'react-native-webview';
import { MMKV } from "react-native-mmkv";
const storage = new MMKV();

export function TreeScreen({ navigation, extraData=[] }) {

  const [userDetail, setuserDetail] = useState(JSON.parse(storage.getString("user")));

  const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
      // setPage(0);
      setRefreshing(true);
      setRefreshing(false);
      // fetchPosts(page);
    }, []);

  return (
    <View style={{ flex: 1 }}>


       

                      <WebView
                         originWhitelist={['*']}
                         
                      style={[styles.webview]} source={{ uri: `https://shivveda.in/tree?id=${userDetail.id}` }} 
                      scalesPageToFit={false}
                      javaScriptEnabled={true}
                      />
                             


      
    </View>
  );
}

const styles = StyleSheet.create({
  amount: { fontSize: 15, fontWeight: 'bold' },
  webview:{
    height:500,
    width:'100%'
  }
});


