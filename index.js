const express = require("express");
const bodyParser = require("body-parser");

const usersRoute = require("./routes/users");
const customMiddleWare = require("./customMiddleWare/customMiddleWare");
const postsRoute = require("./routes/posts");
const commentsRoute = require("./routes/comments");
const error = require("./utilities/error");

const app = express();
const port = 3000;

// Parsing Middleware
// We use the body-parser middleware FIRST so that
// we have access to the parsed data within our routes.
// The parsed data will be located in "req.body".
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

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

// Valid API Keys.
// apiKeys = ["perscholas", "ps-example", "hJAsknw-L198sAJD-l3kasx"];
// URL call will be http://localhost:3000/api/users?api-key=perscholas
// you say 'api-key' because of the line below in app.use that says  'var key = req.query["api-key"];'
// so the request you would make in the url would be...(yes you wold pass api-key in all requests)
// First request:
// http://localhost:3000/api?api-key=perscholas
// Subsequent requests:
// http://localhost:3000/api/users?api-key=perscholas
// http://localhost:3000/api/products?api-key=perscholas
// http://localhost:3000/api/posts/1?api-key=perscholas

// New middleware to check for API keys!
// Note that if the key is not verified,
// we do not call next(); this is the end.
// This is why we attached the /api/ prefix
// to our routing at the beginning!

// uncomment this if you want api checking to work
//app.use("/api", function (req, res, next) {
//  var key = req.query["api-key"];
//  //req.header["api-key"]; but still can only use postman to send it securely for now.
  
//  // Check for the absence of a key.
//  if (!key) next(error(400, "API Key Required"));
//
//  // Check for key validity.
//  if (apiKeys.indexOf(key) === -1) next(error(401, "Invalid API Key"));
//
//  // Valid key! Store it in req.key for route access.
//  req.key = key;
//  next();
//});

// Use our Routes
app.use("/api/users", usersRoute);
app.use("/api/users/customMiddleWare", customMiddleWare);
app.use("/api/posts", postsRoute);
app.use("/api/comments", commentsRoute);

//app.use("/users", users);
//app.use("/posts", posts);

// UNCOMMENTED THESE LINES BELOW
//
//// Adding some HATEOAS links.
//app.get("/", (req, res) => {
//  res.json({
//    links: [
//      {
//        href: "/api",
//        rel: "api",
//        type: "GET",
//      },
//    ],
//  });
//});

//// Adding some HATEOAS links.
//app.get("/api", (req, res) => {
//  res.json({
//    links: [
//      {
//        href: "api/users",
//        rel: "users",
//        type: "GET",
//      },
//      {
//        href: "api/users",
//        rel: "users",
//        type: "POST",
//      },
//      {
//        href: "api/posts",
//        rel: "posts",
//        type: "GET",
//      },
//      {
//       href: "api/posts",
//       rel: "posts",
//        type: "POST",
//      },
//    ],
//  });
//}); 
//
// UNCOMMENTED THESE LINES ABOVE

// timeing middleware
// can add code here for that. login request.

//validataion middlewarse before it goes to routes.


// Error-handling middleware.
// Any call to next() that includes an
// Error() will skip regular middleware and
// only be processed by error-handling middleware.
// This changes our error handling throughout the application,
// but allows us to change the processing of ALL errors
// at once in a single location, which is important for
// scalability and maintainability.
//app.use((err, req, res, next) => {
//  res.status(err.status || 500);
//  res.json({ error: err.message });
//});
// 404 Middleware
//app.use((req, res, next) => {
//    next(error(404, "Resource Not Found"));
//    //next(error(401, "Resource Not Found"));
//    });


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

    
app.listen(port, () => {
  console.log(`Server listening on port: ${port}.`);
});
