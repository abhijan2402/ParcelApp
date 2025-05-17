import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../../Components/FeedHeader';
import Input from '../../Components/Input';
import {windowHeight} from '../../Constants/Dimensions';
import {COLOR} from '../../Constants/Colors';
import CustomButton from '../../Components/CustomButton';

const ShippingCredits = () => {
  return (
    <View style={styles.Container}>
      <Header title={'Shipping Credit'} showBack />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'center',
          marginTop: 20,
        }}>
        <Text style={{color: COLOR.black, fontSize: 15}}>
          Your shipping amount is :
        </Text>
        <Text style={{color: COLOR.black, fontSize: 15, fontWeight: '600'}}>
          {' '}
          Rs 45{' '}
        </Text>
      </View>
      <Input placeholder={'Enter Amount'} />
      <CustomButton title={'Buy Shipping Credit'} style={{marginTop: 15}} />
    </View>
  );
};

export default ShippingCredits;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    // height: windowHeight,
    backgroundColor: COLOR.white,
  },
});
