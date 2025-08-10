import React, {useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import {COLOR} from '../../Constants/Colors';
import Header from '../../Components/FeedHeader';
import {AuthContext} from '../../Backend/AuthContent';

const AccountPage = ({navigation}) => {
  const {user, setUser, setToken} = useContext(AuthContext);

  const UserDetails = user?.userDetails || user;

  const handlePress = item => {
    Alert.alert(item + ' pressed');
    // You can navigate or perform actions here
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header title={'Account'} />
      {/* Profile Section */}

      <View style={styles.profileContainer}>
        <Image
          source={{uri: UserDetails?.image}} // Replace with user image URL
          style={styles.profileImage}
        />
        <Text style={styles.userName}>{UserDetails?.name}</Text>{' '}
        <Text
          style={[
            styles.userName,
            {fontWeight: '400', fontSize: 15, color: COLOR.grey},
          ]}>
          {UserDetails?.email}
        </Text>{' '}
      </View>

      {/* Menu Section */}
      <ScrollView style={styles.menuContainer}>
        <MenuItem
          title="Edit Profile"
          onPress={() => navigation.navigate('EditProfile')}
        />
        <MenuItem
          title="Saved Address"
          onPress={() => navigation.navigate('SavedAddress')}
        />
        <MenuItem
          title="Bank Details"
          onPress={() => navigation.navigate('BankDetails')}
        />
        <MenuItem
          title="Terms & Conditions"
          onPress={() =>
            navigation.navigate('Cms', {title: 'Terms & Conditions'})
          }
        />
        <MenuItem
          title="Contact Us"
          onPress={() => navigation.navigate('ContactUs')}
        />

        <MenuItem
          title="About us"
          onPress={() => navigation.navigate('About')}
        />
        <MenuItem
          title="Privacy Policy"
          onPress={() => navigation.navigate('Cms', {title: 'Privacy Policy'})}
        />
        <MenuItem
          title="Log Out"
          onPress={() => {
            setUser(null);
            setToken(null);
            navigation.navigate('Login');
          }}
        />
      </ScrollView>
    </ScrollView>
  );
};

const MenuItem = ({title, onPress}) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <Text style={styles.menuText}>{title}</Text>
    <Image
      source={{uri: 'https://cdn-icons-png.flaticon.com/128/2985/2985179.png'}}
      style={{width: 20, height: 20}}
    />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingVertical: 40,
    // paddingHorizontal: 20,
    backgroundColor: '#fff',
    // alignItems: 'center',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  userName: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
  },
  menuContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  menuItem: {
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLOR.white,
    elevation: 5,
    shadowColor: COLOR.royalBlue,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  menuText: {
    fontSize: 18,
    color: '#555',
  },
});

export default AccountPage;
