import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {  Layout, Divider, Icon, TopNavigationAction, TopNavigation } from '@ui-kitten/components';

import TopNavBar from './TopNavBar';

const imageURL = "https://react.semantic-ui.com/images/avatar/large/matthew.png"

interface ScreenProps extends NativeStackScreenProps<any> {

}

const ChatRoom : FC<ScreenProps> = (props) => {

    const { navigation } = props

    const onBackPress = () => {
        navigation.pop()
    }
    
    const onProfilePress = () => {
        
    } 

    return( 
        <SafeAreaView style={{ flex: 1 }}>

            <TopNavBar 
                userImage={imageURL}
                userName={"Virat Kohli"}
                onBackPress={onBackPress}
                onProfilePress={onProfilePress}
            />

            <GiftedChat />

        </SafeAreaView>
    )

}

export default ChatRoom
