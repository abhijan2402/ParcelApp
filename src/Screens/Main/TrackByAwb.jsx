import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import Header from '../../Components/FeedHeader';
import {windowHeight, windowWidth} from '../../Constants/Dimensions';
import {COLOR} from '../../Constants/Colors';
import CustomButton from '../../Components/CustomButton';

const TrackByAwb = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Header
        showBack
        onBackPress={() => {
          navigation.goBack();
        }}
        title={'Track your shipment'}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Shipment no."
        //   value={paymentMethod}
        //   onChangeText={setPaymentMethod}
      />
      <CustomButton title={'Track'} />
    </View>
  );
};

export default TrackByAwb;

const styles = StyleSheet.create({
  container: {
    // height: windowHeight,
    backgroundColor: COLOR.white,
    flex: 1,
  },
  input: {
    height: 50,
    borderColor: COLOR.gray,
    borderWidth: 1,
    marginBottom: 15,
    borderRadius: 5,
    paddingLeft: 10,
    width: windowWidth / 1.2,
    alignSelf: 'center',
    marginTop: '10%',
  },
});
