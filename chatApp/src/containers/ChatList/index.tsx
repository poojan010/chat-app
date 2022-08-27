import { useSelector } from 'react-redux';
import React, { FC, useEffect, useState } from 'react';
import { SafeAreaView, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Avatar, List, ListItem, StyleService, useStyleSheet, useTheme } from '@ui-kitten/components';

import { User } from 'interfaces';
import { PeopleIcon } from 'assets/icons';
import { getChatList } from 'utils/firebaseHelpers';
import { setLoginStatus } from 'utils/asyncStorage';
import { reset as navigationReset } from 'navigator/navHelper';

import Header from './Header';



interface ScreenProps extends NativeStackScreenProps<any> {

}

type ItemType = { item: any, index: number }

const ChatListScreen: FC<ScreenProps> = (props) => {

    const { navigation } = props
    const theme = useTheme();
    const styles = useStyleSheet(themedStyles);

    const loginUser: User = useSelector((state: any) => state.userData)


    const [chatList, setChatList] = useState<Array<any>>([])
    const getChatListUsers = async () => {
        const chatUsers = await getChatList(loginUser._id)
        console.log(chatUsers)
        setChatList(chatUsers)
    }
    useEffect(() => { getChatListUsers() }, [])

    const goToProfile = () => {

    }

    const goToUsersScreen = () => {
        navigation.navigate("UserList")
    }

    const onLogout = async () => {
        setLoginStatus(false)
        navigationReset("Login")
    }


    const goToChatRoom = (data: any) => {
        navigation.navigate("ChatRoom", { data: data })
    }

    const renderUserAvatar = (item: User, props: any) => {
        return (
            <Avatar
                //@ts-ignore 
                style={styles.avatar}
                source={{ uri: item.profilePic }}
            />
        )
    }

    const renderItem = ({ item, index }: ItemType) => {
        return (
            <ListItem
                title={item.user.userName}
                description={item.lastMsg}
                onPress={goToChatRoom.bind(this, item)}
                accessoryLeft={renderUserAvatar.bind(this, item.user)}
            />
        )
    }

    return (
        <SafeAreaView style={styles.screen}>

            <Header
                headerTitle={'Chatify'}
                onLogoutPress={onLogout}
                onProfilePress={goToProfile}
                userImage={loginUser.profilePic}
            />

            <List
                data={chatList}
                renderItem={renderItem}
            />


            <TouchableOpacity
                activeOpacity={0.6}
                style={styles.usersButton}
                onPress={goToUsersScreen}
            >
                <PeopleIcon
                    style={styles.peopleIcon}
                    fill={theme['background-basic-color-1']}
                />
            </TouchableOpacity>

        </SafeAreaView>
    )
}

const themedStyles = StyleService.create({
    screen: {
        flex: 1,
        backgroundColor: 'background-basic-color-1',
    },
    avatar: {

    },
    usersButton: {
        width: 60,
        right: 25,
        height: 60,
        bottom: 35,
        borderRadius: 30,
        alignItems: 'center',
        position: 'absolute',
        justifyContent: 'center',
        backgroundColor: 'color-primary-default',
    },
    peopleIcon: {
        height: 32,
        width: 32
    }
})

export default ChatListScreen