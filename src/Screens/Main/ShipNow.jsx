import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../Components/FeedHeader';
import {COLOR} from '../../Constants/Colors';
import {windowWidth} from '../../Constants/Dimensions';
import {useIsFocused} from '@react-navigation/native';
import {useApi} from '../../Backend/Apis';

const ShipNow = ({navigation, route}) => {
  const orderList = route?.params?.orderList;
  const isFocus = useIsFocused();
  console.log(orderList, 'ORDERLISISII');
  const {postRequest} = useApi();

  const [shippingCharge, setShippingCharge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [creatingOrder, setCreatingOrder] = useState(false);

  const generateUniqueOrderId = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const fetchShippingCharges = async () => {
    try {
      // Step 1: Login to get token
      const loginResponse = await fetch(
        'https://shipment.xpressbees.com/api/users/login',
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            email: 'contact@dearexpress.com',
            password: 'Express!@#321321',
          }),
        },
      );
      const loginData = await loginResponse.json();
      const token = loginData?.data;

      if (!token) throw new Error('Login failed');
      console.log(orderList?.weight, 'WEEEIEIEIhj');

      const chargePayload = {
        origin: orderList?.postcode || '',
        destination: orderList?.postcode || '',
        payment_type: orderList?.payment_method || 'cod',
        order_amount: orderList?.price || 0,
        weight: parseFloat(orderList?.weight || '0') * 100,
        length: parseFloat(orderList?.length || '0'),
        breadth: parseFloat(orderList?.breadth || '0'),
        height: parseFloat(orderList?.height || '0'),
      };
      const chargeResponse = await fetch(
        'https://shipment.xpressbees.com/api/courier/serviceability',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(chargePayload),
        },
      );

      const chargeJson = await chargeResponse?.json();
      console.log(chargeJson, 'JSONNNNN');

      setShippingCharge(chargeJson?.data?.[0]?.total_charges || 0);
    } catch (error) {
      console.error(error);
      Alert.alert('Failed to fetch shipping charges');
    } finally {
      setLoading(false);
    }
  };

  const createShipmentOrder = async () => {
    setCreatingOrder(true);
    try {
      const loginResponse = await fetch(
        'https://shipment.xpressbees.com/api/users/login',
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            email: 'contact@dearexpress.com',
            password: 'Express!@#321321',
          }),
        },
      );
      const loginData = await loginResponse.json();
      const token = loginData?.data;

      const uniqueOrderId = generateUniqueOrderId();

      const orderAmount = parseFloat(orderList?.price || '0');
      const shippingCharge = parseFloat(orderList?.shipping_charge || '40'); // fallback 40
      const codCharge = parseFloat(orderList?.cod_charges || '30'); // fallback 30
      const discount = parseFloat(orderList?.discount || '100'); // fallback 100

      // const collectableAmount = Math.min(orderAmount, orderAmount); // collect full amount unless logic differs
      console.log(collectableAmount, orderAmount, 'ANOOOO');
      const isCOD = orderList?.payment_method?.toLowerCase() == 'cod';

      // Final amount after discount (if any)
      const totalPayable = orderAmount + shippingCharge + codCharge - discount;
      console.log(
        totalPayable,
        'TOTALLALL',
        orderAmount + shippingCharge + codCharge,
      );

      // Only collect if it's a COD order
      const collectableAmount = isCOD ? totalPayable : 0;
      const shipmentPayload = {
        order_number: `#${uniqueOrderId}`,
        unique_order_number: 'yes',
        shipping_charges: shippingCharge,
        discount: discount,
        cod_charges: codCharge,
        payment_type: orderList?.payment_method || 'cod',
        order_amount: orderAmount,
        package_weight: parseFloat(orderList?.weight || '0') * 100, // in grams
        package_length: parseFloat(orderList?.length || '1'),
        package_breadth: parseFloat(orderList?.breadth || '1'),
        package_height: parseFloat(orderList?.height || '1'),
        request_auto_pickup: 'yes',

        consignee: {
          name: `${orderList?.customer_first_name || ''} ${
            orderList?.customer_last_name || ''
          }`.trim(),
          address:
            'huugbgb' || orderList?.customer_address || 'Default Address',
          address_2: orderList?.landmark || '',
          city: orderList?.city || '',
          state: orderList?.state || '',
          pincode: orderList?.postcode || '302039',
          phone: orderList?.customer_phone || '',
        },

        pickup: {
          warehouse_name: orderList?.pickup_warehouse_name || 'warehouse 1',
          name:
            orderList?.pickup_contact_name ||
            'Nitish Kumar (Xpressbees Private Limited)',
          address: orderList?.pickup_address || '140, MG Road',
          address_2: orderList?.pickup_address_2 || 'Near metro station',
          city: orderList?.pickup_city || 'Gurgaon',
          state: orderList?.pickup_state || 'Haryana',
          pincode: orderList?.pickup_pincode || '302039',
          phone: orderList?.pickup_phone || '9999999999',
        },

        order_items: [
          {
            name: orderList?.product_name || 'Product',
            qty: orderList?.qty?.toString() || '1',
            price: orderAmount.toString(),
            sku: orderList?.sku || 'sku',
          },
        ],

        courier_id: orderList?.courier_id || '',
        collectable_amount: collectableAmount,
      };
      console.log(shipmentPayload, 'SHIPPPPPPP');

      const response = await fetch(
        'https://shipment.xpressbees.com/api/shipments2',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(shipmentPayload),
        },
      );

      const result = await response?.json();
      console.log(result?.data, 'RESULTTTTT');

      if (response.ok) {
        handleSubmit(result?.data);
        // Alert.alert('Order created successfully');
        // navigation.goBack();
      } else {
        console.log(result);
        Alert.alert(result?.message);
      }
    } catch (error) {
      console.error(error);

      Alert.alert('Something went wrong');
    } finally {
      setCreatingOrder(false);
    }
  };

  useEffect(() => {
    if (isFocus) {
      fetchShippingCharges();
    }
  }, [isFocus]);

  const handleSubmit = async dataValue => {



    console.log("J-HI")
    const formData = new FormData();
    formData.append('partner_name', 'Xpressbees');
    formData.append('amount', orderList?.price);
    formData.append('awb_number', dataValue?.awb_number); // fixing overwritten key
    formData.append('order_id', orderList?.id);
    console.log('Submitting:', data);

    const response = await postRequest(
      '/api/update-order-details',
      formData,
      true,
    );
    console.log(response, 'RESPPP_OF__SAVE');

    if (response?.success) {
      Alert.alert('Order created successfully');
      navigation.goBack();
    } else {
      console.log(response, 'Submission Error');
      Alert.alert('Error', response?.error || 'Submission failed');
    }
  };
  return (
    <View style={styles.container}>
      <Header
        title={'Ship Now'}
        showBack
        onBackPress={() => {
          navigation.goBack();
        }}
      />
      {loading ? (
        <ActivityIndicator size="large" color={COLOR.primary} />
      ) : (
        <View style={styles.card}>
          <Text style={styles.provider}>Xpressbees</Text>
          <Text style={styles.amount}>Shipping Charge: ₹ {shippingCharge}</Text>

          <TouchableOpacity
            style={styles.button}
            disabled={creatingOrder}
            onPress={createShipmentOrder}>
            <Text style={styles.buttonText}>
              {creatingOrder ? 'Creating...' : 'Ship Now'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ShipNow;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
    // justifyContent: 'center',
    // padding: 20,
  },
  card: {
    backgroundColor: '#f5fafd',
    padding: 20,
    margin: 20,
    borderRadius: 10,
    elevation: 5,
    alignItems: 'center',
  },
  provider: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  amount: {
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#00BCD4',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
