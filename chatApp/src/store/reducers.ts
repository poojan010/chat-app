import { User } from "interfaces";
import { RESET_USER, SET_USER } from "store/action";

interface UserAction{
    type : string,
    payload : User
}

const initialUserData = {
    id : '',
    email : '',
    userName : '',
    profilePic : '',
}

export const userData = (state=initialUserData,action:UserAction) => {

    const { payload, type } = action;

    switch(type){
        case SET_USER:
            return Object.assign({}, state, {
                id: (payload.id === undefined) ? state.id : payload.id,
                email: (payload.email === undefined) ? state.email : payload.email,
                userName: (payload.userName === undefined) ? state.userName : payload.userName,
                profilePic: (payload.profilePic === undefined) ? state.profilePic : payload.profilePic,
            });

        case RESET_USER:
            return initialUserData

        default: 
            return state;
    }

}
