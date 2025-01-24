const express = require("express");
const router = express.Router();

const posts = require("../data/posts");
const error = require("../utilities/error");
const usersDataFile = require("../data/users");

//////////////////////////////////////////////////
////////////////////// ROUTES ///////////////////

//////////////////// .route("/") ///////////////

router
  // localhost:3000/api/posts/?api-key=perscholas
  // localhost:3000/api/posts
  .route("/")  
  .get((req, res) => {
    res.json({ posts, links });
  //next();
  })

//?
//localhost:3000/api/users/1/posts/?api-key=perscholas
//localhost:3000/api/posts/users/1?api-key=perscholas
  .get((req, res) => {
       res.json(posts);
  })
  .post((req, res, next) => {
    if (req.body.userId && req.body.title && req.body.content) {
      const post = {
        id: posts[posts.length - 1].id + 1,
        userId: req.body.userId,
        title: req.body.title,
        content: req.body.content,
      };
      posts.push(post);
      res.json(posts[posts.length - 1]);
    } else next(error(400, "Insufficient Data"));
  });

//////////////////// .route("/:id.posts") ///////////////
router
  .route("/:id")
  .get((req, res, next) => {
    const post = posts.find((p) => p.id == req.params.id);
    if (post) res.json({ post, links });
    else next();
  })
  .patch((req, res, next) => {
    const post = posts.find((p, i) => {
      if (p.id == req.params.id) {
        for (const key in req.body) {
          posts[i][key] = req.body[key];
        }
        return true;
      }
    });
    if (post) res.json(post);
    else next();
  })
  .delete((req, res, next) => {
    const post = posts.find((p, i) => {
      if (p.id == req.params.id) {
        posts.splice(i, 1);
        return true;
      }
    });
    if (post) res.json(post);
    else next();
  });

module.exports = router;
