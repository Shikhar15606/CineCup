import firebase from 'firebase';
import axios from 'axios';
import {TMDB_API_KEY,USERNAME,PASSWORD,API} from '../key/key';
import {
    FETCH_MOVIES_DATA_REQUEST,
    FETCH_MOVIES_DATA_SUCCESS,
    BLACKLIST_MOVIE_SUCCESS,
    BLACKLIST_MOVIE_FAILURE,
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
    ADD_ANNOUNCEMENT_SUCCESS,
    ADD_ANNOUNCEMENT_FAILURE,
    REMOVE_ANNOUNCEMENT_FAILURE,
    REMOVE_ANNOUNCEMENT_SUCCESS
} from './types';

// ==================================== Fetching Movies Data =======================================
export const fetchMoviesData = () => {
    return async (dispatch) => {
        dispatch({
            type: FETCH_MOVIES_DATA_REQUEST
        })
        const db = firebase.firestore();
        let unsubscribe = db.collection('movies')
        .orderBy("Votes", "desc")
        .onSnapshot(function(querySnapshot) {
            let arr = []
            let i = 1;
            let j = 1;
            let prevVotes,currVotes;
            querySnapshot.forEach(function(doc) {
                currVotes = doc.data().Votes;
                if(i===1)
                    prevVotes = doc.data().Votes;
                if(prevVotes!==currVotes)
                {
                    j = i;
                    prevVotes = currVotes;
                }
                arr.push({id:doc.data().MovieId, votes:doc.data().Votes, rank:j})
                i++;
            });
            console.log(arr.length)
            xyz(arr)
            .then((result)=>{
                dispatch({
                    type:FETCH_MOVIES_DATA_SUCCESS,
                    payload:result
                })
            })
        })
    }
}

async function xyz (arr){
    let r = [];
    for (let i = 0; i < arr.length; i++) {
        let element = arr[i];
        let res = await axios(`https://api.themoviedb.org/3/movie/${element.id}?api_key=${TMDB_API_KEY}`)
        r.push({...res.data, rank:element.rank, votes:element.votes}); 
            if(i === arr.length - 1)
            {
                console.log("BEEP Beep Beep",r.length,"BEEP Beep Beep");
                return r;
            } 
      }
}
// ================================ Fetching History ===========================================
export const fetchHistory = () => {
    return async (dispatch) => {
        dispatch({
            type: FETCH_MOVIES_DATA_REQUEST
        })
        const db = firebase.firestore();
        let unsubscribe = db.collection('history').orderBy("Start",'desc')
        .onSnapshot(function(querySnapshot) {
            let arr = []
            querySnapshot.forEach(function(doc) {
                if(doc.data().End){
                    let sdate; 
                let sDay;
                let sTime;
                if(doc.data().Start){
                   sdate = new Date(doc.data().Start.toMillis());
                   sDay = `${sdate.getDate()} ${sdate.toLocaleString('default', { month: 'short' })},${sdate.getFullYear()}`;
                   sTime = `${sdate.getHours()}:${sdate.getMinutes()}`;
                }
                let edate;
                let eDay;
                let eTime;
                if(doc.data() && doc.data().End ){
                    edate = new Date(doc.data().End.toMillis());
                    eDay = `${edate.getDate()} ${edate.toLocaleString('default', { month: 'short' })},${edate.getFullYear()}`;
                    eTime = `${edate.getHours()}:${edate.getMinutes()}`;
                }
                arr.push({...doc.data(),contestid:doc.id,sDay:sDay,sTime:sTime,eDay:eDay,eTime:eTime})
                }
            });
            console.log(arr.length)
            dispatch({
                type:FETCH_HISTORY_SUCCESS,
                payload:arr
            })
        })
    }
}

// ================================ Fetching Blacklisted Movies ==================================

export const fetchBlackListedMovies = () => {
    return async (dispatch) => {
        dispatch({
            type: FETCH_MOVIES_DATA_REQUEST
        })
        const db = firebase.firestore();
        let unsubscribe = db.collection('blacklist')
        .onSnapshot(function(querySnapshot) {
            let arr = []
            querySnapshot.forEach(function(doc) {
                arr.push(doc.id)
            });
            console.log(arr.length)
            dispatch({
                type:BLACKLIST_MOVIE_FETCH,
                payload:arr
            })
        })
    }
}

// ================================== Blacklisting Movie =========================================

export const blackListMovie = ({movieId,movieName,token}) => {
    return async (dispatch) => {
        const db = firebase.firestore();
        // getting all users and removing blacklisted movie from their nominations
        db.collection("users").get()
        .then(async function(querySnapshot) {
            var batch = db.batch();

            let mailto = [];

            querySnapshot.forEach(doc => {
                var usersref = db.collection("users").doc(doc.id);
                    if(doc.data().Nominations.includes(movieId))
                        mailto.push(doc.data().Email);
                    batch.set(usersref,{
                        Nominations: firebase.firestore.FieldValue.arrayRemove(movieId)
                      },{ merge: true });
            })

            console.log("Tu Phodega Tu Phodega Tu Phodega",mailto);
            // adding movie to blacklist
            let blacklistRef = db.collection('blacklist').doc(movieId.toString())
            batch.set(blacklistRef, {
                MovieId: movieId.toString(),
            })
    
            // deleting movie and it's votes from movies
            let moviesRef = db.collection('movies').doc(movieId.toString())
            batch.delete(moviesRef)

            let res = await axios.post(`${API}/token`,{username:USERNAME,password:PASSWORD});
            console.log(res);
            if(res.data.accessToken){
                let token = res.data.accessToken;
                axios.post(`${API}/send`,{receivers:mailto,movieName:movieName},
                {
                    headers: {
                    Authorization: `Bearer ${token}`,
                }
                })
                .then((res)=>{
                    console.log(res);
                })
            }
            // Commit the batch
            batch.commit()
            .then(function () {
                dispatch({
                    type:BLACKLIST_MOVIE_SUCCESS,
                })
            });             
        });
    }
}

// ======================================= Removing Blacklisted Movie ===============================
export const removeBlacklistedMovie = ({movieId}) => {
    return async (dispatch) => {
        const db = firebase.firestore();
        db.collection("blacklist").doc(movieId.toString()).delete()
        .then(function() {
            console.log("Document successfully deleted!");
            dispatch({
                type:REMOVE_BLACKLISTED_MOVIE_SUCCESS
            })
        }).catch(function(error) {
            console.error("Error removing document: ", error);
            dispatch({
                type:REMOVE_BLACKLISTED_MOVIE_FAILURE,
                payload:error
            })
        });
    }
}
// Get ---------------------------VotingOnOff---------------------------------------
export const getVotingOnOff = () =>{
    return async (dispatch) => {
        dispatch({
            type: FETCH_MOVIES_DATA_REQUEST
        })
        const db = firebase.firestore();
        var docRef = db.collection("on").doc("onoroff");
        docRef.get().then(function(doc) {
            if (doc.exists) {
                dispatch({
                    type:FETCH_VOTING_SUCCESS,
                    payload:doc.data().on
                })
            } else {
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
    }
}

// ===================================== Start Voting =====================================
export const startVoting = ({Name}) =>{
    return async (dispatch) => {
        dispatch({
            type: FETCH_MOVIES_DATA_REQUEST
        })
        const db = firebase.firestore();
        var docRef = db.collection("on").doc("onoroff");
        docRef.update({
            on: true
        })
        .then(function() {
            db.collection("history").add({
                Name: Name,
                Start:new Date(),
                Ongoing:true,
            })
            .then(function(docRef) {
                console.log("Document written with ID: ", docRef.id);
                dispatch({
                    type:START_VOTING_SUCCESS
                })
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
                dispatch({
                    type:START_VOTING_FAILURE
                })
            });
            
        })
        .catch(function(error) {
            console.error("Error updating document: ", error);
            dispatch({
                type:START_VOTING_FAILURE
            })
        });
    }
}

// ===================================== myfunction ======================================
async function myfunction({docs}){
    let topThree = [];
    console.log(docs.length);
    for(let i=0;i<docs.length;i++)
    {
        let doc = docs[i];
        topThree.push({movieId:doc.data().MovieId,votes:doc.data().Votes,rank:i+1});
        if(i === docs.length-1)
            return topThree;
    }
    return topThree;
}

// ===================================== End Voting =======================================

export const stopVoting = () => {
    return async (dispatch) => {
        try{
            const db = firebase.firestore();
            // =================== Getting the top 3 movies =======================
            let movieRef = db.collection("movies").orderBy("Votes", "desc")
            let querySnapshot = await movieRef.get()
            // ================= Storing top three in movies array =================
            let topThree = await myfunction(querySnapshot)
            if(topThree.length)
            {
                var batch = db.batch();
                db.collection('history').where("Ongoing", "==", true)
                .get()
                .then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {
                        let history = db.collection('history').doc(doc.id)
                        batch.set(history, {
                            Movies:topThree,
                            Ongoing:false,
                            End:new Date()
                        },{merge: true})
                    });
                    // =========================== Set voting on to false =================================
                    let onRef = db.collection('on').doc('onoroff')
                    batch.set(onRef,{
                        on:false
                    })
                    // =========================== Deleting Votes of all Movies ===========================
                    db.collection("movies").get()
                    .then(function(querySnapshot) {
                        querySnapshot.forEach(function(doc) {
                            let x = db.collection("movies").doc(doc.id);
                            batch.delete(x);
                        });
                        // =========================== Removing all nominations =======================
                        db.collection("users").get()
                        .then(function(querySnapshot) {
                            querySnapshot.forEach(function(doc) {
                                let x = db.collection("users").doc(doc.id);
                                batch.update(x,{Nominations:[]})
                            });
                            // Commit the batch
                            batch.commit()
                            .then(function () {
                                dispatch({
                                    type:END_VOTING_SUCCESS,
                                })
                            })
                            .catch(function(error) {
                                dispatch({
                                    type:END_VOTING_FAILURE
                                })
                            })
                        })
                        .catch(function(error) {
                            dispatch({
                                type:END_VOTING_FAILURE
                            })
                        })
                    })
                    .catch(function(error) {
                        dispatch({
                            type:END_VOTING_FAILURE
                        })
                    });
                })
                .catch(function(error) {
                    dispatch({
                        type:END_VOTING_FAILURE
                    })
                });
            }
            else{
                dispatch({
                    type:END_VOTING_FAILURE
                })
            }
        }
        catch(err){
            dispatch({
                type:END_VOTING_FAILURE
            })
        }
    }
}

// ================================= fetch announcement ================================

export const getAnnouncement = () =>{
    return async (dispatch) => {
        dispatch({
            type: FETCH_MOVIES_DATA_REQUEST
        })
        const db = firebase.firestore();
        var docRef = db.collection("on").doc("announce");
        docRef.onSnapshot(function(doc) {
            if (doc.exists) {
                dispatch({
                    type:FETCH_ANNOUNCEMENT_SUCCESS,
                    payload:doc.data().list
                })
            } else {
                console.log("No such document!");
            }
        })
    }
}

// ============================== add announcement ======================================
export const addAnnouncement = (announcement) => {
    return async (dispatch) => {
        const db = firebase.firestore();
        var announcementRef = db.collection("on").doc("announce");
        announcementRef.update({
            list: firebase.firestore.FieldValue.arrayUnion(announcement)
        })
        .then(()=>{
            dispatch({
                type:ADD_ANNOUNCEMENT_SUCCESS
            })
        })
        .catch((err)=>{
            dispatch({
                type:ADD_ANNOUNCEMENT_FAILURE
            })
        })
    }
}


// ============================= REMOVE ANNOUNCEMENT =====================================
export const removeAnnouncement = (announcement) => {
    return async (dispatch) => {
        const db = firebase.firestore();
        var announcementRef = db.collection("on").doc("announce");
        announcementRef.update({
            list: firebase.firestore.FieldValue.arrayRemove(announcement)
        })
        .then(()=>{
            dispatch({
                type:REMOVE_ANNOUNCEMENT_SUCCESS
            })
        })
        .catch((err)=>{
            dispatch({
                type:REMOVE_ANNOUNCEMENT_FAILURE
            })
        })
    }
}