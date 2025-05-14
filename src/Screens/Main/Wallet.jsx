import {StyleSheet, Text, View, FlatList} from 'react-native';
import React from 'react';
import {windowHeight} from '../../Constants/Dimensions';
import {COLOR} from '../../Constants/Colors';
import Header from '../../Components/FeedHeader';

// Sample Transactions Data
const transactions = [
  {
    id: '1',
    type: 'credit',
    amount: 1500,
    title: 'Refund Received',
    description: 'Your payment of ₹1500 was refunded by Ekart',
  },
  {
    id: '2',
    type: 'debit',
    amount: 500,
    title: 'Payment Sent',
    description: 'Your payment of ₹500 was paid to Ekart',
  },
  {
    id: '3',
    type: 'credit',
    amount: 1000,
    title: 'Cashback Credited',
    description: 'You received ₹1000 cashback from offer',
  },
  {
    id: '4',
    type: 'debit',
    amount: 700,
    title: 'Subscription Charge',
    description: 'You paid ₹700 for monthly subscription',
  },
];

// Icon helper
const getIcon = type => (type === 'credit' ? '💰' : '💸');

const Wallet = ({navigation}) => {
  const renderItem = ({item}) => (
    <View style={styles.transactionItem}>
      <Text style={styles.icon}>{getIcon(item.type)}</Text>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
      <Text
        style={
          item.type === 'credit' ? styles.creditAmount : styles.debitAmount
        }>
        {item.type === 'credit' ? '+' : '-'} ₹{item.amount}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header
        showBack
        onBackPress={() => navigation.goBack()}
        title={'Wallet'}
      />
      <FlatList
        contentContainerStyle={styles.list}
        data={transactions}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No transactions found</Text>
        }
      />
    </View>
  );
};

export default Wallet;

const styles = StyleSheet.create({
  container: {
    height: windowHeight,
    backgroundColor: COLOR.white,
  },
  list: {
    padding: 16,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: COLOR.lightGray || '#f2f2f2',
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
  },
  icon: {
    fontSize: 24,
    marginRight: 12,
    marginTop: 4,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLOR.black || '#000',
  },
  description: {
    fontSize: 12,
    color: COLOR.darkGray || '#555',
    marginTop: 1,
  },
  creditAmount: {
    fontSize: 14,
    color: 'green',
    fontWeight: 'bold',
  },
  debitAmount: {
    fontSize: 16,
    color: 'red',
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: COLOR.gray || '#777',
  },
});
