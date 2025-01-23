const express = require("express");
const router = express.Router();

const usersDataFile = require("../data/users");
const customMiddleWare = require ("../customMiddleWare/customMiddleWare");
const Utilserror = require("../utilities/error");
const postsDataFile = require("../data/posts");

router
//localhost:3000/api/users/1/?api-key=perscholas
  .route("/")
  .get((req, res) => {
    res.json(usersDataFile);
    //next();
  })

  //localhost:3000/api/users/?api-key=perscholas
  .post((req, res, next) => {
    //console.log(req);
    if (req.body.name && req.body.username && req.body.email) {
      if (usersDataFile.find((u) => u.username == req.body.username)) {
        next(Utilserror(409, "Username Already Taken"));
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
      res.json({ error: "Insufficient Data" });
      //next(Utilserror(400, "Insufficient Data"));
    }
  });

  router
  .route("/:id")
  .get((req, res, next) => {
    const userData = usersDataFile.find((u) => u.id == req.params.id);
    if (userData) res.json(userData);
    else next();
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
        next();
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
        next();
  });

  router
  //localhost:3000/api/users/1/posts/?api-key=perscholas
  .route("/:id/posts")
  .get((req, res, next) => {
    //console.log("/:id/posts");
    const postsData = postsDataFile.filter((p) => p.id == req.params.id);
    //const { userId } = req.query; // Extract userId from query parameters
    //console.log(postsDataFile);
    console.log(req.query);
    console.log(req.params);
    // Check if userId is provided
    //if (!userId) {
    //  return res.status(400).json({ error: "UserId query parameter is required" });
   // }
    //console.log (userPosts); 
    // Filter posts by userId
    //const userPosts = posts.filter((p) => p.id === req.params.id);
    //console.log (userPosts);
    // Return filtered posts or a not-found message
    if (postsData.length > 0) {
        //console.log(postData);
        res.json(postsData);
    }   
    else {
        res.status(404).json(`No posts found for userId: ${req.params.id}` );
        next();
    }
  })

// Utilizing custom middleware and URL route parameter 
// example call will be http://localhost:3000//user/custommiddleware )
// the customMiddleware is the custom middle ware funciton to give is special middle action.
router
  //localhost:3000/api/customMiddleWare
  .route("/customMiddleWare")
  //app.get('/user/:id', customMiddleware, (req, res) => {
  .get(customMiddleWare, (req, res) => {
    console.log(`This is a custom middle ware is running for /user/custommiddleware only.`);
    //console.log(req.params);
    res.send('This is a custom middle ware is running for /user/custommiddleware only.');
  })


  

module.exports = router;
