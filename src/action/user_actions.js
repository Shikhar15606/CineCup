import firebase from 'firebase';
import {
    LOGIN_USER,
    REGISTER_USER,
    LOGOUT_USER,
} from './types';

// export const register = (user) => {
//     return async (dispatch) => {
//         const db = firestore();
//         auth()
//         .createUserWithEmailAndPassword(user.email, user.password)
//         .then(user => {
//             console.log(user);
//         })
//         .catch(error => {
//             console.log(error);
//         })
//     }
// }
export const loginwithgoogle = () => {
    return async () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
        .then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            // ...
            return{
              token:token,
              user:user
            }
           
          }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
            return{
              errorCode : errorCode,
              errorMessage:errorMessage
            }
          });
    }
}


export const loginwithfacebook = () => {
  return async ()=>{
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }
}