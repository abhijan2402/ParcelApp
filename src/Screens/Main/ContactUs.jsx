import React, {useContext, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import Header from '../../Components/FeedHeader';
import Input from '../../Components/Input';
import {COLOR} from '../../Constants/Colors';
import CustomButton from '../../Components/CustomButton';
import {useApi} from '../../Backend/Apis';
import {AuthContext} from '../../Backend/AuthContent';

const ContactUs = ({navigation}) => {
  const {postRequest} = useApi();
  const {user} = useContext(AuthContext);
  const UserDetails = user?.userDetails || user;
  // Form States
  const [name, setName] = useState(UserDetails?.name);
  const [email, setEmail] = useState(UserDetails?.email);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name || !email || !subject || !message) {
      Alert.alert('Validation Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('subject', subject);
    formData.append('message', message);

    const response = await postRequest('/api/contact-us', formData, true);

    setLoading(false);

    if (response?.success) {
      Alert.alert('Success', 'Your request has been sent.');
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      navigation.goBack();
    } else {
      Alert.alert('Error', response?.error || 'Failed to send message');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.container}>
        <Header title={'Contact Us'} showBack />

        <View style={styles.card}>
          <Text style={styles.heading}>We’d love to hear from you!</Text>
          <Text style={styles.subHeading}>
            Please fill out the form below and our team will get back to you.
          </Text>

          <Input
            placeholder={'Enter your name'}
            value={name}
            onChangeText={setName}
          />
          <Input
            placeholder={'Enter your email'}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <Input
            placeholder={'Enter subject'}
            value={subject}
            onChangeText={setSubject}
          />
          <Input
            placeholder={'Type your message here'}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            style={styles.messageInput}
            value={message}
            onChangeText={setMessage}
          />

          <CustomButton
            title={'Submit'}
            style={styles.submitBtn}
            loading={loading}
            onPress={handleSubmit}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ContactUs;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLOR.white,
  },
  card: {
    margin: 16,
    padding: 20,
    borderRadius: 12,
  },
  heading: {
    fontSize: 20,
    fontWeight: '700',
    color: COLOR.primary || '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  subHeading: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  messageInput: {
    height: 120,
    paddingTop: 12,
  },
  submitBtn: {
    marginTop: 20,
  },
});
