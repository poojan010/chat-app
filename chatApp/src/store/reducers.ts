



import { User } from "interfaces";
import { RESET_USER, SET_USER } from "store/actions";

interface UserAction {
    type: string,
    payload: User
}

const initialUserData = {

    _id: '',
    email: '',
    userName: '',
    profilePic: '',
}

export const userData = (state = initialUserData, action: UserAction) => {

    const { payload, type } = action;

    switch (type) {
        case SET_USER:
            return Object.assign({}, state, {
                _id: (payload._id === undefined) ? state._id : payload._id,
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
