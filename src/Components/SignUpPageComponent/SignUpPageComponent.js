import React,{useState,useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {faFacebookF, faGoogle} from '@fortawesome/free-brands-svg-icons'
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import firebase from 'firebase';
// redux
import {register} from '../../action/user_actions';
import {useDispatch} from 'react-redux';

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));
  
function SignUpPageComponent(){
    const classes = useStyles();
    const [firstname,setfirstname] = useState("");
    const [lastname,setlastname] = useState("");
    const [email,setemail] = useState("");
    const [profilepic,setprofilepic]=useState("");
    const [password,setpassword] = useState("");
    const [firstnameError,setfirstnameError] = useState("");
    const [lastnameError,setlastnameError] = useState("");
    const [emailError,setemailError] = useState("");
    const [passwordError,setpasswordError] = useState("");
    const [altfirstname,setaltfirstname] = useState(false);
    const [altlastname,setaltlastname] = useState(false);
    const [altemail,setaltemail] = useState(false);
    const [altpassword,setaltpassword] = useState(false);
    const [disabledSubmit, setdisabledSubmit] = useState(true);

    useEffect(() => {
      if(altfirstname && firstname.length<3)
      setfirstnameError("Firstname must be more than 2 characters")
      else
      setfirstnameError("")
    },[altfirstname, firstname])

    useEffect(() => {
      if(altlastname && lastname.length<3)
      setlastnameError("Lastname must be more than 2 characters")
      else
      setlastnameError("")
    },[altlastname, lastname])
    
    useEffect(() => {
      if (altemail && !(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)))
      setemailError("Invalid Email Address")
      else
      setemailError("")
    },[altemail, email])

    useEffect(() => {
      if(altpassword && password.length<6)
      setpasswordError("Password must have more than 5 characters")
      else
      setpasswordError("")
    },[altpassword, password])

    useEffect(() => {
      if(!firstnameError && !lastnameError && !emailError && !passwordError && firstname && lastname && email && password)
        setdisabledSubmit(false);
      else
        setdisabledSubmit(true);
    },[firstnameError, lastnameError, passwordError, emailError, firstname, lastname, email, password])
    
    
    // redux
    const dispatch = useDispatch();
    const signUp = (e) => {
      e.preventDefault();
      const dataToSubmit = {
        firstname,lastname,email,password,profilepic
      }
      dispatch(register(dataToSubmit));
    }
    function uploadImage(e) {
      const file = e.target.files[0]
      console.log(file);
      setprofilepic(file);
      firebase
      .storage()
      .ref('Images/' + file.name)
      .put(file);
    }

    

        return (
            <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} Validate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                error = {firstnameError}
                helperText = {firstnameError}
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                value={firstname}
                onChange={(e) => {setfirstname(e.target.value);setaltfirstname(true);}}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error = {lastnameError}
                helperText = {lastnameError}
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                value={lastname}
                onChange={(e)=>{setlastname(e.target.value);setaltlastname(true);}}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error = {emailError}
                helperText = {emailError}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e)=>{setemail(e.target.value);setaltemail(true);}}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error = {passwordError}
                helperText = {passwordError}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e)=>{setpassword(e.target.value);setaltpassword(true);}}
              />
            </Grid>
            <Grid item xs={12}>
              <input name="profilepic" id="profilepic" type="file" onchange={e=>uploadImage(e)}/>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={signUp}
            disabled = {disabledSubmit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
        );
    
}

export default SignUpPageComponent;