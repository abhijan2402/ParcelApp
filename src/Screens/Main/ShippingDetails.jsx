import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../Components/FeedHeader';
import {COLOR} from '../../Constants/Colors';

const ShippingDetails = ({route, navigation}) => {
  const {resultData} = route.params;
  const {paymentMethod, declaredValue, weight, deliveryPin, pickupPin} =
    resultData;

  const [loading, setLoading] = useState(true);
  const [delhiveryTotalAmount, setDelhiveryTotalAmount] = useState(null);
  const [xpressbeesTotalAmount, setXpressbeesTotalAmount] = useState(null);

  useEffect(() => {
    calculateDelhiveryCharges();
    calculateXpressbeesCharges();
  }, []);

  const calculateDelhiveryCharges = async () => {
    try {
      const apiKey = 'c4093190ae6edab6fd33121e5c6ad56dcb67804e';
      const md = 'S';
      const ss = 'Delivered';
      const cgm = parseFloat(weight) * 1000;
      const declared_value = parseFloat(declaredValue);
      const pt = paymentMethod;

      const url = `https://track.delhivery.com/api/kinko/v1/invoice/charges/.json?md=${md}&ss=${ss}&d_pin=${deliveryPin}&o_pin=${pickupPin}&cgm=${cgm}&declared_value=${declared_value}&pt=${pt}`;
      console.log(url, 'URLLLLL');

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Token ${apiKey}`,
          Accept: 'application/json',
        },
      });

      const data = await response.json();
      console.log(data, 'DATAAT');

      if (Array.isArray(data) && data.length > 0) {
        setDelhiveryTotalAmount(data[0]?.total_amount);
      } else {
        Alert.alert('No charges found from Delhivery');
      }
    } catch (error) {
      console.error('Error fetching Delhivery charges:', error);
      Alert.alert('Error fetching Delhivery charges');
    }
  };

  const calculateXpressbeesCharges = async () => {
    try {
      const loginResponse = await fetch(
        'https://shipment.xpressbees.com/api/users/login',
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            email: 'contact@dearexpress.com',
            password: 'Express!@#321321',
          }),
        },
      );

      const loginData = await loginResponse.json();
      const token = loginData?.data;

      if (!token) {
        Alert.alert('Xpressbees login failed');
        return;
      }

      const serviceabilityData = {
        origin: pickupPin,
        destination: deliveryPin,
        payment_type: paymentMethod.toLowerCase(),
        order_amount: declaredValue,
        weight: parseFloat(weight) * 1000,
        length: '10',
        breadth: '10',
        height: '10',
      };

      const serviceabilityResponse = await fetch(
        'https://shipment.xpressbees.com/api/courier/serviceability',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(serviceabilityData),
        },
      );

      const serviceabilityJson = await serviceabilityResponse.json();
      setXpressbeesTotalAmount(
        serviceabilityJson?.data?.[0]?.total_charges ?? null,
      );
    } catch (error) {
      console.error('Xpressbees serviceability error:', error);
      Alert.alert('Error fetching Xpressbees charges');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title="Shipping Details"
        showBack
        onBackPress={() => {
          navigation.goBack();
        }}
      />
      {loading ? (
        <ActivityIndicator
          size="large"
          color={COLOR.primary}
          style={{marginTop: 40}}
        />
      ) : (
        <ScrollView contentContainerStyle={styles.scroll}>
          {/* Delhivery */}
          <View style={styles.card}>
            <Text style={styles.carrierTitle}>Delhivery</Text>
            <Text style={styles.info}>
              💰 Rate: ₹ {delhiveryTotalAmount ?? 'N/A'}
            </Text>
            <Text style={styles.info}>💳 Payment: {paymentMethod}</Text>
            <Text style={styles.info}>📦 Weight: {weight} kg</Text>
            <Text style={styles.info}>📍 Pickup PIN: {pickupPin}</Text>
            <Text style={styles.info}>📍 Delivery PIN: {deliveryPin}</Text>
          </View>

          {/* Xpressbees */}
          <View style={styles.card}>
            <Text style={styles.carrierTitle}>Xpressbees</Text>
            <Text style={styles.info}>
              💰 Rate: ₹ {xpressbeesTotalAmount ?? 'Not Available'}
            </Text>
            <Text style={styles.info}>💳 Payment: {paymentMethod}</Text>
            <Text style={styles.info}>📦 Weight: {weight} kg</Text>
            <Text style={styles.info}>📍 Pickup PIN: {pickupPin}</Text>
            <Text style={styles.info}>📍 Delivery PIN: {deliveryPin}</Text>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.pop(2)}>
            <Text style={{color: '#fff', fontWeight: 'bold'}}>Go to Home</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </View>
  );
};

export default ShippingDetails;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: COLOR.white},
  scroll: {
    padding: 16,
    paddingBottom: 30,
  },
  card: {
    backgroundColor: '#f5fafd',
    marginBottom: 20,
    borderRadius: 10,
    padding: 20,
    elevation: 3,
  },
  carrierTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLOR.primary,
    textAlign: 'center',
    marginBottom: 12,
  },
  info: {
    fontSize: 15,
    marginVertical: 3,
    color: COLOR.black,
  },
  button: {
    backgroundColor: '#00BCD4',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
});
