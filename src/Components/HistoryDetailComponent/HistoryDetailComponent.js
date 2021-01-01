import React,{useState,useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {TMDB_API_KEY} from '../../key/key';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import './HistoryDetailStyle.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      alignSelf:"center",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      margin: 0 ,
      width: '60%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: '20%',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color:"white"
    },
    inputRoot: {
      color: 'inherit',
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      color:"white",
  
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '70%',
      [theme.breakpoints.up('sm')]: {
        width: '50ch',
        '&:focus': {
          width: '60ch',
        },
      },
    },
    paper: {
      // padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      height:200,
      
      display:"flex",
      flexDirection:"row",
    },
  }));


  function RenderCard ({r}) {     
      
    return(  
<div className="wraap" id="movie_card">
<div class="courses-container">

<div class="course">
  <div class="course-preview">
<img src={`https://image.tmdb.org/t/p/w500/${r.poster_path}`} alt="Cards Image" className="movie_image"/>
  </div>
  <div class="course-info">
    <h2>{r.title}</h2>
<h3>Votes : {r.votes}</h3>
      <h6>{r.rank}</h6>
<h4 className="genre_list">{
  r.genres.map(genre=>{
    return <span> {genre.name} </span>
  })
}</h4>
<Link to={`/movie/${r.id}`}   >
      <button class="btn">Explore</button>
</Link>
  </div>
</div>

</div>
</div> 
       
    )
  }

const HistoryDetailComponent = () => {
    const user = useSelector(state => state.user);
    const { contest_id } = useParams();
    const [moviedetail,setmoviedetail] = useState([]);
    const [contest,setcontest] = useState({});
    const classes = useStyles();

    async function getelement(){
        for(let i=0;i< user.history.length; i++){
            if(user.history[i].contestid === contest_id)
                return user.history[i];
        }
    }
    useEffect(() => {
        if(user.history)
        getelement()
        .then((contest)=>{
            let arr = [];
            contest.Movies.forEach(element => {
                axios(`https://api.themoviedb.org/3/movie/${element.movieId}?api_key=${TMDB_API_KEY}`)
                .then((res) => {
                    let x=res.data
                    arr.push({...x,rank:element.rank,votes:element.votes});  
                })
            });
            setcontest(contest);
            setmoviedetail(arr);
        })
    },[user.history])

    return (
        <div className="wrapper2">
            <header>
                <h1>{`Result ${contest.Name}`}</h1>
                <div >
            </div>
            </header>
            
            <div className="card__collection clear-fix" id="leaderboard_cards"   >
            {  
                moviedetail.length !== 0 ?
                (
                  moviedetail.map((resul) => (              
                  <RenderCard key={resul.id} r={resul}  />   
                  ))
                )
                :(
                  <p style={{color:"white"}}> Nothing Here </p>
                 )
              }
            </div>
        </div>
    );
};

export default HistoryDetailComponent;