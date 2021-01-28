import React, { useEffect } from 'react';
import { auth } from './action/user_actions';
import { useSelector, useDispatch } from 'react-redux';

export default function Auth(ComposedClass, status, admin = false) {
  function AuthenticationCheck(props) {
    let user = useSelector(state => state.user);
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(auth()).then(async response => {
        // response is true means user logged in
        // logged in user can not see login and signup page
        if (user.isLoggedIn && status === false) {
          props.history.push('/');
        }
        // redirect to
        if (user.isLoggedIn === false && status === true) {
          props.history.push('/login');
        }
        // if user is not admin
        else if (
          user.isLoggedIn === true &&
          admin === true &&
          user.user.IsAdmin === false
        ) {
          props.history.push('/error');
        }
      });
    }, [dispatch, props.history, user.isLoggedIn]);
    return <ComposedClass {...props} />;
  }
  return AuthenticationCheck;
}
