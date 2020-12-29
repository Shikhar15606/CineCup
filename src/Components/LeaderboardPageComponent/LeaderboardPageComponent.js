import React from 'react';
import './LeaderboardStyles.css';
import { Link } from 'react-router-dom';
import Badge from '@material-ui/core/Badge';
import {useSelector} from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
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
}));
const LeaderboardPageComponent = () => {
  const classes = useStyles();
    const user = useSelector(state => state.user);
    let result = user.movies ? user.movies : [] ;

    function RenderCard ({r}) {     
      
          return(  
            <div className="wraap">
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
            <div >
            
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search','id':'sear'}}
              onKeyUp={()=>{
                  var all = document.getElementById("leaderboard_cards").getElementsByTagName("div");
                
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
            
            <div className="card__collection clear-fix" id="leaderboard_cards">
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