import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Alert,
  TextInput,
  TouchableOpacity,
  Modal,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {COLOR} from '../../Constants/Colors';
import Header from '../../Components/FeedHeader';
import {useApi} from '../../Backend/Apis';
import RazorpayCheckout from 'react-native-razorpay';
import {Buffer} from 'buffer';
import {AuthContext} from '../../Backend/AuthContent';

// Sample Transactions Data
const transactions = [
  {
    id: '1',
    transactionNumber: 'TXN123456',
    date: '2025-05-17',
    type: 'credit',
    amount: 1500,
    title: 'Refund Received',
    description: 'Your payment of ₹1500 was refunded by Ekart',
    openingBalance: 5000,
    closingBalance: 6500,
  },
  {
    id: '2',
    transactionNumber: 'TXN123457',
    date: '2025-05-16',
    type: 'debit',
    amount: 500,
    title: 'Payment Sent',
    description: 'Your payment of ₹500 was paid to Ekart',
    openingBalance: 6500,
    closingBalance: 6000,
  },
];

const getIcon = type => (type === 'credit' ? '⬆️' : '⬇️');

const Wallet = ({navigation}) => {
  const {user} = useContext(AuthContext);
  console.log(user);
  const {postRequest} = useApi();
  const [amount, setAmount] = useState('');
  const [walletTotal, setWalletTotal] = useState(user?.userDetails?.wallet);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [tempAmount, setTempAmount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const renderItem = ({item}) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.icon}>{getIcon(item.type)}</Text>
        <View style={styles.headerText}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.date}>{item.date}</Text>
        </View>
        <Text
          style={[
            styles.amount,
            item.type === 'credit' ? styles.credit : styles.debit,
          ]}>
          {item.type === 'credit' ? '+' : '-'} ₹{item.amount}
        </Text>
      </View>

      <Text style={styles.description}>{item.description}</Text>

      <View style={styles.metaContainer}>
        <View style={styles.metaRow}>
          <Text style={styles.metaLabel}>Transaction No:</Text>
          <Text style={styles.metaValue}>{item.transactionNumber}</Text>
        </View>
        <View style={styles.metaRow}>
          <Text style={styles.metaLabel}>Opening Balance:</Text>
          <Text style={styles.metaValue}>₹{item.openingBalance}</Text>
        </View>
        <View style={styles.metaRow}>
          <Text style={styles.metaLabel}>Closing Balance:</Text>
          <Text style={styles.metaValue}>₹{item.closingBalance}</Text>
        </View>
      </View>
    </View>
  );

  const triggerPayment = () => {
    const amt = parseInt(amount);
    if (isNaN(amt) || amt < 100) {
      Alert.alert('Invalid Amount', 'Minimum amount should be ₹100');
      return;
    }

    setTempAmount(amt);
    setConfirmVisible(true);
  };

  const createRazorpayOrder = async amount => {
    const keyId = 'rzp_test_3zq15OVNfzMTlW';
    const keySecret = '8Ifmrjd7tlmrPE58ngNd4C26'; // ⚠️ DANGEROUS TO PUT THIS HERE
    const base64 = Buffer.from(`${keyId}:${keySecret}`).toString('base64');

    const payload = {
      amount: amount * 100, // Razorpay needs amount in paise
      currency: 'INR',
      receipt: 'receipt_' + Date.now(),
      payment_capture: 1,
    };

    try {
      const response = await fetch('https://api.razorpay.com/v1/orders', {
        method: 'POST',
        headers: {
          Authorization: `Basic ${base64}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log('Order Created:', data);
      return data; // contains order_id, etc.
    } catch (error) {
      console.error('Error creating Razorpay order:', error);
      return null;
    }
  };

  const handleRazorpay = async amount => {
    const order = await createRazorpayOrder(amount);
    console.log(order);
    if (!order?.id) {
      Alert.alert('Error', 'Could not create Razorpay order');
      return;
    }

    const options = {
      description: 'Add Wallet Money',
      currency: 'INR',
      key: 'rzp_test_3zq15OVNfzMTlW', // ✅ Public key
      amount: order.amount,
      order_id: order.id, // ✅ Required for signature
      name: 'Dear Express',
      prefill: {
        email: 'test@example.com',
        contact: '9876543210',
        name: 'Test User',
      },
      theme: {color: '#53a20e'},
    };

    RazorpayCheckout.open(options)
      .then(data => {
        console.log('Payment Success:', data);
        handleVerifyAndAdd(order.amount, data);
      })
      .catch(error => {
        console.log('Payment Failed:', error);
        Alert.alert('Payment Failed', error.description);
      });
  };

  const handleVerifyAndAdd = async (amount, data) => {
    setIsProcessing(true);
    console.log(data);
    const formData = new FormData();
    formData.append('amount', String(amount));
    formData.append('razorpay_payment_id', data.razorpay_payment_id);
    formData.append('razorpay_order_id', data.razorpay_order_id);
    formData.append('razorpay_signature', data.razorpay_signature);

    // Step 1: Verify Razorpay payment on your server
    const verifyRes = await postRequest('/api/verify-payment', formData, true);
    console.log('Verify Response:', verifyRes);

    if (!verifyRes.success) {
      Alert.alert(
        'Verification Failed',
        verifyRes.error || 'Unable to verify payment.',
      );
      setIsProcessing(false);
      return;
    }

    // Step 2: Add money after verification
    const addMoneyForm = new FormData();
    addMoneyForm.append('amount', String(amount));
    const addMoneyRes = await postRequest('/api/add-money', addMoneyForm, true);
    console.log('Add Money Response:', addMoneyRes);

    if (addMoneyRes.success) {
      Alert.alert('Success', 'Money added to your wallet!');
      setAmount('');
    } else {
      Alert.alert('Error', addMoneyRes.error || 'Failed to add money');
    }

    setIsProcessing(false);
  };

  return (
    <View style={styles.container}>
      <Header
        showBack
        onBackPress={() => navigation.goBack()}
        title={'Wallet'}
      />

      {/* <View style={styles.walletBox}>
        <Text style={styles.totalLabel}>Total Wallet Balance</Text>
        <Text style={styles.totalAmount}>₹{walletTotal}</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter amount (Min ₹100)"
          value={amount}
          onChangeText={setAmount}
          keyboardType="number-pad"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={triggerPayment}
          disabled={isProcessing}>
          <Text style={styles.buttonText}>
            {isProcessing ? 'Processing...' : 'Add Money'}
          </Text>
        </TouchableOpacity>
      </View> */}

      <FlatList
        contentContainerStyle={styles.list}
        data={transactions}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No transactions found</Text>
        }
      />

      <Modal
        animationType="fade"
        transparent={true}
        visible={confirmVisible}
        onRequestClose={() => setConfirmVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Confirm Payment</Text>
            <Text style={styles.modalMessage}>
              Are you sure you want to add ₹{tempAmount} to your wallet?
            </Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.mbutton, styles.cancelButton]}
                onPress={() => setConfirmVisible(false)}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.mbutton, styles.proceedButton]}
                disabled={isProcessing}
                onPress={() => {
                  setConfirmVisible(false);
                  handleRazorpay(tempAmount);
                  // handleVerifyAndAdd();
                }}>
                <Text style={styles.proceedText}>
                  {isProcessing ? 'Processing...' : 'Proceed'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Wallet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  walletBox: {
    backgroundColor: '#eef8f2',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    elevation: 3,
  },
  totalLabel: {
    fontSize: 12,
    color: '#444',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 4,
    color: '#008000',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginTop: 12,
    fontSize: 14,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#53a20e',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: COLOR.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  list: {
    padding: 16,
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    fontSize: 24,
    marginRight: 12,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: COLOR.black || '#000',
  },
  date: {
    fontSize: 12,
    color: COLOR.gray || '#888',
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  credit: {
    color: 'green',
  },
  debit: {
    color: 'red',
  },
  description: {
    fontSize: 13,
    color: COLOR.darkGray || '#555',
    marginBottom: 10,
  },
  metaContainer: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 8,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  metaLabel: {
    fontSize: 12,
    color: '#555',
  },
  metaValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 14,
    color: COLOR.gray || '#777',
  },

  // -----------Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: 14,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mbutton: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#ddd',
  },
  proceedButton: {
    backgroundColor: '#4CAF50',
  },
  cancelText: {
    color: '#000',
  },
  proceedText: {
    color: '#fff',
    fontWeight: '600',
  },
});
