import e, { Request, Response, NextFunction } from 'express';
import { handleResponse } from './api';
import { check, validationResult } from 'express-validator';
import { IVerifyOptions } from 'passport-local';
import passport from 'passport';
import * as db from '../database';
import '../passport';

/**
 * [POST] Login to the server
 * @param req {Request} - request
 * @param res {Response} - response
 * @param next {NextFunction} - callbacks
 */
export const postLogin = async (req: Request, res: Response, next: NextFunction) => {
    await check("username", "Username cannot be blank").isLength({min: 1}).run(req);
    await check("password", "Password cannot be blank").isLength({min: 1}).run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log('Login failed. Username or password are blank. Errors:', errors.array());
        return next();
    }

    // Authenticate with passport
    passport.authenticate('local', (err: Error, user: any, info: IVerifyOptions) => {
        if (err) return handleResponse(res, false, 401, err.message);
        if (!user) {
            console.log(`Login failed. Message: ${info.message}`);
            return handleResponse(res, false, 401, info.message);
        }
        // If authentication succeeded, attempt to login (to save session etc.)
        req.logIn(user, (err) => {
            if (err) return handleResponse(res, false, 401, 'Request login failed.');
            console.log(`Login successful!`);
            return handleResponse(res, true, 200, 'Login successful!');
        });
    })(req, res, next);
};

/**
 * [POST] Logout of current session
 * @param req {Request} - request
 * @param res {Response} - response
 */
export const logout = (req: Request, res: Response, next: NextFunction) => {
    // If not authenticated, just pass to next middleware
    if (req.user) {
        // Ensure destruction of session on logout
        return req.session?.destroy(() => {
            console.log(`Logged out.`);
            res.redirect('/');
        });
    } else {
        return next();
    }
};

/**
 * [GET] Get a list of employees
 * @param req {Request} - request
 * @param res {Response} - response
 */
export const getEmployees = (req: Request, res: Response) => {
    console.log(`getEmployees()`);
    db.getEmployees((err, employees: Employee[]) => {
        if (err) handleResponse(res, false, 400, err.message);
        else {
            handleResponse(res, true, 200, "success", employees);
        }
    });
}

/**
 * [GET] Get a specific employee by ID
 * @param req {Request} - request
 * @param res {Response} - response 
 */
export const getEmployeeById = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    console.log(`getEmployeeById(): ID = ${id}`);
    db.getEmployeeById(id, (err, employee) => {
        if (err) handleResponse(res, false, 400, err.message);
        else {
            handleResponse(res, true, 200, "success", employee);
        }
    });
}

/**
 * [PATCH] - Updates an Employee's details
 * @param req {Request}
 * @param res {Response}
 */
export const updateEmployee = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    console.log(`updateEmployee(): ID = ${id}`);
    db.updateEmployee(id, req.body, (err, resp) => {
        if (err) handleResponse(res, false, 400, err.message);
        else handleResponse(res, true, 200, "success", resp)
    });
}

/**
 * [GET] Returns the current authenticated user's info
 * @param req {Request} - request
 * @param res {Response} - response
 */
export const getUserInfo = (req: Request, res: Response) => {
    const userData = <UserData>req.user;
    db.getAuthUserData(userData.userId, (err, data) => {
        handleResponse(res, true, 200, "success", data);
    });
}