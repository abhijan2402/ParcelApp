import {StyleSheet, Text, View, FlatList} from 'react-native';
import React from 'react';
import Header from '../../Components/FeedHeader';
import {windowHeight} from '../../Constants/Dimensions';
import {COLOR} from '../../Constants/Colors';
import CustomButton from '../../Components/CustomButton';

const mockTickets = [
  {
    id: '1',
    title: 'Unable to login',
    description: 'I cannot log in with my email and password.',
    createdAt: '2025-05-10',
    status: 'Open',
  },
  {
    id: '2',
    title: 'Payment not processed',
    description: 'Paid for subscription but it’s not active.',
    createdAt: '2025-05-08',
    status: 'Pending',
  },
  {
    id: '3',
    title: 'App crashes',
    description: 'The app crashes on the profile page.',
    createdAt: '2025-05-05',
    status: 'Resolved',
  },
];

const HelpDesk = ({navigation}) => {
  const renderTicket = ({item}) => (
    <View style={styles.ticketCard}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <View style={styles.metaRow}>
        <Text style={styles.date}>Created: {item.createdAt}</Text>
        <Text style={[styles.status, getStatusStyle(item.status)]}>
          {item.status}
        </Text>
      </View>
    </View>
  );

  const getStatusStyle = status => {
    switch (status.toLowerCase()) {
      case 'open':
        return {color: 'green'};
      case 'pending':
        return {color: 'orange'};
      case 'resolved':
        return {color: 'gray'};
      default:
        return {color: 'black'};
    }
  };

  return (
    <View style={styles.container}>
      <Header showBack title={'Help Desk'} />
      <FlatList
        data={mockTickets}
        keyExtractor={item => item.id}
        renderItem={renderTicket}
        contentContainerStyle={styles.listContainer}
      />
      <CustomButton
        onPress={() => {
          navigation.navigate('CreateQuery');
        }}
        title={'Ask Query'}
        style={{bottom: 40}}
      />
    </View>
  );
};

export default HelpDesk;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: windowHeight,
    backgroundColor: COLOR.white,
  },
  listContainer: {
    padding: 16,
  },
  ticketCard: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    marginBottom: 10,
    color: '#555',
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  date: {
    fontSize: 12,
    color: '#888',
  },
  status: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});
