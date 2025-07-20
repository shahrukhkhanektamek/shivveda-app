import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Modal, ActivityIndicator, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import theme from '../StyleSheet/theme';
import { postData, apiUrl } from './api';
const urls=apiUrl();

const StatePicker = ({ selectedState, setSelectedState, extraData=[] }) => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedStateName, setSelectedStateName] = useState();
  const [data, setData] = useState([]);
  

  

  useEffect(() => {
    fetchPickerData();
  }, [modalVisible]);

  const fetchPickerData = async () => { 
    try {
      const response = await postData({}, urls.state, "GET", null, extraData);
      if(response.status==200)
      {
        const data = response.data;
        setData(data)
        data.forEach(item => {
          if(selectedState==item.id)
          {
            setSelectedStateName(item.name);
            setSelectedState(item.id);
          }
        });

      }
      else{
        setData([])
      }

      setCountries(data);
      setFilteredCountries(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching countries:', error);
      setLoading(false);
    }
  };

  // ✅ Search filter logic
  const handleSearch = (text) => {
    setSearch(text);
    const filteredData = countries.filter((item) =>
      item.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredCountries(filteredData);
  };

  // ✅ Country select karna
  const handleSelect = (country) => {
    setSelectedStateName(country.name);
    setSelectedState(country.id);
    setModalVisible(false);
  };

  return (
    <View> 
      {/* ✅ Input Field to Open Modal */}
      <TouchableOpacity 
        onPress={() => {setModalVisible(true)}} 
        style={[theme.inputContainer]}>
        <Icon name="map-marker" size={20} style={theme.inputIcon} />
        <Text>{selectedStateName || 'Select State'}</Text>
      </TouchableOpacity>

      {/* ✅ Modal for Searchable Dropdown */}
      <Modal 
        visible={modalVisible} 
        animationType="slide" 
        transparent={true} 
        onRequestClose={() => {setModalVisible(false)}}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ width: '80%', backgroundColor: '#fff', padding: 20, borderRadius: 10 }}>
            
            
            {/* ✅ Search Box */}
            <TextInput
              placeholder="Search Country..."
              value={search}
              onChangeText={handleSearch}
              style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginBottom: 10 }}
            />

            {/* ✅ Show Countries List */}
            {loading ? (
              <ActivityIndicator size="large" color="#000" />
            ) : (
              <FlatList style={[styles.options]}
                data={filteredCountries}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handleSelect(item)} 
                    style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ddd' }}>
                    <Text>{item.flag} {item.name}</Text>
                  </TouchableOpacity>
                )}
              />
            )}

            {/* ✅ Close Button */}
            <TouchableOpacity 
              onPress={() => setModalVisible(false)} 
              style={{ marginTop: 20, padding: 10, backgroundColor: 'red', borderRadius: 5 }}>
              <Text style={{ color: '#fff', textAlign: 'center' }}>Close</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer:{
    flexDirection:'row',
    width:"100%",
    height:50,
    alignItems:'center',
    textAlign:'left',
    justifyContent:'space-between',
    paddingHorizontal:10
  },
  options:{
    height:500,
  }
  });
  

export default StatePicker;
