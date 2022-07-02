import { View } from 'react-native';
import React, { FC, useEffect } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { getLoginStatus } from 'utils/asyncStorage';


interface ScreenProps extends NativeStackScreenProps<any> {

}

const SplashScreen : FC<ScreenProps> = (props) => {

    const { navigation } = props

    const checkLoginStatus = async () => {
        let loginStatus = await getLoginStatus()
        if(loginStatus) navigation.navigate("ChatList")
        else navigation.navigate("Login")
    }

    useEffect(() => {
        checkLoginStatus()
    },[])

    return(
        <View />
    )
}

export default SplashScreen