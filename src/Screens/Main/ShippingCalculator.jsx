import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../../Components/FeedHeader';
import {windowWidth} from '../../Constants/Dimensions';
import {COLOR} from '../../Constants/Colors';
import CustomButton from '../../Components/CustomButton';
import Input from '../../Components/Input';

const ShippingCalculator = () => {
  return (
    <View style={styles.Container}>
      <Header title={'Shipping Calculator'} showBack />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.introContainer}>
          <Text style={styles.introText}>
            Enter the following details to calculate shipping charges
          </Text>
        </View>
        <Input placeholder={'Pickup Area Pincode'} />
        <Input placeholder={'Delivery Area Pincode'} />
        <Input placeholder={'Declared Value in INR'} />
        <Input placeholder={'Weight (In kgs)'} />
        <Input placeholder={'Payment Method'} />
        <CustomButton title={'Calculate Price'} style={{marginTop: 15}} />
      </ScrollView>
    </View>
  );
};

export default ShippingCalculator;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  introContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  introText: {
    color: COLOR.black,
    fontSize: 15,
    width: windowWidth / 1.3,
    textAlign: 'center',
    fontWeight: '500',
  },
});
