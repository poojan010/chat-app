import { useSelector } from 'react-redux';
import { SafeAreaView, View } from 'react-native';
import React, { FC, useEffect, useState } from 'react';
import database from '@react-native-firebase/database' ;
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Avatar, List, ListItem, StyleService, Text, useStyleSheet, useTheme } from '@ui-kitten/components';

import { User } from 'interfaces';
import { setLoginStatus } from 'utils/asyncStorage';
import { reset as navigationReset } from 'navigator/navigationHelper';

import Header from './Header';



interface ScreenProps extends NativeStackScreenProps<any> {

}

type ItemType = { item : User, index : number }

const ChatListScreen : FC<ScreenProps> = (props) => {

    const { navigation } = props
    const theme = useTheme();
    const styles = useStyleSheet(themedStyles);

    const loginUser : User = useSelector((state:any) => state.userData)

    const [userList,setUserList] = useState<Array<any>>([])


    const getAllUsers = () => {
        database()
            .ref('users/')
            .once('value')
            .then((snapshot) => {
                let users = Object.values(snapshot.val()).filter((item:any) => item.id != loginUser.id)
                setUserList(users)
            })
    }   

    useEffect(() => {
        getAllUsers()
    },[])

    const goToProfile = () => {

    }

    const onLogout = async () => {
        setLoginStatus(false)
        navigationReset("Login")
    }

    const createChatList = (data:any) => {
        let myData = {
            ...loginUser,
            lastMsg : ""
        }
        let otherUserData = {
            ...data,
            lastMsg : ""
        }
        delete otherUserData["password"]

        database()
            .ref('/chatlist/'+data.id+"/"+loginUser.id)
            .update(myData)
            .then(() => console.log('Data updated.'));

        database()
            .ref('/chatlist/'+loginUser.id+"/"+data.id)
            .update(otherUserData)
            .then(() => console.log('Data updated.'));
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
                description={""}
                onPress={createChatList.bind(this,item)}
                accessoryLeft={renderUserAvatar.bind(this,item)}
            />
        )
    }    

    return(
        <SafeAreaView style={styles.screen}>

            <Header 
                headerTitle={'Chat App'} 
                onLogoutPress={onLogout}
                onProfilePress={goToProfile}
                userImage={loginUser.profilePic} 
            />

            <List 
                data={userList}
                renderItem={renderItem}
            />

        </SafeAreaView>
    )
}

const themedStyles = StyleService.create({
    screen : {
        flex : 1,
        backgroundColor : 'background-basic-color-1',
    },
    avatar : {

    }
})

export default ChatListScreen