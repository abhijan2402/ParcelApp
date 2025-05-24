import React, {useEffect, useRef, useState} from 'react';
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
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context'; // install this package if not already
import {COLOR} from '../../Constants/Colors';
import CustomButton from '../../Components/CustomButton';
import Input from '../../Components/Input';
import {windowWidth} from '../../Constants/Dimensions';
import {useApi} from '../../Backend/Apis';

const {height} = Dimensions.get('window');
const {width} = Dimensions.get('window');

const SignUp = ({navigation}) => {
  const {postRequest} = useApi();
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setpassword] = useState(null);
  const [confirmPassword, setconfirmPassword] = useState(null);
  const [loading, setloading] = useState(false);

  const registerUser = async (name, email, password, confirmPassword) => {
    console.log('HI');

    if (!name) {
      Alert.alert('Validation Error', 'Name is required');
      return null;
    }
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

    // Prepare FormData
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('confirm_password', confirmPassword);
    formData.append('terms_and_conditions', '1');
    console.log(formData, 'FOTMDAT');

    const response = await postRequest('/api/signup', formData, true); // Assuming `true` sets content-type to multipart/form-data
    console.log(response, 'RESPPPP');

    setloading(false);

    if (response.success) {
      Alert.alert('Success', 'Account created successfully, Please login');
      navigation.navigate('Login');
      return response.data;
    } else {
      Alert.alert('Error', response.error || 'Registration failed');
      return null;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        backgroundColor={COLOR.white}
        barStyle="dark-content"
        translucent={false}
      />
      <ScrollView
        style={styles.container}
        contentContainerStyle={{flexGrow: 1}}>
        <ScrollView style={{flex: 1, paddingTop: height * 0.03}}>
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
                Create New Account
              </Text>
            </View>
            <Input
              label="Name"
              placeholder="Enter your name"
              value={name}
              onChangeText={setName}
            />
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
                registerUser(name, email, password, confirmPassword);
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
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
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
