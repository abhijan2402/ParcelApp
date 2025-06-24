import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Header from '../../Components/FeedHeader';
import {COLOR} from '../../Constants/Colors';

const ShippingDetails = ({route, navigation}) => {
  const {resultData} = route.params;
  const {carrier, paymentMethod, declaredValue, weight, charges} = resultData;

  return (
    <View style={styles.container}>
      <Header title="Shipping Details" showBack />
      <View style={styles.card}>
        <Text style={styles.title}>{carrier.toUpperCase()}</Text>
        <Text style={styles.info}>💰 Rate (INR): ₹ {charges.total_amount}</Text>
        <Text style={styles.info}>💳 Payment Method: {paymentMethod}</Text>
        <Text style={styles.info}>📦 Weight: Upto {weight} kg</Text>
        <Text style={styles.info}>📏 Distance: 0.00 KM</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.pop(2)}>
          <Text style={{color: '#fff', fontWeight: 'bold'}}>Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ShippingDetails;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: COLOR.white},
  card: {
    backgroundColor: '#f5fafd',
    margin: 20,
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  info: {fontSize: 16, marginVertical: 5},
  button: {
    backgroundColor: '#00BCD4',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 20,
  },
});
