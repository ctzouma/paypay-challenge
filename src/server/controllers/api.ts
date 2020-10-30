import { Response } from 'express';

/**
 * Configure the JSON response.
 * @param res {Response} - Server response object
 * @param success {boolean} - Whether the request was successful or not
 * @param code {number} - HTML response code
 * @param msg {string} - Server message
 * @param data {Object} - data to be returned in the response
 */
export const handleResponse = (res: Response, success: boolean, code: number, msg: string, data?: any) => {
    res.status(code).json({
        success: success,
        message: msg,
        result: data || null
    });
}