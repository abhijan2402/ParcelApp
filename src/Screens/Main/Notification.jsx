import React from 'react';
import {StyleSheet, Text, View, FlatList, Image} from 'react-native';
import Header from '../../Components/FeedHeader';
import {windowHeight} from '../../Constants/Dimensions';
import {COLOR} from '../../Constants/Colors';

const dummyNotifications = [
  {
    id: '1',
    title: 'Order Shipped',
    description: 'Your order #12345 has been shipped.',
    time: '2025-05-13 10:00 AM',
    image: 'https://cdn-icons-png.flaticon.com/512/891/891419.png',
  },
  {
    id: '2',
    title: 'Payment Received',
    description: 'Payment of $120 received successfully.',
    time: '2025-05-12 3:45 PM',
    image: 'https://cdn-icons-png.flaticon.com/512/190/190411.png',
  },
  {
    id: '3',
    title: 'Order Delivered',
    description: 'Your package was delivered today.',
    time: '2025-05-11 5:30 PM',
    image: 'https://cdn-icons-png.flaticon.com/512/833/833524.png',
  },
  {
    id: '4',
    title: 'New Message',
    description: 'You have a new message from support.',
    time: '2025-05-10 8:15 AM',
    image: 'https://cdn-icons-png.flaticon.com/512/2462/2462719.png',
  },
];

const Notification = () => {
  return (
    <View style={styles.container}>
      <Header title={'Notification'} />
      <FlatList
        data={dummyNotifications}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({item}) => (
          <View style={styles.notificationCard}>
            <Image
              resizeMode="cover"
              source={{uri: item.image}}
              style={styles.image}
            />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.time}>{item.time}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    height: windowHeight,
    backgroundColor: COLOR.white,
  },
  listContainer: {
    padding: 16,
  },
  notificationCard: {
    flexDirection: 'row',
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: {width: 0, height: 2},
  },
  image: {
    width: 40,
    height: 40,
    marginRight: 12,
    borderRadius: 8,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 2,
  },
  description: {
    fontSize: 11,
    color: '#555',
    marginBottom: 2,
  },
  time: {
    fontSize: 10,
    color: '#888',
  },
});
