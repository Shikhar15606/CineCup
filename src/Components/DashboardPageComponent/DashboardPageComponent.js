import React,{useState,useEffect} from 'react';
import './DashboardStyle.css'
import {useSelector,useDispatch} from 'react-redux';
import {remove_nominate} from '../../action/user_actions';
import {TMDB_API_KEY} from '../../key/key';
import axios from  'axios';
import {Button} from '@material-ui/core'
import LocalMoviesIcon from '@material-ui/icons/LocalMovies';
import { Link } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Rating from '@material-ui/lab/Rating';
import ShareButton from '../shareButton'
function DashboardPageComponent(){
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const [result,setresult] = useState([]);  
  const [open, setOpen] = useState(false);
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
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  //======================================Fetching data from internet ===========================
  async function fetchData(){
    let arr = [];
    for(let i=0;i<user.user.Nominations.length;i++){
      let element = user.user.Nominations[i];
      let res = await axios(`https://api.themoviedb.org/3/movie/${element}?api_key=${TMDB_API_KEY}`)
      let x=res.data
      arr.push(x)
      if(i===user.user.Nominations.length-1)
        return arr;
    }  
  }
  //=========================================== Render Card =========================================

  function RenderCard({r}){
    const Remove_Nominate = (e) => {
      e.preventDefault();
      const dataToSubmit = {
        Email: user.user.Email,
        movieId: r.id
      }
      console.log(dataToSubmit);
      dispatch(remove_nominate(dataToSubmit));
      let array = result;
      let cardIndex = array.indexOf(r);
      if(cardIndex !== -1)
      {
        array.splice(cardIndex, 1);
        setresult(array);
      }
    }      

      return(
        <div className="card_s">
        <div className="front_s" style={{backgroundImage: "url("+(`https://image.tmdb.org/t/p/w500/${r.poster_path}`)+")"}}>
        
     </div>
     <div className="back_s">
       <div style={{display:"flex",flexDirection:"column "}}>
       <div>
       <h2>{r.title}</h2>
       <h3>{r.release_date}</h3>
       <Rating precision="0.5" name="read-only" value={(r.vote_average)/2} readOnly />
 
       </div>
         
     <div style={{display:"flex",flexDirection:"column",textAlign: "center",
   justifyContent: "center",
   alignItems: "center"
   }}>
     <Link to={`/movie/${r.id}`}   >
     <Button className="button_s" variant="outlined" color="secondary" style={{marginBottom:10}}>Explore</Button>
     </Link>
     <Button className="button_s"  style={{marginBottom:10}}
     variant="outlined" color="primary" onClick={(e) => {Remove_Nominate(e)}} >
       Remove</Button>
       <div  className="share_but_s">
          <ShareButton 
          url={`https://cinecup-9b0ac.web.app/movie/${result.id}`}
           image={`https://image.tmdb.org/t/p/w500/${result.poster_path}`}
            title={`${result.title} - ${result.overview} 
            Check out the trailer on this page`}
           />
        </div>
    
     </div>
     
       </div>
     </div></div>
      )
    }
    // ===================================================================================================
  useEffect(() =>{
    if(user.isLoggedIn){
       if(user.user && user.user.Nominations)
       fetchData()
       .then((arr)=>{
        setresult(arr);
       })
      console.log("Render Card Chala")
      console.log(result);
     }
  },[user.isLoggedIn])
  // Main Return from this component
  if(user.isLoading)
    return(
      <CircularProgress style={{marginTop:"25vw"}} color="secondary" ></CircularProgress>
    )
        return (
        <React.Fragment>
          <div style={{marginTop:100}}>
            <h1 style={{color:"white"}}>Your Nominations</h1>
          </div>
          <main>
          <section className="wrapper1">
              {  
                result && result.length !== 0 ?
                (
                  result.map((resul) => (              
                  <RenderCard key={resul.id} r={resul} />   
                  ))
                )
                :(<p>
                       You have not nominated any movie
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
}

export default DashboardPageComponent;