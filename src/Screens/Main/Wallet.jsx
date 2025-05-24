import {StyleSheet, Text, View, FlatList} from 'react-native';
import React from 'react';
import {COLOR} from '../../Constants/Colors';
import Header from '../../Components/FeedHeader';

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
    flex: 1,
    backgroundColor: COLOR.white,
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
});
