import {StyleSheet} from 'react-native';
import React, {useContext} from 'react';
import AuthStack from './AuthNavigation';
import BottomNavigation from './BottomNavigation';
import {AuthContext} from '../Backend/AuthContent';
import RootNavigation from './RootNavigation';

const MainNavigation = () => {
  const {user} = useContext(AuthContext);
  console.log(user, 'USERRRRR');

  return user ? <RootNavigation /> : <AuthStack />;
};

export default MainNavigation;

const styles = StyleSheet.create({});
