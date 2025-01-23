This express application had the following feature:

1 Index file:
  has:
    two error middleware
    one error custom middleware in its own module 
    one time stamp middleware
    one custom middleware in its own module
2. Data dir:
   has:
     three data files namely, users, posts, comments

Functionality:
For users data one can perform    -get, patch, delete, post
For posts data one can perform    -get, patch, delete, post
For comments data one can perform -get, patch, delete, post


url reference/requests:

/// users data //////////////////////////
route1: 
get
localhost:3000/api/users

post
localhost:3000/api/users
    {
        "name": "Ronald4",
        "username": "RonRonRon4",
        "email": "mronald4@example.com"
    }

route2: 	
get
localhost:3000/api/users/4

patch
localhost:3000/api/users/4
    {
        "name": "Ronald444",
        "username": "RonRonRon444",
        "email": "mronald444@example.com"
    }

delete
localhost:3000/api/users/4

route3: 
get
localhost:3000/api/users/1/posts


/// posts data //////////////////////////
similar url request for posts


/// comments data //////////////////////////
similar url request for comments

