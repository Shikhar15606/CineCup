import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
import { Auth0Provider } from '@auth0/auth0-react';
import 'firebase/storage'
// Redux Related Stuff
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import Reducer from './reducer';

var firebaseConfig = {
  apiKey: "AIzaSyCexaIbdw4ZLREZGr1cQnpwNyZqRnEM_ng",
  authDomain: "cinecup-9b0ac.firebaseapp.com",
  databaseURL: "https://cinecup-9b0ac.firebaseio.com",
  projectId: "cinecup-9b0ac",
  storageBucket: "cinecup-9b0ac.appspot.com",
  messagingSenderId: "65211879809",
  appId: "1:65211879909:web:3ae38ef1cdcb2e01fe5f0c",
  measurementId: "G-8GSGZQ44ST"
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage()
const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore);

ReactDOM.render(
  <Auth0Provider
  domain="dev-3yqn-gsx.au.auth0.com"
  clientId="fQXOTy7DeJPxbztqQwBasQ60XJKDMfre"
  redirectUri={window.location.origin}
>
  <Provider
        store={createStoreWithMiddleware(
            Reducer,
            window.__REDUX_DEVTOOLS_EXTENSION__ &&
            window.__REDUX_DEVTOOLS_EXTENSION__()
        )}
    >
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Provider>
  </Auth0Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
export  {
  storage, firebase as default
}