
import { User } from 'interfaces'

export const SET_USER = "SET_USER";
export const RESET_USER = "RESET_USER";

export const setUser = (data: any) => {
    return {
        type: SET_USER,
        payload: data
    }
}

export const reSetUser = () => {
    return {
        type: RESET_USER,
    }
}
