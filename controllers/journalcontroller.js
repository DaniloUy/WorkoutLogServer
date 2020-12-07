let express = require('express');
let router = express.Router();

// ***** New Code
let validateSession = require('../middleware/validate-session');
const Journal = require('../db').import('../models/journal');

/*
router.get('/practice', validateSession, function(req,res)
{
    res.send('Hey! This is a practice route!')
})

router.get('/about', function(req,res)
{
    res.send('This is the about route')
})
*/

/*** JOURNAL CREATE ***/


router.post('/create', validateSession, (req,res) => {
//router.post('/create',(req,res) => {
    
    const journalEntry = {
        description: req.body.log.description,
        definition: req.body.log.definition,
        result: req.body.log.result,
        owner: req.user.id 
    }
    Journal.create(journalEntry)
      .then(journal => res.status(200).json(journal)) 
      .catch(err => res.status(500).json({error: err}))
});

/***GET ALL ENTRIES ***/
router.get("/",(req,res) => {
    Journal.findAll()
      .then(journals => res.status(200).json(journals))
      .catch(err => res.status(500).json({error: err}))
});

/***GET ENTRIES BY USER ***/
router.get("/mine", validateSession, (req,res) => {
//router.get("/mine", (req,res) => {
    let userid = req.user.id
    // let userid = req.body.user.email
    Journal.findAll({
      where: {owner: userid}
    })
      .then(journals => res.status(200).json(journals)) 
      .catch(err => res.status(500).json({error: err})) 
})

/***GET ENTRIES BY TITLE ***/
router.get("/:title", function (req,res) {
    let title = req.params.title
    Journal.findAll({
      where: {title: title}
    })
      .then(journals => res.status(200).json(journals)) 
      .catch(err => res.status(500).json({error: err})) 
})  

router.put("/update/:entryId", validateSession, function (req,res) { 
//router.put("/update/:entryId", function (req,res) {  
    const updateJournalEntry = {
        description: req.body.log.description,
        definition: req.body.log.definition,
        result: req.body.log.result,
        // owner: req.user.id 
    };
     
    const query = {where: { id: req.params.entryId, owner: req.user.id }}
    
    Journal.update(updateJournalEntry, query)
      .then((journals) => res.status(200).json(journals))
      .catch((err) => res.status(500).json({error: err}));
       
});   

router.delete("/delete/:id", validateSession, function (req,res) {
//router.delete("/delete/:id", function (req,res) {  
    const query = { where: { id: req.params.id, owner: req.user.id }};

    Journal.destroy(query)
      .then(() => res.status(200).json({ message: "Journal Entry Removed"}))
      .catch((err) => res.status(500).json({error: err}));        
    });



module.exports = router;
