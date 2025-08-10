import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../Components/FeedHeader';
import {windowHeight} from '../../Constants/Dimensions';
import {COLOR} from '../../Constants/Colors';
import CustomButton from '../../Components/CustomButton';
import {useApi} from '../../Backend/Apis';
import {useIsFocused} from '@react-navigation/native';

const HelpDesk = ({navigation}) => {
  const {getRequest} = useApi();
  const isFocus = useIsFocused();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTickets = async () => {
    setLoading(true);
    const response = await getRequest('/api/help-desk-list');
    if (response?.success) {
      console.log(response.data, 'DATATTATAT');

      setTickets(response.data?.data || []);
    } else {
      console.log('Error fetching help desk list:', response?.error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isFocus) {
      fetchTickets();
    }
  }, [isFocus]);

  const renderTicket = ({item}) => (
    <View style={styles.ticketCard}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <View style={styles.metaRow}>
        <Text style={styles.date}>
          Created: {item.created_at || item.createdAt}
        </Text>
        <Text style={[styles.status, getStatusStyle(item.status)]}>
          {item.status}
        </Text>
      </View>
    </View>
  );

  const getStatusStyle = status => {
    switch (status?.toLowerCase()) {
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
      <Header
        showBack
        title={'Help Desk'}
        onBackPress={() => {
          navigation.goBack();
        }}
      />

      {loading ? (
        <ActivityIndicator
          size="large"
          color={COLOR.primary}
          style={{marginTop: 40}}
        />
      ) : tickets.length === 0 ? (
        <Text style={{textAlign: 'center', marginTop: 40, color: '#666'}}>
          No queries found.
        </Text>
      ) : (
        <FlatList
          data={tickets}
          keyExtractor={item => item.id?.toString()}
          renderItem={renderTicket}
          contentContainerStyle={styles.listContainer}
        />
      )}

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
    paddingBottom: 100,
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
