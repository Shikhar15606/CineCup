import firebase from 'firebase';
import axios from 'axios';
import {TMDB_API_KEY} from '../key/key';
import {
    FETCH_MOVIES_DATA_REQUEST,
    FETCH_MOVIES_DATA_SUCCESS,
    BLACKLIST_MOVIE_SUCCESS,
    BLACKLIST_MOVIE_FAILURE,
    BLACKLIST_MOVIE_FETCH,
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
            dispatch({
                type: FETCH_MOVIES_DATA_REQUEST
            })
            let arr = []
            let i = 1;
            querySnapshot.forEach(function(doc) {
                arr.push({id:doc.data().MovieId, votes:doc.data().Votes, rank:i})
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

export const blackListMovie = ({movieId}) => {
    return async (dispatch) => {
        dispatch({
            type: FETCH_MOVIES_DATA_REQUEST
        })
        const db = firebase.firestore();
        // getting all users and removing blacklisted movie from their nominations
        db.collection("users").get()
        .then(async function(querySnapshot) {
            var batch = db.batch();
            
            querySnapshot.forEach(doc => {
                var usersref = db.collection("users").doc(doc.id);
                    batch.set(usersref,{
                        Nominations: firebase.firestore.FieldValue.arrayRemove(movieId)
                      },{ merge: true });
            })

            // adding movie to blacklist
            let blacklistRef = db.collection('blacklist').doc(movieId.toString())
            batch.set(blacklistRef, {
                MovieId: movieId.toString(),
            })
    
            // deleting movie and it's votes from movies
            let moviesRef = db.collection('movies').doc(movieId.toString())
            batch.delete(moviesRef)

            // Commit the batch
            batch.commit()
            .then(function () {
                dispatch({
                    type:BLACKLIST_MOVIE_SUCCESS,
                    payload:movieId,
                    successmsg:"Movie BlackListed SuccessFully"
                })
            });             
        });
    }
}

