const router = require ('express').Router();
const User = require('../db').import('../models/user');
const jwt = require("jsonwebtoken");
// ***** New code
const bcrypt = require("bcryptjs")
;/***************
  USER SIGNUP
***************/

router.post('/create', function(req,res) {

      User.create ({
          /*
          email: "user@email.com",
          password: "password1234"
          */
          email: req.body.user.email,
          // password: req.body.user.password
          // ***** New code  
          password: bcrypt.hashSync(req.body.user.password,13)
      })
      // *** Update code
        .then (
            // ***** Update code
            /*
            res.send("This is our user/create endpoint!")
            */
            function createSuccess(user) {  
              // ***** New code
              let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});   
                res.json ({
                    user: user,
                // ***** New code
                message: 'User successfully created!',
                sessionToken: token     
              });
            }
        )
        // ***** ADD LINE BELOWS
        .catch(err => res.status(500).json({error: err}))
       
});

/* ******************
 *** USER SIGNIN ***
********************/

router.post('/login', function(req,res) {

    // *** New code
    User.findOne ({
        where: {
            email: req.body.user.email
        }
    })
    // ***** New code
        .then(function loginSuccess(user) {
            if (user) {

              bcrypt.compare(req.body.user.password,user.password,function(err,matches) {
                if (matches) {
               
                  // ***** New code    
                  let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24}); 
            
                  res.status(200).json({
                   user: user,
                   // ***** New code    
                   message: 'User successfully logged in!',
                   sessionToken: token                            
                  })
                } else {
                   res.status(502).json({ error: 'Login failed.'});
                }
                })
            } else {
               res.status(500).json({ error: 'User does not exist.'})  
            }    
        })
        .catch(err => res.status(500).json({ error: err}))
    });

module.exports = router;
