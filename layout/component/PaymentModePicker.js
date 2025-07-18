import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Modal, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import theme from '../StyleSheet/theme';

const PaymentModePicker = ({ selectedPaymentMode, setSelectedPaymentMode }) => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedPaymentModeName, setSelectedPaymentModeName] = useState(selectedPaymentMode);

  useEffect(() => {
    fetchPickerData();
  }, [modalVisible]);

  const fetchPickerData = async () => { 
    try {
      const data = [
        { "id":"PhonePe","name": "PhonePe"},
        { "id":"Gpay","name": "Gpay"},
        { "id":"AmazonPe","name": "AmazonPe"},
        { "id":"PayTm","name": "PayTm"},
        { "id":"Other UPI","name": "Other UPI"},
      ];

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
    setSelectedPaymentModeName(country.name);
    setSelectedPaymentMode(country.id);
    setModalVisible(false);
  };

  return (
    <View> 
      {/* ✅ Input Field to Open Modal */}
      <TouchableOpacity 
        onPress={() => {setModalVisible(true)}} 
        style={[theme.inputContainer]}>
        <Icon name="globe" size={20} style={theme.inputIcon} />
        <Text>{selectedPaymentModeName}</Text>
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

export default PaymentModePicker;
