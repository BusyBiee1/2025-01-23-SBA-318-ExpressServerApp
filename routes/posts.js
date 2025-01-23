const express = require("express");
const router = express.Router();

const posts = require("../data/posts");
const error = require("../utilities/error");


router
  .route("/")
  .get((req, res) => {
    const links = [
      {
        href: "posts/:id",
        rel: ":id",
        type: "GET",
      },
    ];

    res.json({ posts, links });
  })


//*/
//api.users/1/posts
// Define route to get posts by userId
//router
//.route ("/id/posts");
//get.
//    console.log("uses route)
//})

//    ")
//  .get((req, res) => {
//    const { userId } = req.query; // Extract userId from query parameters
//  
//    // Check if userId is provided
//    if (!userId) {
//      return res.status(400).json({ error: "UserId query parameter is required" });
//    }
//  
//    // Filter posts by userId
//    const userPosts = posts.filter((post) => post.userId === parseInt(userId));
//    console.log (userPosts);
//    // Return filtered posts or a not-found message
//    if (userPosts.length > 0) {
//      res.json({ posts: userPosts });
//    } else {
//      res.status(404).json({ message: `No posts found for userId: ${userId}` });
//    }
//  })
//&/

//localhost:3000/api/users/1/posts/?api-key=perscholas
//localhost:3000/api/posts/users/1?api-key=perscholas

  .get((req, res) => {
    const links = [
      {
//        href: "posts/users/:userId",
        href: "posts/:userId",
        rel: "userId",
        type: "GET",
      },
    ];

    res.json({ posts, links });
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

router
  .route("/:id")
  .get((req, res, next) => {
    const post = posts.find((p) => p.id == req.params.id);

    const links = [
      {
        href: `/${req.params.id}`,
        rel: "",
        type: "PATCH",
      },
      {
        href: `/${req.params.id}`,
        rel: "",
        type: "DELETE",
      },
    ];

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
