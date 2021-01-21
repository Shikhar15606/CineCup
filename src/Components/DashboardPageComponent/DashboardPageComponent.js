import React,{useState,useEffect} from 'react';
import './DashboardStyle.css'
import ScrollToTop from '../scrollToTop'
import {useSelector,useDispatch} from 'react-redux';
import {remove_nominate} from '../../action/user_actions';
import {TMDB_API_KEY} from '../../key/key';
import axios from  'axios';
import {Button} from '@material-ui/core'
import Img2 from '../../icons/Asset 1@2x.png'
import { Link } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Rating from '@material-ui/lab/Rating';
import ShareButton from '../shareButton';
import firebase from 'firebase';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Swal from 'sweetalert2';
import Grid from '@material-ui/core/Grid';
function DashboardPageComponent(){
  const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 140,
    },
  });
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const [result,setresult] = useState([]);  
  const [open, setOpen] = useState(false);
  const [reviewDetail,setreviewDetail] = useState([]);

    async function getMovieDetails(obj){
      let querySnapshot = obj.docs;
      let arr = [];
      for(let i=0;i<querySnapshot.length;i++){
        let doc = querySnapshot[i];
        console.log(doc);
            try{
                console.log(doc.data().mid);
                let res = await axios.get(`https://api.themoviedb.org/3/movie/${doc.data().mid}?api_key=${TMDB_API_KEY}`)
                arr.push({...res.data, review:doc.data().review, rating:doc.data().rating, reviewID:doc.id})
            }catch(err){
                console.log(err);
            }
        }
        return arr;
    }
    useEffect(() => {
      if(user.user && user.user.Email){
        const db = firebase.firestore();
      db.collection("reviews").where("uid", "==", user.user.Email)
      .get()
      .then(async function(querySnapshot) {
          let arr = [];
          arr = await getMovieDetails(querySnapshot);
          console.log(arr);
          setreviewDetail(arr);
      })
      .catch(function(error) {
          console.log("Error getting documents: ", error);
      });
      }
  },[user.isLoggedIn])

  const deleteReview = async (e,x) => {
    e.preventDefault();
    const db = firebase.firestore();
    let arr = reviewDetail.filter(element => element !== x)
    db.collection("reviews").doc(x.reviewID).delete().then(function() {
        setreviewDetail(arr);
    }).catch(function(error) {
      console.error("Error removing document: ", error);
    });
  }
  // ================================= EDIT Review ====================================
  async function editReview(x,newreview,newrating){
    const db = firebase.firestore();
    let arr = reviewDetail.map((element) => {
      if(element === x)
        return {...element,review:newreview,rating:newrating};
      return element;
    }
    )   
    try{
      let response = await db.collection("reviews").doc(x.reviewID).update({review:newreview,rating:newrating})
        setreviewDetail(arr);
        return true;
    }catch(error){
      return false;
    }
  }
  const EditReviewAlert = async (e,x) => {
    e.preventDefault();
    Swal.mixin({
      input: 'text',
      confirmButtonText: 'Next &rarr;',
      showCancelButton: true,
      progressSteps: ['1', '2']
    }).queue([
      {
        title: 'Edit Your Rating',
        input: 'range',
        inputLabel: 'New Rating',
        inputAttributes: {
          min: 0.5,
          max: 5,
          step: 0.5
        },
        inputValue: 2.5
      },
      {
        title: 'Edit Your Review',
        input: 'textarea',
        inputLabel: 'New Review',
        inputValue:x.review ,
        inputPlaceholder: 'Type your message here...',
        inputAttributes: {
        'aria-label': 'Type your message here'
        },
  showCancelButton: true
      }
    ]).then(async (result) => {
      if (result.value) {
        console.log(result.value);
        let res = await editReview(x,result.value[1],result.value[0])
        console.log(res);
        if(res){
          Swal.fire({
            icon:"success",
            title:"Review Updated Successfully",
            confirmButtonText: 'OK'
          })
        }
        else{
          Swal.fire({
            icon:"error",
            title:"Some Error Occured",
            confirmButtonText: 'OK'
          })
        }
      }
    })
  }
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
          url={`https://cinecup-9b0ac.web.app/movie/${r.id}`}
           image={`https://image.tmdb.org/t/p/w500/${r.poster_path}`}
            title={`${r.title} - ${r.overview} 
            Check out the trailer on this page`}
           />
        </div>
    
     </div>
     
       </div>
     </div></div>
      )
    }
    useEffect(()=>{
      window.scroll({
        top: 0, 
        left: 0, 
        behavior: 'smooth'
      });
    },[])
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
  if(user.isLoading || !user.isLoggedIn)
    return(
      <CircularProgress style={{marginTop:"25vw"}} color="secondary" ></CircularProgress>
    )
        return (
        <React.Fragment>
          <div style={{marginTop:100}}>
            <h1 >Your Nominations</h1>
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
                :(       <div className="results">
				<img src={Img2} className="noresults"/>
				<h2>No Movies Nominated</h2>
				
			</div>)
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
                 <div className="users_reviews"  >
          
          <h1>Reviews</h1>
         
      
        {
              (reviewDetail.length) ?
              (
                  reviewDetail.map((x) => {
                      return(
                         <Grid container spacing={1} className="user_reviewed">
                           <Grid item xs={12} md={3}>
                           <img src={`https://image.tmdb.org/t/p/w500${x.poster_path}`} />
                             </Grid>
                           
                            <Grid item xs={12} md={6} className="reviewed">
                           <h2>{x.title}</h2>
                           <Rating precision="0.5" value={x.rating} readOnly />
                           <h3 className="user_review1">"{x.review}"</h3>
                           
                          </Grid>
                          <Grid item xs={12} md={3}>
                      
    <Button variant="outlined" color="primary" onClick={(e)=>{EditReviewAlert(e,x)}} style={{margin:10}}>
      Edit
    </Button>
    <Button variant="outlined" color="secondary" onClick={(e)=>{ deleteReview(e,x); }} style={{margin:10}}>
      Remove
    </Button>
    
                          </Grid>
                           
                          </Grid>
                      )
                  })
              )
              :
              (
                <div className="results">
      <img src={Img2} className="noresults"/>
      <h2>No Movies Nominated</h2>
      
    </div>
              )
          }
      </div>
          </main>
          <ScrollToTop />  
        </React.Fragment>
        );
}

export default DashboardPageComponent;