import { Response, Request, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';
import { IVerifyOptions } from 'passport-local';
import passport from 'passport';
import '../passport';

export const handleResponse = (res: Response, success: boolean, code: number, msg: string, data?: any) => {
    res.status(code).json({
        success: success,
        message: msg,
        data: data || {}
    });
}

export const logout = (req: Request, res: Response) => {
    req.logout();
    console.log(`Logged out.`);
    res.redirect('/');
};

export const postLogin = async (req: Request, res: Response, next: NextFunction) => {
    await check("username", "Username cannot be blank").isLength({min: 1}).run(req);
    await check("password", "Password cannot be blank").isLength({min: 1}).run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log('Login failed. Username or password are blank. Errors:', errors.array());
        return res.redirect('/login');
    }

    passport.authenticate('local', (err: Error, user: any, info: IVerifyOptions) => {
        if (err) return next(err);
        if (!user) {
            console.log(`Login failed. Message: ${info.message}`);
            return res.redirect('/login');
        }
        req.logIn(user, (err) => {
            if (err) return next(err);
            console.log(`Login successful!`);
            return res.send({success: true, message: 'Login Success.', user: user});
            // return res.redirect(req.session?.returnTo || '/');
        });
    })(req, res, next);
};