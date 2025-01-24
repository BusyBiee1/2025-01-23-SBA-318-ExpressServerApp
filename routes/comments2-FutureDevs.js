const express = require("express");
const router = express.Router();

const usersDataFile = require("../data/users");
const Utilserror = require("../utilities/error");
const postsDataFile = require("../data/posts");
const commentsDataFile = require("../data/comments");

//////////////////////////////////////////////////
////////////////////// ROUTES ///////////////////


//////////////////// .route("/") ///////////////
router
  // lists all comments
  // localhost:3000/api/comments/?api-key=perscholas
  // localhost:3000/api/comments
  .route("/")
  .get((req, res) => {
    res.json({commentsDataFile});
  })
  
  
//////////////////// .route("/:commentid") ///////////////
router
  .route("/:id")
  // GET /comments/:id
  // Retrieves the comment with the specified id.
  //localhost:3000/api/comments/1/?api-key=perscholas
  //localhost:3000/api/comments/1
  .get((req, res, next) => {
    //console.log("in route /:id");
    const commentData = commentsDataFile.find((c) => c.id == req.params.id);
    if (commentData) 
        res.json(commentData);
    else 
        next();
  })

  // PATCH /comments/:id
  // Used to update a comment with the specified id with a new body.
  //localhost:3000/api/comments/1/?api-key=perscholas
  //localhost:3000/api/comments/1
  .patch((req, res, next) => {
    // Find the comment id
    const commentData = commentsDataFile.find((u, i) => {
        if (u.id == req.params.id) {
        for (const key in req.body) {
            console.log(key);
            console.log(req.body[key]);
            usersDataFile[i][key] = req.body[key];
        }
        return true;
      }
    });
    if (commentData) 
        res.json(commentData)
    else 
        next()
  })
 
  // Deletes a comment given comment id
  // DELETE /comments/:id
  // Used to delete a comment with the specified id.
  //localhost:3000/api/comments/1/?api-key=perscholas
  //localhost:3000/api/comments/1 
  .delete((req, res, next) => {
    const commentData = commentsDataFile.find((c, i) => {
      if (c.id == req.params.id) {
        commentsDataFile.splice(i, 1);
        return true;
      }
    });

    if (commentData) 
        res.json(commentData);
    else 
        next();
  })

  //////////////////// .route("/:userid/:postid") ///////////////
  // example: GET /posts/:id/comments?userId=<VALUE>
  // Retrieves all comments made on the post with the specified 
  // id by a user with the specified userId.
  // 
  // insert/post a comment based on given user id and posting id
  // localhost:3000/api/comments/1/2/?api-key=perscholas
  // localhost:3000/api/comments/1/2
router
  .route("/:userid/:postid")
  .post((req, res, next) => {
    //console.log(req);
    // if all needed papameteres are provided in the queryObj(url) then
    if (req.body.userId && req.body.postId && req.body.body) {
        const commentData = {
            id: commentsDataFile[commentsDataFile.length - 1].id + 1,
            userId: req.body.userId,
            postId: req.body.postId,
            comment: req.body.comments,
        };
        //console.log(userData);
        usersDataFile.push(commentData);
        res.json(commentsDataFile[commentsDataFile.length - 1]);
    }
    // If not no enough data was provided by user to so a post/push/add
    else {
        //res.json({ error: "Insufficient Data" });
        res.json(Utilserror(400, "Insufficient Data"));
        //next(Utilserror(400, "Insufficient Data"));
    }
  });


module.exports = router;
