import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  RefreshControl,
  Clipboard,
  Share,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Header from '../../navBar/headerBar';
import theme from '../../StyleSheet/theme';

import LinearGradient from 'react-native-linear-gradient';
import GradientStyles from '../../StyleSheet/GradientStyles';

import PageLoding from '../../component/PageLoding.js';
import { postData, apiUrl } from '../../component/api';
const urls=apiUrl();

export function HomeScreen({ navigation, extraData = [] }) {


  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setisLoading] = useState(true);
 
  const [data, setData] = useState([]);
  const [user, setUser] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [rankList, setRankList] = useState([]);


  useEffect(() => {
    fetchData(); 
  }, []);

  const fetchData = async () => {
    try {
      const response = await postData({}, urls.homeDetail, "GET", navigation, extraData);
      if(response.status==200)
      {
        const data = response.data;
        setData(data)
        setUser(data.user)
        setIncomes(data.incomes)
        setRankList(data.rankList)
        setisLoading(false)
      } 
    } catch (error) {
      console.error("API call failed:", error);
    }
  };


  const handleSubmit = async () => {
    const filedata = {
      "name":name,
      "email":email,
      "mobile":mobile,      
    };
    const response = await postData(filedata, "update-profile","POST", navigation,extraData);
    
  };
  const copyLeftJoinLink = () => {
    Clipboard.setString(data.leftJoinLink);
    Alert.alert("Copied!", "Copied");
  };
  const copyRightJoinLink = () => {
    Clipboard.setString(data.rightJoinLink);
    Alert.alert("Copied!", "Copied.");
  };



  const handleShare = async (shareLink) => {
    try {
      const result = await Share.share({
        message: shareLink,
        url: shareLink, // iOS ke liye
        title: 'My Reffer Link' // iOS ke liye
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
          console.log('Shared with activity type: ', result.activityType);
        } else {
          // shared
          // Alert.alert('Success', 'Link shared successfully!');
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
        console.log('Dismissed');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };






  const onRefresh = useCallback(() => {
    // setPage(0);
    setRefreshing(true);
    setRefreshing(false);
    fetchData();
  }, []);


  
  if (isLoading) {
    return ( 
        <PageLoding />          
    );
  }

  return (
    <View style={styles.container}>
      

      <FlatList
        ListHeaderComponent={
          <>

            <Header extraData={extraData} />

            <View style={[theme.container]}>

            {user.is_paid!=1?
                <View style={[theme.alertBox, theme.alertDanger, theme.mt20]}>
                  <Icon name="exclamation-circle" size={24} color="#FFA500" />
                  <View style={theme.alerttextContainer}>
                    <Text style={[theme.alertText]} >
                    Purchase any products and complete your {data.idBv} BV You have {data.userBv} bv now
                      Your id not active yet.</Text>
                  </View>
                  <TouchableOpacity style={theme.alertbutton} onPress={()=> navigation.navigate("Products")}>
                    <Text style={theme.alertbuttonText}>Ckick Here</Text>
                  </TouchableOpacity>
                </View>
            :user.kyc_step!=1?  

                <View style={[theme.alertBox, theme.alertDanger, theme.mt20]}>
                  <Icon name="exclamation-circle" size={24} color="#FFA500" />
                  <View style={theme.alerttextContainer}>
                    <Text style={theme.alertText}>Your Kyc is pending! Please update your Kyc.</Text>
                  </View>
                  <TouchableOpacity style={theme.alertbutton} onPress={()=>navigation.navigate('Kyc')}>
                    <Text style={theme.alertbuttonText}>Click Here</Text>
                  </TouchableOpacity>
                </View>
                :null
            }


              <View style={[theme.card, styles.cardBg]}>
                <View style={[theme.cardBody]}>
                  <View style={theme.cardImage}>
                    <Image
                      source={{uri:user.image}}
                      style={theme.profileImage}
                    />
                  </View>
                  <Text style={[styles.name, theme.mt10]}>ID:- {user.user_id}</Text>
                  <Text style={[styles.name]}>{user.name}</Text>
                  <Text style={[styles.totalIncome]}>Total Income: <Text style={[styles.totalIncomeAmount]}>{incomes.all_time_income}</Text></Text>
                  <Text style={[styles.todayIncome]}>Today Income: <Text style={[styles.todayIncomeAmount]}>{incomes.today_income}</Text></Text>

                  <View style={[styles.cardtable]}>

                    {/* <View style={[styles.cardtableRow]}>
                      <Text style={[styles.cardLeftText]}>My Package</Text>
                      <Text style={[styles.cardRightText]}>{data.activePackage}</Text>
                    </View> */}

                    <View style={[styles.cardtableRow]}>
                      <Text style={[styles.cardLeftText]}>Rank</Text>
                      <Text style={[styles.cardRightText]}>{data.activeRank}</Text>
                    </View>

                    <View style={[styles.cardtableRow]}> 
                      <Text style={[styles.cardLeftText]}>My Team</Text>
                      <Text style={[styles.cardRightText]}>{user.total_team} Partners</Text>
                    </View>

                    <View style={[styles.cardtableRow]}>
                      <Text style={[styles.cardLeftText]}>My Direct Paid</Text>
                      <Text style={[styles.cardRightText]}>{user.direct_paid} Partners</Text>
                    </View>

                    <View style={[styles.cardtableRow]}>
                      <Text style={[styles.cardLeftText]}>My Direct Unpaid</Text>
                      <Text style={[styles.cardRightText]}>{user.direct_unpaid} Partners</Text>
                    </View>

                    <View style={[styles.cardtableRow]}>
                      <Text style={[styles.cardLeftText]}>My Matching</Text>
                      <Text style={[styles.cardRightText]}>{user.total_pairs} Pairs</Text>
                    </View>

                    <View style={[styles.cardtableRow]}>
                      <Text style={[styles.cardLeftText]}>Total Self BV</Text>
                      <Text style={[styles.cardRightText]}>{user.total_bv}</Text>
                    </View>

                    <View style={[styles.cardtableRow]}>
                      <Text style={[styles.cardLeftText]}>Total Left BV</Text>
                      <Text style={[styles.cardRightText]}>{user.left_bv}</Text>
                    </View>

                    <View style={[styles.cardtableRow]}>
                      <Text style={[styles.cardLeftText]}>Total Right BV</Text>
                      <Text style={[styles.cardRightText]}>{user.right_bv}</Text>
                    </View>

                    <View style={[styles.cardtableRow]}>
                      <Text style={[styles.cardLeftText]}>Left Paid</Text>
                      <Text style={[styles.cardRightText]}>{user.total_left_paid} Partners</Text>
                    </View>

                    <View style={[styles.cardtableRow]}>
                      <Text style={[styles.cardLeftText]}>Left Unpaid</Text>
                      <Text style={[styles.cardRightText]}>{user.total_left_unpaid} Partners</Text>
                    </View>

                    <View style={[styles.cardtableRow]}>
                      <Text style={[styles.cardLeftText]}>Right Paid</Text>
                      <Text style={[styles.cardRightText]}>{user.total_right_paid} Partners</Text>
                    </View>

                    <View style={[styles.cardtableRow]}>
                      <Text style={[styles.cardLeftText]}>Right Unpaid</Text>
                      <Text style={[styles.cardRightText]}>{user.total_right_unpaid} Partners</Text>
                    </View>

                    <View style={[styles.cardtableRow]}>
                      <Text style={[styles.cardLeftText]}>Activation Date</Text>
                      <Text style={[styles.cardRightText]}>{user.activationString}</Text>
                    </View>

                  </View> 

                </View>
              </View>


              <View style={[theme.row]}>

                <View style={[theme.col6, theme.plr5]}>
                  <View style={[theme.card]} backgroundColor={'#4CAF50'}>
                    <View style={[theme.cardBody]}>
                      <Text style={[styles.incomeTitle]}>Direct Income</Text>
                      <Text style={[styles.incomeCardAmount]}>{incomes.income1}</Text>
                    </View>
                  </View>
                </View>

                <View style={[theme.col6, theme.plr5]}>
                  <View style={[theme.card]} backgroundColor={'#2E7D32'}>
                    <View style={[theme.cardBody]}>
                      <Text style={[styles.incomeTitle]}>Pair Income</Text>
                      <Text style={[styles.incomeCardAmount]}>{incomes.income2}</Text>
                    </View>
                  </View>
                </View>

                <View style={[theme.col6, theme.plr5]}>
                  <View style={[theme.card]} backgroundColor={'#FFC107'}>
                    <View style={[theme.cardBody]}>
                      <Text style={[styles.incomeTitle]}>Downline Income</Text>
                      <Text style={[styles.incomeCardAmount]}>{incomes.income3}</Text>
                    </View>
                  </View>
                </View>

                <View style={[theme.col6, theme.plr5]}>
                  <View style={[theme.card]} backgroundColor={'#FFD700'}>
                    <View style={[theme.cardBody]}>
                      <Text style={[styles.incomeTitle]}>Upline Income</Text>
                      <Text style={[styles.incomeCardAmount]}>{incomes.income4}</Text>
                    </View>
                  </View>
                </View>

                <View style={[theme.col6, theme.plr5]}>
                  <View style={[theme.card]} backgroundColor={'#4CAF50'}>
                    <View style={[theme.cardBody]}>
                      <Text style={[styles.incomeTitle]}>Rank Bonus Income</Text>
                      <Text style={[styles.incomeCardAmount]}>{incomes.income5}</Text>
                    </View>
                  </View>
                </View>

                <View style={[theme.col6, theme.plr5]}>
                  <View style={[theme.card]} backgroundColor={'#4CAF50'}>
                    <View style={[theme.cardBody]}>
                      <Text style={[styles.incomeTitle]}>Repurchase Income</Text>
                      <Text style={[styles.incomeCardAmount]}>{incomes.income6}</Text>
                    </View>
                  </View>
                </View>

              </View>






              <View style={[theme.card, styles.cardBg]}>
                <View style={[theme.cardHeader]} backgroundColor={'#00ab55'}>
                  <Text style={[theme.cardHeaderText]}>Left Joining Link</Text>
                </View>
                <View style={[theme.cardBody]}>
                  <View style={[theme.row]}>
                    <View style={[theme.col12]}>
                      <Text>{data.leftJoinLink}</Text>
                    </View>
                    <View style={[theme.col12]}>
                      <LinearGradient
                        colors={GradientStyles.auth.colors}
                        style={theme.authbutton}
                      >
                        <TouchableOpacity style={theme.button} onPress={() => handleShare(data.leftJoinLink)}>
                          <Text style={theme.authbuttonText}>Share</Text>
                        </TouchableOpacity>
                      </LinearGradient>
                    </View>
                  </View>
                </View>
              </View>



              <View style={[theme.card, styles.cardBg]}>
                <View style={[theme.cardHeader]} backgroundColor={'#00ab55'}>
                  <Text style={[theme.cardHeaderText]}>Right Joining Link</Text>
                </View>
                <View style={[theme.cardBody]}>
                  <View style={[theme.row]}>
                    <View style={[theme.col12]}>
                      <Text>{data.rightJoinLink}</Text>
                    </View>
                    <View style={[theme.col12]}>
                      <LinearGradient
                        colors={GradientStyles.auth.colors}
                        style={theme.authbutton}
                      >
                        <TouchableOpacity style={theme.button} onPress={() => handleShare(data.rightJoinLink)}>
                          <Text style={theme.authbuttonText}>Share</Text>
                        </TouchableOpacity>
                      </LinearGradient>
                    </View>
                  </View>
                </View>
              </View>



              <View style={[theme.card, styles.cardBg]}>
                <View style={[theme.cardHeader]} backgroundColor={'#00ab55'}>
                  <Text style={[theme.cardHeaderText]}>Rank List</Text>
                </View>
                <View style={[theme.cardBody]}>


                <FlatList
                  data={rankList} // Array of items
                  keyExtractor={(item) => item.id} // Unique key for each item
                  renderItem={({ item }) => ( // Function to render each item
                    <View style={[theme.row, styles.rankCard]}>
                      <View style={[theme.col12]}>
                        <Text style={[styles.rankTitle]}>{item.title}</Text>
                        <Text style={[styles.rankTarget]}>{item.target}</Text>
                        <Text style={[styles.rankPrice]}>{item.price}</Text>
                      {item.status==1?
                        <Text style={[styles.rankStatusSuccess]}>Completeed</Text>
                        :
                        <Text style={[styles.rankStatusDanger]}>Pending...</Text>
                      }
                      </View>
                    </View>                    
                  )}
                />

                  


                </View>
              </View>








            </View>

          </>
        }
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}


      />

    </View>


  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  cardBg: {
    backgroundColor: '#4CAF50'
  },
  name: {
    width: '100%',
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 10,
    color: 'white',
  },
  totalIncome: {
    backgroundColor: '#55b752',
    paddingHorizontal: 10,
    color: 'white',
    borderRadius: 5,
    paddingVertical: 5,
    textAlign: 'center',
    fontSize: 25,
  },
  todayIncome: {
    backgroundColor: '#55b752',
    paddingHorizontal: 10,
    color: 'white',
    borderRadius: 5,
    paddingVertical: 5,
    fontSize: 25,
    marginTop: 10,
    marginBottom: 25,
    textAlign: 'center'
  },
  totalIncomeAmount: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  todayIncomeAmount: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  cardtableRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 5
  },
  cardLeftText: {
    width: '50%',
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white'
  },
  cardRightText: {
    width: '50%',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'right',
    color: '#FFFFFF'
  },
  incomeTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#FFFFFF'
  },
  incomeCardAmount: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
  rankCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginTop: 10
  },
  rankTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight:'900'
  },
  rankTarget: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight:'900',
    opacity:0.5
  },
  rankPrice: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '900'
  },
  rankStatusSuccess: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '900',
    backgroundColor: 'green',
    color: 'white',
    padding: 5,
    marginTop: 10
  },
  rankStatusDanger: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '900',
    backgroundColor: '#FF6666',
    color: 'white',
    padding: 5,
    marginTop: 10
  },





});


