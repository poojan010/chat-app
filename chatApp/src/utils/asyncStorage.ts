import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Decalring Consts for accessing and setting data into Async storage 
 */
const LOGIN_KEY = "LOGIN_KEY"


/**
 * Setters and Getters for Async Storage
 */
export const getLoginStatus = async () => {
    let response : any = await AsyncStorage.getItem(LOGIN_KEY)
    response = JSON.parse(response) 

    return response;
}

export const setLoginStatus = async (data:boolean) => {

    await AsyncStorage.setItem(LOGIN_KEY,JSON.stringify(data))

}
