import { use } from 'passport';
import { nextTick } from 'process';
import sqlite3 from 'sqlite3';
import {hashPassword} from './passport';

const source = 'database.db';
const userTable = 'users';
const employeeTable = 'employees';

const db = new sqlite3.Database(source, (err) => {
    if (err) {
        console.error(`Failed opening database. Message: ${err.message}`);
        throw err;
    } else {
        console.log('Connected to the SQLite database');
        // Enable usage of foreign keys for SQLite
        db.get("PRAGMA foreign_keys = ON");
        createUsers();
    }
});

const createUsers = () => {
    db.run(`CREATE TABLE ${userTable} (
        userId INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
        username TEXT NOT NULL,
        password TEXT NOT NULL,
        isAdmin INTEGER
    )`, (err) => {
        if (!err) {
            // Table just created, insert rows
            const insert = `INSERT INTO ${userTable} (username, password, isAdmin) VALUES (?,?,?)`;
            hashPassword("admin", hashedPassword => {
                db.run(insert, ["admin", hashedPassword, true]);
            });
            hashPassword("user1", hashedPassword => {
                db.run(insert, ["user1", hashedPassword, false]);
            });
            hashPassword("user2", hashedPassword => {
                db.run(insert, ["user2", hashedPassword, false]);
            });
            hashPassword("user3", hashedPassword => {
                db.run(insert, ["user3", hashedPassword, false]);
            });
            hashPassword("user4", hashedPassword => {
                db.run(insert, ["user4", hashedPassword, false]);
            });
            hashPassword("user5", hashedPassword => {
                db.run(insert, ["user5", hashedPassword, false]);
            });
            // Create employees once users are created
            createEmployees; 
        }
    });
}

const createEmployees = () => {
    db.run(`CREATE TABLE ${employeeTable} (
        employeeId INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
        firstname TEXT NOT NULL,
        lastname TEXT NOT NULL,
        user INTEGER NOT NULL,
        FOREIGN KEY(user) REFERENCES ${userTable}(userId)
    )`, (err) => {
        if (!err) {
            // Table just created, insert rows
            const insert = `INSERT INTO ${employeeTable} (firstname, lastname, user) VALUES (?,?,?)`;
            db.run(insert, ['Constantine', 'Tzoumanekas', 1]);
            db.run(insert, ['Peter', 'Parker', 2]);
            db.run(insert, ['Jotaro', 'Kujo', 3]);
            db.run(insert, ['Michael', 'Jordan', 4]);
            db.run(insert, ['John', 'Smith', 5]);
            db.run(insert, ['Ichiro', 'Yamaguchi', 6]);
        }
    });
}

const _updateEmployee = (id: number, data: any, callback: (err: Error, data: any) => void) => {
    const query = `UPDATE ${employeeTable} set
    firstname = COALESCE(?, firstname),
    lastname = COALESCE(?, lastname)
    WHERE employeeId = ?`;
    let params = [data.firstname, data.lastname, id];
    db.run(query, params, function (err: Error, res: any) {
        callback(err, res);
    });
}

const _updateUser = (id: number, data: any, callback: (err: Error, data: any) => void) => {
    const query = `UPDATE ${userTable} set
    username = COALESCE(?, username),
    isAdmin = COALESCE(?, isAdmin)
    WHERE userId = ?`;
    let params = [data.username, data.isAdmin, data.userId];
    db.run(query, params, function (err: Error, res: any) {
        callback(err, res);
    });
}

// ### DB queries

/**
 * Get all employees
 * @param callback 
 */
export const getEmployees = (callback: (err: Error, employees: Employee[]) => void) => {
    const query = `SELECT e.*, u.username, u.isAdmin FROM ${employeeTable} e
    LEFT JOIN ${userTable} u ON
    u.userId = e.user`;
    db.all(query, (err: Error, employees: Employee[]) => {
        employees.forEach(employee => {
            employee.isAdmin = !!(employee.isAdmin); // Converting to boolean - SQLite cannot store boolean
        });
        callback(err, employees);
    });
}

/**
 * Get a specific employee by ID
 * @param id {number} - Employee ID
 * @param callback 
 */
export const getEmployeeById = (id: number, callback: (err: Error, employee: Employee) => void) => {
    const query = `SELECT e.*, u.username, u.isAdmin FROM ${employeeTable} e
    LEFT JOIN ${userTable} u ON
    u.userId = e.user WHERE e.employeeId = ?`
    db.get(query, [id], (err: Error, employee: Employee) => {
        employee.isAdmin = !!(employee.isAdmin); // Converting to boolean - SQLite cannot store boolean
        callback(err, employee);
    });
}

export const updateEmployee = (id: number, data: any, callback: (err: Error, data: any) => void) => {
    const {firstname, lastname, ...rest} = data;
    let d = {firstname: firstname, lastname: lastname};
    _updateEmployee(id, d, (err, res) => {
        if (err) callback(err, res);
        else {
            let d = {username: rest.username, isAdmin: (rest.isAdmin) ? 1 : 0, userId: rest.user};
            _updateUser(id, d, callback);
        }
        
    });
}

/**
 * Get a specific user by username
 * @param username {string} User's registered username
 * @param callback 
 */
export const getUserByName = (username: string, callback: (err: Error, user: UserData) => void) => {
    let sql = `SELECT * FROM ${userTable} WHERE username = ?`;
    let params = [username];
    db.get(sql, params, (err: Error, user: UserData) => {
        callback(err, user)
    });
}

/**
 * Get a specific user by ID. Can send a flag to include password or not.
 * @param id - {number} User ID
 * @param callback - Callback
 */
export const getUserById = (id: number, callback: (err: Error, user: UserData) => void) => {
    const query = `SELECT * from ${userTable} where userId = ?`;
    let params = [id];
    db.get(query, params, (err: Error, user: UserData) => {
        callback(err, user);
    });
}

/**
 * Get the authenticated user's data.
 * @param id {number} - User ID
 * @param callback - Callback
 */
export const getAuthUserData = (id: number, callback: (err: Error, data: AuthUser) => void) => {
    const query = `SELECT u.userId, u.username, u.isAdmin, e.firstname || ' ' || e.lastname as displayName
    FROM ${userTable} u
    LEFT JOIN ${employeeTable} e ON
    e.user = u.userId WHERE u.userId = ?`;
    let params = [id];
    db.get(query, params, (err: Error, data: AuthUser) => {
        data.isAdmin = !!(data.isAdmin); // Converting to boolean - SQLite cannot store boolean
        callback(err, data);
    });
}