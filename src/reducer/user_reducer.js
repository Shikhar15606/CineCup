import {
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR,
    REGISTER_USER_REQUEST,
    REGISTER_USER_ERROR,
    REGISTER_USER_SUCCESS,
    LOGOUT_USER_REQUEST,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_ERROR,
<<<<<<< HEAD
    NOMINATE_MOVIE_REQUEST,
    NOMINATE_MOVIE_SUCCESS,
    NOMINATE_MOVIE_ERROR
=======
    RESET_SUCCESS,
    RESET_ERROR
>>>>>>> 005308a73a212480c5ba138086c69f8e044057cc
} from '../action/types';

export default function user (state = {}, action){
    console.log("Chala To");
    switch(action.type){
        case REGISTER_USER_REQUEST:
            state = {...state,isLoading:true,isLoggedIn:false,user:undefined,error:undefined}
            break;
        case REGISTER_USER_SUCCESS:
            state = {...state,isLoading:false,isLoggedIn:true,user:action.payload,error:undefined}
            break;
        case REGISTER_USER_ERROR:
            state = {...state,isLoading:false,isLoggedIn:false,user:undefined,error:action.payload}
            break;
        case LOGIN_USER_REQUEST:
            state = { ...state,isLoading:true,isLoggedIn:false,user:undefined,error:undefined}
            break;
        case LOGIN_USER_SUCCESS:
            state = { ...state,isLoading:false,isLoggedIn:true,user:action.payload,error:undefined}
            break;
        case LOGIN_USER_ERROR:
            state = { ...state,isLoading:false,isLoggedIn:false,user:undefined,error:action.payload}
            break;
        case LOGOUT_USER_REQUEST:
            state = {...state,isLoading:true,error:undefined}
            break;
        case LOGOUT_USER_SUCCESS:
            state = {...state,isLoading:false,isLoggedIn:false,error:undefined,user:undefined}
            break;
        case LOGOUT_USER_ERROR:
            state = {...state,isLoading:false,error:"Some Error Occured Try Again !!"}
            break;
<<<<<<< HEAD
        case NOMINATE_MOVIE_REQUEST:
            state = {...state,isLoading:true,error:undefined}
            break;
        case NOMINATE_MOVIE_ERROR:
            state = {...state,isLoading:false,error:action.payload}
            break;
        case NOMINATE_MOVIE_SUCCESS:
            state = {...state,isLoading:false,error:undefined,user:{...state.user,Nominations:[...state.user.Nominations,action.payload]}}
            break;
=======
        case LOGIN_USER_ERROR:
            state = { ...state,isLoading:false,isLoggedIn:false,user:undefined,error:action.payload}
            break;
         case RESET_SUCCESS:
            state = { ...state,isLoading:false,isLoggedIn:false,user:action.payload,error:undefined}
            break;
        case RESET_ERROR:
            state = {...state,error:"Some Error Occured Try Again !!"}
             break;
        
>>>>>>> 005308a73a212480c5ba138086c69f8e044057cc
        default :
            return { ...state}
            break;
    }
    console.log(state);
    return state;
}