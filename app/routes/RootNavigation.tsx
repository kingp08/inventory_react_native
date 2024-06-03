import React, { useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
// react native navigation 
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import Demo from '../screens/Demo';
import ReceivingDemo from '../screens/DemoAuto';
import NetworkDemo from '../screens/NetworkExample';
import TabDemo from '../screens/DemoBottomTab';
import Login from '../screens/auth/Login';
import Settings from '../screens/Settings';
import ReceivingScreen from '../screens/Receiving';
import CodeScanner from '../screens/CodeScanner';
import DispatchingScreen from '../screens/Dispatching';
import InternalTransferScreen from '../screens/InternalTransfter';
import KitNBomScreen from '../screens/KitNBom';
import ProductAvailabilityScreen from '../screens/ProductAvailability';
import DemoTasks from '../screens/tasks'
import { getHeaderTitle } from '@react-navigation/elements';
import { useTheme } from '../theme/useTheme';
import Icon from 'react-native-vector-icons/Ionicons';
import { RootState, store } from '../store/store';
import BootSplash from 'react-native-bootsplash';
import { useState } from "react";
import { Platform, StatusBar, StyleSheet, Text } from "react-native";
import { AnimatedBootSplash } from "../screens/AnimatedBootSplash";
import { updateLoader } from '../store/loaderSlice';
import LoadingAnimation from '../screens/LoadingScreen';

const DrawerNavigator = () => {
    const Drawer = createDrawerNavigator();
    const { theme } = useTheme();
    const dynamicStyles = {
        header: {
            backgroundColor: theme.cardBg,
        },
        title: {
            color: theme.color,
            lineHeight: 20,
        },
        icon: {
            color: theme.color
        }
    }

    const CustomDrawerScreen = (name: string, component: any) => {
        return <Drawer.Screen name={name} component={component} options={({ navigation }) => ({
            title: name,
            headerStyle: dynamicStyles.header,
            headerTitleStyle: dynamicStyles.title,
            headerTitleAlign: 'center',
            headerLeft: () => (
                <Icon.Button name="menu" size={18} color={theme.color} onPress={() => navigation.toggleDrawer()} style={{ backgroundColor: theme.cardBg }} />
            ),
        })} />;
    }

    return (
        <Drawer.Navigator
            // initialRouteName='Receiving'
            screenOptions={{
                // headerStyle: dynamicStyles.header,
                // headerTitleStyle: dynamicStyles.title,
            }}
        >
            {/* <Drawer.Screen name="Demo" component={Demo} options={({ navigation }) => ({
                title: 'Awesome app',
                headerLeft: () => (
                <Icon.Button name="delete" size={18} color="#000" onPress={() => navigation.toggleDrawer()} />
                ),
            })}/> */}
            {/* {CustomDrawerScreen("Demo", Demo)} */}
            {/* {CustomDrawerScreen("NetworkDemo", NetworkDemo)} */}
            {/* {CustomDrawerScreen("ReceivingDemo", ReceivingDemo)} */}
            {/* {CustomDrawerScreen("Settings", Settings)} */}
            {CustomDrawerScreen("Receiving", ReceivingScreen)}
            {CustomDrawerScreen("Dispatching", DispatchingScreen)}
            {CustomDrawerScreen("Internal Transfer", InternalTransferScreen)}
            {CustomDrawerScreen("Kit/Bom", KitNBomScreen)}
            {CustomDrawerScreen("Product Availability", ProductAvailabilityScreen)}
            {/* {CustomDrawerScreen("DemoTasks", DemoTasks)} */}
            {/* <Drawer.Screen name="Login" component={Login} options={{headerShown: false}}/> */}
            {/* <Drawer.Screen name="ReceivingDemo" component={ReceivingDemo}/>
            <Drawer.Screen name="TabDemo" component={TabDemo}/>
            <Drawer.Screen name="Settings" component={Settings}/>
            <Drawer.Screen name="Receiving" component={ReceivingScreen}/>
            <Drawer.Screen name="Dispatching" component={DispatchingScreen}/>
            <Drawer.Screen name="Internal Transter" component={InternalTransferScreen}/>
            <Drawer.Screen name="Kit/Bom" component={KitNBomScreen}/>
            <Drawer.Screen name="Product Availability" component={ProductAvailabilityScreen}/>
            <Drawer.Screen name="DemoTasks" component={DemoTasks}/> */}
            {/* <Drawer.Screen name="CodeScanner" component={CodeScanner} /> */}
        </Drawer.Navigator>
    )
}
export default function RootNavigation() {
    const user: any = useSelector((state: RootState) => state.user);

    const [visible, setVisible] = useState(true);
    const { loading } = useSelector((state: RootState)=>state.loader)

    // Navigators
    const Stack = createStackNavigator();
    const fetchData1 = async () => {
        // Simulate fetching data from an API
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve('Data from fetchData1');
            }, 2500);
        });
    };


    useEffect(() => {
        const init = async () => {
            BootSplash.hide()
            // …do multiple sync or async tasks
            await fetchData1();
        };

        init().finally(async () => {
            // await BootSplash.hide({ fade: true });
            setVisible(false);
        });
    }, []);

    return (

                
        <NavigationContainer>
            {
                loading ?
                <LoadingAnimation/> :
                <Stack.Navigator
                    initialRouteName={ user.token != "" ? 'Home' : 'Login'}
                    screenOptions={{
                        headerShown: false,
                    }}>
                    <Stack.Screen name="Home" component={DrawerNavigator} options={{ headerShown: false, title: "Home" }} />
                    <Stack.Screen name="CodeScanner" component={CodeScanner} />
                    <Stack.Screen name="Login" component={Login} />
                </Stack.Navigator>
            }
            {visible && <AnimatedBootSplash
                onAnimationEnd={() => {
                    // setVisible(false);
                }}
            />}
        </NavigationContainer>
    )
}