import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CopyRight from '../../components/CopyRight';
import assassin from '../../images/assassin.jpg';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles'
import { Avatar } from "@material-ui/core";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

const styles = theme => ({
    root: {
        height: '100vh',
    },
    image: {
        height: '100%',
        width: '100%'
    },
    paper: {
        margin: theme.spacing(8, 4),
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
});

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userid: "",
            password: ""
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <Grid container component="main" className={classes.root} onLoad={
                ()=>{
                    axios({
                        method: "get",
                        url: "http://napoleonxzy.cn:3000/api/IsLogin",
                    }).then(res => {
                        var state = res.data.status
                        console.log(state)
                        if (state === "success") {
                            this.props.history.push({ pathname: '/home' })
                        }
                    }).catch(err => {
                        console.log(err)
                    })
                }
            }>
                <CssBaseline />
                <Grid item xs={false} sm={4} md={7}>
                    <img src={assassin} alt="assassin" className={classes.image}></img>
                </Grid>
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            个人知识点检索库
                        </Typography>

                        <form noValidate className={classes.form}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="用户名"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                onChange={(e) => { this.setState({ userid: e.target.value }) }}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="密码"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={(e) => { this.setState({ password: e.target.value }) }}
                            />
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={() => {
                                    axios({
                                        method: "post",
                                        url: "http://napoleonxzy.cn:3000/api/Login",
                                        data: {userid:this.state.userid,password:this.state.password}
                                    }).then(res => {
                                        var state = res.data.status
                                        console.log(state)
                                        if (state === "success") {
                                            this.props.history.push({ pathname: '/home' })
                                        }
                                    }).catch(err => {
                                        console.log(err)
                                    })
                                }}
                            >
                                登录
                            </Button>
                            <Box mt={5}>
                                <CopyRight />
                            </Box>
                        </form>
                    </div>
                </Grid>
            </Grid>
        );
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
  };

  export default withStyles(styles)(Login);
