import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import {COLOR} from '../../Constants/Colors';
import CustomButton from '../../Components/CustomButton';
import LottieView from 'lottie-react-native';
import Input from '../../Components/Input';
import {postRequest} from '../../Backend/Api';
import {windowWidth} from '../../Constants/Dimensions';

const {height} = Dimensions.get('window');
const {width} = Dimensions.get('window');

const SignUp = ({navigation}) => {
  const animationRef = useRef(null);
  const [email, setEmail] = useState(null);
  const [password, setpassword] = useState(null);
  const [confirmPassword, setconfirmPassword] = useState(null);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    animationRef.current?.play();

    // Or set a specific startFrame and endFrame with:
    animationRef.current?.play(30, 120);
  }, []);

  const registerUser = async (email, password, confirmPassword) => {
    // Basic validation
    if (!email) {
      Alert.alert('Validation Error', 'Email is required');
      return null;
    }

    if (password.length < 6) {
      Alert.alert(
        'Validation Error',
        'Password must be at least 6 characters long',
      );
      return null;
    }

    if (password !== confirmPassword) {
      Alert.alert(
        'Validation Error',
        'Password and confirm password do not match',
      );
      return null;
    }
    setloading(true);
    // API call
    const response = await postRequest('/auth/register', {
      email,
      password,
    });

    if (response.success) {
      setloading(false);
      console.log('Registration successful:', response.data);
      Alert.alert('Success', 'Account created successfully');
      navigation.navigate('Home');
      return response.data;
    } else {
      setloading(false);
      console.error('Registration failed:', response.error);
      Alert.alert('Error', response.error || 'Registration failed');
      return null;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <ScrollView style={{flex: 1}}>
        <Image
          source={require('../../assets/Images/Logo.png')}
          style={{width: windowWidth / 1.0, height: 200, marginBottom: 50}}
        />
        <View style={{borderTopWidth: 0.5, paddingTop: 15}}>
          <View style={{marginLeft: 25, marginBottom: 10}}>
            <Text
              style={{fontSize: 22, color: COLOR.royalBlue, fontWeight: '700'}}>
              Create New Account
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
          <Input
            label="Confirm Password"
            placeholder="Enter your Confirm Password"
            value={confirmPassword}
            onChangeText={setconfirmPassword}
          />

          <CustomButton
            loading={loading}
            title="Create"
            onPress={() => {
              // navigation.navigate('Home');
              registerUser(email, password, confirmPassword);
            }}
            style={{marginTop: 15}}
          />
          <Text style={styles.footerText}>
            Already having an account?{' '}
            <TouchableOpacity
              style={{marginTop: 7}}
              onPress={() => {
                navigation.navigate('Login');
              }}>
              <Text style={styles.linkText}>Login</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </ScrollView>
    </ScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    height: height,
    backgroundColor: COLOR.white,
  },
  image: {
    width: width,
    height: height * 0.4,
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
  footerText: {
    marginTop: 20,
    fontSize: 14,
    color: '#333',
    alignSelf: 'center',
    marginBottom: 20,
  },
  linkText: {
    color: COLOR.royalBlue,
    fontWeight: 'bold',
  },
});
