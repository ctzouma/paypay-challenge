import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import passport from 'passport';
import webpack from 'webpack';
import webpackDevMid from 'webpack-dev-middleware';
import webpackHotMid from 'webpack-hot-middleware';
import webpackDevConfig from '../../webpack.dev';

import * as passportConfig from './passport';
import * as userController from './controllers/user';

const app = express();
const port = 8000;
const apiBase = '/api';
const userBase = `${apiBase}/user`
const isProd = process.env.NODE_ENV === 'production';

app.set("port", port);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//Start a session - session secret something obvious and hardcoded for the sake of simplicity
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'secret',
    cookie: { maxAge: 60 * 60 * 1000} // 1 hour
}));
app.use(passport.initialize());
app.use(passport.session()); // Attach the passport session to the app session

// If we are in devlopment mode, use a webpack dev server instance to serve the transpiled client files
if (!isProd) {
    const compiler = webpack(webpackDevConfig);
    const serverOptions = {
        // Allign the public paths
        publicPath: <string>webpackDevConfig.output?.publicPath,
    }
    app.use(webpackDevMid(compiler, serverOptions));
    app.use(webpackHotMid(compiler)); // Enable HMR for development ease
}

// ### API endpoints ###
app.get('/logout', passportConfig.isAuthenticated, userController.logout);
app.get('/login', (req, res) => res.redirect('/'));
app.post(`${userBase}/login`, userController.postLogin);
app.get(`${userBase}/info`, passportConfig.isAuthenticated, userController.getUserInfo);
app.get(`${userBase}/:id`, passportConfig.isAuthenticated, userController.getUserById);
app.get(`${userBase}s`, passportConfig.isAuthenticated, userController.getUsers);
// ######################

export default app;