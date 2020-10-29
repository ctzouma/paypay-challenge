import { Response } from 'express';

export const handleResponse = (res: Response, success: boolean, code: number, msg: string, data?: any) => {
    res.status(code).json({
        success: success,
        message: msg,
        result: data || null
    });
}