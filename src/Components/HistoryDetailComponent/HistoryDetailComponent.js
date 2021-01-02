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


const Cards = () => { 
  console.log('started')
  init()
  function init()
  {
    if(document.querySelector(".cards_carousal"))
    {
      let cards = document.querySelector(".cards_carousal");
      cards.addEventListener('click', clicked, false);
      document.querySelectorAll(".cards_carousal .card_co")[1].click();
    }
  }

 
  function clicked(e)
  {
    let card = e.target;
    if(card.getAttribute("data-card")){rearrange(card.getAttribute("data-card"));}
  }
  
  function rearrange(card)
  {
    let cards = document.querySelectorAll(".cards_carousal .card_co");
    for(let n = 0; n < cards.length; n++)
    {
      cards[n].classList.remove("card--left");
      cards[n].classList.remove("card--center");
      cards[n].classList.remove("card--right");
    }
    cards[card].classList.add("card--center");
    if(card == 0)
    {
      cards[2].classList.add("card--left");
      cards[1].classList.add("card--right");
    }
    if(card == 1)
    {
      cards[0].classList.add("card--left");
      cards[2].classList.add("card--right");
    }
    if(card == 2)
    {
      cards[1].classList.add("card--left");
      cards[0].classList.add("card--right");
    }
  }
};


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

    useEffect(()=>{
      if(user.history)
      {
        for(let i=0;i< user.history.length; i++){
          if(user.history[i].contestid === contest_id)
          {
            setcontest(user.history[i])
            break;
          }
        }
      }
    },[user.history,contest_id])

    useEffect(() => {
        if(contest && contest.Movies)
        fetchData().then((arr)=>{
        setmoviedetail(arr);
        })
    },[contest])

    async function fetchData(){
      let arr = [];
      for(let i=0;i<contest.Movies.length;i++){
        let element = contest.Movies[i];
        let res = await axios(`https://api.themoviedb.org/3/movie/${element.movieId}?api_key=${TMDB_API_KEY}`)
            let x=res.data
            arr.push({...x,rank:element.rank,votes:element.votes})
            if(i===contest.Movies.length-1)
              return arr;
      }  
    }

    if(user.isLoading)
    return(
      <CircularProgress style={{marginTop:"25vw"}} color="secondary" ></CircularProgress>
    )
    return (
      <div className="wrapper3">
      <div className="cards_carousal">
      <div className="card_co fill-orange" data-card="0">
     <div className="card__icon" data-icon="1"></div>
     <div className="card__detail">details</div>
    </div>
     <div className="card_co fill-orange" data-card="1">
    <div className="card__icon" data-icon="2"></div>
    <div className="card__detail">details</div>
   </div>
   <div className="card_co fill-orange" data-card="2">
   <div className="card__icon" data-icon="3"></div>
   <div className="card__detail">details</div>
   </div>
  </div>
  </div>
    );
};

export default HistoryDetailComponent;