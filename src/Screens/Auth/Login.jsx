import React, {useContext, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Alert,
  StatusBar,
  KeyboardAvoidingView,
} from 'react-native';
import {COLOR} from '../../Constants/Colors';
import CustomButton from '../../Components/CustomButton';
import Input from '../../Components/Input';
import {AuthContext} from '../../Backend/AuthContent';
import {useApi} from '../../Backend/Apis';
import {windowWidth} from '../../Constants/Dimensions';

const {height} = Dimensions.get('window');

const CHECKED_IMAGE = 'https://cdn-icons-png.flaticon.com/128/9918/9918686.png';
const UNCHECKED_IMAGE =
  'https://cdn-icons-png.flaticon.com/128/8924/8924271.png';

const Login = ({navigation}) => {
  const {postRequest} = useApi();

  const [email, setEmail] = useState(null);
  const [loading, setloading] = useState(false);
  const [password, setpassword] = useState(null);
  const {setUser, setToken} = useContext(AuthContext);
  const [isChecked, setIsChecked] = useState(false);

  const loginUser = async (email, password) => {
    if (!email) {
      Alert.alert('Validation Error', 'Email is required');
      return null;
    }
    setloading(true);
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    const response = await postRequest('/login', formData, true);
    console.log(response, 'RESPPPP');

    if (response?.success) {
      const data = response?.data;
      setToken(data?.token);
      setUser(data?.data);
      setloading(false);
    } else {
      console.log(response, 'RESPPPP');

      setloading(false);
      Alert.alert('Error', response.error || 'Login failed');
      return null;
    }
  };

  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}>
        <ScrollView
          style={{
            flex: 1,
            marginTop: height * 0.1, // Adjust top margin so content starts below status bar
            paddingBottom: 80,
            paddingTop: height * 0.03,
          }}>
          <Image
            source={require('../../assets/Images/Logo.png')}
            style={{
              width: windowWidth / 1.3,
              height: 150,
              marginBottom: 50,
              alignSelf: 'center',
            }}
          />
          <View style={{borderTopWidth: 0.5, paddingTop: 15}}>
            <View style={{marginLeft: 25, marginBottom: 10}}>
              <Text
                style={{
                  fontSize: 22,
                  color: COLOR.royalBlue,
                  fontWeight: '700',
                }}>
                Sign In
              </Text>
            </View>
            <Input
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
            />
            <Input
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChangeText={setpassword}
            />

            {/* Terms & Conditions checkbox */}
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 20,
                marginBottom: 10,
                marginHorizontal: 25,
              }}
              onPress={() => setIsChecked(!isChecked)}>
              <Image
                source={{uri: isChecked ? CHECKED_IMAGE : UNCHECKED_IMAGE}}
                style={{width: 20, height: 20, marginRight: 10}}
              />
              <Text style={{color: '#333', fontSize: 14}}>
                I accept the{' '}
                <Text style={{color: COLOR.royalBlue, fontWeight: 'bold'}}>
                  Terms & Conditions
                </Text>
              </Text>
            </TouchableOpacity>

            <CustomButton
              loading={loading}
              title="Login"
              onPress={() => {
                if (!isChecked) {
                  Alert.alert('Please accept Terms & Conditions to continue');
                  return;
                } else {
                  loginUser(email, password);
                }
              }}
              style={{marginTop: 15}}
            />

            <Text style={styles.footerText}>
              Not having account?{' '}
              <TouchableOpacity
                style={{marginTop: 8}}
                onPress={() => {
                  navigation.navigate('SignUp');
                }}>
                <Text style={styles.linkText}>Create One</Text>
              </TouchableOpacity>
            </Text>

            <TouchableOpacity
              style={styles.googleButton}
              onPress={() => Alert.alert('Google Login pressed')}>
              <Image
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/128/300/300221.png',
                }}
                style={styles.googleIcon}
              />
              <Text style={styles.googleText}>Continue with Google</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    height: height,
    backgroundColor: COLOR.white,
  },
  footerText: {
    marginTop: 20,
    fontSize: 14,
    color: '#333',
    alignSelf: 'center',
  },
  linkText: {
    color: COLOR.royalBlue,
    fontWeight: 'bold',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    justifyContent: 'center',
    borderWidth: 1,
    marginHorizontal: 30,
    marginBottom: 20,
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  googleText: {
    fontSize: 16,
    color: '#333',
  },
});
