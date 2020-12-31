import firebase from 'firebase';
import axios from 'axios';
import {TMDB_API_KEY} from '../key/key';
import {
    FETCH_MOVIES_DATA_REQUEST,
    FETCH_MOVIES_DATA_SUCCESS,
    BLACKLIST_MOVIE_SUCCESS,
    BLACKLIST_MOVIE_FAILURE,
    BLACKLIST_MOVIE_FETCH,
    REMOVE_BLACKLISTED_MOVIE_SUCCESS,
    REMOVE_BLACKLISTED_MOVIE_FAILURE,
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
        dispatch({
            type: FETCH_MOVIES_DATA_REQUEST
        })
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

            

            axios.post('https://cinecup-backend.herokuapp.com/send',{receivers:mailto,movieName:movieName},
            {
                headers: {
                Authorization: `Bearer ${token}`,
              }
            })
            .then((res)=>{
                console.log(res);
            })

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

