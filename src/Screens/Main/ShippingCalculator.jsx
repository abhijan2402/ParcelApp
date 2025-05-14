import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../../Components/FeedHeader';
import {windowHeight, windowWidth} from '../../Constants/Dimensions';
import {COLOR} from '../../Constants/Colors';
import CustomButton from '../../Components/CustomButton';
import Input from '../../Components/Input';

const ShippingCalculator = () => {
  return (
    <View style={styles.Container}>
      <Header title={'Shipping Calculator'} showBack />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'center',
          marginTop: 20,
          marginBottom: 10,
        }}>
        <Text
          style={{
            color: COLOR.black,
            fontSize: 15,
            width: windowWidth / 1.3,
            textAlign: 'center',
            fontWeight: '500',
          }}>
          Enter the following detaisl to calculate shipping charges
        </Text>
      </View>
      <Input placeholder={'Pickup Area Pincode'} />
      <Input placeholder={'Delivery Area Pincode'} />
      <Input placeholder={'Declared Value in INR'} />
      <Input placeholder={'Weight (In kgs)'} />
      <Input placeholder={'Payment Method'} />
      <CustomButton title={'Calculate Price'} style={{marginTop: 15}} />
    </View>
  );
};

export default ShippingCalculator;

const styles = StyleSheet.create({
  Container: {
    height: windowHeight,
    backgroundColor: COLOR.white,
  },
});
