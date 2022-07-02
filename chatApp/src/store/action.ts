
import { User } from 'interfaces'

export const SET_USER = "SET_USER";
export const RESET_USER = "RESET_USER";
export const TOAST_SET = "TOAST_SET";

export const setUser = (data:User) => {
    return{
        type : SET_USER,
        payload: data
    }
}

export const reSetUser = () => {
    return{
        type : RESET_USER,
    }
}

export const setToast = (data:any) => {
    return{
        type : TOAST_SET,
        payload : data
    }
}