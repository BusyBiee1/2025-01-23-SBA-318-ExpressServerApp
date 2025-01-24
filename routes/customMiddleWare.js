// Customer middleware:
// Oneway: Creating a custom middleware to run for specific routes only by 
// calling this middleware function in the route get,put,patch,delete
// example: app.get('/user/:id', customMiddleware, (req, res) => {
    function customMiddleware(req, res, next) {
        console.log('This is a custom middle ware is running for /user/custommiddleware only.');
        next()
      }

    module.exports = customMiddleware;

