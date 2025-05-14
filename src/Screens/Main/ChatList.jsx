import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Header from '../../Components/FeedHeader';
import {COLOR} from '../../Constants/Colors';

// Fake chat data
const chatData = [
  {
    id: '1',
    name: 'Alice Johnson',
    lastMessage: 'Hey, how are you?',
    time: '10:24 AM',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
  },
  {
    id: '2',
    name: 'Bob Smith',
    lastMessage: 'Let’s meet tomorrow.',
    time: '9:45 AM',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
  },
  {
    id: '3',
    name: 'Clara Lee',
    lastMessage: 'Thanks for the update!',
    time: 'Yesterday',
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
  },
  {
    id: '4',
    name: 'David Park',
    lastMessage: 'See you soon!',
    time: 'Mon',
    avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
  },
  {
    id: '5',
    name: 'Eva Adams',
    lastMessage: 'Got it. Thanks!',
    time: '8:10 AM',
    avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
  },
  {
    id: '6',
    name: 'Franklin Torres',
    lastMessage: 'Let me check and get back.',
    time: 'Sun',
    avatar: 'https://randomuser.me/api/portraits/men/6.jpg',
  },
  {
    id: '7',
    name: 'Grace Kim',
    lastMessage: 'Awesome idea!',
    time: '7:00 AM',
    avatar: 'https://randomuser.me/api/portraits/women/7.jpg',
  },
  {
    id: '8',
    name: 'Harry James',
    lastMessage: 'Done with the changes.',
    time: 'Yesterday',
    avatar: 'https://randomuser.me/api/portraits/men/8.jpg',
  },
  {
    id: '9',
    name: 'Isla Morgan',
    lastMessage: 'Let’s talk in 5 mins.',
    time: '11:15 AM',
    avatar: 'https://randomuser.me/api/portraits/women/9.jpg',
  },
  {
    id: '10',
    name: 'Jack Wilson',
    lastMessage: 'No problem!',
    time: 'Tue',
    avatar: 'https://randomuser.me/api/portraits/men/10.jpg',
  },
  {
    id: '11',
    name: 'Kara Bell',
    lastMessage: 'See you at the event.',
    time: 'Sat',
    avatar: 'https://randomuser.me/api/portraits/women/11.jpg',
  },
  {
    id: '12',
    name: 'Liam Scott',
    lastMessage: 'I’ll send it now.',
    time: '12:32 PM',
    avatar: 'https://randomuser.me/api/portraits/men/12.jpg',
  },
  {
    id: '13',
    name: 'Mia Davis',
    lastMessage: 'Where are you?',
    time: '9:00 AM',
    avatar: 'https://randomuser.me/api/portraits/women/13.jpg',
  },
  {
    id: '14',
    name: 'Noah Brown',
    lastMessage: 'Happy Birthday!',
    time: 'Fri',
    avatar: 'https://randomuser.me/api/portraits/men/14.jpg',
  },
  {
    id: '15',
    name: 'Olivia Green',
    lastMessage: 'It’s confirmed!',
    time: 'Wed',
    avatar: 'https://randomuser.me/api/portraits/women/15.jpg',
  },
  {
    id: '16',
    name: 'Paul Harris',
    lastMessage: 'Call me when free.',
    time: '3:45 PM',
    avatar: 'https://randomuser.me/api/portraits/men/16.jpg',
  },
  {
    id: '17',
    name: 'Quinn Roberts',
    lastMessage: 'Looks great!',
    time: 'Sun',
    avatar: 'https://randomuser.me/api/portraits/women/17.jpg',
  },
  {
    id: '18',
    name: 'Ryan Thompson',
    lastMessage: 'Can we reschedule?',
    time: 'Yesterday',
    avatar: 'https://randomuser.me/api/portraits/men/18.jpg',
  },
  {
    id: '19',
    name: 'Sophia White',
    lastMessage: 'Sure, no worries.',
    time: '1:20 PM',
    avatar: 'https://randomuser.me/api/portraits/women/19.jpg',
  },
  {
    id: '20',
    name: 'Tom Walker',
    lastMessage: 'I’m on it!',
    time: '6:50 AM',
    avatar: 'https://randomuser.me/api/portraits/men/20.jpg',
  },
];

const ChatList = ({navigation}) => {
  const renderItem = ({item}) => (
    <TouchableOpacity style={styles.chatItem}>
      <Image source={{uri: item.avatar}} style={styles.avatar} />
      <View style={styles.chatInfo}>
        <View style={styles.nameTimeRow}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
        <Text style={styles.lastMessage} numberOfLines={1}>
          {item.lastMessage}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header title={'Chats'} onBackPress={() => navigation.goBack()} />
      <FlatList
        data={chatData}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{padding: 16}}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

export default ChatList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.3,
    borderBottomColor: COLOR.lightGrey,
    paddingVertical: 7,
    // paddingBottom: 5,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 8,
    marginRight: 12,
  },
  chatInfo: {
    flex: 1,
    borderBottomColor: '#eee',
  },
  nameTimeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLOR.black,
  },
  time: {
    fontSize: 12,
    color: COLOR.grey,
  },
  lastMessage: {
    fontSize: 14,
    color: '#666',
  },
  separator: {
    // height: 16,
  },
});
