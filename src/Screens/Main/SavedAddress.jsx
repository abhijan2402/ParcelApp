import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import Header from '../../Components/FeedHeader';
import {windowHeight} from '../../Constants/Dimensions';
import {COLOR} from '../../Constants/Colors';

const initialAddresses = [
  {
    id: '1',
    type: 'Home',
    address: 'House No. 23, Ratan Nagar, Jaipur, Rajasthan - 302012',
  },
  {
    id: '2',
    type: 'Work',
    address: 'Tech Park Tower 4, Hinjewadi Phase 2, Pune, Maharashtra - 411057',
  },
  {
    id: '3',
    type: 'Warehouse',
    address:
      'Plot 32, Industrial Area, Sector 6, Noida, Uttar Pradesh - 201301',
  },
  {
    id: '4',
    type: 'Client Location',
    address: '88 Ring Road, Bhubaneswar, Odisha - 751023',
  },
];

const SavedAddress = () => {
  const [addresses, setAddresses] = useState(initialAddresses);

  const handleDelete = id => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this address?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setAddresses(prev => prev.filter(item => item.id !== id));
          },
        },
      ],
    );
  };

  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <View style={styles.addressInfo}>
        <Text style={styles.typeText}>{item.type}</Text>
        <Text style={styles.addressText}>{item.address}</Text>
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

  return (
    <View style={styles.Container}>
      <Header title={'Saved Address'} showBack />
      <FlatList
        data={addresses}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{paddingHorizontal: 20, paddingTop: 10}}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No saved addresses found.</Text>
        }
      />
    </View>
  );
};

export default SavedAddress;

const styles = StyleSheet.create({
  Container: {
    height: windowHeight,
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
});
