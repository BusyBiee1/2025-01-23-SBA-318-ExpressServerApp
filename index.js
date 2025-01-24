const express = require("express");
const bodyParser = require("body-parser");

const usersRoute = require("./routes/users");
const customMiddleWareRoute = require("./routes/customMiddleWare");
const postsRoute = require("./routes/posts");
const commentsRoute = require("./routes/comments");
const error = require("./utilities/error");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

// Routes
app.use("/api/users", usersRoute);
app.use("/api/users/customMiddleWare", customMiddleWareRoute);
app.use("/api/posts", postsRoute);
app.use("/api/comments", commentsRoute);


// Middlewares
// Logging Middlewaare
app.use((req, res, next) => {
  const time = new Date();
  console.log(
    `-----
${time.toLocaleTimeString()}: Received a ${req.method} request to ${req.url}.`
  );
  if (Object.keys(req.body).length > 0) {
    console.log("Containing the data:");
    console.log(`${JSON.stringify(req.body)}`);
  }
  next();
});

// Error-handling middleware.
// 404 Middleware for unmatched routes
  app.use((req, res, next) => {
    next(error(404, 'Resource Not Found'));
  });
  
// General Error Handling Middleware
  app.use((err, req, res, next) => {
    const status = err.status || 500;
    res.status(status).json({
      error: {
        message: err.message,
        status,
      },
    });
  });


// start server    
app.listen(port, () => {
  console.log(`Server listening on port: ${port}.`);
});
