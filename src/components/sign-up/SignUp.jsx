import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MultilineTextFields from './MultilineTextFields';
import { CircularProgress } from '@material-ui/core';



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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignUp(props) {
    const classes = useStyles();
   
    const handleClick = (event) => {
        if (event === "Admin") {
            props.handlRole(true)
        } else if (event === "Male") {
            props.handlGender("Male")
        } else if (event === "User") {
            props.handlRole(false)

        } else if (event === "Female") {
            props.handlGender("Female")
        }

    }
    const unameStyle = {
        color: 'red',
        fontSize: '10px'
    }
    return (
        <Container component="main" maxWidth="xl">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
        </Typography>
                <form
                    onSubmit={props.saveData}
                    className={classes.form}
                    noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                onKeyUp={props.handleKeyUp}
                            />
                            <p style={unameStyle}>{props.errorMessage[0].firstNameError}</p>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lname"
                                onKeyUp={props.handleKeyUp}
                            />
                            <p style={unameStyle}>{props.errorMessage[1].lastNameError}</p>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                onKeyUp={props.handleKeyUp}
                            />
                            <p style={unameStyle}>{props.errorMessage[2].emailError}</p>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="mobile"
                                label="Mobile"
                                type="mobile"
                                id="mobile"
                                onKeyUp={props.handleKeyUp}

                            />
                            <p style={unameStyle}>{props.errorMessage[3].mobileError}</p>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <MultilineTextFields handleClick={handleClick} value={["Admin", "User", "Role"]} />
                            <p style={unameStyle}>{props.errorMessage[6].roleError}</p>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <MultilineTextFields handleClick={handleClick} value={["Male", "Female", "Gender"]} />
                            <p style={unameStyle}>{props.errorMessage[7].genderError}</p>
                        </Grid>
      
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onKeyUp={props.handleKeyUp}
                            />
                            <p style={unameStyle}>{props.errorMessage[4].passwordError}</p>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="cPassword"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onKeyUp={props.handleKeyUp}
                            />
                            <p style={unameStyle}>{props.errorMessage[5].cPasswordError}</p>
                        </Grid>

                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                         {props.getLoding.loading?<CircularProgress size={24} color="secondary" />
              :"Sign Up"
              }
                        
          </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="#" variant="body2">
                                Already have an account? Sign in
              </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}