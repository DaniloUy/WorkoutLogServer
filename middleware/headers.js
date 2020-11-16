module.exports = function (req, res, next) {
   
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
//  res.header('access-control-allow-headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Headers', '*')
//  res.header('Access-Control-Allow-Credentials', true)
    next();
};
 // CORS - Cross Origin Resource Sharing: mechanism that uses additional HTTP Headers to tell browsers to give a web application that is running at one origin, access to
 // resources at a different origin 