import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
} from 'react-native';
import theme from '../../../StyleSheet/theme';



export function TreeScreen({ navigation, extraData=[] }) {

  const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
      // setPage(0);
      setRefreshing(true);
      setRefreshing(false);
      // fetchPosts(page);
    }, []);

  return (
    <View style={{ flex: 1 }}>


        <FlatList
            ListHeaderComponent={
            <>
                <View style={theme.themeBg}>
                    <View style={[theme.card]}>
                      <View style={[theme.cardBody]}>
                            <Text style={{fontSize:50,textAlign:'center'}}>Tree</Text>
                      </View>
                    </View>
                </View>
                </>
                }
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />


      
    </View>
  );
}

const styles = StyleSheet.create({
  amount: { fontSize: 15, fontWeight: 'bold' },
});


