import moment from 'moment';
import { useSelector } from 'react-redux';
import database from '@react-native-firebase/database';
import React, { FC, useEffect, useState } from 'react';
import { Dimensions, Platform, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bubble, GiftedChat, Time } from 'react-native-gifted-chat';
import { StyleService, useStyleSheet } from '@ui-kitten/components';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { User } from 'interfaces';
import { getUser } from 'utils/firebaseHelpers';
import { copyMessageOnLongPress, openEmail, openLink, openPhone } from 'utils/index';

import TopNavBar from './TopNavBar';



const bottomOffset = Platform.OS === 'ios' ? (Dimensions.get('window').height > 737 ? 35 : 0) : 0

type ParamsList = {
    ChatRoom: {
        data: any
    }
}

const parsePatterns = () => [
    {
        type: "url",
        style: themedStyles.messageLink,
        onPress: openLink,
        onLongPress: copyMessageOnLongPress,
    },
    {
        type: "phone",
        style: themedStyles.messageLink,
        onPress: openPhone,
        onLongPress: copyMessageOnLongPress,
    },
    {
        type: "email",
        style: themedStyles.messageLink,
        onPress: openEmail,
        onLongPress: copyMessageOnLongPress,
    }
]


interface ScreenProps extends NativeStackScreenProps<ParamsList, "ChatRoom"> {

}

const ChatRoom: FC<ScreenProps> = (props) => {

    const styles = useStyleSheet(themedStyles);

    const { navigation } = props
    const { data } = props.route.params
    const otherUser = data.user
    const roomId = data.roomId

    const loginUser: User = useSelector((state: any) => state.userData)

    const chatloginUser = { _id: loginUser._id }


    const [messages, setMessages] = useState<Array<any>>([])
    const onMessageSend = (messageData: any) => {

        let message = messageData[0]

        const { _id, text, createdAt } = message

        const sendRef = database().ref('/messages/' + roomId).push();

        let sendData = {
            text,
            roomId,
            createdAt: moment().format(),
            timeStamp: moment().unix(),
            user: loginUser._id,
            _id: sendRef.key,
        }

        sendRef
            .set(sendData)
            .then(() => {
                let chatListData = {
                    lastMsg: text,
                    createdAt: moment().format()
                }
                database()
                    .ref('/chatlist/' + otherUser._id + "/" + loginUser._id)
                    .update(chatListData)

                database()
                    .ref('/chatlist/' + loginUser._id + "/" + otherUser._id)
                    .update(chatListData)
            })
    }

    useEffect(() => {
        const onChildAdd = database()
            .ref('/messages/' + roomId)
            .on('child_added', async (snapshot) => {
                const message = snapshot.val()
                const userData = await getUser(message.user)
                const newMessage = {
                    ...message,
                    user: userData
                }
                setMessages(state => [newMessage, ...state])
            });

        // Stop listening for updates when no longer required
        return () => database().ref('/messages/' + roomId).off('child_added', onChildAdd);
    }, [roomId])



    const onBackPress = () => {
        navigation.pop()
    }



    const onProfilePress = () => {

    }



    const renderBubble = (props: any) => {

        const right = props.currentMessage.user._id === loginUser._id

        const bubbleWrapperStyle = {
            left: styles.chatBubbleLeft,
            right: styles.chatBubbleRight,
        }
        const bubbleTextStyle = {
            left: styles.chatBubbleLeftText,
            right: styles.chatBubbleTextRight
        }
        const bubbleViewStyle = {
            ...styles.bubbleView,
            marginLeft: right ? (5) : (0),
            marginRight: right ? (0) : (5),
        }

        return (
            <View style={bubbleViewStyle}>
                <Bubble
                    {...props}
                    textStyle={bubbleTextStyle}
                    wrapperStyle={bubbleWrapperStyle}

                />
            </View>
        )
    }

    const renderTime = (props: any) => {
        const timeTextStyle = {
            left: styles.chatTimeTextLeftStyle,
            right: styles.chatTimeTextRightStyle
        }
        const containerStyle = {
            left: styles.chatTimeTextContainerLeftStyle,
            right: {}
        }

        return (
            <Time
                {...props}
                timeTextStyle={timeTextStyle}
                containerStyle={containerStyle}
            />
        )
    }


    return (
        <SafeAreaView style={{ flex: 1 }}>

            <TopNavBar
                onBackPress={onBackPress}
                userName={otherUser.userName}
                userImage={otherUser.profilePic}
                onProfilePress={onProfilePress}

            />

            <View style={styles.chatArea}>
                <GiftedChat
                    // @ts-ignore
                    renderAvatar={null}
                    wrapInSafeArea={false}
                    messages={messages}
                    user={chatloginUser}
                    onSend={onMessageSend}
                    renderTime={renderTime}
                    bottomOffset={bottomOffset}
                    renderBubble={renderBubble}
                    parsePatterns={parsePatterns}
                />
            </View>

        </SafeAreaView>
    )

}

export default ChatRoom


const themedStyles = StyleService.create({
    chatArea: {
        flex: 1,
    },
    chatBubbleLeft: {
        backgroundColor: 'color-primary-default',
        minWidth: 80,
        borderRadius: 8
    },
    chatBubbleLeftText: {
        color: 'background-basic-color-1',
    },
    chatBubbleRight: {
        backgroundColor: 'background-basic-color-1',
        minWidth: 80,
        borderRadius: 8
    },
    chatBubbleTextRight: {
        color: 'color-primary-default',
    },
    bubbleView: {
        marginBottom: 5,
    },
    chatTimeTextContainerLeftStyle: {
        flex: 1,
        marginLeft: 0,
        alignSelf: 'flex-end',
    },
    chatTimeTextLeftStyle: {
        color: 'background-basic-color-1',
    },
    chatTimeTextRightStyle: {
        color: 'grey'
    },
    messageLink: {
        color: '#67ACFF',
        textDecorationLine: "underline",
    }
})