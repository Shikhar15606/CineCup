import React,{useEffect,useState} from 'react';
import firebase from 'firebase';
import './LeaderboardStyles.css';
import axios from 'axios';
import {TMDB_API_KEY} from '../../key/key';
import { Link } from 'react-router-dom';
import Badge from '@material-ui/core/Badge';
import {useSelector,useDispatch} from 'react-redux';
import {fetchMoviesData} from '../../action/movie_actions';

const LeaderboardPageComponent = () => {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    let result = user.movies ? user.movies : [] ;
    console.log("😊😊😊😊",result,"😊😊😊😊");
    // const db = firebase.firestore();
    // const [list,setlist] = useState([]); 
    // const [result,setresult] = useState([]); 
    // const [isloading,setisloading] = useState(false);
    // const fetchData = () => {
    //     setisloading(true);
    //     db.collection('movies').orderBy("Votes", "desc").get()
    //     .then(function(querySnapshot) {
    //         let arr = []
    //         let i = 1;
    //         querySnapshot.forEach(function(doc) {
    //             arr.push({id:doc.data().MovieId, votes:doc.data().Votes, rank:i})
    //             i++;
    //         });
    //         setlist(arr);
    //         console.log(list);
    //     })
    //     .catch(function(error) {
    //         console.log("Error getting documents: ", error);
    //     });
    // }
    // useEffect(() => {
    //     fetchData();
    // },[])

    // useEffect(() => {
    //     let arr = [];
    //     list.forEach(element => {
    //         console.log(element)
    //     axios(`https://api.themoviedb.org/3/movie/${element.id}?api_key=${TMDB_API_KEY}`)
    //     .then((res) => {
    //         arr.push({...res.data, rank:element.rank, votes:element.votes});  
    //     })
    //     });
    //     setresult(arr);
    //     setisloading(false);
    // },[list])



    function RenderCard ({r}) {     
          return(  
            <Badge  anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }} badgeContent={<b style={{fontSize:"20px"}}># {r.rank}</b>} color="error" overlap="circle">
            <Link to={`/movie/${r.id}`} className="cards cards--two"  >
              <img src={`https://image.tmdb.org/t/p/w500/${r.poster_path}`} alt="Cards Image"/>
              <span class="cards--two__rect"></span>
              <span class="cards--two__tri"></span>
              <p>{r.title}</p>
              <ul className="cards__list">
                <li>{r.votes} Votes</li>
              </ul>
            </Link>
            </Badge> 
          )
        }
    
    return (
        <div className="wrapper2">
            <header>
                <h1>LeaderBoard</h1>
            </header>
            <div className="card__collection clear-fix">
            {  
                result.length !== 0 ?
                (
                  result.map((resul) => (              
                  <RenderCard key={resul.id} r={resul}  />   
                  ))
                )
                :(<p>
                       Loading ....
                 </p>)
              }
            </div>
        </div>
    );
};

export default LeaderboardPageComponent;