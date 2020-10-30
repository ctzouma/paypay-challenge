import sqlite3, { RunResult } from 'sqlite3';
import {hashPassword} from './passport';

const source = 'database.db';

const db = new sqlite3.Database(source, (err) => {
    if (err) {
        console.error(`Failed opening database. Message: ${err.message}`);
        throw err;
    } else {
        console.log('Connected to the SQLite database');
        db.run(`CREATE TABLE user (
            id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
            username TEXT NOT NULL,
            password TEXT NOT NULL,
            isAdmin INTEGER
        )`, (err) => {
            if (err) {
                // Table already created
            } else {
                // Table just created, insert rows
                const insert = 'INSERT INTO user (username, password, isAdmin) VALUES (?,?,?)';
                hashPassword("admin", hashedPassword => {
                    db.run(insert, ["admin", hashedPassword, true]);
                });
                hashPassword("user", hashedPassword => {
                    db.run(insert, ["user", hashedPassword, false]);
                });
                hashPassword("aharderpassword1234", hashedPassword => {
                    db.run(insert, ["test", hashedPassword, false]);
                });
            }
        })
    }
});

// ### DB queries

/**
 * Get all Users
 * @param callback 
 */
export const getUsers = (callback: (err: Error, users: any) => void) => {
    db.all('SELECT * from user', (err: Error, users: any) => {
        callback(err, users);
    });
}

/**
 * Get a specific user by username
 * @param username 
 * @param callback 
 */
export const getUserByName = (username: string, callback: (err: Error, user: any) => void) => {
    let sql = 'SELECT * from user where username = ?';
    let params = [username];
    db.get(sql, params, (err: Error, user: any) => {
        callback(err, user)
    });
}

/**
 * Get a specific user by ID
 * @param id 
 * @param callback 
 */
export const getUserById = (id: number, callback: (err: Error, user: any) => void) => {
    let sql = 'SELECT * from user where id = ?';
    let params = [id];
    db.get(sql, params, (err: Error, user: any) => {
        callback(err, user);
    });
}