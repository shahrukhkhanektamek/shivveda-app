import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import theme from '../../../StyleSheet/theme';
import { postData, apiUrl } from '../../../component/api';
const urls = apiUrl();

import { MMKV } from 'react-native-mmkv';
const storage = new MMKV();



export function DirectTeamScreen({ navigation, route }){

  const { extraData } = route.params || {};

  const [userDetail, setuserDetail] = useState(JSON.parse(storage.getString('user')));
  const [member_id, setmember_id] = useState(userDetail.id); 
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const fetchData = async (pagep) => {
      try {
        const response = await postData({"page":pagep,"member_id":member_id}, urls.teamDirect, "POST", navigation, extraData);
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
                          <View style={[theme.col4]}>
                            <Image source={{uri:item.image}} style={[theme.cardImage, styles.userImage]} />
                            <Text style={[theme.statusSuccess]}>Paid</Text>
                          </View>
                          <View style={[theme.col8]}>
                              <View style={[theme.row]}>
                                <Text style={[theme.cardRowBold]}>Member ID.:</Text>
                                <Text style={[theme.cardRowText]}>{item.user_id}</Text>
                              </View>
                              <View style={[theme.row]}>
                                <Text style={[theme.cardRowBold]}>Name:</Text>
                                <Text style={[theme.cardRowText]}>{item.name}</Text>
                              </View>
                              <View style={[theme.row]}>
                                <Text style={[theme.cardRowBold]}>Position:</Text>
                                <Text style={[theme.cardRowText]}>{item.position}</Text>
                              </View>
                              <View style={[theme.row]}>
                                <Text style={[theme.cardRowBold]}>Joining Date:</Text>
                                <Text style={[theme.cardRowText]}>{item.add_date_time}</Text>
                              </View>
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
    userImage:{
      padding:10,
      marginBottom:10,
      height:100,
      width:100,
    },
});

