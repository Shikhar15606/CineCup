import firebase from 'firebase';
import {
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_ERROR,
    LOGOUT_USER,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_ERROR,
    RESET_ERROR,
    RESET_SUCCESS
} from './types';

export const register = (User) => {
    return async (dispatch) => {
        dispatch({
          type:REGISTER_USER_REQUEST,
          payload: ""
        })
        const db = firebase.firestore();
        firebase.auth()
        .createUserWithEmailAndPassword(User.email, User.password)
        
          .then(dataBeforeEmail => {
            firebase.auth().onAuthStateChanged(user=> {
              user.sendEmailVerification();
            });
          })
          .then(dataAfterEmail => {
            firebase.auth().onAuthStateChanged(function(user) {
              if (user) {
                // Sign up successful
                dispatch({
                  type: REGISTER_USER_SUCCESS,
                  payload:
                    "Your account was successfully created! Now you need to verify your e-mail address, please go check your inbox."
                });
              } else {
                // Signup failed
                dispatch({
                  type: REGISTER_USER_ERROR,
                  payload:
                    "Something went wrong, we couldn't create your account. Please try again."
                });
              }
            });
          })
          .then(user => {
            console.log(user);
            db.collection("users").doc(User.email).set({
              Name: `${User.firstname} ${User.lastname}`,
              Email: User.email,
              IsAdmin: false,
              ProfilePic: "https://icons.iconarchive.com/icons/icons8/android/256/Users-User-icon.png",
          })
          .then(function() {
              console.log("Document successfully written!");
              firebase.auth().signInWithEmailAndPassword(User.email, User.password)
              .then((user) => {
                
                dispatch({
                  type:LOGIN_USER_SUCCESS,
                  payload:{Name:user.Name, Email:user.Email, IsAdmin:user.IsAdmin,ProfilePic:user.ProfilePic}
                })
              })
              .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                dispatch({
                  type:LOGIN_USER_ERROR,
                  payload: "Some Error Occured Try Again !!"
                })
              });
              
          })
          .catch(function(error) {
              console.error("Error writing document: ", error);
              dispatch({
                type:REGISTER_USER_ERROR,
                payload: "Some Error Occured Try Again !!"
              })
          });
        })
        .catch(error => {
            console.log(error);
            dispatch({
              type:REGISTER_USER_ERROR,
              payload: "This Email is already registered Kindly Login"
            })
        })
    }
}

export const login = (User) => {
  return async (dispatch) => {
    dispatch({
      type:LOGIN_USER_REQUEST,
      payload: ""
    })
    firebase.auth().signInWithEmailAndPassword(User.email, User.password)
    .then((user) => {
      // Signed in 
      // ...
      
      dispatch({
        type:LOGIN_USER_SUCCESS,
        payload:{Name:user.Name, Email:user.Email, IsAdmin:user.IsAdmin,ProfilePic:user.ProfilePic}
      })
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      dispatch({
        type:LOGIN_USER_ERROR,
        payload: "Some Error Occured Try Again !!"
      })
    });
  }
}

export const loginwithgoogle = () => {
    return async (dispatch) => {
        dispatch({
          type:LOGIN_USER_REQUEST,
          payload: ""
        })
        const db = firebase.firestore();
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
        .then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            var docRef = db.collection("users").doc(user.email);
            docRef.get().then(function(doc) {
                if (doc.exists) {
                    console.log("Already Registered !");
                    dispatch({
                      type:LOGIN_USER_SUCCESS,
                      payload:{Name:doc.data().Name,Email:doc.data().Email,IsAdmin:doc.data().IsAdmin,ProfilePic:doc.data().ProfilePic}
                    })
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                    console.log("Not Already Registered !!!");
                    db.collection("users").doc(user.email).set({
                            Name: user.displayName,
                            Email: user.email,
                            IsAdmin: false,
                            ProfilePic: user.photoURL,
                        })
                        .then(function() {
                            console.log("Document successfully written!");
                            dispatch({
                              type:LOGIN_USER_SUCCESS,
                              payload:{Name:user.displayName,Email:user.email,IsAdmin:false,ProfilePic:user.photoURL}
                            })
                        })
                        .catch(function(error) {
                            console.error("Error writing document: ", error);
                            dispatch({
                              type:LOGIN_USER_ERROR,
                              payload: "Some Error Occured Try Again !!"
                            })
                        });
                    console.log(user);
                }
            }).catch(function(error) {
                console.log("Error getting documents: ", error);
                dispatch({
                  type:LOGIN_USER_ERROR,
                  payload: "Some Error Occured Try Again !!"
                })
              });
           
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
  return async (dispatch)=>{
    dispatch({
      type:LOGIN_USER_REQUEST,
      payload: ""
    })
    const db = firebase.firestore();
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      var docRef = db.collection("users").doc(user.email);
      docRef.get().then(function(doc) {
          if (doc.exists) {
              console.log("Already Registered !");
              dispatch({
                type:LOGIN_USER_SUCCESS,
                payload:{Name:doc.data().Name,Email:doc.data().Email,IsAdmin:doc.data().IsAdmin,ProfilePic:doc.data().ProfilePic}
              })
          } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
              console.log("Not Already Registered !!!");
              db.collection("users").doc(user.email).set({
                      Name: user.displayName,
                      Email: user.email,
                      IsAdmin: false,
                      ProfilePic: user.photoURL,
                  })
                  .then(function() {
                      console.log("Document successfully written!");
                      dispatch({
                        type:LOGIN_USER_SUCCESS,
                        payload:{Name:user.displayName,Email:user.email,IsAdmin:false,ProfilePic:user.photoURL}
                      })
                  })
                  .catch(function(error) {
                      console.error("Error writing document: ", error);
                      dispatch({
                        type:LOGIN_USER_ERROR,
                        payload: "Some Error Occured Try Again !!"
                      })
                  });
              console.log(user);
          }
      }).catch(function(error) {
          console.log("Error getting documents: ", error);
          dispatch({
            type:LOGIN_USER_ERROR,
            payload: "Some Error Occured Try Again !!"
          })
        });

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

export const logout = () =>{
  return async (dispatch) =>{
    firebase.auth().signOut().then(function() {
      dispatch({
        type:LOGOUT_USER_SUCCESS,
      })
    }).catch(function(error) {
      // An error happened.
      dispatch({
        type: LOGOUT_USER_ERROR
      })
    });
  }
}

export const auth = () => {
  return async (dispatch) => {
    console.log("Running Auth")
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        dispatch({
          type:LOGIN_USER_SUCCESS,
          payload:user
        })
      } else {
        dispatch({
          type:LOGOUT_USER_SUCCESS,
        })
      }
    });
  }
}

export const resetPassword = (User) => {
  return async (dispatch) => {
    firebase
    .auth()
    .sendPasswordResetEmail(User.email)
    .then(() =>
      dispatch({
        type: RESET_SUCCESS,
        payload:
          "Check your inbox. We've sent you a secured reset link by e-mail."
      })
      
    )
    .catch(function(error) {
      // An error happened.
      dispatch({
        type: RESET_ERROR,
        payload: "Some Error Occured Try Again !!"
      })
    });
  }
}

