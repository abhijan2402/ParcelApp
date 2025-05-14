import {
  Animated,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {COLOR} from '../../Constants/Colors';
import {windowHeight, windowWidth} from '../../Constants/Dimensions';
import LottieView from 'lottie-react-native';
import LinearGradient from 'react-native-linear-gradient';

const Home = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [UserData, setUserData] = useState([]);
  const animationRef = useRef(null);
  const [loading, setloading] = useState(false);

  const features = [
    {
      label: 'Create Order',
      image: 'https://cdn-icons-png.flaticon.com/128/3144/3144456.png',
      color: '#E0F7FA',
      navigation: 'CreateOrder',
    },
    {
      label: 'Order List',
      image: 'https://cdn-icons-png.flaticon.com/128/839/839860.png',
      color: '#E3F2FD',
      navigation: 'Order',
    },
    {
      label: 'Shipping Calculator',
      image: 'https://cdn-icons-png.flaticon.com/128/2344/2344247.png',
      color: '#F1F8E9',
    },
    {
      label: 'Shipping Credits',
      image: 'https://cdn-icons-png.flaticon.com/128/4021/4021708.png',
      color: '#FFF3E0',
    },
    {
      label: 'Track By AWB',
      image: 'https://cdn-icons-png.flaticon.com/128/941/941101.png',
      color: '#FCE4EC',
      navigation: 'TrackByAwb',
    },
    {
      label: 'Wallet Statements',
      image: 'https://cdn-icons-png.flaticon.com/128/482/482541.png',
      color: '#F3E5F5',
      navigation: 'Wallet',
    },
    {
      label: 'Remittance',
      image: 'https://cdn-icons-png.flaticon.com/128/12212/12212167.png',
      color: '#E8F5E9',
    },
    {
      label: 'Helpdesk',
      image: 'https://cdn-icons-png.flaticon.com/128/1067/1067566.png',
      color: '#FFFDE7',
    },
  ];

  return (
    <LinearGradient colors={['#c8fcc0', '#e6fffc']} style={styles.container}>
      {/* <View style={styles.headerContainer}>
        <Text style={styles.greetingText}>Hello, Akash</Text>
        <View />
      </View> */}
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View style={{marginLeft: 15}}>
          <Text style={{fontSize: 15, fontWeight: '400'}}>Hello,</Text>
          <Text style={{fontSize: 40, fontWeight: '600'}}>Akash</Text>
        </View>
        <Image
          source={require('../../assets/Images/Logo.png')}
          style={{
            width: 120,
            height: 70,
            alignSelf: 'center',
            borderRadius: 14,
            marginRight: 15,
            marginTop: 10,
          }}
        />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollContainer}>
        {loading ? (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: windowWidth / 1.06,
              height: windowHeight / 1.4,
            }}>
            <LottieView
              ref={animationRef}
              source={require('../../assets/Lottie/LoaderBar.json')}
              style={{width: windowWidth, height: windowHeight / 2}}
            />
          </View>
        ) : (
          <View style={styles.grid}>
            {features.map((item, index) => (
              <View
                key={index}
                style={[styles.boxWrapper, {backgroundColor: '#f2fced'}]}>
                <TouchableNativeFeedback
                  onPress={() => {
                    if (item?.navigation) {
                      navigation.navigate(item?.navigation);
                    }
                  }}
                  style={[styles.boxWrapper, {backgroundColor: '#f2fced'}]}
                  background={TouchableNativeFeedback.Ripple('#c2ffa3', false)} // Ripple color and bounded effect
                >
                  <View style={styles.box}>
                    <Image
                      source={{uri: item.image}}
                      style={styles.iconImage}
                    />
                    <Text style={styles.label}>{item.label}</Text>
                  </View>
                </TouchableNativeFeedback>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </LinearGradient>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingBottom: 15,
    marginBottom: 10,
  },
  greetingText: {
    color: COLOR.royalBlue,
    fontSize: 22,
    fontWeight: '600',
  },
  scrollContainer: {
    marginHorizontal: 10,
    borderTopWidth: 1,
    marginTop: 10,
    paddingTop: 10,
  },
  label: {
    marginTop: 8,
    fontSize: 12,
    color: COLOR.black,
    textAlign: 'center',
    fontWeight: '600',
    marginLeft: 10,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  box: {
    width: '45%',
    // aspectRatio: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 12,
    // flexDirection: 'row',
    padding: 10,
    paddingVertical: 7,
    borderWidth: 0.5,
    marginHorizontal: 5,
    alignSelf: 'center',
  },
  iconImage: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },

  boxWrapper: {
    borderRadius: 8,
    overflow: 'hidden', // Required for ripple to stay within bounds
    margin: 8,
    width: '45%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconImage: {
    width: 40,
    height: 40,
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
  },
});
