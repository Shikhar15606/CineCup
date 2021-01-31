import { React, useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { TMDB_API_KEY } from '../../key/key';
import axios from 'axios';
import './MoviePageStyle.css';
import ShareButton from '../shareButton';

import Rating from '@material-ui/lab/Rating';
import firebase from 'firebase';
import CircularProgress from '@material-ui/core/CircularProgress';

import ScrollToTop from '../scrollToTop';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel, props } from 'react-responsive-carousel';

const MoviePageComponent = () => {
  const user = useSelector(state => state.user);
  const [result, setresult] = useState({});
  const [trailerurl, settrailerurl] = useState([]);
  const { movie_id } = useParams();
  const [cast, setCast] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [newReview, setnewReview] = useState('');
  const [newRating, setnewRating] = useState(0);
  const [alreadyReviewed, setalreadyReviewed] = useState(false);
  const customRenderItem = (item, props) => (
    <item.type {...item.props} {...props} />
  );
  async function getUserDetails(obj) {
    let querySnapshot = obj.docs;
    const db = firebase.firestore();
    let arr = [];
    for (let i = 0; i < querySnapshot.length; i++) {
      let doc = querySnapshot[i];
      if (user.isLoggedIn && doc.data().uid === user.user.Email)
        setalreadyReviewed(true);
      var docRef = db.doc(`users/${doc.data().uid}`);
      let userdoc = await docRef.get();
      if (userdoc.exists) {
        arr.push({ ...userdoc.data(), ...doc.data() });
      } else {
      }
    }
    return arr;
  }
  // Fetch Review
  useEffect(() => {
    const db = firebase.firestore();
    db.collection('reviews')
      .where('mid', '==', movie_id)
      .get()
      .then(async function (querySnapshot) {
        let arr = [];
        arr = await getUserDetails(querySnapshot);
        setReviews(arr);
      })
      .catch(function (error) {});
  }, [user.isLoggedIn]);
  // Write Review
  const postReview = e => {
    e.preventDefault();
    const db = firebase.firestore();
    db.collection('reviews')
      .add({
        mid: movie_id,
        uid: user.user.Email,
        rating: newRating,
        review: newReview,
      })
      .then(function (docRef) {
        setReviews([
          ...reviews,
          {
            mid: movie_id,
            uid: user.user.Email,
            rating: newRating,
            review: newReview,
            Email: user.user.Email,
            ProfilePic: user.user.ProfilePic,
            Name: user.user.Name,
          },
        ]);
        setalreadyReviewed(true);
      })
      .catch(function (error) {
        console.error('Error adding document: ', error);
      });
  };

  let User;
  if (user.isLoggedIn) {
    User = user.user;
  } else {
    User = null;
  }

  var creditsapi = `https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${TMDB_API_KEY}`;

  useEffect(() => {
    axios(creditsapi).then(({ data }) => {
      if (data && data.cast && data.cast.length) {
        setCast(data.cast);
      }
    });
  }, []);
  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, []);
  var apiurl = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${TMDB_API_KEY}`;
  useEffect(() => {
    axios(apiurl).then(res => {
      setresult(res.data);
    });
  }, [apiurl]);
  var trailerapi = `https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=${TMDB_API_KEY}`;
  useEffect(() => {
    axios(trailerapi).then(({ data }) => {
      if (data && data.results && data.results.length) {
        let arr = [];
        data.results.forEach(element => {
          arr.push(element.key);
        });
        settrailerurl([...arr]);
      }
    });
  }, [trailerapi]);
  const opts = {
    playerVars: {
      autoplay: 0,
    },
  };
  if (user.isLoading)
    return (
      <CircularProgress
        style={{ marginTop: '25vw' }}
        color='secondary'
      ></CircularProgress>
    );
  return (
    <div>
      <div className='main1'>
        <div className='image'>
          <img
            src={`https://image.tmdb.org/t/p/original/${result.backdrop_path}`}
          />
          <div className='overlay'>
         
              <h1>{result.title}</h1>
              <h4>
                {result.runtime} min | {result.release_date}
              </h4>
          
            <div className='share_but_m'>
              <ShareButton
                url={`https://cinecup-9b0ac.web.app/movie/${result.id}`}
                image={`https://image.tmdb.org/t/p/w500/${result.backdrop_path}`}
                title={`${result.title} - ${result.overview} 
            Check out the trailer on this page`}
              />
            </div>
          </div>
        </div>

        <div className='afterImage'>
          <div className='left1'>
            <h3>Description</h3>
            <p>{result.overview} </p>
          </div>
          <div className='right1'>
            <Carousel
              renderItem={customRenderItem}
              infiniteLoop={true}
              swipeable={true}
              stopOnHover={true}
              showArrows={true}
              showStatus={false}
              showIndicators={true}
              showThumbs={false}
              useKeyboardArrows={true}
              transitionTime={150}
              swipeScrollTolerance={5}
            >
              {trailerurl.map(element => {
                return (
                  <YouTube videoId={element} className='trail' opts={opts} />
                );
              })}
            </Carousel>
          </div>
          <div className='cast_wrapper'>
            <h1 className='reviews_header'>CAST</h1>
            <div className='cast_data'>
              {cast.slice(0, 5).map(x => {
                return (
                  <div className='cast_1'>
                    <img
                      src={`https://image.tmdb.org/t/p/original/${x.profile_path}`}
                      className='cast_image'
                    />
                    <span>{x.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
          {user.isLoggedIn && !alreadyReviewed ? (
            <div className='reviews_wrapper'>
              <div class='supaviews'>
                <div class='supaviews__add'>
                  <div class='supaview'>
                    <h1 class='supaview__title'>Add a new review</h1>
                    <form id='review'>
                      <div className='user_data'>
                        <img src={User.ProfilePic} className='avatar' />
                        <span>{User.Name}</span>
                      </div>
                      <Rating
                        precision='0.5'
                        value={newRating}
                        onChange={e => setnewRating(e.target.value)}
                      />
                      <div class='supaview__copy'>
                        <textarea
                          name='message'
                          placeholder='Review'
                          rows='5'
                          value={newReview}
                          onChange={e => setnewReview(e.target.value)}
                        ></textarea>
                      </div>
                      <button
                        class='supaview__submit'
                        onClick={e => postReview(e)}
                      >
                        Submit review
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div></div>
          )}
          <div className='reviews_wrapper'>
            <h1 className='reviews_header'>REVIEWS</h1>
            <div class='container'>
              <div class='reviews'>
                {reviews && reviews.length != 0 ? (
                  reviews.map(x => {
                    return (
                      <div class='review-item'>
                        <Link to={`/user/${x.Email}`}>
                          <div className='reviewer'>
                            <img
                              src={x.ProfilePic}
                              class='user_im'
                              alt='Customer Feedback'
                            />
                            <div claas='cius'>
                              <h3 class='customer-name'>{x.Name}</h3>
                              <Rating
                                precision='0.5'
                                value={x.rating}
                                readOnly
                              />
                            </div>
                          </div>
                        </Link>

                        <p>{x.review}</p>
                      </div>
                    );
                  })
                ) : (
                  <h2 className='text_re'>No reviews found</h2>
                )}
              </div>
            </div>
          </div>
          <ScrollToTop />
        </div>
      </div>
    </div>
  );
};

export default MoviePageComponent;
