import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import passport from 'passport';
import path from 'path';

import * as passportConfig from './passport';
import * as userController from './controllers/user';
import * as apiController from './controllers/api';

const app = express();
const port = 8000;
const apiBase = '/api';
const userBase = `${apiBase}/user`

app.set("port", port);
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'secret'
}));
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
});

app.get('/', (req, res) => res.send('TS Express test'));
app.get('/logout', apiController.logout);
app.post(`${userBase}/login`, apiController.postLogin);
app.get(`${userBase}/info`, passportConfig.isAuthenticated, userController.getUserInfo);
app.get(`${userBase}/:id`, passportConfig.isAuthenticated, userController.getUserById);
app.get(`${userBase}s`, passportConfig.isAuthenticated, userController.getUsers);

export default app;