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
import CircularProgress from '@material-ui/core/CircularProgress';
import firebase from 'firebase';
import Rating from '@material-ui/lab/Rating';
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
       variant="outlined" color="primary" onClick={(e) => {RemoveFromBlackList(e)}} >
         Remove</Button>
      
       </div>
       
         </div>
       </div></div>
        )
    }
    // ===================================================================================================
    useEffect(() =>{
        if(user.isLoggedIn){
        getMovieDetails();
        }
    },[user.isLoggedIn])

    // ======================== Fetching other users =================================
    const [allusers,setallusers] = useState([]);    
    const [alladmin,setalladmin] = useState([]);
    useEffect(()=>{
      const db = firebase.firestore();
      let unsubscribe = db.collection('users')
      .onSnapshot(function(querySnapshot){
        let arr = [];
        let arr1 = [];
        querySnapshot.forEach((doc)=>{
          if(doc.data().IsAdmin)
            arr1.push(doc.data());
          else
            arr.push(doc.data())
        })
        setallusers(arr);
        setalladmin(arr1);
      })
    },[])

    function makeAdmin(emailid,e){
      e.preventDefault()
      const db = firebase.firestore();
      db.collection("users").doc(emailid)
      .update({IsAdmin:true})
    }

    function removeFromAdmin(emailid,e){
      e.preventDefault();
      const db = firebase.firestore();
      db.collection("users").doc(emailid)
      .update({IsAdmin:false})
    }


  // =========================== Main Return from this component ==================================
  if(user.isLoading)
    return(
      <CircularProgress style={{marginTop:"25vw"}} color="secondary" ></CircularProgress>
    )
  return (
    <React.Fragment>
      <div style={{marginTop:100}}>
        <h1 style={{color:"white"}}>BlackListed Movies</h1>
      </div>
      <main>
      <section className="wrapper1">
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
      {/* Admin */}
      <div style={{marginTop:100}}>
        <h1 style={{color:"white"}}>All Administrators</h1>
      </div>
      <main>
          {  
            alladmin.length !== 0 ?
            (
              <section className="wrapper1">
              {alladmin.map((admin) => (              
                <React.Fragment className="profile-card">
                      <div class="our-team" style={{width:"250px",height:"220px"}}>
                        <div class="picture">
                          <img style={{width:"130px",height:"130px"}} src={admin.ProfilePic}/>
                        </div>
                        <div class="team-content">
                          <h3 class="name" style={{color:"black"}}>{admin.Name}</h3>
                          <h4 class="title">{admin.Email}</h4>
                        </div>
                        <ul class="social">
                        <Button variant="contained" style={{width:"100%", backgroundColor:" #1369ce"}} onClick={(e) => {removeFromAdmin(admin.Email,e)}} endIcon={<LocalMoviesIcon />} className="but1">
                        Dismiss From Admin</Button>
                        </ul>
                      </div>
                </React.Fragment>
              ))}
              </section>
            )
            :(<p>
                   There are no admin users
             </p>)
          }
      </main>
      {/* Users */}
      </main>
      <div style={{marginTop:100}}>
        <h1 style={{color:"white"}}>All users</h1>
      </div>
      <main>
          {  
            allusers.length !== 0 ?
            (
              <section className="wrapper1">
              {allusers.map((user) => (              
                <React.Fragment className="profile-card">
                      <div class="our-team" style={{width:"250px",height:"220px"}}>
                        <div class="picture">
                          <img style={{width:"130px",height:"130px"}} src={user.ProfilePic}/>
                        </div>
                        <div class="team-content">
                          <h3 class="name" style={{color:"black"}}>{user.Name}</h3>
                          <h4 class="title">{user.Email}</h4>
                        </div>
                        <ul class="social">
                        <Button variant="contained" style={{width:"100%", backgroundColor:" #1369ce"}} onClick={(e) => {makeAdmin(user.Email,e)}} endIcon={<LocalMoviesIcon />} className="but1">
                        Make Admin</Button>
                        </ul>
                      </div>
                </React.Fragment>
              ))}
              </section>
            )
            :(<p>
                   There are no non admin users
             </p>)
          }
        </main>
    </React.Fragment>
    );

};

export default AdminDashboardComponent;