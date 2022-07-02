import { useSelector } from 'react-redux';
import React, { FC, useEffect, useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import database from '@react-native-firebase/database' ;
import { NativeStackScreenProps } from '@react-navigation/native-stack';


interface ScreenProps extends NativeStackScreenProps<any> {

}


const ChatListScreen : FC<ScreenProps> = (props) => {

    const { navigation } = props

    const loginUser = useSelector((state:any) => state.userData)

    const [userList,setUserList] = useState<Array<any>>([])

    const getAllUser = () => {
        database()
            .ref('users/')
            .once('value')
            .then((snapshot) => {
                let users = Object.values(snapshot.val()).filter((item:any) => item.id != loginUser.id)
                setUserList(users)
            })
    }   

    useEffect(() => {
        getAllUser()
    },[])

    return(
        <SafeAreaView>

        </SafeAreaView>
    )
}

export default ChatListScreen