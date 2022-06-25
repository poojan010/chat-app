
import React, { FC } from "react"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import HomeScreen from "container/Home";
import ChatRoom from "container/ChatRoom";
import Login from "container/Auth/Login";
import Register from "container/Auth/Register";

const Stack  = createNativeStackNavigator()

const Routers = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown : false}}>

                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Login" component={Login} options={{ animation : "fade_from_bottom" }} />
                <Stack.Screen name="Register" component={Register} options={{ animation : "fade_from_bottom" }} />
                <Stack.Screen name="ChatRoom" component={ChatRoom} />

            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Routers