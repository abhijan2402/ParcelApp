import React, {useState} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {COLOR} from '../../Constants/Colors';
import Header from '../../Components/FeedHeader';
import Input from '../../Components/Input';
import CustomButton from '../../Components/CustomButton';

const WeightDiscrepency = () => {
  const [amount, setAmount] = useState('');

  // Example shipment details (replace with actual data)
  const shipmentDetails = {
    trackingId: 'TRK123456789',
    origin: 'New York, USA',
    destination: 'Los Angeles, USA',
    expectedWeight: '25 kg',
    actualWeight: '27.5 kg',
    discrepancy: '2.5 kg',
    reason: 'Packaging difference',
  };

  return (
    <View style={styles.container}>
      <Header title={'Weight Discrepancy'} showBack />

      <ScrollView
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled">
        <View style={styles.detailsBox}>
          <Text style={styles.detailsTitle}>Shipment Details</Text>

          <View style={styles.detailRow}>
            <Text style={styles.label}>Tracking ID:</Text>
            <Text style={styles.value}>{shipmentDetails.trackingId}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.label}>Origin:</Text>
            <Text style={styles.value}>{shipmentDetails.origin}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.label}>Destination:</Text>
            <Text style={styles.value}>{shipmentDetails.destination}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.label}>Expected Weight:</Text>
            <Text style={styles.value}>{shipmentDetails.expectedWeight}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.label}>Actual Weight:</Text>
            <Text style={styles.value}>{shipmentDetails.actualWeight}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.label}>Discrepancy:</Text>
            <Text style={styles.value}>{shipmentDetails.discrepancy}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.label}>Reason:</Text>
            <Text style={styles.value}>{shipmentDetails.reason}</Text>
          </View>
        </View>

        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Enter Discrepancy Amount</Text>
          <Input
            placeholder={'Enter Amount'}
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
            style={styles.input}
          />
        </View>

        <CustomButton title={'Submit Discrepancy'} style={styles.button} />
      </ScrollView>
    </View>
  );
};

export default WeightDiscrepency;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  contentContainer: {
    padding: 16,
  },
  detailsBox: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: {width: 0, height: 3},
    shadowRadius: 8,
    elevation: 3,
  },
  detailsTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 15,
    color: '#222',
    textAlign: 'center',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  label: {
    color: '#555',
    fontWeight: '600',
    fontSize: 14,
  },
  value: {
    color: '#222',
    fontWeight: '500',
    fontSize: 14,
  },
  inputSection: {
    marginBottom: 20,
  },
  inputLabel: {
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 8,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 45,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    marginTop: 10,
  },
});
