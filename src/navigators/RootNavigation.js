import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnBoarding from '../Screens/Auth/OnBoarding';
import Login from '../Screens/Auth/Login';
import SignUp from '../Screens/Auth/SignUp';
import BottomNavigation from './BottomNavigation';
import AddFeed from '../Screens/Main/AddFeed';
import AddEvent from '../Screens/Main/AddEvent';
import Profile from '../Screens/Main/Profile';
import Cms from '../Screens/Main/Cms';
import CreateOrder from '../Screens/Main/CreateOrder';
import TrackByAwb from '../Screens/Main/TrackByAwb';
import Wallet from '../Screens/Main/Wallet';
import Order from '../Screens/Main/Order';
import ShippingCredits from '../Screens/Main/ShippingCredits';
import ShippingCalculator from '../Screens/Main/ShippingCalculator';
import Invoice from '../Screens/Main/Invoice';
import HelpDesk from '../Screens/Main/HelpDesk';
import CreateQuery from '../Screens/Main/CreateQuery';
const Stack = createNativeStackNavigator();

const RootNavigation = () => {
    return (
        <Stack.Navigator
            initialRouteName="BottomNavigation"
            screenOptions={{
                headerShown: false,
            }}>

            <Stack.Screen name="BottomNavigation" component={BottomNavigation} />
            <Stack.Screen name="EditProfile" component={Profile} />
            <Stack.Screen name="Cms" component={Cms} />
            <Stack.Screen name="CreateOrder" component={CreateOrder} />
            <Stack.Screen name="TrackByAwb" component={TrackByAwb} />
            <Stack.Screen name="Wallet" component={Wallet} />
            <Stack.Screen name="Order" component={Order} />
            <Stack.Screen name="ShippingCredits" component={ShippingCredits} />
            <Stack.Screen name="ShippingCalculator" component={ShippingCalculator} />
            <Stack.Screen name="HelpDesk" component={HelpDesk} />
            <Stack.Screen name="CreateQuery" component={CreateQuery} />

            <Stack.Screen name="Invoice" component={Invoice} />



        </Stack.Navigator>
    );
};

export default RootNavigation;
