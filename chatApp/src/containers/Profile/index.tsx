import { View } from 'react-native';
import React, { FC, useEffect } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';




interface ScreenProps extends NativeStackScreenProps<any> {

}

const ProfileScreen: FC<ScreenProps> = (props) => {

    const { navigation } = props


    useEffect(() => {

    }, [])

    return (
        <View />
    )
}

export default ProfileScreen