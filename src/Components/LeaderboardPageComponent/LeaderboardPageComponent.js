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
const LeaderboardPageComponent = () => {
  const classes = useStyles();
    const user = useSelector(state => state.user);
    let result = user.movies ? user.movies : [] ;

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
    if(user.isLoading)
      return(
        <CircularProgress style={{marginTop:"25vw"}} color="secondary" ></CircularProgress>
      )
    return (
        <div className="wrapper2">
            <header>
                <h1>LeaderBoard</h1>
                <div >
           
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search','id':'sear'}}
              onKeyUp={()=>{
                  var all = document.getElementById("leaderboard_cards").getElementsByClassName("wraap");
                
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
            </header>
            
            <div className="card__collection clear-fix" id="leaderboard_cards"   >
            {  
                result.length !== 0 ?
                (
                  result.map((resul) => (              
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

export default LeaderboardPageComponent;