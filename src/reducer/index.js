import { combineReducers } from 'redux';
import user from './user_reducer';

const Reducer = combineReducers({
  user: user,
});

export default Reducer;
