# PayPay Coding Challenge
* The backend for the application will be developed with Node.js, Express.js and SQLite


* The frontend will be developed with AngularJS (version < 2). 
This is due to the fact that my only experience is with this version of Angular.\
I will be using the component style design introduced in the latest versions of AngularJS.


* The project will also leverage TypeScript


# Running the project
TBA


# High level design
* You will need to login to the page with your user details.


* A user is an employee, and an admin is a user with a flag to check for increased privellages.


* A regular user will not be able to access the admin page.


* Admins may add new employees (i.e users), therefore they will be setting the username / password of that employee.

# Assumptions
* The page will not be refreshed, or the URL directly manipulated. This is due to the fact that manipulation
of local/session storage would be required to save some sort of application state, which would be annoying
to deal with when developing and starting/restarting the application.\
The trade off is every time I refresh the page in development, I will have to re-login. To aid with this,
I have implemented HMR (Hot Module Replacement) to minimize the need to refresh the browser during development
