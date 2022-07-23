import { useSelector } from 'react-redux';
import { SafeAreaView, TouchableOpacity } from 'react-native';
import React, { FC, useEffect, useState } from 'react';
import database from '@react-native-firebase/database' ;
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Avatar, List, ListItem, StyleService, Text, useStyleSheet, useTheme } from '@ui-kitten/components';

import { User } from 'interfaces';
import { PeopleIcon } from 'asset/Icons';
import { sortByDateFn } from 'utils/index';
import { setLoginStatus } from 'utils/asyncStorage';
import { reset as navigationReset } from 'navigator/navigationHelper';

import Header from './Header';



interface ScreenProps extends NativeStackScreenProps<any> {

}

type ItemType = { item : any, index : number }

const ChatListScreen : FC<ScreenProps> = (props) => {

    const { navigation } = props
    const theme = useTheme();
    const styles = useStyleSheet(themedStyles);

    const loginUser : User = useSelector((state:any) => state.userData)


    const [chatList,setChatList] = useState<Array<any>>([])
    const getChatList = () => {
        database()
            .ref('chatlist/'+loginUser._id)
            .on('value',snapshot => {
                if(snapshot.val()){
                    let chat_list = Object.values(snapshot.val());
                    chat_list.sort(sortByDateFn)
                    setChatList(chat_list)
                }
            })
    }
    useEffect(() => { getChatList() },[])

    const goToProfile = () => {

    }

    const goToUsersScreen = () => {
        navigation.navigate("UserList")
    }

    const onLogout = async () => {
        setLoginStatus(false)
        navigationReset("Login")
    }


    const goToChatRoom = (data:any) => {
        navigation.navigate("ChatRoom",{ data : data })
    } 

    const renderUserAvatar = (item:User,props:any) => {
        return (
            <Avatar
                //@ts-ignore 
                style={styles.avatar}
                source={{ uri : item.profilePic }}
            />
        )
    }

    const renderItem = ({ item, index } : ItemType) => {
        return(
            <ListItem
                title={item.userName}
                description={item.lastMsg}
                onPress={goToChatRoom.bind(this,item)}
                accessoryLeft={renderUserAvatar.bind(this,item)}
            />
        )
    }    

    return(
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

   
            <TouchableOpacity activeOpacity={0.6} style={styles.usersButton} onPress={goToUsersScreen}>
                <PeopleIcon 
                    style={styles.peopleIcon} 
                    fill={theme['background-basic-color-1']} 
                />
            </TouchableOpacity>

        </SafeAreaView>
    )
}

const themedStyles = StyleService.create({
    screen : {
        flex : 1,
        backgroundColor : 'background-basic-color-1',
    },
    avatar : {

    },
    usersButton : {
        width : 60, 
        right : 25, 
        height : 60, 
        bottom : 35, 
        borderRadius : 30 , 
        alignItems : 'center',
        position : 'absolute', 
        justifyContent : 'center', 
        backgroundColor : 'color-primary-default', 
    },
    peopleIcon : {
        height: 32, 
        width : 32
    }
})

export default ChatListScreen