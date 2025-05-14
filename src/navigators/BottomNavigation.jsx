import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, View} from 'react-native';
import Home from '../Screens/Main/Home';
import AccountPage from '../Screens/Main/Account';
import Notification from '../Screens/Main/Notification';
import Shipping from '../Screens/Main/Shipping';
import {COLOR} from '../Constants/Colors';

const Tab = createBottomTabNavigator();

// Local image assets
const icons = {
  home: 'https://cdn-icons-png.flaticon.com/128/1946/1946488.png',
  // add: 'https://cdn-icons-png.flaticon.com/128/18779/18779614.png',
  add: 'https://cdn-icons-png.flaticon.com/128/3131/3131446.png',
  profile: 'https://cdn-icons-png.flaticon.com/128/456/456283.png',
  chat: 'https://cdn-icons-png.flaticon.com/128/9446/9446874.png',
  explore: 'https://cdn-icons-png.flaticon.com/128/4229/4229877.png',
  Notification: 'https://cdn-icons-png.flaticon.com/128/2645/2645897.png',
  shipping: 'https://cdn-icons-png.flaticon.com/128/411/411763.png',
};

const BottomNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color}) => {
          let iconSource;

          if (route.name === 'Home') {
            iconSource = icons.home;
          } else if (route.name === 'Feed') {
            iconSource = icons.add;
          } else if (route.name === 'Profile') {
            iconSource = icons.profile;
          } else if (route.name === 'Chat') {
            iconSource = icons.chat;
          } else if (route.name === 'Notification') {
            iconSource = icons.Notification;
          } else if (route.name === 'Explore') {
            iconSource = icons.explore;
          } else if (route.name === 'Shipping') {
            iconSource = icons.shipping;
          }

          return (
            <Image
              source={{uri: iconSource}}
              style={{
                width:
                  route.name == 'Feed'
                    ? 25
                    : route.name == 'Chat'
                    ? 25
                    : route.name == 'Shipping'
                    ? 28
                    : 22,
                height:
                  route.name == 'Feed'
                    ? 25
                    : route.name == 'Chat'
                    ? 25
                    : route.name == 'Shipping'
                    ? 28
                    : 22,
                marginBottom: route.name == 'Feed' ? 0 : 0,
                tintColor:
                  // route.name == 'Feed'
                  //   ? null
                  //   :
                  focused ? COLOR.royalBlue : 'gray',
              }}
              resizeMode="contain"
            />
          );
        },
        tabBarActiveTintColor: COLOR.royalBlue,
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}>
      <Tab.Screen name="Home" component={Home} />
      {/* <Tab.Screen name="Shipping" component={Feed} /> */}
      <Tab.Screen name="Notification" component={Notification} />
      <Tab.Screen name="Shipping" component={Shipping} />
      <Tab.Screen name="Profile" component={AccountPage} />
    </Tab.Navigator>
  );
};

export default BottomNavigation;
