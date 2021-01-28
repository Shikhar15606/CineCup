import React, { useState, useEffect } from 'react';
import './AdminDashboardStyle.css';
import { useSelector, useDispatch } from 'react-redux';
import { TMDB_API_KEY } from '../../key/key';
import axios from 'axios';
import {
  removeBlacklistedMovie,
  startVoting,
  stopVoting,
  removeAnnouncement,
  addAnnouncement,
} from '../../action/movie_actions';
import { Button } from '@material-ui/core';
import LocalMoviesIcon from '@material-ui/icons/LocalMovies';
import { Link } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles, fade } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import firebase from 'firebase';
import Rating from '@material-ui/lab/Rating';
import TextField from '@material-ui/core/TextField';
import ShareButton from '../shareButton';
import swal from 'sweetalert';
import Grid from '@material-ui/core/Grid';
import InputBase from '@material-ui/core/InputBase';
import Img2 from '../../icons/Asset 1@2x.png';
import ScrollToTop from '../scrollToTop';
import { Hidden } from '@material-ui/core';
const useStyles = makeStyles(theme => ({
  disabledButton: {
    backgroundColor: 'red',
  },
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
    alignSelf: 'center',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    margin: 0,
    width: '100%',
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
  },
  inputRoot: {
    color: 'inherit',
    backgroundColor: '#ffffff',
    alignSelf: 'center',
    width: '80%',
    borderRadius: 5,
  },
  inputInput: {
    color: 'black',

    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    maxWidth: 600,
  },
  paper: {
    // padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 200,

    display: 'flex',
    flexDirection: 'row',
  },
}));

const AdminDashboardComponent = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const [result, setresult] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (user.error || user.successmsg) {
      setOpen(true);
    }
  }, [user, user.blacklist]);

  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, []);
  // ======================================= ui ================================
  function Alert(props) {
    return <MuiAlert elevation={6} variant='filled' {...props} />;
  }
  const useSnackbarStyles = makeStyles(theme => ({
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

  async function fetchData() {
    let arr = [];
    for (let i = 0; i < user.blacklist.length; i++) {
      let element = user.blacklist[i];
      let res = await axios(
        `https://api.themoviedb.org/3/movie/${element}?api_key=${TMDB_API_KEY}`
      );
      let x = res.data;
      arr.push(x);
      if (i === user.blacklist.length - 1) return arr;
    }
  }
  //=========================================== Render Card =========================================

  function RenderCard({ r }) {
    const RemoveFromBlackList = e => {
      e.preventDefault();
      const dataToSubmit = {
        movieId: r.id,
      };
      dispatch(removeBlacklistedMovie(dataToSubmit));
      let array = result;
      let cardIndex = array.indexOf(r);
      if (cardIndex !== -1) {
        array.splice(cardIndex, 1);
        setresult(array);
      }
    };

    return (
      <div className='card_s'>
        <div
          className='front_s'
          style={{
            backgroundImage:
              'url(' + `https://image.tmdb.org/t/p/w500/${r.poster_path}` + ')',
          }}
        ></div>
        <div className='back_s'>
          <div style={{ display: 'flex', flexDirection: 'column ' }}>
            <div>
              <h2>{r.title}</h2>
              <h3>{r.release_date}</h3>
              <Rating
                precision='0.5'
                name='read-only'
                value={r.vote_average / 2}
                readOnly
              />
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'center',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Link to={`/movie/${r.id}`}>
                <Button
                  className='button_s'
                  variant='outlined'
                  color='secondary'
                  style={{ marginBottom: 10 }}
                >
                  Explore
                </Button>
              </Link>
              <Button
                className='button_s'
                style={{ marginBottom: 10 }}
                variant='outlined'
                color='primary'
                onClick={e => {
                  RemoveFromBlackList(e);
                }}
              >
                Remove
              </Button>
              <div className='share_but_s'>
                <ShareButton
                  url={`https://cinecup-9b0ac.web.app/movie/${result.id}`}
                  image={`https://image.tmdb.org/t/p/w500/${result.poster_path}`}
                  title={`${result.title} - ${result.overview} 
            Check out the trailer on this page`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  // ===================================================================================================
  useEffect(() => {
    if (user.isLoggedIn && user.blacklist) {
      fetchData().then(arr => {
        setresult(arr);
      });
    }
  }, [user.isLoggedIn]);

  // ======================== Fetching other users =================================
  const [allusers, setallusers] = useState([]);
  const [alladmin, setalladmin] = useState([]);
  useEffect(() => {
    const db = firebase.firestore();
    let unsubscribe = db
      .collection('users')
      .onSnapshot(function (querySnapshot) {
        let arr = [];
        let arr1 = [];
        querySnapshot.forEach(doc => {
          if (doc.data().IsAdmin) arr1.push(doc.data());
          else arr.push(doc.data());
        });
        setallusers(arr);
        setalladmin(arr1);
      });
  }, []);

  function makeAdminAlert(name, emailid, e) {
    e.preventDefault();
    swal({
      title: 'Are you sure ?',
      text: `${name} (${emailid}) will become an admin and, he/she will have the rights to remove you from admin.`,
      icon: 'warning',
      dangerMode: true,
      buttons: true,
    }).then(isConfirm => {
      if (isConfirm) {
        makeAdmin(name, emailid, e);
      }
    });
  }

  function makeAdmin(name, emailid, e) {
    e.preventDefault();
    const db = firebase.firestore();
    db.collection('users').doc(emailid).update({ IsAdmin: true });
  }

  function removeFromAdmin(emailid, e) {
    e.preventDefault();
    const db = firebase.firestore();
    db.collection('users').doc(emailid).update({ IsAdmin: false });
  }

  // ========================== Start and Stop Voting =========================
  const [name, setname] = useState('');
  const [announcement, setannouncement] = useState('');
  const [nameError, setnameError] = useState('');
  const [announcementError, setannouncementError] = useState('');
  const [altname, setaltname] = useState(false);
  const [altannouncement, setaltannouncement] = useState(false);
  const [disabledSubmit, setdisabledSubmit] = useState(true);
  const [disabledAnnounce, setdisabledAnnounce] = useState(true);
  useEffect(() => {
    if (altname && name.length < 3)
      setnameError('name must be more than 2 characters');
    else setnameError('');
  }, [altname, name]);

  useEffect(() => {
    if (nameError) setdisabledSubmit(true);
    else if (altname) setdisabledSubmit(false);
  }, [nameError, altname]);

  useEffect(() => {
    if (announcementError) setdisabledAnnounce(true);
    else if (altannouncement) setdisabledAnnounce(false);
  }, [announcementError, altannouncement]);

  useEffect(() => {
    if (altannouncement && announcement.length < 3)
      setannouncementError('Announcement must have more than 2 characters');
    else setannouncementError('');
  }, [altannouncement, announcement]);

  const startAlert = e => {
    e.preventDefault();
    swal({
      title: 'Are you sure ?',
      text: ` Voting for ${name} will start now.`,
      icon: 'warning',
      dangerMode: true,
      buttons: true,
    }).then(isConfirm => {
      if (isConfirm) {
        start(e);
      }
    });
  };

  const start = e => {
    e.preventDefault();
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    var today = new Date();
    dispatch(
      startVoting({
        Name: name,
        Start: today.toLocaleDateString('en-US', options),
      })
    );
  };

  const stopAlert = e => {
    e.preventDefault();
    swal({
      title: 'Are you sure ?',
      text: `Contest will end now.`,
      icon: 'warning',
      dangerMode: true,
      buttons: true,
    }).then(isConfirm => {
      if (isConfirm) {
        stop(e);
      }
    });
  };
  const stop = e => {
    e.preventDefault();
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    var today = new Date();
    dispatch(stopVoting({ End: today.toLocaleDateString('en-US', options) }));
  };
  const removeannouncement = (e, element) => {
    e.preventDefault();
    dispatch(removeAnnouncement(element));
  };

  const addannouncement = e => {
    e.preventDefault();
    dispatch(addAnnouncement(announcement));
    setannouncement('');
    setaltannouncement(false);
    setdisabledAnnounce(true);
  };

  // =========================== Main Return from this component ==================================
  if (user.isLoading)
    return (
      <CircularProgress
        style={{ marginTop: '25vw' }}
        color='secondary'
      ></CircularProgress>
    );
  return (
    <React.Fragment>
      <main style={{ marginTop: '100px' }}>
        {user.announcement ? (
          <>
            {user.announcement.map(element => (
              <Grid container style={{ marginTop: '10px' }}>
                <Grid item xs={12} md={9}>
                  <Alert variant='filled' severity='success'>
                    {element}
                  </Alert>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Button
                    variant='outlined'
                    color='secondary'
                    small
                    onClick={e => removeannouncement(e, element)}
                  >
                    Remove
                  </Button>
                </Grid>
              </Grid>
            ))}
            <form Validate className='voting' style={{ marginBottom: 20 }}>
              <TextField
                error={announcementError}
                helperText={announcementError}
                variant='outlined'
                margin='normal'
                required
                fullWidth
                id='Name'
                label='Announce'
                name='announce'
                autoComplete='name'
                autoFocus
                value={announcement}
                onChange={e => {
                  setannouncement(e.target.value);
                  setaltannouncement(true);
                }}
                InputProps={{ className: 'voting_text' }}
                InputLabelProps={{
                  className: 'voting_text',
                }}
              />

              <Button
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                onClick={e => addannouncement(e)}
                disabled={disabledAnnounce}
                className='button1'
              >
                Announce
              </Button>
            </form>
          </>
        ) : (
          <form Validate className='voting'>
            <TextField
              error={announcementError}
              helperText={announcementError}
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='Name'
              label='Event'
              name='event'
              autoComplete='name'
              autoFocus
              value={announcement}
              onChange={e => {
                setannouncement(e.target.value);
                setaltannouncement(true);
              }}
              InputProps={{ className: 'voting_text' }}
              InputLabelProps={{
                className: 'voting_text',
              }}
            />

            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              onClick={e => addannouncement(e)}
              disabled={disabledAnnounce}
              className='button1'
            >
              Announce
            </Button>
          </form>
        )}
        {!user.isVoting ? (
          <form Validate className='voting'>
            <TextField
              error={nameError}
              helperText={nameError}
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='Name'
              label='Event'
              name='event'
              autoComplete='name'
              autoFocus
              value={name}
              onChange={e => {
                setname(e.target.value);
                setaltname(true);
              }}
              InputProps={{ className: 'voting_text' }}
              InputLabelProps={{
                className: 'voting_text',
              }}
            />

            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              onClick={startAlert}
              disabled={disabledSubmit}
              className='button1'
            >
              Start Voting
            </Button>
          </form>
        ) : (
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            onClick={stopAlert}
          >
            Stop Voting
          </Button>
        )}
      </main>
      <div style={{ marginTop: 100 }}>
        <h1>BlackListed Movies</h1>
      </div>
      <main>
        <section className='wrapper1'>
          {result && result.length !== 0 ? (
            result.map(resul => <RenderCard key={resul.id} r={resul} />)
          ) : (
            <div className='results'>
              <img src={Img2} className='noresults' />
              <h3>No Blacklisted movie</h3>
            </div>
          )}
        </section>
        {user.error ? (
          <Snackbar open={open} autoHideDuration={10000} onClose={handleClose}>
            <Alert onClose={handleClose} severity='error'>
              {`${user.error}`}
            </Alert>
          </Snackbar>
        ) : user.successmsg ? (
          <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity='success'>
              {`${user.successmsg}`}
            </Alert>
          </Snackbar>
        ) : (
          <div></div>
        )}
        {/* Admin */}
        <div style={{ marginTop: 100 }}>
          <h1>All Administrators</h1>
        </div>
        <main>
          {alladmin.length !== 0 ? (
            <section className='wrapper1'>
              {alladmin.map(admin => (
                <React.Fragment className='profile-card'>
                  <div
                    class='our-team'
                    style={{ width: '250px', height: '220px' }}
                  >
                    <div class='picture'>
                      <img
                        style={{ width: '130px', height: '130px' }}
                        src={admin.ProfilePic}
                      />
                    </div>
                    <div class='team-content'>
                      <h3 class='name'>{admin.Name}</h3>
                      <h4 class='title'>{admin.Email}</h4>
                    </div>
                    <ul class='social'>
                      <Button
                        variant='contained'
                        style={{ width: '100%', backgroundColor: ' #1369ce' }}
                        onClick={e => {
                          removeFromAdmin(admin.Email, e);
                        }}
                        className='but1'
                      >
                        Dismiss From Admin
                      </Button>
                    </ul>
                  </div>
                </React.Fragment>
              ))}
            </section>
          ) : (
            <div className='results'>
              <img src={Img2} className='noresults' />
              <h3>No Admin users</h3>
            </div>
          )}
        </main>
        {/* Users */}
      </main>
      <div style={{ marginTop: 100, textAlign: 'center' }}>
        <h1>All users</h1>
      </div>
      <main>
        <Hidden mdDown>
          <InputBase
            placeholder='Search…'
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search', id: 'sear' }}
            onChange={() => {
              var all = document
                .getElementById('users_card')
                .getElementsByClassName('our-team');

              for (var i = 0; i < all.length; i++) {
                var txtValue = all[i].innerText;
                if (
                  txtValue
                    .toLowerCase()
                    .trim()
                    .includes(
                      document.getElementById('sear').value.toLowerCase().trim()
                    )
                ) {
                  all[i].style.display = '';
                } else {
                  all[i].style.display = 'none';
                }
              }
            }}
          />
        </Hidden>
        {allusers.length !== 0 ? (
          <section className='wrapper1' id='users_card'>
            {allusers.map(user => (
              <React.Fragment className='profile-card'>
                <div
                  class='our-team'
                  style={{ width: '250px', height: '220px' }}
                >
                  <div class='picture'>
                    <img
                      style={{ width: '130px', height: '130px' }}
                      src={user.ProfilePic}
                    />
                  </div>
                  <div class='team-content'>
                    <h3 class='name'>{user.Name}</h3>
                    <h4 class='title'>{user.Email}</h4>
                  </div>
                  <ul class='social'>
                    <Button
                      variant='contained'
                      style={{ width: '100%', backgroundColor: ' #1369ce' }}
                      onClick={e => {
                        makeAdminAlert(user.Name, user.Email, e);
                      }}
                      className='but1'
                    >
                      Make Admin
                    </Button>
                  </ul>
                </div>
              </React.Fragment>
            ))}
          </section>
        ) : (
          <div className='results'>
            <img src={Img2} className='noresults' />
            <h3>No Users found</h3>
          </div>
        )}
      </main>
      <ScrollToTop />
    </React.Fragment>
  );
};

export default AdminDashboardComponent;
