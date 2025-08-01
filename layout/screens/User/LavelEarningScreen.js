import React, { useState, useEffect, useCallback, useRef  } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  useWindowDimensions,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
  BackHandler,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFocusEffect } from '@react-navigation/native';

import theme from '../../StyleSheet/theme';

import PageHeader from '../../navBar/pageHeader';
import PageLoding from '../../component/PageLoding';
import RenderHtml from 'react-native-render-html';

import { postData, apiUrl } from '../../component/api';
const urls=apiUrl();



export function LavelEarningScreen({ navigation, extraData=[] }){
    
    const { width } = useWindowDimensions();
    const listRef = useRef(null);

    const [level, setlevel] = useState(0);

    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const [refreshing, setRefreshing] = useState(false);
    const [isLoading, setisLoading] = useState(true);
    const fetchData = async (pagep) => {
        try {
            const response = await postData({"level":level}, urls.lavelEarningList, "GET", navigation, extraData);
            if(response.status==200)
            {
                const data = response.data; 
                setData(data);
                
                setRefreshing(false);
            }  
            setisLoading(false)
        } catch (error) {
            console.error("API call failed:", error);
        }
    };

    const selectLevel = (newtype) => {
        setlevel(newtype);
        setPage(0);
    };

    const onRefresh = useCallback(() => {
        setPage(0);
        // settype('')
        setRefreshing(true);
        
        // fetchData(page, type)
    }, []);


    useEffect(() => {
        fetchData(page);
    }, [page, level, refreshing]);
    const handleLoadMore = () => {
        // const nextPage = page + 1;
        // setPage(nextPage);
        // fetchData(nextPage, type);
    };



    useFocusEffect(
  React.useCallback(() => {
    const onBackPress = () => {
      if (level) {
        // Go back to level selection
        selectLevel(0);
        return true; // Prevent default back behavior
      }
      return false; // Allow default behavior (e.g. go back screen)
    };

    BackHandler.addEventListener('hardwareBackPress', onBackPress);

    return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  }, [level])
);

  if (isLoading) {
    return ( 
        <PageLoding />          
    );
  }

  return (
    <View flex={1}>
        
        <FlatList
        ref={listRef}
            ListHeaderComponent={
            <>
                <PageHeader pageTitle="Repurchase Business" navigation={navigation} />
                <View style={theme.themeBg}>

                {(level!=0) ? ( 
                    <Text style={[styles.levelHeading]}>Level {level}</Text>
                ):
                (
                    <Text></Text>                
                )}







        {data.map((item) => (
          <React.Fragment key={item.id}>
            {(level==0) ? ( 
               <TouchableOpacity key={item.key}
                  style={styles.cell}
                  onPress={() => selectLevel(item.key)}
                >
                    <View style={[theme.cardRow, theme.row]}>
                        <View style={[theme.col12]}>
                            <Text style={[theme.statusSuccess]}>Level {item.key}</Text>
                            <Text style={[styles.amountText]}>Members: {item.totalMembers}</Text>
                            <Text style={[styles.amountText]}>RBV: {item.total_rbv}</Text>
                            <Text style={[styles.amountText]}>Amount: {item.amount}</Text>
                            <Text style={[styles.amountText]}>TDS Amount: {item.tds_amount}</Text>
                            <Text style={[styles.amountText]}>Final Amount: {item.final_amount}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            ): (
               <View key={item.key}>
                    <View style={[theme.cardRow, theme.row]}>
                        <View style={[theme.col12]}>
                            <Text style={[styles.amountText]}>Member ID: {item.member_id}</Text>
                            <Text style={[styles.amountText]}>Name: {item.name}</Text>
                            <Text style={[styles.amountText]}>RBV: {item.rbv}</Text>
                            <Text style={[styles.amountText]}>Amount: {item.amount}</Text>
                            <Text style={[styles.amountText]}>TDS Amount: {item.tds_amount}</Text>
                            <Text style={[styles.amountText]}>Final Amount: {item.final_amount}</Text>
                        </View>
                    </View>
                </View>
            )}
          </React.Fragment>
        ))}


                </View>
                </>
                }
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
     
    </View>
  );
};

const styles = StyleSheet.create({
    amountText:{
        fontSize:15,
        marginBottom:5,
        justifyContent:'space-between',
        display:'flex',
        fontWeight:'bold'
    },
    walletBoxRow:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        textAlign:'center'
    },
    walletBox:{
        borderWidth:1,
        padding:10,
        borderRadius:5,
    },
    inrIcon:{
        fontSize:20,
        fontWeight:'bold',
        textAlign:'center',
    },
    walletPrice:{
        fontSize:20,
        fontWeight:'bold',
        textAlign:'center',
    },
    walletBoxText:{
        fontSize:17,
        fontWeight:'bold',
        textAlign:'center',
    },
    textDeviderPlus:{
        fontSize:50,
        fontWeight:'bold',
        textAlign:'center',
    },
    amount:{
        textAlign:'right'
    },
    levelHeading:{
        fontSize:20,
        // backgroundColor:'lightgray',
        textAlign:'center',
        marginTop:10,
        fontWeight:'900'
    }


});

