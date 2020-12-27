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
    NOMINATE_MOVIE_REQUEST,
    NOMINATE_MOVIE_SUCCESS,
    NOMINATE_MOVIE_ERROR,
    RESET_SUCCESS,
    RESET_ERROR,
    REMOVE_NOMINATE_MOVIE_ERROR,
    REMOVE_NOMINATE_MOVIE_SUCCESS,
    REMOVE_NOMINATE_MOVIE_REQUEST,
    AUTH_USER_SUCCESS,
    AUTH_USER_ERROR,
    FETCH_MOVIES_DATA_REQUEST,
    FETCH_MOVIES_DATA_SUCCESS,
    BLACKLIST_MOVIE_SUCCESS,
    BLACKLIST_MOVIE_FETCH,
    REMOVE_BLACKLISTED_MOVIE_SUCCESS,
    REMOVE_BLACKLISTED_MOVIE_FAILURE
} from '../action/types';





export default function user (state = {}, action){
    switch(action.type){
        case REGISTER_USER_REQUEST:
            state = {...state,isLoading:true,isLoggedIn:false,user:undefined,error:undefined,successmsg:undefined}
            break;
        case REGISTER_USER_SUCCESS:
            state = {...state,isLoading:false,isLoggedIn:false,user:undefined,error:undefined,successmsg:action.payload}
            break;
        case REGISTER_USER_ERROR:
            state = {...state,isLoading:false,isLoggedIn:false,user:undefined,error:action.payload,successmsg:undefined}
            break;
        case LOGIN_USER_REQUEST:
            state = { ...state,isLoading:true,isLoggedIn:false,user:undefined,error:undefined,successmsg:undefined}
            break;
        case LOGIN_USER_SUCCESS:
            state = { ...state,isLoading:false,isLoggedIn:true,user:action.payload,error:undefined,successmsg:undefined}
            break;
        case LOGIN_USER_ERROR:
            state = { ...state,isLoading:false,isLoggedIn:false,user:undefined,error:action.payload,successmsg:undefined}
            break;
        case LOGOUT_USER_REQUEST:
            state = {...state,isLoading:true,error:undefined}
            break;
        case LOGOUT_USER_SUCCESS:
            state = {...state,isLoading:false,isLoggedIn:false,error:undefined,user:undefined,successmsg:undefined}
            break;
        case LOGOUT_USER_ERROR:
            state = {...state,isLoading:false,error:"Some Error Occured Try Again !!"}
            break;
        case NOMINATE_MOVIE_REQUEST:
            state = {...state,isLoading:true,error:undefined}
            break;
        case NOMINATE_MOVIE_ERROR:
            state = {...state,isLoading:false,error:action.payload}
            break;
        case NOMINATE_MOVIE_SUCCESS:
            state = {...state,isLoading:false,error:undefined,successmsg:action.successmsg,user:{...state.user,Nominations:[...state.user.Nominations,action.payload]}}
            break;
        case REMOVE_NOMINATE_MOVIE_REQUEST:
            state = {...state,isLoading:true,error:undefined}
            break;
        case REMOVE_NOMINATE_MOVIE_ERROR:
            state = {...state,isLoading:false,error:action.payload}
            break;
        case REMOVE_NOMINATE_MOVIE_SUCCESS:
            state = {...state,isLoading:false,error:undefined,successmsg:action.successmsg,user:{...state.user,Nominations:[action.payload]}}
            break;
        case AUTH_USER_SUCCESS:
            state = { ...state,isLoading:false,isLoggedIn:true,user:action.payload,error:undefined,successmsg:undefined}
            break;
        case AUTH_USER_ERROR:
            state = {...state,isLoading:false,isLoggedIn:false,error:action.payload,user:undefined,successmsg:undefined}
            break;
        case RESET_SUCCESS:
            state = { ...state,isLoading:false,isLoggedIn:false,user:action.payload,error:undefined}
            break;
        case RESET_ERROR:
            state = {...state,error:"Some Error Occured Try Again !!"}
             break;
        case FETCH_MOVIES_DATA_REQUEST:
            state = {...state,isLoading:true}
            break;
        case FETCH_MOVIES_DATA_SUCCESS:
            state = {...state,isLoading:false,movies:action.payload}
            break;       
        case BLACKLIST_MOVIE_SUCCESS:
            state = {...state,isLoading:false,successmsg:"Movie Blacklisted Successfully"}
            break;       
        case BLACKLIST_MOVIE_FETCH:
            state = {...state,isLoading:false,blacklist:action.payload}
            break;  
        case REMOVE_BLACKLISTED_MOVIE_SUCCESS:
            state = {...state,isLoading:false,successmsg:"Movie Removed from Blacklist"}
            break;
        case REMOVE_BLACKLISTED_MOVIE_FAILURE:
            state = {...state,isLoading:false,successmsg:undefined,error:action.payload}
            break;
        default :
            return { ...state}
            break;
    }
    console.log(state);
    return state;
}