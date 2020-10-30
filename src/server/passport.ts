import bcrypt from 'bcrypt-nodejs';
import passport from 'passport';
import passportLocal from 'passport-local';
import * as db from './database';
import { NextFunction, Request, Response } from 'express';

passport.serializeUser<any, any>((user, done) => {
    console.log(`serializing user: ${user.username}`)
    done(null, user.id);
});

passport.deserializeUser((id: number, done) => {
    db.getUserById(id, (err, user) => {
        if (err) done(err, false);
        done(null, user);
    });
});

/**
 * Passport setting up the user to use in its session
 */
passport.use(new passportLocal.Strategy((username, password, done) => {
    db.getUserByName(username, (err, user) => {
        if (err) return done(err);
        if (!user) return done(null, false, { message: `Username ${username} not found.`});
        comparePassword(password, user.password, (err, isMatch) => {
            if (err) return done(err);
            if (isMatch) return done(undefined, user);
            return done(undefined, false, {message: 'Invalid username or password'});
        })
    });
}));

/**
 * Hash the User's credential (password). Uses salt.
 * @param credential {string} - The user's credential
 * @param callback 
 */
export const hashPassword = (credential: string, callback: (res: string) => void) => {
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            console.error(`Error generating salt. Message: ${err.message}`);
            callback(credential);
        } else {
            bcrypt.hash(credential, salt, null, (err, hash) => {
                if (err) {
                    console.error(`Error generating hash. Message: ${err.message}`);
                    callback(credential);
                } else {
                    callback(hash);
                }
            });
        }
    });
};

/**
 * Middleware to check authentication before piping through to actual requests
 * @param req {Request} - The current request
 * @param res {Response} - Response object
 * @param next {NextFunction} - Next callback function
 */
export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/'); // If not authenticated, redirect to client content base. Let client deal with further routing
}

/**
 * Check password against value in the Database
 * @param candidatePassword {string} - Password entered by user
 * @param dbPassword {string} - Hashed password stored in Database
 * @param callback 
 */
const comparePassword = (candidatePassword: string, dbPassword: string, callback: (err: any, isMatch: any) => void) => {
    bcrypt.compare(candidatePassword, dbPassword, (err: Error, isMatch: boolean) => {
        callback(err, isMatch);
    });
}