import {React, useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import {TMDB_API_KEY} from '../../key/key';
import axios from 'axios';
import firebase from 'firebase';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import './UserStyles.css'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import ShareButton from '../shareButton'
import Img2 from '../../icons/Asset 1@2x.png'
const UserProfile = () => {
    const useStyles = makeStyles({
        root: {
          maxWidth: 345,
        },
        media: {
          height: 140,
        },
        paper: {
          padding: 2,
          textAlign: 'center',
          color: 'white',
          backgroundColor:'#101010'
        },
      });
    const classes = useStyles();
    const user = useSelector(state => state.user);
    const { user_id } = useParams();
    const [userDetail,setuserDetail] = useState({});
    const [reviewDetail,setreviewDetail] = useState([]);
    useEffect(()=>{
        const db = firebase.firestore();
        db.doc(`users/${user_id}`)
        .get().then((doc)=>{
            if (doc.exists) {
                setuserDetail(doc.data());
            } else {
                console.log("No such document!");
            }
        })
        .catch((err)=>{
            console.log("Error !!!");
        })
    },[])

    async function getMovieDetails(obj){
      let querySnapshot = obj.docs;
      let arr = [];
      for(let i=0;i<querySnapshot.length;i++){
        let doc = querySnapshot[i];
        console.log(doc);
            try{
                console.log(doc.data().mid);
                let res = await axios.get(`https://api.themoviedb.org/3/movie/${doc.data().mid}?api_key=${TMDB_API_KEY}`)
                arr.push({...res.data, review:doc.data().review, rating:doc.data().rating})
            }catch(err){
                console.log(err);
            }
        }
        return arr;
    }
    useEffect(() => {
        const db = firebase.firestore();
        db.collection("reviews").where("uid", "==", user_id)
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
    },[])

    return (
        <div className="user_wrapper">
          <Grid container spacing={1} className="user_details_u">
        <Grid item xs={12} >
        <div >
        <img src={userDetail.ProfilePic} className="user_avatar" />
        </div>
         
        </Grid>
        <Grid item xs={12}  >
          <div >
           <h2>{userDetail.Name}</h2>
           <h3 style={{color:"gold"}}>Email : <span style={{color:"grey"}}>{userDetail.Email}</span></h3>
          </div>
        </Grid>
        
        
      </Grid>
      
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
                            <Link to={`/movie/${x.id}`}   >
      <Button variant="outlined" color="secondary" href="#outlined-buttons" style={{margin:10}}>
        Explore
      </Button>
      </Link>
                            </Grid>
                             
                            </Grid>
                        )
                    })
                )
                :
                (
                  <div className="results">
				<img src={Img2} className="noresults"/>
				<h2>No Movie reviewed yet</h2>
				
			</div>
                )
            }
        </div>
      </div>
    );
};

export default UserProfile;