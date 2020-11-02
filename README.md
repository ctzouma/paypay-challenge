# PayPay Coding Challenge
* The backend for the application will be developed with Node.js, Express.js and SQLite


* The frontend will be developed with AngularJS (version < 2). 
This is due to the fact that my only experience is with this version of Angular.\
I will be using the component style design introduced in the latest versions of AngularJS.


* The project will also leverage TypeScript


# Running the project
* Either unzip the folder, or clone this repository, then run `npm install` in the root directory of the project (where `package.json` is located)

* After `npm install` finishes, run the project with `npm run`. 

* The port has been set to be on port 8000, so accessing http://localhost:8080 will display the web app.

* You can login to a few different users. I added 1 admin user and another 5 regular users. The admin\
account can be accessed with username/password: admin/admin. Similarly, you can access users1-5 with user[1-5]/user[1-5]\
Just in case, what I mean is that for user1 the username/password is: user1/user1, user2: user2/user2 etc.


# High level design
* You will need to login to the page with your user details.


* Both users and admins are employees; an admin is a user with a flag to check for increased privellages (to view/add/remove/update employees)
and they can also grant elevated privelages to other users.


* A regular user will not be able to access the admin page.


* Admins may add new employees (i.e users), therefore they will be setting the username / initial password of that employee.

* You can logout by clicking the icon on the top right of the page (user icon). 


# Assumptions
* Assuming each employee has only one performance review of their own each

# Unfinished Business

* I was unfortunately not able to finish a large portion of the project, after configuring authentication and all the base of\
of the project, there wasn't much time left.

* That being said, there are a few API endpoints wired, and the rest would not be so difficult to add in, it is just a question of time :)
