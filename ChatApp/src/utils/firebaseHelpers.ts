import { sortByDateFn } from '.';
import { User } from 'interfaces';
import database from '@react-native-firebase/database';


export const getUser = (_id: string) => {
    return new Promise(function (resolve, reject) {
        const userRef = database().ref('users/' + _id)
        userRef.on('value',
            (snapshot) => {
                resolve(snapshot.val())
            },
            (errorObject) => {
                if (__DEV__) console.log("Error ", errorObject)
                return reject(null);
            }
        )
    })
}

const populateUser = async (obj: any) => {
    const user = await getUser(obj.user)
    // @ts-ignore
    return { ...obj, user }
}

export const getChatList = (_id: string): Promise<Array<any>> => {

    return new Promise(function (resolve, reject) {
        const chatListRef = database().ref('chatlist/' + _id);

        chatListRef.on('value',
            async (snapshot) => {
                if (snapshot.val()) {

                    let chat_list: any[] = Object.values(snapshot.val());

                    chat_list.sort(sortByDateFn);

                    const chatUsers = await Promise.all(chat_list.map((item: any) => populateUser(item)));

                    return resolve(chatUsers);
                }
            },
            (errorObject) => {
                if (__DEV__) console.log("Error ", errorObject);
                return reject([]);
            }
        );

    });
}

export const getAllUsersData = (_id: string): Promise<Array<any>> => {

    return new Promise(function (resolve, reject) {
        const usersRef = database().ref('users/')

        usersRef
            .once('value')
            .then((snapshot) => {
                let users = Object.values(snapshot.val()).filter((item: any) => item._id != _id)
                resolve(users)
            })
            .catch((error) => {
                console.log("Error", error);
                reject([])
            });

    });
}

export const checkChatListExist = async (data: any, loginUser: User) => {
    const snapshot = await database().ref('/chatlist/' + data._id + "/" + loginUser._id).once('value');
    return snapshot.val()
}