import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Modal, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import theme from '../StyleSheet/theme';

const CountryPicker = ({ selectedCountry, setSelectedCountry }) => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [search, setSearch] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedCountryName, setSelectedCountryName] = useState();

  

  useEffect(() => {
    setSelectedCountryName('India');
    setSelectedCountry(99);
    fetchPickerData();
  }, [modalVisible]);

  const fetchPickerData = async () => { 
    try {
      const data = [
        { "id":"99","name": "India"}
      ];
      data.forEach(item => {
        setSelectedCountryName(item.name);
        setSelectedCountry(item.id);        
      });

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
    setSelectedCountryName(country.name);
    setSelectedCountry(country.id);
    setModalVisible(false);
  };
  

  return (
    <View> 
      {/* ✅ Input Field to Open Modal */}
      <TouchableOpacity 
        onPress={() => {setModalVisible(true)}} 
        style={[theme.inputContainer]}>
        <Icon name="globe" size={20} style={theme.inputIcon} />
        <Text>{selectedCountryName || 'Select Country'}</Text>
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
              <FlatList
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

export default CountryPicker;
