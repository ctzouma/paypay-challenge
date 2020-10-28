import bcrypt from 'bcrypt-nodejs';
import passport from 'passport';
import passportLocal from 'passport-local';
import * as db from './database';
import { NextFunction, Request, Response } from 'express';

passport.serializeUser<any, any>((user, done) => {
    console.log(`serializing user: ${user.username}`)
    done(null, user.id);
});

// Issue where req.user not persisting solved like this: https://github.com/jaredhanson/passport/issues/244
passport.deserializeUser((id: number, done) => {
    db.getUserById(id, (err, user) => {
        if (err) done(err, false);
        done(null, user);
    });
});

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

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

const comparePassword = (candidatePassword: string, dbPassword: string, callback: (err: any, isMatch: any) => void) => {
    bcrypt.compare(candidatePassword, dbPassword, (err: Error, isMatch: boolean) => {
        callback(err, isMatch);
    });
}