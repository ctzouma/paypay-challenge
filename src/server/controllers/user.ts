import { Request, Response, NextFunction } from 'express';
import { handleResponse } from './api';
import { check, validationResult } from 'express-validator';
import { IVerifyOptions } from 'passport-local';
import passport from 'passport';
import * as db from '../database';
import '../passport';


export const postLogin = async (req: Request, res: Response, next: NextFunction) => {
    await check("username", "Username cannot be blank").isLength({min: 1}).run(req);
    await check("password", "Password cannot be blank").isLength({min: 1}).run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log('Login failed. Username or password are blank. Errors:', errors.array());
        return next();
    }

    passport.authenticate('local', (err: Error, user: any, info: IVerifyOptions) => {
        if (err) handleResponse(res, false, 401, err.message);
        if (!user) {
            console.log(`Login failed. Message: ${info.message}`);
            return handleResponse(res, false, 401, info.message);
        }
        req.logIn(user, (err) => {
            if (err) return handleResponse(res, false, 401, 'Request login failed.');
            console.log(`Login successful!`);
            return handleResponse(res, true, 200, 'Login successful!');
        });
    })(req, res, next);
};

export const logout = (req: Request, res: Response) => {
    req.logout();
    console.log(`Logged out.`);
    res.redirect('/');
};

export const getUsers = (req: Request, res: Response) => {
    console.log(`getUsers()`);
    db.getUsers((err, users: UserData[]) => {
        if (err) handleResponse(res, false, 400, err.message);
        else {
            const list = users.map((user) => {
                return transformUser(user);
            });
            handleResponse(res, true, 200, "success", list);
        }
    });
}

export const getUserById = (req: Request, res: Response) => {
    let id = parseInt(req.params.id);
    console.log(`getUserById(): ID = ${id}`);
    db.getUserById(id, (err, user: UserData) => {
        if (err) handleResponse(res, false, 400, err.message);
        else {
            const tUser = transformUser(user);
            handleResponse(res, true, 200, "success", tUser);
        }
    });
}

export const getUserInfo = (req: Request, res: Response) => {
    const tUser = transformUser(<UserData>req.user);
    handleResponse(res, true, 200, "success", tUser);
}

const transformUser = (user: UserData): User => {
    const {password, ...rest} = user;
    rest.isAdmin = !!rest.isAdmin;
    return rest;
}