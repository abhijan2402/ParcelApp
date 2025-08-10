import React, {useEffect} from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import MainNavigation from './src/navigators/MainNavigation';
import {AuthProvider} from './src/Backend/AuthContent';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const App = () => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '323504085763-n4m228lcfvinptlniphmsejt0r04jabo.apps.googleusercontent.com', // from Firebase project settings (OAuth 2.0 client ID)
    });
  }, []);

  return (
    <AuthProvider>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        <NavigationContainer>
          <MainNavigation />
        </NavigationContainer>
      </SafeAreaView>
    </AuthProvider>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff', // Match your app's background
  },
});

export default App;
