require('dotenv').config();
let express = require('express');
let app = express();
const db = require("./db");

// let sequelize = require ('./db');
 
//app.use(require('./middleware/headers'));
let journal = require('./controllers/journalcontroller'); 
let user = require('./controllers/usercontroller');

// *** ADD 2 LINES BELOW
// sequelize.sync();
// sequelize.sync({force:true});

app.use(require('./middleware/headers'));
// *** ADD LINE BELOW
app.use(express.json());

/*** Exposed route ***/
app.use ('/user',user);

/*** Protected route ***/
// *** New Code
app.use(require('./middleware/validate-session'));

app.use('/journal', journal);

// app.listen(4000, function() {
//     console.log("App is listening on port 4000");
// })

db.authenticate()
  .then(() => db.sync())  // => (force: true)
  .then(() => {
    app.listen(process.env.PORT, () => console.log(`[Server: ] App is listening on Port ${process.env.PORT}`));  
  })
  .catch((err) => {console.log(err)
  })


