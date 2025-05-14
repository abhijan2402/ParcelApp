import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {COLOR} from '../../Constants/Colors';
import CustomButton from '../../Components/CustomButton';
import {windowWidth} from '../../Constants/Dimensions';
import {useNavigation} from '@react-navigation/native';

const {height} = Dimensions.get('window');
const {width} = Dimensions.get('window');

const OnBoarding = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://cdn.prod.website-files.com/65a5d5566b113d3285df97e2/664be547f7ac920cf047d2ff_Parcel-Delivery-3T.jpg',
        }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={{marginTop: '10%'}}>
        <Text
          style={{
            fontSize: 15,
            color: COLOR.black,
            width: windowWidth / 1.3,
            textAlign: 'center',
            alignSelf: 'center',
            fontWeight: '500',
            marginBottom: 25,
          }}>
          Deliver your love to friends and loved ones....
        </Text>
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          alignSelf: 'center',
          bottom: 10,
        }}>
        <CustomButton
          title="Let's get started!"
          onPress={() => {
            navigation.navigate('Login');
          }}
        />
      </View>
    </View>
  );
};

export default OnBoarding;

const styles = StyleSheet.create({
  container: {
    height: height,
    backgroundColor: COLOR.white,
  },
  image: {
    width: width,
    height: height * 0.7,
  },
  button: {
    marginTop: 30,
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    width: width / 1.5,
    alignSelf: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: COLOR.white,
    fontSize: 14,
    fontWeight: '600',
  },
  footerText: {
    marginTop: 20,
    fontSize: 14,
    color: '#333',
    alignSelf: 'center',
  },
  linkText: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
});
