import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import theme from '../../../StyleSheet/theme';


import { postData, apiUrl } from '../../../component/api';
const urls = apiUrl();

export function AllSupportScreen({ navigation, route }){

  const { extraData } = route.params || {};



  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const fetchData = async (pagep) => {
      try {
        const response = await postData({"page":pagep}, urls.supportLsit, "GET", navigation, extraData);
        if(response.status==200)
        {
          const data = response.data; 
          setData(prevData => pagep === 0 ? data : [...prevData, ...data]);
        } 
      } catch (error) {
        console.error("API call failed:", error);
      }
  };
  const onRefresh = useCallback(() => {
    setPage(0);
    setRefreshing(true);
    setRefreshing(false);
    fetchData(page)
  }, []);
  useEffect(() => {
      fetchData(page);
  }, []);
  const handleLoadMore = () => {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchData(nextPage);              
  };




  return (
    <View flex={1}>
      

      <FlatList
            ListHeaderComponent={
            <>
                <View style={theme.themeBg}>

                <FlatList
                  data={data} // Array of items
                  keyExtractor={(item) => item.id} // Unique key for each item
                  renderItem={({ item }) => ( // Function to render each item
                          <View style={[theme.cardRow, theme.row]}>
                            <View style={[theme.col10]}>
                                <View style={[theme.row]}>
                                  <Text style={[theme.cardRowBold]}>Request ID.:</Text>
                                  <Text style={[theme.cardRowText]}>#{item.ticket_id}</Text>
                                </View>
                                <View style={[theme.row]}>
                                  <Text style={[theme.cardRowBold]}>Subject:</Text>
                                  <Text style={[theme.cardRowText]}>{item.subject}</Text>
                                </View>
                                <View style={[theme.row]}>
                                  <Text style={[theme.cardRowBold]}>Date Time:</Text>
                                  <Text style={[theme.cardRowText]}>{item.add_date_time}</Text>
                                </View>
                            </View>
                            <View style={[theme.col2]}>
                                {
                                    item.status==0?
                                        <Text style={[theme.statusDefault]}>{item.statusText}</Text>
                                    :item.status==1?
                                        <Text style={[theme.statusSuccess]}>{item.statusText}</Text>
                                    :item.status==2?
                                        <Text style={[theme.statusInfo]}>{item.statusText}</Text>
                                    :item.status==3?
                                        <Text style={[theme.statusDanger]}>{item.statusText}</Text>
                                    :null
                                }
                            </View>
                          </View>              
                      )}
                      onEndReached={handleLoadMore}
                      onEndReachedThreshold={0.5}
                  />



                  
                        


                  </View>
                </>
                }
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />



      
    </View>
  );
};

const styles = StyleSheet.create({
    roundCircule:{
        flexDirection:'row',
        backgroundColor:'green',
        width:40,
        height:40,
        color:'white',
        borderRadius:50,
        alignItems:'center',
        textAlign:'center',
        fontWeight:'bold',
        elevation:1,
        fontSize:25
    },
    amount:{
        fontSize:15,
        fontWeight:'bold'
    },
});

