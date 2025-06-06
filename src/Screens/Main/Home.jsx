import {
  Animated,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {COLOR} from '../../Constants/Colors';
import {windowHeight, windowWidth} from '../../Constants/Dimensions';
import LottieView from 'lottie-react-native';
import LinearGradient from 'react-native-linear-gradient';
import TermsModal from '../../Components/TermsModal';
import {AuthContext} from '../../Backend/AuthContent';

const Home = ({navigation}) => {
  const {user, token} = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [UserData, setUserData] = useState([]);
  const animationRef = useRef(null);
  const [loading, setloading] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const UserDetails = user?.userDetails;
  const handleAccept = () => {
    setModalVisible1(false);
    alert('Terms Accepted!');
  };

  const features = [
    {
      label: 'Create Order',
      image: 'https://cdn-icons-png.flaticon.com/128/891/891462.png',
      color: '#E0F7FA',
      navigation: 'CreateOrder',
    },
    {
      label: 'Order List',
      image: 'https://cdn-icons-png.flaticon.com/128/9752/9752284.png',
      color: '#E3F2FD',
      navigation: 'Order',
    },
    {
      label: 'Shipping Calculator',
      image: 'https://cdn-icons-png.flaticon.com/128/548/548353.png',
      color: '#F1F8E9',
      navigation: 'ShippingCalculator',
    },
    {
      label: 'Shipping Credits',
      image: 'https://cdn-icons-png.flaticon.com/128/8983/8983163.png',
      color: '#FFF3E0',
      navigation: 'ShippingCredits',
    },
    {
      label: 'Track By AWB',
      image: 'https://cdn-icons-png.flaticon.com/128/3428/3428946.png',
      color: '#FCE4EC',
      navigation: 'TrackByAwb',
    },
    {
      label: 'Wallet Statements',
      image: 'https://cdn-icons-png.flaticon.com/128/855/855279.png',
      color: '#F3E5F5',
      navigation: 'Wallet',
    },
    {
      label: 'Remittance',
      image: 'https://cdn-icons-png.flaticon.com/128/12212/12212166.png',
      color: '#E8F5E9',
    },
    {
      label: 'Helpdesk',
      image: 'https://cdn-icons-png.flaticon.com/128/4961/4961759.png',
      color: '#FFFDE7',
      navigation: 'HelpDesk',
    },
  ];
  useEffect(() => {
    setModalVisible1(true);
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <LinearGradient colors={['#c8fcc0', '#e6fffc']} style={styles.container}>
        <ScrollView>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <View style={{marginLeft: 15}}>
              <Text style={{fontSize: 15, fontWeight: '400'}}>Hello,</Text>
              <Text style={{fontSize: 40, fontWeight: '600'}}>
                {UserDetails?.name}
              </Text>
            </View>
            <Image
              source={require('../../assets/Images/Logo.png')}
              style={{
                width: 120,
                height: 60,
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
                      background={TouchableNativeFeedback.Ripple(
                        '#c2ffa3',
                        false,
                      )} // Ripple color and bounded effect
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
          <TermsModal
            visible={modalVisible1}
            onAccept={handleAccept}
            onClose={() => setModalVisible1(false)}
          />
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: '#c8fcc0', // fallback color if gradient doesn't fill status bar area
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
