import React from 'react';
import './LeaderboardStyles.css';
import { Link } from 'react-router-dom';
import Badge from '@material-ui/core/Badge';
import {useSelector} from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper';
import Rating from '@material-ui/lab/Rating';
import ShareButton from '../shareButton'
import { faArrowCircleRight} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
    width: '100%',
    
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
    backgroundColor: fade(theme.palette.common.black, 0.45),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.black, 0.55),
    },
    width:"100%",
  },
  inputInput: {
    
    color:"white",

    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: "100%",
    maxWidth: 600,
    
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
const LeaderboardPageComponent = () => {
  const classes = useStyles();
    const user = useSelector(state => state.user);
    let result = user.movies ? user.movies : [] ;

    function RenderCard ({r}) {     
      
          return(  
    <div className="wraap" id="movie_card">
    <div className="courses-container">
    
	<div className="course">
		<div className="course-preview">
    <img src={`https://image.tmdb.org/t/p/w500/${r.poster_path}`} alt="Cards Image" className="movie_image"/>
		</div>
		<div className="course-info">
		  <h2>{r.title}</h2>
      <h3>Votes : {r.votes}</h3>
			<h6>{r.rank}</h6>
      <h4 className="genre_list">{
        r.genres.slice(0,3).map(genre=>{
          return <span> {genre.name} </span>
        })
      }</h4>
      <div className="share_but">
      <ShareButton 
      url={`https://cinecup-9b0ac.web.app/movie/${r.id}`}
      image={`https://image.tmdb.org/t/p/w500/${r.poster_path}`}
      title={`${r.title} - ${r.overview} 
      Check out the trailer on this page`}
      className="share_but"
      />
      </div>
    
      <Link to={`/movie/${r.id}`}   >
			<button className="btn">Explore</button>
      </Link>
		</div>
	</div>
  
</div>
</div> 
             
          )
        }
    if(user.isLoading)
      return(
        <CircularProgress style={{marginTop:"25vw"}} color="secondary" ></CircularProgress>
      )
    return (
        <div className="wrapper2">
                      <div className="wrapper_history">
                     
  <div className="list">
    <div className="list__header">
      <h1 style={{color:"black"}}>Leaderboard</h1>
      <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search','id':'sear'}}
              onKeyUp={()=>{
                  var all = document.getElementById("list-table").getElementsByClassName("list__row");
                
                console.log(all)
                for(var i=0;i<all.length;i++)
                  {
                    var txtValue = all[i].innerText;
                    console.log(txtValue)
                    if (txtValue.toLowerCase().includes(document.getElementById("sear").value) ) {
                      all[i].style.display = "";
                    } else {
                      all[i].style.display = "none";
                    }
                    
                  } 
              }}
              
            />
      
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
                result.length !== 0 ?
                (
                  result.map((resul) => (              
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

export default LeaderboardPageComponent;