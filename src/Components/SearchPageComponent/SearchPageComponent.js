import React, { useState,useEffect} from 'react'
import axios from 'axios'
import CircularProgress from '@material-ui/core/CircularProgress';
import {TMDB_API_KEY} from '../../key/key';
import { makeStyles } from '@material-ui/core/styles';
import Search from './Search'
import Results from './Results'
import Popup from './Popup'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {useSelector} from 'react-redux';
import Skeleton from '@material-ui/lab/Skeleton';
function SearchPageComponent(){
  const user = useSelector(state => state.user);
  const [queryString, setqueryString] = useState("");
  const [results,setresults] = useState([]);
  const [selected,setselected] = useState({});
  const [isLoading,setisLoading] = useState(false);
  const [open, setOpen] = useState(false);
  var apiurl = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${queryString}`;  
  
let nominations;
if(user.isLoggedIn)
{
  nominations=user.user.Nominations.length
}
else{
  nominations=10
}

  useEffect(() => {
    if(user.error || nominations === 5 || user.successmsg){ 
        setOpen(true);
    }
  },[user,nominations])

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  
  const useSnackbarStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }));
  const search = () => {
      console.log(queryString);
      if(queryString)
      {
      axios(apiurl)
      .then(({ data }) => {
        console.log(data);
        let results = data.results;
        setresults(results);
        console.log(results);
        setisLoading(false);
      })
      }
      else{
        axios(`https://api.themoviedb.org/3/trending/movie/week?api_key=${TMDB_API_KEY}`)
        .then(({ data }) => {
        let results = data.results;
        setresults(results);
        setisLoading(false);
      })
    }
  }
      
  const handleInput = (e) => {
    setisLoading(true);
    setqueryString(e.target.value);
  }

  useEffect(() => {
    search();
  },[queryString]);

  const openPopup = id => {
    axios(apiurl + "&i=" + id).then(({ data }) => {
      let result = data;
      console.log(result);
      setselected(result);
    });
  }
    
  const closePopup = () => {
    setselected({});
  }
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  if(user.isLoading)
    return(
      <CircularProgress style={{marginTop:"25vw"}} color="secondary" ></CircularProgress>
    )
    return (
      <div>
        <header>
          <h1>Movie Search</h1>
        </header>
        <main>
          <Search handleInput={handleInput} search={search} />
          {
            !isLoading ?
            <React.Fragment>
              <Results results={results}/>
              {(typeof selected.Title != "undefined") ? <Popup selected={selected} closePopup={closePopup} /> : false}
            </React.Fragment>
            :
            <div className="wrapper">
              <Skeleton variant="rect" animation="wave"  className="card_s" />
              <Skeleton variant="rect" animation="wave" className="card_s" />
              <Skeleton variant="rect" animation="wave" className="card_s" />
              <Skeleton variant="rect" animation="wave" className="card_s" />
              <Skeleton variant="rect" animation="wave" className="card_s" />
              <Skeleton variant="rect" animation="wave" className="card_s" />

            </div>
            
          }
          {
              (user.error ) ?
              <Snackbar open={open} autoHideDuration={10000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="error">
                {`${user.error}`}
                
              </Alert>
              </Snackbar>
              : user.successmsg ?
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="success">
                {`${user.successmsg}`}
              </Alert>
            </Snackbar>
            :
            <div></div>
            }
             {
              (nominations === 5) ?
              <Snackbar open={open} autoHideDuration={10000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="error">
               
                You have already nominated 5 movies to add another remove one first
              </Alert>
              </Snackbar>
            :
            <div></div>
            }
        </main>
        
      </div>
    );
     
}

export default SearchPageComponent;