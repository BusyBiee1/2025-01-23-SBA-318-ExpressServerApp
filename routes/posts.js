const express = require("express");
const router = express.Router();

const usersDataFile = require("../data/users");
const postsDataFile = require("../data/posts");


//////////////////////////////////////////////////
////////////////////// ROUTES ///////////////////

//////////////////// .route("/") ///////////////

router
  // localhost:3000/api/posts/?api-key=perscholas
  // localhost:3000/api/posts
  .route("/")  
  .get((req, res) => {
    res.json({postsDataFile});
  })

module.exports = router;
