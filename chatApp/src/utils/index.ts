import { Linking } from "react-native";
import SimpleToast from "react-native-simple-toast";
import Clipboard from "@react-native-clipboard/clipboard";

import { User } from "interfaces";

export const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const textRegex = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;

export const TEXT_COPIED = "Text copied."
export const SOMETHING_WENT_WRONG = "Something went Wrong."
export const REGISTER_SUCCESS_MESSAGE = "Registered Successfully."
export const LOGIN_SUCCESS_MESSAGE = "Logged in Successfully."
export const NAME_REQUIRED = "User Name is Required"
export const INVALID_NAME = "User Name is Invalid"
export const EMAIL_REQUIRED = "Email is Required"
export const INVALID_EMAIL = "Email is Invalid"
export const PASS_REQUIRED = "Password is Required"
export const INVALID_PASS = "Password is Invalid, Password should be minimum 8 characters long."
export const NO_EMAIL_FOUND = "No Account found with this Email Id"
export const WRONG_PASSWORD = "Wrong Password"
export const ACCOUNT_EXIST = "Account already exsit with this email id"


export const openLink = (link:string) => {
    Linking.canOpenURL(link)
    .then(supported => {
        if (supported) Linking.openURL(link);
        else if (__DEV__) console.log('Don\'t know how to open URI: ' + link);
    })
    .catch((error) => {
        if (__DEV__) console.log('Don\'t know how to open URI: ' + link);
    })
}

export const copyMessageOnLongPress = (text:string) => {
    Clipboard.setString(text);
    SimpleToast.show(TEXT_COPIED)
    
}

export const openPhone = (number:string) => {
    Linking.openURL('tel:' + number)
}

export const openEmail = (email:string) => {
    let url = `mailto:${email}`
    Linking.canOpenURL(url)
        .then(supported => {
            if (supported) Linking.openURL(url);
            else if (__DEV__) console.log('Don\'t know how to open URI: ' + url);
        })
        .catch((error) => {
            if (__DEV__) console.log('Don\'t know how to open URI: ' + url);
        })
}

export const searchMatch = function(userList:Array<User>,match:string) {
    let finalMatch = match.trim().toString()
    
    let newList = userList.filter((user:User) => {
        let userName = user.userName.toLowerCase()
        return userName.includes(finalMatch)
    })
    
    return newList
}