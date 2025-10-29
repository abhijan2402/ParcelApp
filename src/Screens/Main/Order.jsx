import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
  Linking,
  Share,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {windowHeight, windowWidth} from '../../Constants/Dimensions';
import Header from '../../Components/FeedHeader';
import {useApi} from '../../Backend/Apis';
import {COLOR} from '../../Constants/Colors';
import CustomButton from '../../Components/CustomButton';

const Order = ({navigation}) => {
  const {getRequest, postRequest} = useApi();

  const printIcon = 'https://img.icons8.com/ios-filled/50/000000/print.png';
  const shareIcon = 'https://img.icons8.com/ios-filled/50/000000/share.png';
  const trackIcon = 'https://img.icons8.com/ios-filled/50/000000/marker.png';
  const createIcon = 'https://cdn-icons-png.flaticon.com/128/4074/4074958.png';
  const dispatch = 'https://cdn-icons-png.flaticon.com/128/18864/18864244.png';

  const [orderList, setOrderList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [printing, setPrinting] = useState(false); // for label generation

  const getOrderList = async () => {
    setLoading(true);
    try {
      const response = await getRequest('/api/order-list/', true);
      console.log('Order List Response:', response?.data?.data);

      if (response?.success) {
        setOrderList(response?.data?.data);
      } else {
        Alert.alert('Error', response?.error || 'Failed to fetch orders');
      }
    } catch (error) {
      console.error('Order List Fetch Error:', error);
      Alert.alert('Error', 'Network error while fetching orders');
    } finally {
      setLoading(false);
    }
  };

  const generateLabel = async (orderId, type) => {
    setPrinting(true);
    try {
      const response = await getRequest(
        `/api/generate-label?order_id=${orderId}`,
      );
      console.log('Label Response:', response?.data?.pdf_url);

      if (response?.success) {
        const pdfUrl = response?.data?.pdf_url;

        if (type === 'download') {
          Linking.openURL(pdfUrl);
        } else {
          await Share.share({
            message: `Please download the shipment Label: ${pdfUrl}`,
            url: pdfUrl, // iOS uses this if available
            title: 'Share Label PDF',
          });
        }
      } else {
        Alert.alert('Error', response?.message || 'Failed to generate label');
      }
    } catch (error) {
      console.error('Label Generation Error:', error);
      Alert.alert('Error', 'Failed to generate label. Please try again.');
    } finally {
      setPrinting(false);
    }
  };

  useEffect(() => {
    getOrderList();
  }, []);

  return (
    <View style={{flex: 1}}>
      <Header
        showBack
        title={'Order List'}
        onBackPress={() => {
          navigation.goBack();
        }}
      />
      <LinearGradient colors={['#c8fcc0', '#e6fffc']} style={styles.LinearBox}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {loading ? (
            <ActivityIndicator size={22} color={COLOR.blue} />
          ) : orderList.length > 0 ? (
            orderList.map((order, index) => (
              <LinearGradient
                key={order.id?.toString() || index.toString()}
                colors={['#f2fce3', '#ebfffb']}
                style={styles.card}>
                <InfoRow
                  label="Order Date"
                  value={new Date(order.created_at).toDateString()}
                />
                <InfoRow label="Order ID" value={`ORDER_${order.id}`} />
                <InfoRow label="Product Details" value={order.product_name} />
                <InfoRow label="Payment Method" value={order.payment_method} />
                <InfoRow label="Amount Paid" value={`Rs ${order.price}`} />
                <InfoRow
                  label="Pickup Location"
                  value={order.pickup_location || 'N/A'}
                />
                <InfoRow
                  label="Customer Name"
                  value={
                    `${order.customer_first_name} ${order?.customer_last_name}` ||
                    'N/A'
                  }
                />
                <InfoRow
                  label="Drop Location"
                  value={order.customer_address || 'N/A'}
                />
                <InfoRow
                  label="Order Status"
                  value={order?.order_status}
                  status
                />
                <CustomButton
                  title={'Ship Now'}
                  onPress={() =>
                    navigation.navigate('ShipNow', {orderList: order})
                  }
                />
                {/* {order?.order_status != 'pending' && ( */}
                <View style={styles.actionRow}>
                  <ActionButton
                    icon={printIcon}
                    label={printing ? 'Printing...' : 'Print Label'}
                    onPress={() => generateLabel(order.id, 'download')}
                    disabled={printing}
                  />
                  <ActionButton
                    icon={shareIcon}
                    label="Share Label"
                    onPress={() => generateLabel(order.id, 'share')}
                  />
                  <ActionButton
                    icon={trackIcon}
                    label="Track Order"
                    onPress={() => {
                      navigation.navigate('TrackByAwb', {
                        AWB: '14344943092017',
                      });
                    }}
                  />
                  {/* <ActionButton
                    icon={dispatch}
                    label="Ship now"
                    onPress={() => {
                      navigation.navigate('ShipNow', {orderList: order});
                    }}
                  /> */}
                  <ActionButton
                    icon={createIcon}
                    label="Create new"
                    onPress={() => {
                      navigation.navigate('CreateOrder');
                    }}
                  />
                </View>
                {/* )} */}
              </LinearGradient>
            ))
          ) : (
            <View style={{alignItems: 'center', marginTop: 50}}>
              <Text style={{fontSize: 16, color: 'gray'}}>
                No orders available.
              </Text>
            </View>
          )}
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

const InfoRow = ({label, value, status}) => (
  <View style={styles.infoRow}>
    <Text style={styles.label}>{label}</Text>
    <Text
      style={[
        styles.value,
        status && styles.statusValue,
        {textTransform: 'capitalize'},
      ]}>
      {value}
    </Text>{' '}
  </View>
);

const ActionButton = ({icon, label, onPress, disabled}) => (
  <TouchableOpacity
    style={[styles.actionButton, disabled && {opacity: 0.5}]}
    onPress={onPress}
    disabled={disabled}>
    <Image source={{uri: icon}} style={styles.actionIcon} />
    <Text style={styles.actionText}>{label}</Text>
  </TouchableOpacity>
);

export default Order;

const styles = StyleSheet.create({
  LinearBox: {
    width: windowWidth,
    height: windowHeight / 1.2,
  },
  scrollContent: {
    padding: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: {width: 0, height: 3},
    marginBottom: 10,
  },
  infoRow: {
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
    width: 130,
  },
  value: {
    fontSize: 16,
    color: '#222',
    fontWeight: '500',
    width: '55%',
    textAlign: 'right',
    marginRight: 5,
  },
  statusValue: {
    color: '#1f8c1f',
    fontWeight: 'bold',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 5,
    borderTopWidth: 1,
    borderTopColor: 'red',
    paddingTop: 10,
  },
  actionButton: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
    width: '17%',
  },
  actionIcon: {
    width: 24,
    height: 24,
    marginBottom: 4,
    tintColor: '#333',
  },
  actionText: {
    fontSize: 10,
    color: '#333',
    textAlign: 'center',
  },
});
