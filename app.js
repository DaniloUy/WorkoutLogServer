require('dotenv').config();
let express = require('express');
let app = express();

/*
// *** ADD LINE BELOW
let journal = require('./controllers/journalcontroller')
*/
/*
//  ***NEW CODE START ***
app.use('/test', function(reg, res) {
    res.send('This is a message from the test endpoint on the server!')
})
// *** NEW CODE END ***
*/

/*
app.use('/journal',journal)
app.listen(3000, function() {
    console.log("App is listening on port 3000");
})
*/

let sequelize = require ('./db');
//sequelize.sync();
 
//app.use(require('./middleware/headers'));
let journal = require('./controllers/journalcontroller'); 
let user = require('./controllers/usercontroller');

// *** ADD 2 LINES BELOW
sequelize.sync();
//sequelize.sync({force:true});

app.use(require('./middleware/headers'));
// *** ADD LINE BELOW
app.use(express.json());
 
/*** Exposed route ***/
app.use ('/user',user);

/*** Protected route ***/
// *** New Code
app.use(require('./middleware/validate-session'));

app.use('/journal', journal);

app.listen(3000, function() {
    console.log("App is listening on port 3000");
})


