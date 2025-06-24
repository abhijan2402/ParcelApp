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
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../Components/FeedHeader';
import {COLOR} from '../../Constants/Colors';
import CustomButton from '../../Components/CustomButton';
import Input from '../../Components/Input';
import {useApi} from '../../Backend/Apis';
import DropDownPicker from 'react-native-dropdown-picker';
import {windowWidth} from '../../Constants/Dimensions';

const CreateOrder = ({navigation}) => {
  const {postRequest, getRequest} = useApi();

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
  const [addresses, setAddresses] = useState([]);
  const [addressOpen, setAddressOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const createOrderFunc = async () => {
    // Basic field validations
    if (!pickupLocation.trim())
      return Alert.alert('Validation Error', 'Pickup location is required');
    if (!firstName.trim())
      return Alert.alert('Validation Error', 'Customer first name is required');
    if (!lastName.trim())
      return Alert.alert('Validation Error', 'Customer last name is required');
    if (!email.trim() || !email.includes('@'))
      return Alert.alert('Validation Error', 'A valid email is required');
    if (!mobileNumber.trim() || mobileNumber.length < 10)
      return Alert.alert(
        'Validation Error',
        'A valid mobile number is required',
      );
    if (!postalCode.trim())
      return Alert.alert('Validation Error', 'Post code is required');
    if (!city.trim())
      return Alert.alert('Validation Error', 'City is required');
    if (!state.trim())
      return Alert.alert('Validation Error', 'State is required');
    if (!address.trim())
      return Alert.alert('Validation Error', 'Customer address is required');
    if (!landmark.trim())
      return Alert.alert('Validation Error', 'Landmark is required');

    if (!productName.trim())
      return Alert.alert('Validation Error', 'Product name is required');
    if (!sku.trim()) return Alert.alert('Validation Error', 'SKU is required');
    if (!quantity.trim() || isNaN(quantity) || Number(quantity) <= 0)
      return Alert.alert('Validation Error', 'Valid quantity is required');
    if (!price.trim() || isNaN(price) || Number(price) <= 0)
      return Alert.alert('Validation Error', 'Valid price is required');
    if (!weight.trim() || isNaN(weight) || Number(weight) <= 0)
      return Alert.alert('Validation Error', 'Valid weight is required');
    if (!length.trim() || isNaN(length) || Number(length) <= 0)
      return Alert.alert('Validation Error', 'Valid length is required');
    if (!breadth.trim() || isNaN(breadth) || Number(breadth) <= 0)
      return Alert.alert('Validation Error', 'Valid breadth is required');
    if (!height.trim() || isNaN(height) || Number(height) <= 0)
      return Alert.alert('Validation Error', 'Valid height is required');
    if (!paymentMethod.trim())
      return Alert.alert('Validation Error', 'Payment method is required');

    const formData = new FormData();

    formData.append('pickup_location', pickupLocation);
    formData.append('customer_first_name', firstName);
    formData.append('customer_last_name', lastName);
    formData.append('customer_email', email);
    formData.append('customer_phone', mobileNumber);
    formData.append('postcode', postalCode);
    formData.append('city', city);
    formData.append('state', state);
    formData.append('customer_address', address);
    formData.append('landmark', landmark);

    formData.append('product_name', productName);
    formData.append('sku', sku);
    formData.append('qty', quantity);
    formData.append('price', price);
    formData.append('weight', weight);
    formData.append('length', length);
    formData.append('breadth', breadth);
    formData.append('height', height);
    formData.append('payment_method', paymentMethod);

    try {
      const response = await postRequest('/api/create-order', formData, true);
      if (response?.success) {
        Alert.alert('Success', 'Order created successfully');
        navigation.goBack();
      } else {
        Alert.alert('Error', response?.error || 'Something went wrong!');
      }
    } catch (error) {
      console.error('Order creation error:', error);
      Alert.alert('Error', 'Network error. Please try again later.');
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const response = await getRequest('/api/shipping-address-list', true);
      if (response?.success) {
        const data = response?.data?.data || [];

        // Format for dropdown
        const formatted = data.map(item => ({
          label: `${item.name} - ${item.address}, ${item.town}, ${item.city}, ${item.country}`,
          value: `${item.name} - ${item.address}, ${item.town}, ${item.city}, ${item.country}`, // Use ID as value
        }));

        setAddresses(formatted); // for dropdown list
      } else {
        Alert.alert('Error', response?.error || 'Failed to fetch addresses');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Something went wrong while fetching addresses');
    } finally {
      setLoading(false);
    }
  };

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
            <DropDownPicker
              open={addressOpen}
              value={pickupLocation}
              items={addresses} // this is what setAddresses() sets
              setOpen={setAddressOpen}
              setValue={setPickupLocation}
              setItems={setAddresses}
              placeholder="Select Shipping Address"
              style={{width: windowWidth / 1.2, marginLeft: 10}}
            />
            {/* <Input
              style={styles.input}
              placeholder="Pickup Location"
              value={pickupLocation}
              onChangeText={setPickupLocation}
            /> */}
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
              keyboardType="numeric"
              style={styles.input}
              placeholder="Customer Mobile Number"
              value={mobileNumber}
              onChangeText={setMobileNumber}
            />
            <Input
              keyboardType="numeric"
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
              keyboardType="numeric"
              style={styles.input}
              placeholder="Quantity"
              value={quantity}
              onChangeText={setQuantity}
            />
            <Input
              keyboardType="numeric"
              style={styles.input}
              placeholder="Price (INR)"
              value={price}
              onChangeText={setPrice}
            />
            <Input
              keyboardType="numeric"
              style={styles.input}
              placeholder="Weight"
              value={weight}
              onChangeText={setWeight}
            />
            <Input
              keyboardType="numeric"
              style={styles.input}
              placeholder="Length"
              value={length}
              onChangeText={setLength}
            />
            <Input
              keyboardType="numeric"
              style={styles.input}
              placeholder="Breadth"
              value={breadth}
              onChangeText={setBreadth}
            />
            <Input
              keyboardType="numeric"
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
              <CustomButton title={'Create Order'} onPress={createOrderFunc} />
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
