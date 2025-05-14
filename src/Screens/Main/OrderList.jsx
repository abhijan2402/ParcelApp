import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../../Components/FeedHeader';
import {windowHeight} from '../../Constants/Dimensions';
import {COLOR} from '../../Constants/Colors';

const OrderList = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Header
        showBack
        onBackPress={() => {
          navigation.goBack();
        }}
        title={'Create Order'}
      />
    </View>
  );
};

export default OrderList;

const styles = StyleSheet.create({
  container: {
    height: windowHeight,
    backgroundColor: COLOR.white,
  },
});
