import React, { useEffect } from 'react';
import { auth } from './action/user_actions';
import { useSelector, useDispatch } from "react-redux";

export default function Auth (ComposedClass, status) {
    function AuthenticationCheck(props) {
        let user = useSelector(state => state.user);
        const dispatch = useDispatch();
        useEffect(() => {
            dispatch(auth()).then(async response => {
            console.log("------------",user,"----------------------")
            // response is true means user logged in
            // logged in user can not see login and signup page
            if (user.isLoggedIn && status === false) {
                props.history.push('/')
            }
            // redirect to 
            if (user.isLoggedIn === false && status === true) {
                props.history.push('/login')
            }
        })}, [dispatch,props.history,user.isLoggedIn])
        return (
            <ComposedClass {...props}/>
        )
    }
    return AuthenticationCheck
}