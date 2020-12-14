import {
    LOGIN_USER,
    REGISTER_USER,
    LOGOUT_USER,
} from '../action/types';
export default function (state = {}, action){
    switch(action.type){
        case REGISTER_USER:
            return {...state}
        case LOGIN_USER:
            return { ...state}
        case LOGOUT_USER:
            return { ...state}
        default :
            return { ...state}
    }
}