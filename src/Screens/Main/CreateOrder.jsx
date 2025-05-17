import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../../Components/FeedHeader';
import {COLOR} from '../../Constants/Colors';
import CustomButton from '../../Components/CustomButton';
import Input from '../../Components/Input';

const CreateOrder = ({navigation}) => {
  const [pickupLocation, setPickupLocation] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [address, setAddress] = useState('');
  const [landmark, setLandmark] = useState('');

  const [productName, setProductName] = useState('');
  const [sku, setSku] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [weight, setWeight] = useState('');
  const [length, setLength] = useState('');
  const [breadth, setBreadth] = useState('');
  const [height, setHeight] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <Header
        showBack
        onBackPress={() => navigation.goBack()}
        title={'Create Order'}
      />

      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.formContainer}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            <Input
              style={styles.input}
              placeholder="Pickup Location"
              value={pickupLocation}
              onChangeText={setPickupLocation}
            />
            <Text style={styles.MainTitle}>Delivery Details</Text>

            <Input
              style={styles.input}
              placeholder="Customer First Name"
              value={firstName}
              onChangeText={setFirstName}
            />
            <Input
              style={styles.input}
              placeholder="Customer Last Name"
              value={lastName}
              onChangeText={setLastName}
            />
            <Input
              style={styles.input}
              placeholder="Customer Email"
              value={email}
              onChangeText={setEmail}
            />
            <Input
              style={styles.input}
              placeholder="Customer Mobile Number"
              value={mobileNumber}
              onChangeText={setMobileNumber}
            />
            <Input
              style={styles.input}
              placeholder="Post Code"
              value={postalCode}
              onChangeText={setPostalCode}
            />
            <Input
              style={styles.input}
              placeholder="City"
              value={city}
              onChangeText={setCity}
            />
            <Input
              style={styles.input}
              placeholder="State"
              value={state}
              onChangeText={setState}
            />
            <Input
              style={styles.input}
              placeholder="Customer Address"
              value={address}
              onChangeText={setAddress}
            />
            <Input
              style={styles.input}
              placeholder="Landmark"
              value={landmark}
              onChangeText={setLandmark}
            />
            <Text style={styles.MainTitle}>Product Details</Text>

            <Input
              style={styles.input}
              placeholder="Product Name"
              value={productName}
              onChangeText={setProductName}
            />
            <Input
              style={styles.input}
              placeholder="SKU"
              value={sku}
              onChangeText={setSku}
            />
            <Input
              style={styles.input}
              placeholder="Quantity"
              value={quantity}
              onChangeText={setQuantity}
            />
            <Input
              style={styles.input}
              placeholder="Price (INR)"
              value={price}
              onChangeText={setPrice}
            />
            <Input
              style={styles.input}
              placeholder="Weight"
              value={weight}
              onChangeText={setWeight}
            />
            <Input
              style={styles.input}
              placeholder="Length"
              value={length}
              onChangeText={setLength}
            />
            <Input
              style={styles.input}
              placeholder="Breadth"
              value={breadth}
              onChangeText={setBreadth}
            />
            <Input
              style={styles.input}
              placeholder="Height"
              value={height}
              onChangeText={setHeight}
            />
            <Input
              style={styles.input}
              placeholder="Payment Method"
              value={paymentMethod}
              onChangeText={setPaymentMethod}
            />
            <View style={{marginTop: 20, marginBottom: 40}}>
              <CustomButton title={'Create Order'} />
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CreateOrder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  formContainer: {
    padding: 20,
    // paddingBottom: 60,
  },
  input: {
    height: 50,
    borderColor: COLOR.gray,
    // marginBottom: 12,
    borderRadius: 5,
  },
  MainTitle: {
    fontSize: 17,
    color: COLOR.black,
    fontWeight: '600',
    marginVertical: 10,
  },
});
