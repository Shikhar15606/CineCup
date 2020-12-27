import React,{useState,useEffect} from 'react';
import './AdminDashboardStyle.css';
import {useSelector,useDispatch} from 'react-redux';
import {TMDB_API_KEY} from '../../key/key';
import axios from  'axios';
import {removeBlacklistedMovie} from '../../action/movie_actions';
import {Button} from '@material-ui/core'
import LocalMoviesIcon from '@material-ui/icons/LocalMovies';
import { Link } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

const AdminDashboardComponent = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    console.log(user);
    const [result,setresult] = useState([]);  
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if(user.error || user.successmsg){ 
            setOpen(true);
        }
    },[user,user.blacklist])


    // ======================================= ui ================================
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
      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
      };

    //======================================Fetching data from internet ===========================
    const getMovieDetails = () => {
        let arr = [];
        user.blacklist.forEach(element => {
        axios(`https://api.themoviedb.org/3/movie/${element}?api_key=${TMDB_API_KEY}`)
        .then((res) => {
            let x=res.data
            arr.push(x);  
        })
        });
        setresult(arr);
    }
    //=========================================== Render Card =========================================

    function RenderCard({r}){
        const RemoveFromBlackList = (e) => {
        e.preventDefault();
        const dataToSubmit = {
            movieId: r.id
        }
        dispatch(removeBlacklistedMovie(dataToSubmit));
        let array = result;
        let cardIndex = array.indexOf(r);
        if(cardIndex !== -1)
        {
            array.splice(cardIndex, 1);
            setresult(array);
        }
        }      

        return(
            <Link to={`/movie/${r.id}`} className="card"  >
            <img src={`https://image.tmdb.org/t/p/w500/${r.poster_path}`} />
            <div className="info">
            <h1>{r.title}</h1>
            <Button variant="contained" color="secondary" onClick={(e) => {RemoveFromBlackList(e)}} endIcon={<LocalMoviesIcon />} className="but1">
                Remove</Button>
            </div>
            </Link>
        )
    }
    // ===================================================================================================
    useEffect(() =>{
        if(user.isLoggedIn){
        getMovieDetails();
        }
    },[user.isLoggedIn])

  // =========================== Main Return from this component ==================================
  return (
    <React.Fragment>
      <div style={{marginTop:100}}>
        <h1 style={{color:"white"}}>BlackListed Movies</h1>
      </div>
      <main>
      <section className="wrapper1">
          {
            console.log(result,result.length)}
          {  
            result.length !== 0 ?
            (
              result.map((resul) => (              
              <RenderCard key={resul.id} r={resul} />   
              ))
            )
            :(<p>
                   There are no blacklisted movies
             </p>)
          }
        </section>
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
      </main>
    </React.Fragment>
    );

};

export default AdminDashboardComponent;