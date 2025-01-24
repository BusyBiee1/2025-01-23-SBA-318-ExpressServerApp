const express = require("express");
const router = express.Router();

const usersDataFile = require("../data/users");
const postsDataFile = require("../data/posts");
const commentsDataFile = require("../data/comments");
const error = require("../utilities/error");

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
  
module.exports = router;
