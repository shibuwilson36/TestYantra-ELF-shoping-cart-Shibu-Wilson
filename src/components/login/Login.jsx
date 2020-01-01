import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import passwordValidation from './passwordValidation';
import UserContext from '../../context/userauthentication';
import { useContext } from 'react';
import Axios from 'axios';
import { CircularProgress} from '@material-ui/core';



const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(0),
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn(props) {
  const classes = useStyles();
  const context = useContext(UserContext)
  let loginDetails = {
    email: "",
    password: "",
    allData: []

  }
  const [getLogin, setLogin] = useState(loginDetails)
  const [getEmailError, setEmailError] = useState({ emailError: '', emailShow: false })
  const [getPassword, setPassword] = useState({ errorPassword: '', showPassword: false })
  const [getError, setError] = useState({ error: '' })
  const [getLoding, setLoding] = useState({ loading:false })

  let handeleKeyUp = (event) => {
    setLogin({
      ...getLogin,
      [event.target.name]: event.target.value.trim()
    })
    if (event.target.name === "email") {

      let values = event.target.value.trim()
      if (!(/^\w+([/.-]?\w+)*@\w+([/.-]?\w+)*(\.\w{2,3})+$/.test(values))) {
        setEmailError({
          ...getEmailError,
          emailShow: false,
          emailError: "Please enter valid Email"

        })
      } else {
        setEmailError({
          ...getEmailError,
          emailShow: true,
          emailError: ""

        })
      }
    }
    if (event.target.name === "password") {

      let values = event.target.value.trim()
      if (passwordValidation(values)) {
        setPassword({
          ...getPassword,
          showPassword: false,
          errorPassword: "A minimum 8 characters password contains  a combination of uppercase and lowercase letterand number are required"

        })
      } else {
        setPassword({
          ...getPassword,
          showPassword: true,
          errorPassword: ""

        })
      }
    }
  }
  let getAllAccount = async () => {
    
    try {
      const url = 'https://react-shoping-cart-66dac.firebaseio.com/user-account.json'
      let response = await Axios.get(url)
      let newData = []

      for (const key in response.data) {

        newData.push({
          ...response.data[key],
          id: key
        })

      }
      if (response.status === 200) {
        newData.forEach(val => {
          console.log(val);
          console.log(getLogin.email);
          console.log(getLogin.password);

          setLoding({
            loading:false
          })
          if ((val.email === getLogin.email) && (val.password === getLogin.password)) {
            let profile = [val.firstName, val.lastName, val.email, val.mobile]
            context.setRole(val.role)
            localStorage.setItem("userId", val.id)
            localStorage.setItem("profile", profile)
            localStorage.setItem("login",true)

            context.authentication(true)
            props.history.push("/")

          }else{
            setError({
              ...getError,
              error:"Invalid Email or Password"
            })
          }
        })

      }
    } catch (error) {

    }
  }

  const saveData = (event) => {
    event.preventDefault()
    
    if (getEmailError.emailShow && getPassword.showPassword) {
      setLoding({
        loading:true
      })
      getAllAccount()
    } else {
      
      if (!getLogin.email) {
        setEmailError({
          ...getEmailError,
          emailError: "email Name cannot be left blank"
        })
      }if (!getLogin.password) {
        setPassword({
            ...getPassword,
            errorPassword: "password Name cannot be left blank"
        })
    }
    }
  }
  const unameStyle = {
    color: 'red',
    fontSize: '10px'
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>

        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form onSubmit={saveData} className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onKeyUp={handeleKeyUp}
          />
          <p style={unameStyle}>{getEmailError.emailError}</p>

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onKeyUp={handeleKeyUp}
          />
          <p style={unameStyle}>{getPassword.errorPassword}</p>
          <p style={unameStyle}>{getError.error}</p>

          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color={getLoding.loading?"":"primary"}
            className={classes.submit}

          >
            {getLoding.loading?<CircularProgress size={24} color="secondary" />
              :"Sign In"
              }
            
          </Button>

          <Grid container>
            <Grid item xs>
              <Link variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}