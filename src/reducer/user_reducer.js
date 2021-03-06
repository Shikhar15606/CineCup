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
  REMOVE_BLACKLISTED_MOVIE_FAILURE,
  FETCH_VOTING_SUCCESS,
  START_VOTING_SUCCESS,
  START_VOTING_FAILURE,
  END_VOTING_SUCCESS,
  END_VOTING_FAILURE,
  FETCH_HISTORY_SUCCESS,
  FETCH_ANNOUNCEMENT_SUCCESS,
  REMOVE_ANNOUNCEMENT_SUCCESS,
  ADD_ANNOUNCEMENT_SUCCESS,
  REMOVE_ANNOUNCEMENT_FAILURE,
  ADD_ANNOUNCEMENT_FAILURE,
  SET_QUERY_STRING,
} from '../action/types';

export default function user(state = { queryString: '' }, action) {
  switch (action.type) {
    case REGISTER_USER_REQUEST:
      state = {
        ...state,
        isLoading: true,
        isLoggedIn: false,
        user: undefined,
        error: undefined,
        successmsg: undefined,
      };
      break;
    case REGISTER_USER_SUCCESS:
      state = {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        user: undefined,
        error: undefined,
        successmsg: action.payload,
      };
      break;
    case REGISTER_USER_ERROR:
      state = {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        user: undefined,
        error: action.payload,
        successmsg: undefined,
      };
      break;
    case LOGIN_USER_REQUEST:
      state = {
        ...state,
        isLoading: true,
        isLoggedIn: false,
        user: undefined,
        error: undefined,
        successmsg: undefined,
      };
      break;
    case LOGIN_USER_SUCCESS:
      state = {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        user: action.payload,
        error: undefined,
        successmsg: undefined,
      };
      break;
    case LOGIN_USER_ERROR:
      state = {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        user: undefined,
        error: action.payload,
        successmsg: undefined,
      };
      break;
    case LOGOUT_USER_REQUEST:
      state = { ...state, isLoading: true, error: undefined };
      break;
    case LOGOUT_USER_SUCCESS:
      state = {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        error: undefined,
        user: undefined,
        successmsg: undefined,
      };
      break;
    case LOGOUT_USER_ERROR:
      state = {
        ...state,
        isLoading: false,
        error: 'Some Error Occured Try Again !!',
      };
      break;
    case NOMINATE_MOVIE_REQUEST:
      state = { ...state, isLoading: true, error: undefined };
      break;
    case NOMINATE_MOVIE_ERROR:
      state = { ...state, isLoading: false, error: action.payload };
      break;
    case NOMINATE_MOVIE_SUCCESS:
      state = {
        ...state,
        isLoading: false,
        error: undefined,
        successmsg: action.successmsg,
        user: {
          ...state.user,
          Nominations: [...state.user.Nominations, action.payload],
        },
      };
      break;
    case REMOVE_NOMINATE_MOVIE_REQUEST:
      state = { ...state, isLoading: true, error: undefined };
      break;
    case REMOVE_NOMINATE_MOVIE_ERROR:
      state = { ...state, isLoading: false, error: action.payload };
      break;
    case REMOVE_NOMINATE_MOVIE_SUCCESS:
      state = {
        ...state,
        isLoading: false,
        error: undefined,
        successmsg: action.successmsg,
        user: { ...state.user, Nominations: [action.payload] },
      };
      break;
    case AUTH_USER_SUCCESS:
      state = {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        user: action.payload,
        error: undefined,
        successmsg: undefined,
      };
      break;
    case AUTH_USER_ERROR:
      state = {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        error: action.payload,
        user: undefined,
        successmsg: undefined,
      };
      break;
    case RESET_SUCCESS:
      state = {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        error: undefined,
        successmsg: action.payload,
      };
      break;
    case RESET_ERROR:
      state = { ...state, error: action.payload };
      break;
    case FETCH_MOVIES_DATA_REQUEST:
      state = { ...state, isLoading: true };
      break;
    case FETCH_MOVIES_DATA_SUCCESS:
      state = { ...state, isLoading: false, movies: action.payload };
      break;
    case BLACKLIST_MOVIE_SUCCESS:
      state = {
        ...state,
        isLoading: false,
        successmsg: 'Movie Blacklisted Successfully',
      };
      break;
    case BLACKLIST_MOVIE_FETCH:
      state = { ...state, isLoading: false, blacklist: action.payload };
      break;
    case REMOVE_BLACKLISTED_MOVIE_SUCCESS:
      state = {
        ...state,
        isLoading: false,
        successmsg: 'Movie Removed from Blacklist',
      };
      break;
    case REMOVE_BLACKLISTED_MOVIE_FAILURE:
      state = {
        ...state,
        isLoading: false,
        successmsg: undefined,
        error: action.payload,
      };
      break;
    case FETCH_VOTING_SUCCESS:
      state = { ...state, isVoting: action.payload, isLoading: false };
      break;
    case START_VOTING_SUCCESS:
      state = {
        ...state,
        isVoting: true,
        isLoading: false,
        successmsg: 'Voting Started Successfully',
      };
      break;
    case START_VOTING_FAILURE:
      state = {
        ...state,
        isVoting: false,
        isLoading: false,
        error: 'Voting Can not be started',
      };
      break;
    case END_VOTING_SUCCESS:
      state = {
        ...state,
        isVoting: false,
        isLoading: false,
        successmsg: 'Voting Ended SuccessFully',
      };
      break;
    case END_VOTING_FAILURE:
      state = {
        ...state,
        isVoting: true,
        isLoading: false,
        error: 'Voting can not be stopped',
      };
      break;
    case FETCH_HISTORY_SUCCESS:
      state = { ...state, history: action.payload, isLoading: false };
      break;
    case FETCH_ANNOUNCEMENT_SUCCESS:
      state = { ...state, announcement: action.payload, isLoading: false };
      break;
    case ADD_ANNOUNCEMENT_SUCCESS:
      state = { ...state, successmsg: 'Announcement Made Successfully' };
      break;
    case REMOVE_ANNOUNCEMENT_SUCCESS:
      state = { ...state, successmsg: 'Announcement Removed Successfully' };
      break;
    case ADD_ANNOUNCEMENT_FAILURE:
      state = { ...state, error: 'Announcement can not be made' };
      break;
    case REMOVE_ANNOUNCEMENT_FAILURE:
      state = { ...state, error: "Announcement can't be removed" };
      break;
    case SET_QUERY_STRING:
      state = { ...state, queryString: action.payload };
      break;
    default:
      state = { ...state };
      break;
  }
  return state;
}
