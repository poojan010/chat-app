import uuid from 'react-native-uuid';
import { useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native';
import React, { FC, useEffect, useState } from 'react';
import database from '@react-native-firebase/database';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Avatar, Input, List, ListItem, StyleService, TopNavigation, TopNavigationAction, useStyleSheet, useTheme } from '@ui-kitten/components';

import { User } from 'interfaces';
import { BackIcon } from 'assets/icons';
import { searchMatch } from 'utils/index';
import { checkChatListExist, getAllUsersData, getUser } from 'utils/firebaseHelpers';



interface ScreenProps extends NativeStackScreenProps<any> {

}

const screenTitle = "Find Users"
const BackAction = (props: any) => <TopNavigationAction {...props} icon={BackIcon} />

type ItemType = { item: any, index: number }

const UserList: FC<ScreenProps> = (props) => {

    const { navigation } = props
    const theme = useTheme();
    const styles = useStyleSheet(themedStyles);


    const loginUser: User = useSelector((state: any) => state.userData)


    const onBackPress = () => {
        navigation.pop()
    }

    const [allUsersList, setAllUsersList] = useState<Array<any>>([])
    const [userList, setUserList] = useState<Array<any>>([])
    const getAllUsers = async () => {
        const users = await getAllUsersData(loginUser._id)
        setAllUsersList(users)

    }
    useEffect(() => { getAllUsers(); }, [])
    useEffect(() => { setUserList(allUsersList) }, [allUsersList])


    const [searchVal, setSearchVal] = useState<string>('')
    const searchChangeHandler = (text: string) => {
        setSearchVal(text)
        let newUserList = searchMatch(allUsersList, text);
        setUserList([...newUserList])

    }

    const createChatList = async (data: any) => {
        try {
            let chatList = await checkChatListExist(data, loginUser)

            if (chatList) {
                const userData = await getUser(chatList.user)
                const newChatList = {
                    ...chatList,
                    user: userData
                }
                navigation.navigate("ChatRoom", { data: newChatList })
                return;
            }

            let roomId = uuid.v4()
            let myData = {
                user: loginUser._id,
                lastMsg: "",
                roomId
            }
            let otherUserData = {
                user: data._id,
                lastMsg: "",
                roomId
            }

            database()
                .ref('/chatlist/' + data._id + "/" + loginUser._id)
                .update(myData)
                .then(() => console.log('Data updated.', myData));

            database()
                .ref('/chatlist/' + loginUser._id + "/" + data._id)
                .update(otherUserData)
                .then(() => console.log('Data updated.', otherUserData));

            const newOtherUserData = {
                ...otherUserData,
                user: data,
            }

            navigation.navigate("ChatRoom", { data: newOtherUserData })
        } catch (error) {
            console.log("Error ", error)
        }
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
                description={''}
                title={item.userName}
                onPress={createChatList.bind(this, item)}
                accessoryLeft={renderUserAvatar.bind(this, item)}
            />
        )
    }


    return (
        <SafeAreaView style={styles.screen}>

            <TopNavigation
                alignment='center'
                title={screenTitle}
                accessoryLeft={<BackAction onPress={onBackPress} />}
            />

            <Input
                autoCapitalize='none'
                value={searchVal}
                placeholder='Search User'
                style={styles.searchBar}
                onChangeText={searchChangeHandler}
            />

            <List
                data={userList}
                renderItem={renderItem}
            />


        </SafeAreaView>
    )
}

const themedStyles = StyleService.create({
    screen: {
        flex: 1,
        backgroundColor: 'background-basic-color-1',
    },
    searchBar: {
        margin: 5
    },

})

export default UserList