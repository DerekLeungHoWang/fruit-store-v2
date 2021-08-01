import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { Link, useHistory } from 'react-router-dom';
import { signup } from '../../utils/APIUtils';
import { API_BASE_URL, ACCESS_TOKEN } from '../../constants/index'
import axios from 'axios'
import { CircularProgress } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import { validator } from './AuthValidator';
function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link to="/" color="inherit" href="https://material-ui.com/">
                wahkee-fruitstore.com
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}), { index: 1 });

export default function SignUp() {
    const [isLoading, setIsLoading] = useState(false)
    let history = useHistory();
    const locale = history.location.pathname.substring(1, 3)
    console.log(history);
    const [errors, setErrors] = useState({
        email: "",
        password_1: "",
        password_2: ""
    });
    const [user, setUser] = useState({
        email: "",
        password_1: "",
        password_2: ""
    })
    const classes = useStyles();
    const handleSubmit = (e) => {
        e.preventDefault()

        let isValid = validateFields()
        if (!isValid) return;

        setIsLoading(true)
        let payload = {
            email: user.email,
            password: user.password_1
        }

        const headers = {
            'Content-Type': 'application/json',
        }
        if (localStorage.getItem(ACCESS_TOKEN)) {
            headers['Authorization'] = 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
        }

        let config = {
            headers: headers,
            method: 'post',
            url: API_BASE_URL + "/api/auth/signup?exchangeName=topic-exchange&routingKey=queue.registration",
            data: payload
        }
        axios(config)
            .then(res => {
                console.log(res);
                setIsLoading(false)
                history.push(`/${locale}`);
            })
            .catch(e => console.log(e.response))
    }


    const validateFields = () => {
        console.log('sdfsdf');
        let isValid = true
        Object.keys(user).forEach(fieldName => {
            console.log(fieldName);
            const faildFields = validator(user, fieldName);
            console.log("faildFields ", faildFields);
            Object.values(faildFields).forEach(d => {
                if (d) {
                    isValid = false
                }
            })
           
            setErrors((state) => ({
                ...state,
                [fieldName]: Object.values(faildFields)[0]
            }));

        })

        console.log("isValid = ", isValid);
        return isValid
    }

    const handleChange = (e) => {



        setUser(state => ({
            ...state,
            [e.target.name]: e.target.value
        }))

    }

    const handleBlur = e => {
        const { name: fieldName } = e.target;

        const faildFiels = validator(user, fieldName);

        setErrors((state) => ({
            ...state,
            [fieldName]: Object.values(faildFiels)[0]
        }));
    };

    useEffect(() => {
        const { password_1, password_2 } = user
        if (password_2 && password_1 !== password_2) {
            setErrors(state => ({ ...state, password_1: "", password_2: "password does not match" }))
        }

        if (password_1 == password_2) {
            setErrors(state => ({ ...state, password_1: "", password_2: "" }))
        }


    }, [user.password_1, user.password_2])
    console.log('errors ', errors);

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign Up
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="email"
                        label={<FormattedMessage id="signup.email" />}
                        name="email"
                        autoComplete="email"
                        onChange={handleChange}

                        value={user.email}

                        onBlur={handleBlur}
                        error={errors.email ? true : false}
                        helperText={errors.email}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="password_1"
                        label={<FormattedMessage id="signup.password" />}
                        type="password_1"
                        id="password_1"
                        onChange={handleChange}
                        value={user.password_1}
                        onBlur={handleBlur}
                        autoComplete="current-password"
                        error={errors.password_1 ? true : false}
                        helperText={errors.password_1}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="password_2"
                        label={<FormattedMessage id="signup.confirmPassword" />}
                        type="password_2"
                        id="password_2"
                        autoComplete="current-password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={user.password_2}
                        error={errors.password_2 ? true : false}
                        helperText={errors.password_2}
                    />
                    {/* <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    /> */}
                    <Button
                        disabled={isLoading}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >

                        {isLoading && <CircularProgress
                            size={18} style={{ marginRight: "10px" }} />}
                        <FormattedMessage id="signup.signup" />
                    </Button>
                    <Grid container>

                        <Grid item>
                            <Link to={`/${locale}/auth/signin`} variant="body2">
                                <FormattedMessage id="signup.haveAccount" />
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            {/* <Box mt={8}>
                <Copyright />
            </Box> */}
        </Container>
    );
}