const express = require("express");
const router = express.Router();

const usersDataFile = require("../data/users");
const customMiddleWare = require ("../routes/customMiddleWare");
const Utilserror = require("../utilities/error");
const postsDataFile = require("../data/posts");

//////////////////////////////////////////////////
////////////////////// ROUTES ///////////////////

///////////// custom middlware .route("/customMiddleWare" ///////////////
router
  .route("/customMiddleWare") 
  .get(customMiddleWare, (req, res) => {
    console.log(`This is a custom middleware is running ONLY for /user/custommiddleware.  -get- -/customMiddleWare-`);
    // for errors send() and json() actually send the response to the client, 
    // use either send() OR json(), not both
    // always set the status first, then send the response.
    return res.status(200).json({ MESSAGE: `This is a custom middleware is running ONLY for /user/custommiddleware.  -get- -/customMiddleWare-`});
  })

//////////////////// .route("/") and query .route("/?name") ///////////////
router
  // localhost:3000/api/users/?api-key=perscholas
  // localhost:3000/api/users
  // localhost:3000/api/users/?name=Mikoto
  // localhost:3000/api/users/customMiddleWare
  .route("/") 
  .get((req, res) => {
    const { name } = req.query; // Extract the 'name' query parameter

    if (!name) {
      // If no name query parameter, return all users
      return res.json(usersDataFile);
    }

    // Filter users by query name
    const userData = usersDataFile.filter((user) => user.name === name);
    if (userData.length > 0) {
      // If matching users are found, return them
      return res.json(userData);
    }
    else {
      next(Utilserror(404, `No resourece found for Name: ${name}. -get- -/?name-`));
      //return res.status(404).json({ error: `No users found with name "${name}"` });
    }
    next();
  })

  //localhost:3000/api/users/?api-key=perscholas
  //localhost:3000/api/users/
  .post((req, res, next) => {
    //console.log(req);
    if (req.body.name && req.body.username && req.body.email) {
      if (usersDataFile.find((u) => u.username == req.body.username)) {
        //res.status(400).json({ ERROR: `Username Already Taken. -post request-`});
        next(Utilserror(409, "Username Already Taken. --post- -/-"));
        return;
      }
      //console.log(`${req.body.name}`);
      //console.log(`${req.body.username}`);
      //console.log(req.body.email);
      
      const userData = {
        id: usersDataFile[usersDataFile.length - 1].id + 1,
        name: req.body.name,
        username: req.body.username, 
        email: req.body.email,
      };
      console.log(userData);
      usersDataFile.push(userData);
      res.json(usersDataFile[usersDataFile.length - 1]);
    }
    else {
      //res.status(404).json(`No posts found for userId: ${req.params.id}. -post- -/-`);
      next(Utilserror(404, "Insufficient Data. -post- -/-"));
      //res.status(404).json({ ERROR: "Insufficient Data. -post- -/-1" });
    }
  })

  //////////////////// .route("/:id") ///////////////
  router
  // localhost:3000/api/users/1
  .route("/:id")
  .get((req, res, next) => {
    const userData = usersDataFile.find((u) => u.id == req.params.id);
    if (userData) 
       res.json(userData);
    else 
       next(Utilserror(404, `No Resource found for userId: ${req.params.id}. -get- -/:id-`));  
  })
  .patch((req, res, next) => {
    const userData = usersDataFile.find((u, i) => {
      if (u.id == req.params.id) {
        for (const key in req.body) {
            usersDataFile[i][key] = req.body[key];
        }
        return true;
      }
    });
    if (userData) 
        res.json(userData);
    else 
        next(Utilserror(404, `No Resource found for userId: ${req.params.id}. -patch- -/:id-`));
  })
  .delete((req, res, next) => {
    const userData = usersDataFile.find((u, i) => {
      if (u.id == req.params.id) {
        usersDataFile.splice(i, 1);
        return true;
      }
    });

    if (userData) 
        res.json(userData);
    else 
        next(Utilserror(404, `No Resourece found for userId: ${req.params.id}. -post- -/:id-`));
  });


  //////////////////// .route("/:id.posts") ///////////////

  router
  //localhost:3000/api/users/1/posts/?api-key=perscholas
   //localhost:3000/api/users/1/posts
  //(for a given user id get all the posts for that user)
  .route("/:id/posts")
  .get((req, res, next) => {
    const postsData = postsDataFile.filter((p) => p.id == req.params.id);
    //console.log(postsDataFile);
    //console.log(req.query);
    //console.log(req.params);
    // Check if userId is provided
    if (postsData.length > 0) {
        //console.log(postData);
        res.json(postsData);
    }   
    else {
        //res.status(404).json({ ERROR: `No posts found for userId: ${req.params.id}. -get- -/:id/posts-`});
        next(Utilserror(404, `No posts found for userId: ${req.params.id}. -post- -/:id/posts-`));    
        //next();
    }
  })

module.exports = router;
