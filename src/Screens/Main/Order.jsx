import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {windowHeight, windowWidth} from '../../Constants/Dimensions';
import Header from '../../Components/FeedHeader';

const Order = () => {
  const printIcon = 'https://img.icons8.com/ios-filled/50/000000/print.png';
  const shareIcon = 'https://img.icons8.com/ios-filled/50/000000/share.png';
  const trackIcon = 'https://img.icons8.com/ios-filled/50/000000/marker.png';
  const createIcon = 'https://cdn-icons-png.flaticon.com/128/4074/4074958.png';
  const dispatch = 'https://cdn-icons-png.flaticon.com/128/18864/18864244.png';
  return (
    <View style={{flex: 1}}>
      <Header showBack title={'Order List'} />
      <LinearGradient colors={['#c8fcc0', '#e6fffc']} style={styles.LinearBox}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {[1, 2, 3]?.map((i, index) => (
            <LinearGradient colors={['#f2fce3', '#ebfffb']} style={styles.card}>
              <InfoRow label="Order Date" value="17 May 2025" />
              <InfoRow label="Order ID" value="MY_BHB_466546484" />
              <InfoRow label="Product Details" value="Product sdhbsdb cxhb" />
              <InfoRow label="Payment Method" value="Prepaid" />
              <InfoRow label="Amount Paid" value="Rs 2000" />
              <InfoRow label="Pickup Location" value="ABC" />
              <InfoRow label="Order Status" value="Shipped" status />
              <View style={styles.actionRow}>
                <ActionButton
                  icon={printIcon}
                  label="Print Label"
                  onPress={() => {}}
                />
                <ActionButton
                  icon={shareIcon}
                  label="Share Label"
                  onPress={() => {}}
                />
                <ActionButton
                  icon={trackIcon}
                  label="Track Order"
                  onPress={() => {}}
                />
                <ActionButton
                  icon={dispatch}
                  label="Ship now"
                  onPress={() => {}}
                />
                <ActionButton
                  icon={createIcon}
                  label="Create new"
                  onPress={() => {}}
                />
              </View>
              {/* <View style={[styles.actionRow, {borderTopWidth: 0}]}>
                <ActionButton
                  icon={dispatch}
                  label="Ship now"
                  onPress={() => {}}
                />
                <ActionButton
                  icon={createIcon}
                  label="Create new"
                  onPress={() => {}}
                />
              </View> */}
            </LinearGradient>
          ))}
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

const InfoRow = ({label, value, status}) => (
  <View style={styles.infoRow}>
    <Text style={styles.label}>{label}</Text>
    <Text style={[styles.value, status && styles.statusValue]}>{value}</Text>
  </View>
);

const ActionButton = ({icon, label, onPress}) => (
  <TouchableOpacity style={styles.actionButton} onPress={onPress}>
    <Image source={{uri: icon}} style={styles.actionIcon} />
    <Text style={styles.actionText}>{label}</Text>
  </TouchableOpacity>
);
export default Order;

const styles = StyleSheet.create({
  LinearBox: {
    width: windowWidth,
    height: windowHeight,
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
