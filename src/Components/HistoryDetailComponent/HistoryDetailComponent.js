import React,{useState,useEffect} from 'react';
import {useSelector} from 'react-redux';
import {TMDB_API_KEY} from '../../key/key';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import './HistoryDetailStyle.css';
import CircularProgress from '@material-ui/core/CircularProgress';

import { fade, makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { faStar} from '@fortawesome/free-solid-svg-icons';

import { faArrowCircleRight} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  useWindowSize,
} from '@react-hook/window-size'
import Confetti from 'confetti-react';

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
      let x=r.rank - 1
    return(  
      <>
      <div className="card_co fill-blue" data-card={x}>
      <div className="card__icon" >
      <img src={`https://image.tmdb.org/t/p/w500/${r.poster_path}`} alt="Cards Image" className="card--image"/>
      </div>
      <div className="card__detail">
        <h1>
          <span className="star">
          <FontAwesomeIcon icon={faStar} color="#FFD700" size="2x" >
        
        </FontAwesomeIcon>
          </span>
       
        <span className="ranky">
        {r.rank}
        </span>
        
        </h1>
     
        <h1>{r.title}</h1>
        <h1>Votes : {r.votes}</h1>
        </div>
     </div>
      
     </>  
    )
  }

const HistoryDetailComponent = () => {
    const user = useSelector(state => state.user);
    const { contest_id } = useParams();
    const [moviedetail,setmoviedetail] = useState([]);
    const [contest,setcontest] = useState({});
    const classes = useStyles();
    const [width, height] = useWindowSize()

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
    useEffect(()=>{
      Cards()
    })
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
       <div className="wrapper3">
      <CircularProgress style={{marginTop:"25vw"}} color="secondary" ></CircularProgress>
      </div>
    )
    return (
      <div className="wrapper3">
        <div style={{height:"100vh"}}>
        <Confetti width={width} height={height} style={{zIndex:"10"}} numberOfPieces={300}/>
          <div className="head_det">
          <h1>Winners of  {contest.Name}</h1>
          </div>
            {  
                  moviedetail.length !== 0 ?
                  (
                  <div className="cards_carousal">
                    {
                    moviedetail.slice(0,3).map((resul) => (              
                    <RenderCard key={resul.id} r={resul}  />   
                    ))
                    }
                  </div>
                  
                  
                  )
                  :(
                    <CircularProgress style={{marginTop:"15vw"}} color="secondary" ></CircularProgress>
                  )
          }
        </div>
         <div className="wrapper_history1">
                     
                     <div className="list">
                       <div className="list__header">
                         <h1>Standings</h1>
                        
                         
                       </div>
                       <div className="list__body">
                         <table className="list__table" id="list-table">
                         <tr className="header_row">
                         <th className="list__cell">Rank</th>
                       <th className="list__cell">Movie</th>
                       <th className="list__cell">Genre</th>
                       <th className="list__cell">Votes</th>
                       <th class="list__cell">Explore</th>
                     </tr>
                         
                        {  
                                 moviedetail.length !== 0 ?  
                                   (
                                    moviedetail.map((resul) => (              
                                       <tr className="list__row" >
                            
                            <td className="list__cell"><span className="list__value">{resul.rank}</span></td>
                            <td className="list__cell"><span className="list__value">{resul.title}</span></td>
                            <td className="list__cell">
                              {
                            resul.genres.slice(0,1).map(genre=>{
                             return <span> {genre.name} </span>
                           })
                         }</td>
                           
                            <td className="list__cell"><span className="list__value">{resul.votes}</span></td>
                            <td className="list__cell"> 
                            <Link to={`/movie/${resul.id}`}   >
                            <span class="list__value"><FontAwesomeIcon icon={faArrowCircleRight} /></span> 
                            </Link></td>
                          </tr>
                                     ))
                                   )
                                   :(
                                     <p style={{color:"white"}}> Nothing Here </p>
                                    )
                                 }              
                         
                           
                     
                           
                         </table>
                       </div>
                     </div>
                   </div>
      
      </div>
    );
};

export default HistoryDetailComponent;