import React from "react"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack'

import { setNavigator } from "./navHelper";

import Login from "containers/Auth/Login";
import ChatRoom from "containers/ChatRoom";
import UserList from "containers/UserList";
import SplashScreen from "containers/Splash";
import ProfileScreen from "containers/Profile";
import Register from "containers/Auth/Register";
import ChatListScreen from "containers/ChatList";



const Stack = createNativeStackNavigator()

const Routers = () => {

    const authScreensOptions: NativeStackNavigationOptions = {
        animation: "fade_from_bottom"
    }

    return (
        <NavigationContainer
            ref={(ref) => setNavigator(ref)}
        >
            <Stack.Navigator screenOptions={{ headerShown: false }}>

                <Stack.Screen name="SplashScreen" component={SplashScreen} />

                {/* Auth Screens */}
                <Stack.Screen name="Login" component={Login} options={authScreensOptions} />
                <Stack.Screen name="Register" component={Register} options={authScreensOptions} />

                {/* App Screens */}
                <Stack.Screen name="ChatList" component={ChatListScreen} />
                <Stack.Screen name="UserList" component={UserList} />
                <Stack.Screen name="ChatRoom" component={ChatRoom} />
                <Stack.Screen name="Profile" component={ProfileScreen} />


            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Routers