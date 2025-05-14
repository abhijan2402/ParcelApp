import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';
import React from 'react';
import {windowHeight} from '../../Constants/Dimensions';
import {COLOR} from '../../Constants/Colors';
import Header from '../../Components/FeedHeader';

const options = [
  {
    imageUri: 'https://cdn-icons-png.flaticon.com/128/4074/4074958.png',
    label: 'Create Orders',
    desc: 'Create a new order',
  },
  {
    imageUri: 'https://cdn-icons-png.flaticon.com/128/839/839860.png',
    label: 'Initiated Orders Lists',
    desc: 'View your order lists',
  },
  {
    imageUri: 'https://cdn-icons-png.flaticon.com/128/941/941101.png',
    label: 'Track Order',
    desc: 'You can track your order',
  },
  {
    imageUri: 'https://cdn-icons-png.flaticon.com/128/2344/2344247.png',
    label: 'Shipping Calculator',
    desc: 'Calculate your shipping rates',
  },
  {
    imageUri: 'https://cdn-icons-png.flaticon.com/128/12212/12212167.png',
    label: 'Remittance',
    desc: 'Track your remittance',
  },
  {
    imageUri: 'https://cdn-icons-png.flaticon.com/128/522/522575.png',
    label: 'Invoice',
    desc: 'Download invoice',
  },
  {
    imageUri: 'https://cdn-icons-png.flaticon.com/128/482/482541.png',
    label: 'Wallet Statements',
    desc: 'Check your wallet statements',
  },
  {
    imageUri: 'https://cdn-icons-png.flaticon.com/128/4396/4396747.png',
    label: 'Undelivered Orders',
    desc: 'Undelivered orders list',
  },
  {
    imageUri: 'https://cdn-icons-png.flaticon.com/128/535/535239.png',
    label: 'Set lat long(Optional)',
    desc: 'Set your pickup location lat and Long',
  },
];

const Shipping = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Header title="Shipping Section" />
      <ScrollView style={styles.content}>
        {options.map((item, idx) => (
          <View key={idx} style={styles.touchableWrapper}>
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple('#a5fad2', true)}
              onPress={() => {
                // navigation.navigate(...) if needed
              }}>
              <View style={styles.item}>
                <Image
                  source={{uri: item.imageUri}}
                  style={styles.iconImage}
                  resizeMode="contain"
                  tintColor={'#04b2d1'}
                />
                <View style={styles.textContainer}>
                  <Text style={styles.label}>{item.label}</Text>
                  <Text style={styles.desc}>{item.desc}</Text>
                </View>
                <Image
                  source={{
                    uri: 'https://cdn-icons-png.flaticon.com/128/271/271228.png',
                  }}
                  style={styles.arrowImage}
                  resizeMode="contain"
                  tintColor={'#04b2d1'}
                />
              </View>
            </TouchableNativeFeedback>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Shipping;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  content: {
    paddingHorizontal: 16,
  },
  touchableWrapper: {
    borderRadius: 8,
    overflow: 'hidden', // required for ripple to not overflow
    marginVertical: 6,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  iconImage: {
    width: 24,
    height: 24,
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
  },
  label: {
    fontSize: 15,
    color: COLOR.primaryBlue,
    fontWeight: '500',
    color: '#04b2d1',
  },
  desc: {
    fontSize: 12,
    color: '#444',
    marginTop: 2,
  },
  arrowImage: {
    width: 15,
    height: 15,
    tintColor: COLOR.primaryBlue,
  },
});
