This express application had the following feature:

1 Index file:
  has:
    two error middleware (one in module)
    (eg:localhost:3000/api/userTEST ERROR)

    one error custom middleware (in module)
    (eg:localhost:3000/api/users/customMiddleWare)

    server one time stamp middleware
    (console logs the time and date)

2. Data dir:
   has:
     three data files 
     (users, posts, comments)

Functionality:
For users data     -get, patch, delete, post 
For posts data     -get
For comments data  -get


/////////////////////////////////////////////////////////////

url reference/requests:

/// users data //////////////////////////
route1 
get
localhost:3000/api/users
(get all users)

get
localhost:3000/api/users/?name=Mikoto
(get user by a query name)

post
localhost:3000/api/users
(add/post a new user)
    {
        "name": "Ronald4",
        "username": "RonRonRon4",
        "email": "mronald4@example.com"
    }

route2: 	
get
localhost:3000/api/users/4
(get user 4)

patch
localhost:3000/api/users/4
(edit the user 4)
    {
        "name": "Ronald444",
        "username": "RonRonRon444",
        "email": "mronald444@example.com"
    }

delete
localhost:3000/api/users/4
(delete the 4 user)

route3: 
get
localhost:3000/api/users/1/posts
(get all posts for userid 1 or any user id)

route4:
get
localhost:3000/api/userTEST ERROR
(get to trigger a error handler)

route5:
get
localhost:3000/api/users/customMiddleWare
(get to trigger the customMiddleWare)


/// posts data //////////////////////////
route1 /api/posts: 
get
localhost:3000/api/posts
(get all posts)


/// comments data //////////////////////////
route1 /api/comments: 
get
localhost:3000/api/comments
(get all comments)



/// end ///
