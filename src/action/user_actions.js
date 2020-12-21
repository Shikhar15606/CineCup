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
    NOMINATE_MOVIE_REQUEST,
    NOMINATE_MOVIE_ERROR,
    NOMINATE_MOVIE_SUCCESS,
    RESET_ERROR,
    RESET_SUCCESS,
    REMOVE_NOMINATE_MOVIE_ERROR,
    REMOVE_NOMINATE_MOVIE_SUCCESS,
    REMOVE_NOMINATE_MOVIE_REQUEST,
    AUTH_USER_SUCCESS,
    AUTH_USER_ERROR
} from './types';

//============================================== Register =================================================

export const register = (User) => {
    return async (dispatch) => {
        dispatch({
          type:REGISTER_USER_REQUEST
        })
        //
        const db = firebase.firestore();
        firebase.auth()
        .createUserWithEmailAndPassword(User.email, User.password)
          .then(dataBeforeEmail => {
            firebase.auth().onAuthStateChanged(user=> {
              user.sendEmailVerification()
              .then(dataAfterEmail => {
                firebase.auth().onAuthStateChanged(function(user) {
                  if (user) {
                    // Sign up successful
                    console.log(user);
                    db.collection("users").doc(User.email).set({
                      Name: `${User.firstname} ${User.lastname}`,
                      Email: User.email,
                      IsAdmin: false,
                      ProfilePic: "https://icons.iconarchive.com/icons/icons8/android/256/Users-User-icon.png",
                      Nominations:[]
                    }).then(()=>{
                      dispatch({
                        type: REGISTER_USER_SUCCESS,
                        payload:
                          "Your account was successfully created! Now you need to verify your e-mail address, please go check your inbox."
                      })
                    }).catch(function(error) {
                      console.error("Error writing document: ", error);
                      dispatch({
                        type:REGISTER_USER_ERROR,
                        payload: "Some Error Occured Try Again !!"
                      })
                    })
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
              // Error in sending mail
              .catch(error => {
                console.log(error);
                dispatch({
                  type:REGISTER_USER_ERROR,
                  payload: "Sorry We are unable to send Email Verification Link at this moment."
                })
              })
            });
          })
          // User Not Created Means Email Already Registered
          .catch(error => {
              console.log(error);
              dispatch({
                type:REGISTER_USER_ERROR,
                payload: "This Email is already registered. Kindly Login"
              })
          })
}}

// =================================== Simple Login ===========================================

export const login = (User) => {
  return async (dispatch) => {
    dispatch({
      type:LOGIN_USER_REQUEST,
    })

    firebase.auth().signInWithEmailAndPassword(User.email, User.password)
    .then((user) => {
      if(firebase.auth().currentUser.emailVerified)
      {
        dispatch({
          type:LOGIN_USER_SUCCESS,
          payload:{Name:user.Name, Email:user.Email, IsAdmin:user.IsAdmin,ProfilePic:user.ProfilePic,Nominations:user.Nominations}
        })
      }  
      else{
        firebase.auth().signOut().then(function() {
          dispatch({
            type:LOGIN_USER_ERROR,
            payload: "Kindly Verify Your Email"
          })
        })
      }    
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      dispatch({
        type:LOGIN_USER_ERROR,
        payload: error.message
      })
    });
  }
}

// ============================================== Google Login ======================================

export const loginwithgoogle = () => {
    return async (dispatch) => {
        dispatch({
          type:LOGIN_USER_REQUEST,
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
                      payload:{Name:doc.data().Name,Email:doc.data().Email,IsAdmin:doc.data().IsAdmin,ProfilePic:doc.data().ProfilePic,Nominations:doc.data().Nominations}
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
                            Nominations:[]
                        })
                        .then(function() {
                            console.log("Document successfully written!");
                            dispatch({
                              type:LOGIN_USER_SUCCESS,
                              payload:{Name:user.displayName,Email:user.email,IsAdmin:false,ProfilePic:user.photoURL,Nominations:[]}
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

// ======================================= FaceBook Login =================================================

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
                payload:{Name:doc.data().Name,Email:doc.data().Email,IsAdmin:doc.data().IsAdmin,ProfilePic:doc.data().ProfilePic,Nominations:doc.data().Nominations}
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
                      Nominations:[]
                  })
                  .then(function() {
                      console.log("Document successfully written!");
                      dispatch({
                        type:LOGIN_USER_SUCCESS,
                        payload:{Name:user.displayName,Email:user.email,IsAdmin:false,ProfilePic:user.photoURL,Nominations:[]}
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

// ===================================================== Logout ================================================

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

// ================================================= Auth ====================================================
export const auth = () => {
  return async (dispatch) => {
    console.log("Running Auth")
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        const db = firebase.firestore();
        var docRef = db.collection("users").doc(user.email);
        docRef.get().then(function(doc) {
            if (doc.exists && user.emailVerified) {
                dispatch({
                  type:AUTH_USER_SUCCESS,
                  payload:{Name:doc.data().Name,Email:doc.data().Email,IsAdmin:doc.data().IsAdmin,ProfilePic:doc.data().ProfilePic,Nominations:doc.data().Nominations}
                })
            }
            else {
              dispatch({
                type:AUTH_USER_ERROR,
                payload:"Kindly Verify Your Email"
              })
            }
          })
        } else{
          dispatch({
            type:AUTH_USER_ERROR,
            payload:""
          })
        }
      });
    }
  }
// ================================================= Nominate ================================================== 
export const nominate = (user) => {
  return async (dispatch) => {
    dispatch({
      type:NOMINATE_MOVIE_REQUEST
    })
    const db = firebase.firestore();
    var userRef = db.collection('users').doc(user.Email);
    userRef.get().then(function(doc) {
      if (doc.exists) {
        console.log(doc.data().Nominations.length);
        console.log(doc.data().Nominations.includes(user.movieId.toString));
        if(doc.data().Nominations.length < 5 && !doc.data().Nominations.includes(user.movieId))
        {
          // Get a new write batch
          var batch = db.batch();

          var usersRef = db.collection('users').doc(user.Email);
          var moviesRef = db.collection('movies').doc(user.movieId.toString());
          batch.set(usersRef,{
            Nominations: firebase.firestore.FieldValue.arrayUnion(user.movieId)
          },{ merge: true })
          batch.set(moviesRef, {
            MovieId: user.movieId.toString(),
            Votes: firebase.firestore.FieldValue.increment(1)
          }, { merge: true })

          // Commit the batch
          batch.commit().then(function () {
          dispatch({
            type:NOMINATE_MOVIE_SUCCESS,
            payload:user.movieId,
            successmsg:"You have successfully nominated the movie."
          })
          });
        }
        else if(doc.data().Nominations.includes(user.movieId)) {
          dispatch({
            type:NOMINATE_MOVIE_ERROR,
            payload:"You have already nominated that movie"
          })
        }
        else{
          dispatch({
            type:NOMINATE_MOVIE_ERROR,
            payload:"You have already nominated 5 movies"
          })
        }
      } else {
        dispatch({
          type:NOMINATE_MOVIE_ERROR,
          payload:"Some Error Occred. Better Luck Next Time !!"
        })
      }
    })
    .catch(function(error) {
      dispatch({
        type:NOMINATE_MOVIE_ERROR,
        payload:`Some Error Occred. Try again !!`
      })
    });
  }
}

// ================================================= Reset Password ================================================== 

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
        payload: `Some Error Occured Try Again !! ${error}`
      })
    });
  }
}

// =================================================Remove Nominate ================================================== 


export const remove_nominate = (user) => {
  return async (dispatch) => {
    dispatch({
      type:REMOVE_NOMINATE_MOVIE_REQUEST
    })
    const db = firebase.firestore();
    var userRef = db.collection('users').doc(user.Email);
    userRef.get().then(function(doc) {
      if (doc.exists) {
        console.log(doc.data().Nominations.length);
        console.log(doc.data().Nominations.includes(user.movieId.toString));
        if(doc.data().Nominations.includes(user.movieId))
        {
          // Get a new write batch
          var batch = db.batch();

          var usersRef = db.collection('users').doc(user.Email);
          var moviesRef = db.collection('movies').doc(user.movieId.toString());
          batch.set(usersRef,{
            Nominations: firebase.firestore.FieldValue.arrayRemove(user.movieId)
          },{ merge: true })

        if(moviesRef.Votes === 1){
         batch.delete(moviesRef);
        }
        else {
          batch.set(moviesRef, {
            MovieId: user.movieId.toString(),
            Votes: firebase.firestore.FieldValue.increment(-1)
          }, { merge: true })
        }
          // Commit the batch
          batch.commit().then(function () {
          dispatch({
            type:REMOVE_NOMINATE_MOVIE_SUCCESS,
            payload:usersRef.Nominations,
            successmsg:"Movie has been removed from your Nominations"
          })
          });
        }
        else if(!doc.data().Nominations.includes(user.movieId)) {
          dispatch({
            type:REMOVE_NOMINATE_MOVIE_ERROR,
            payload:"You have not nominated that movie"
          })
        }
        else{
          dispatch({
            type:REMOVE_NOMINATE_MOVIE_ERROR,
            payload:"You have already nominated 5 movies"
          })
        }
      } else {
        dispatch({
          type:REMOVE_NOMINATE_MOVIE_ERROR,
          payload:"Some Error Occred. Better Luck Next Time !!"
        })
      }
    })
    .catch(function(error) {
      dispatch({
        type:REMOVE_NOMINATE_MOVIE_ERROR,
        payload:`Some Error Occred. Try again !!`
      })
    });
  }
}