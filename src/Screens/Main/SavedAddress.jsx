import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
  Image,
  Modal,
  TextInput,
  ScrollView,
} from 'react-native';
import Header from '../../Components/FeedHeader';
import {COLOR} from '../../Constants/Colors';
import CustomButton from '../../Components/CustomButton';
import {useApi} from '../../Backend/Apis';

const SavedAddress = ({navigation}) => {
  const {postRequest, getRequest} = useApi();
  const [addresses, setAddresses] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: '',
    phone_number: '',
    address: '',
    town: '',
    city: '',
    country: '',
  });

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const response = await getRequest('/api/shipping-address-list', true);
      if (response?.success) {
        console.log(response, 'RESSPPPP');

        const data = response?.data?.data || [];
        console.log(data, 'DATA');

        const formatted = data.map((item, index) => ({
          id: item.id?.toString() || index.toString(),
          type: item.name || 'Unnamed',
          address: `${item.address}, ${item.town}, ${item.city}, ${item.country}`,
        }));
        setAddresses(formatted);
      } else {
        Alert.alert('Error', response?.error || 'Failed to fetch addresses');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Something went wrong while fetching addresses');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (key, value) => {
    setForm({...form, [key]: value});
  };

  const handleDelete = id => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this address?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const response = await getRequest(
                `/api/delete-shipping-address/${id}`,
              );

              if (response?.success) {
                Alert.alert('Deleted', 'Address deleted successfully.');
                fetchAddresses(); // Re-fetch updated list
              } else {
                Alert.alert(
                  'Error',
                  response?.error || 'Failed to delete address.',
                );
              }
            } catch (error) {
              Alert.alert('Error', 'Something went wrong.');
              console.error(error);
            }
          },
        },
      ],
    );
  };

  const handleSubmit = async () => {
    const {name, phone_number, address, town, city, country} = form;

    if (!name || !phone_number || !address || !town || !city || !country) {
      Alert.alert('Validation', 'Please fill all the fields.');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('phone_number', phone_number);
    formData.append('address', address);
    formData.append('town', town);
    formData.append('city', city);
    formData.append('country', country);
    console.log(formData, 'FORMMMM');

    try {
      const response = await postRequest(
        '/api/add-shipping-address',
        formData,
        true,
      );

      console.log(response, 'ADDRESS__ADDED');

      if (response?.success) {
        Alert.alert('Success', 'Address added successfully!');
        setModalVisible(false);

        // Refresh list
        fetchAddresses();

        // Reset form
        setForm({
          name: '',
          phone_number: '',
          address: '',
          town: '',
          city: '',
          country: '',
        });
      } else {
        Alert.alert('Error', response?.error || 'Something went wrong.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to add address.');
      console.error(error);
    }
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.addressInfo}>
          <Text style={styles.typeText}>{item.type}</Text>
          <Text style={styles.addressText}>📞 {item.phone_number}</Text>
          <Text style={styles.addressText}>🏠 {item.address}</Text>
          {/* <Text style={styles.addressText}>🏘️ Town: {item.town}</Text>
          <Text style={styles.addressText}>🏙️ City: {item.city}</Text>
          <Text style={styles.addressText}>🌍 Country: {item.country}</Text> */}
        </View>
        <TouchableOpacity
          onPress={() => handleDelete(item.id)}
          style={styles.deleteButton}>
          <Image
            source={{
              uri: 'https://img.icons8.com/ios-glyphs/30/fa314a/delete-forever.png',
            }}
            style={styles.deleteIcon}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.Container}>
      <Header
        title={'Saved Address'}
        showBack
        onBackPress={() => {
          navigation.goBack();
        }}
      />
      <FlatList
        data={addresses}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{paddingHorizontal: 20, paddingTop: 10}}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            {loading ? 'Loading...' : 'No saved addresses found.'}
          </Text>
        }
      />

      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.floatingButtonText}>+</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.modalTitle}>Add New Address</Text>

              {[
                {key: 'name', label: 'Name'},
                {
                  key: 'phone_number',
                  label: 'Phone Number',
                  keyboardType: 'phone-pad',
                },
                {key: 'address', label: 'Address'},
                {key: 'town', label: 'Town'},
                {key: 'city', label: 'City'},
                {key: 'country', label: 'Country'},
              ].map(input => (
                <TextInput
                  key={input.key}
                  placeholder={input.label}
                  value={form[input.key]}
                  keyboardType={input.keyboardType || 'default'}
                  onChangeText={text => handleChange(input.key, text)}
                  style={styles.input}
                />
              ))}

              <CustomButton title="Submit" onPress={handleSubmit} />
              <CustomButton
                title="Cancel"
                onPress={() => setModalVisible(false)}
                style={{backgroundColor: '#ccc', marginTop: 10}}
                textStyle={{color: '#000'}}
              />
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SavedAddress;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
  },
  addressInfo: {
    flex: 1,
  },
  typeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLOR.royalBlue,
    marginBottom: 4,
  },
  addressText: {
    fontSize: 14,
    color: '#333',
  },
  deleteButton: {
    padding: 8,
  },
  deleteIcon: {
    width: 20,
    height: 20,
    tintColor: '#FF3B30',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    color: '#aaa',
    fontSize: 16,
  },
  floatingButton: {
    position: 'absolute',
    right: 20,
    bottom: 70,
    backgroundColor: COLOR.royalBlue,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  floatingButtonText: {
    fontSize: 30,
    color: 'white',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    maxHeight: '90%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    fontSize: 14,
    color: '#333',
  },
});
