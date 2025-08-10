import {StyleSheet, Text, View, Alert} from 'react-native';
import React, {useState} from 'react';
import Header from '../../Components/FeedHeader';
import Input from '../../Components/Input';
import {COLOR} from '../../Constants/Colors';
import CustomButton from '../../Components/CustomButton';
import RazorpayCheckout from 'react-native-razorpay';
import {Buffer} from 'buffer';

const ShippingCredits = ({navigation}) => {
  const [amount, setAmount] = useState('');

  const createRazorpayOrder = async amount => {
    const keyId = 'rzp_test_3zq15OVNfzMTlW';
    const keySecret = '8Ifmrjd7tlmrPE58ngNd4C26'; // ⚠️ Only for testing. NEVER expose in production!
    const base64 = Buffer.from(`${keyId}:${keySecret}`).toString('base64');

    const payload = {
      amount: amount * 100, // in paise
      currency: 'INR',
      receipt: 'receipt_' + Date.now(),
      payment_capture: 1,
    };

    try {
      const response = await fetch('https://api.razorpay.com/v1/orders', {
        method: 'POST',
        headers: {
          Authorization: `Basic ${base64}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('❌ Error creating Razorpay order:', error);
      return null;
    }
  };

  const handlePayment = async () => {
    const amt = parseInt(amount);
    if (isNaN(amt) || amt < 1) {
      Alert.alert('Invalid Amount', 'Please enter a valid amount');
      return;
    }

    const order = await createRazorpayOrder(amt);
    if (!order?.id) {
      Alert.alert('Error', 'Could not create Razorpay order');
      return;
    }

    const options = {
      description: 'Buy Shipping Credit',
      currency: 'INR',
      key: 'rzp_test_3zq15OVNfzMTlW',
      amount: order.amount,
      order_id: order.id,
      name: 'Dear Express',
      prefill: {
        email: 'test@example.com',
        contact: '9876543210',
        name: 'Test User',
      },
      theme: {color: '#53a20e'},
    };

    RazorpayCheckout.open(options)
      .then(data => {
        console.log('✅ Payment Success:', data);
        Alert.alert(
          'Payment Successful',
          `Payment ID: ${data.razorpay_payment_id}`,
        );
        // Optionally, send `data` to your server for verification
      })
      .catch(error => {
        console.log('❌ Payment Failed:', error);
        Alert.alert(
          'Payment Failed',
          error.description || 'Something went wrong',
        );
      });
  };

  return (
    <View style={styles.Container}>
      <Header
        title={'Shipping Credit'}
        showBack
        onBackPress={() => navigation.goBack()}
      />
      <View style={styles.amountRow}>
        <Text style={styles.amountLabel}>Your shipping amount is :</Text>
        <Text style={styles.amountValue}> Rs 45 </Text>
      </View>
      <Input
        placeholder={'Enter Amount'}
        value={amount}
        onChangeText={setAmount}
        keyboardType="number-pad"
      />
      <CustomButton
        title={'Buy Shipping Credit'}
        style={{marginTop: 15}}
        onPress={handlePayment}
      />
    </View>
  );
};

export default ShippingCredits;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: COLOR.white,
    // padding: 16,
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
  amountLabel: {
    color: COLOR.black,
    fontSize: 15,
  },
  amountValue: {
    color: COLOR.black,
    fontSize: 15,
    fontWeight: '600',
  },
});
