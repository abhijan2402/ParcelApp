import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../../Components/FeedHeader';
import {windowWidth} from '../../Constants/Dimensions';
import {COLOR} from '../../Constants/Colors';
import CustomButton from '../../Components/CustomButton';
import Input from '../../Components/Input';
import DropDownPicker from 'react-native-dropdown-picker';
import {useNavigation} from '@react-navigation/native';

const ShippingCalculator = () => {
  const [selectedCarrier, setSelectedCarrier] = useState(null);
  const [pickupPin, setPickupPin] = useState('');
  const [deliveryPin, setDeliveryPin] = useState('');
  const [declaredValue, setDeclaredValue] = useState('');
  const [weight, setWeight] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Prepaid');
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const navigation = useNavigation();
  const [weightCustom, setweightCustom] = useState(null);
  const [weightOptionsOpen, setWeightOptionsOpen] = useState(false);
  const [weightOptions, setWeightOptions] = useState([
    {label: 'Upto 0.5kg', value: '0.5'},
    {label: 'Upto 1kg', value: '1'},
    {label: 'Upto 1.5kg', value: '1.5'},
    {label: 'Upto 2kg', value: '2'},
    {label: 'Custom Weight', value: 'custom'},
  ]);
  const carriers = [
    {id: 'xpressbees', label: 'Xpressbees'},
    {id: 'ecom', label: 'Ecom Express'},
    {id: 'delhivery', label: 'Delhivery'},
  ];

  const paymentMethods = [
    {label: 'Prepaid', value: 'Prepaid'},
    {label: 'Cash on Delivery', value: 'COD'},
  ];

  const calculateCharges = async () => {
    // if (!selectedCarrier) {
    //   Alert.alert('Please select carrier');
    //   return;
    // }
    if (
      !pickupPin ||
      !deliveryPin ||
      !weight ||
      !declaredValue ||
      !paymentMethod
    ) {
      Alert.alert('All fields are required');
      return;
    }

    try {
      const md = 'S';
      const ss = 'Delivered';
      const d_pin = deliveryPin;
      const o_pin = pickupPin;
      const cgm = parseFloat(weight) * 1000;
      const declared_value = parseFloat(declaredValue);
      const pt = paymentMethod;

      console.log('HII');
      const resultData = {
        carrier: selectedCarrier,
        paymentMethod: paymentMethod,
        declaredValue: declared_value,
        weight: weight,
        deliveryPin: deliveryPin,
        pickupPin: pickupPin,
        // charges: data[0],
      };
      console.log(resultData, 'DATATAT');
      // return;
      navigation.navigate('ShippingDetails', {resultData});
      return;
      setLoading(true);
      if (selectedCarrier === 'delhivery') {
        const apiKey = 'c4093190ae6edab6fd33121e5c6ad56dcb67804e';

        const md = 'S';
        const ss = 'Delivered';
        const d_pin = deliveryPin;
        const o_pin = pickupPin;
        const cgm = parseFloat(weight) * 1000;
        const declared_value = parseFloat(declaredValue);
        const pt = paymentMethod;

        const url = `https://track.delhivery.com/api/kinko/v1/invoice/charges/.json?md=${md}&ss=${ss}&d_pin=${d_pin}&o_pin=${o_pin}&cgm=${cgm}&declared_value=${declared_value}&pt=${pt}`;

        const response = await fetch(url, {
          method: 'GET',
          headers: {
            Authorization: `Token ${apiKey}`,
            Accept: 'application/json',
          },
        });

        const data = await response.json();
        console.log(data, 'Response');

        if (Array.isArray(data) && data.length > 0) {
          const resultData = {
            carrier: selectedCarrier,
            paymentMethod: paymentMethod,
            declaredValue: declared_value,
            weight: weight,
            charges: data[0],
          };

          // Navigate to details page with calculated data
          navigation.navigate('ShippingDetails', {resultData});
        } else {
          Alert.alert('No charges found for this request');
        }
      } else {
        Alert.alert(`${selectedCarrier} carrier not yet supported`);
      }
    } catch (error) {
      console.error('Error fetching charges:', error);
      Alert.alert('Error fetching charges');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.Container}>
      <Header
        title={'Shipping Calculator'}
        showBack
        onBackPress={() => {
          navigation.goBack();
        }}
      />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.introContainer}>
          <Text style={styles.introText}>
            Enter the following details to calculate shipping charges
          </Text>
        </View>

        {/* Horizontal Courier Selection */}
        {/* <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalContainer}>
          {carriers.map(carrier => (
            <TouchableOpacity
              key={carrier.id}
              style={[
                styles.optionBox,
                selectedCarrier === carrier.id && styles.optionBoxSelected,
              ]}
              onPress={() => setSelectedCarrier(carrier.id)}>
              <Text
                style={[
                  styles.optionText,
                  selectedCarrier === carrier.id && styles.optionTextSelected,
                ]}>
                {carrier.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView> */}
        <DropDownPicker
          open={weightOptionsOpen}
          value={weight}
          items={weightOptions}
          setOpen={setWeightOptionsOpen}
          setValue={setWeight}
          setItems={setWeightOptions}
          placeholder="Select Weight"
          style={{
            marginBottom: weight === 'custom' ? 10 : 20,
            width: windowWidth / 1.1888,
            marginHorizontal: 10,
          }}
        />
        {weight === 'custom' && (
          <Input
            keyboardType="numeric"
            style={styles.input}
            placeholder="Enter custom weight in kgs"
            value={weightCustom}
            onChangeText={setweightCustom}
          />
        )}
        <Input
          placeholder={'Pickup Area Pincode'}
          keyboardType="numeric"
          value={pickupPin}
          onChangeText={setPickupPin}
        />
        <Input
          placeholder={'Delivery Area Pincode'}
          keyboardType="numeric"
          value={deliveryPin}
          onChangeText={setDeliveryPin}
        />
        <Input
          placeholder={'Declared Value in INR'}
          keyboardType="numeric"
          value={declaredValue}
          onChangeText={setDeclaredValue}
        />
        {/* <Input
          placeholder={'Weight (In KG)'}
          keyboardType="numeric"
          value={weight}
          onChangeText={setWeight}
        /> */}

        <Text style={styles.paymentLabel}>Payment Method</Text>
        <DropDownPicker
          open={open}
          value={paymentMethod}
          items={paymentMethods}
          setOpen={setOpen}
          setValue={setPaymentMethod}
          style={styles.dropdownStyle}
          dropDownContainerStyle={styles.dropdownContainerStyle}
          zIndex={5000}
        />

        <CustomButton
          title={loading ? 'Calculating...' : 'Calculate Price'}
          style={{marginTop: 15}}
          onPress={calculateCharges}
        />
      </ScrollView>
    </View>
  );
};

export default ShippingCalculator;

const styles = StyleSheet.create({
  Container: {flex: 1, backgroundColor: COLOR.white},
  scrollContent: {padding: 20, paddingBottom: 40},
  introContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  introText: {
    color: COLOR.black,
    fontSize: 15,
    width: windowWidth / 1.3,
    textAlign: 'center',
    fontWeight: '500',
  },
  horizontalContainer: {
    marginBottom: 15,
  },
  optionBox: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLOR.gray,
    marginHorizontal: 8,
    alignItems: 'center',
    backgroundColor: COLOR.white,
    width: 120, // Fixed width for uniform look
  },
  optionBoxSelected: {borderColor: 'green', backgroundColor: '#e6f4ea'},
  optionText: {fontSize: 15, color: COLOR.black, textAlign: 'center'},
  optionTextSelected: {color: 'green', fontWeight: 'bold'},
  paymentLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: COLOR.black,
    marginTop: 15,
    marginBottom: 5,
    marginLeft: 5,
  },
  dropdownStyle: {
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 50,
  },
  dropdownContainerStyle: {
    borderColor: '#ccc',
    borderRadius: 8,
  },
});
