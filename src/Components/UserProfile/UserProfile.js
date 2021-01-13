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


const UserProfile = () => {
    const useStyles = makeStyles({
        root: {
          maxWidth: 345,
        },
        media: {
          height: 140,
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
        <div>
        <Card className={classes.root} style={{marginTop:"10vh"}}>
            <CardActionArea>
                <CardMedia
                className={classes.media}
                image={userDetail.ProfilePic}
                />
                <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {userDetail.Name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {userDetail.Email}
                </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                Share
                </Button>
                <Button size="small" color="primary">
                Learn More
                </Button>
            </CardActions>
            </Card>
            {
                (reviewDetail.length) ?
                (
                    reviewDetail.map((x) => {
                        return(
                            <Card className={classes.root} style={{marginTop:"5vh"}}>
            <CardActionArea>
                <CardMedia
                className={classes.media}
                image={`https://image.tmdb.org/t/p/w500${x.backdrop_path}`}
                />
                <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {x.review}
                </Typography>
                <Rating precision="0.5" value={x.rating} readOnly/>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                Share
                </Button>
                <Button size="small" color="primary">
                Learn More
                </Button>
            </CardActions>
            </Card>
                        )
                    })
                )
                :
                <div>
                    Nothing Here
                </div>
            }
        </div>
    );
};

export default UserProfile;