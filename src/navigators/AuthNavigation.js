import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnBoarding from '../Screens/Auth/OnBoarding';
import Login from '../Screens/Auth/Login';
import SignUp from '../Screens/Auth/SignUp';
import BottomNavigation from './BottomNavigation';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="OnBoarding"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="OnBoarding" component={OnBoarding} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      {/* <Stack.Screen name="BottomNavigation" component={BottomNavigation} /> */}

    </Stack.Navigator>
  );
};

export default AuthStack;
