
import React, { FC } from "react"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import SplashScreen from "container/Splash";
import ChatRoom from "container/ChatRoom";
import Login from "container/Auth/Login";
import Register from "container/Auth/Register";
import ChatListScreen from "container/ChatList";
import ProfileScreen from "container/Profile";

import { setNavigator } from "./navigationHelper";

const Stack  = createNativeStackNavigator()

const Routers = () => {

    const authScreensOptions = {
        animation : "fade_from_bottom"
    }

    return(
        <NavigationContainer
            ref={(ref) => setNavigator(ref)}
        >   
            <Stack.Navigator screenOptions={{ headerShown : false}}>

                <Stack.Screen name="SplashScreen" component={SplashScreen} />

                {/* Auth Screens */}
                <Stack.Screen name="Login" component={Login} options={authScreensOptions} />
                <Stack.Screen name="Register" component={Register} options={authScreensOptions} />


                {/* App Screens */}
                <Stack.Screen name="ChatList" component={ChatListScreen} />
                <Stack.Screen name="ChatRoom" component={ChatRoom} />
                <Stack.Screen name="Profile" component={ProfileScreen} />

            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Routers