import { Request, Response } from 'express';
import { handleResponse } from './api';
import * as db from '../database';


type UserData = {
    password: string;
    username: string;
    id: number;
    isAdmin: boolean;
};

type User = {
    username: string;
    id: number;
    isAdmin: boolean;
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