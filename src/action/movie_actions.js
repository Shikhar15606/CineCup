import firebase from 'firebase';
import axios from 'axios';
import {TMDB_API_KEY} from '../key/key';
import {
    FETCH_MOVIES_DATA_REQUEST,
    FETCH_MOVIES_DATA_SUCCESS
} from './types';

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
            let result = [];
            arr.forEach(element => {
            axios(`https://api.themoviedb.org/3/movie/${element.id}?api_key=${TMDB_API_KEY}`)
            .then((res) => {
                result.push({...res.data, rank:element.rank, votes:element.votes});  
            })
            })
            dispatch({
                type:FETCH_MOVIES_DATA_SUCCESS,
                payload:result
            })
        })
    }
}