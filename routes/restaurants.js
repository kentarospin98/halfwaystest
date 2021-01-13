const express = require('express');
const router = express.Router();
const db = require('../database.js');

/* GET resteraunts listing. */
router.get('/', async function(req, res, next) {
  // Default Limit is 20.
  let limit = parseInt(req.param("limit")) || 20;
  
  db.collection("restaurants").find({}, {limit: limit}, async function(err, docs) {
    // Check for error.
    if (err) {
      console.log(err);
      next(createError(500))
    } else {
      const docsArr = await docs.toArray()
      // Uncomment to send the count
      // res.send({n: docsArr.length, restaurants: docsArr});

      // Respond wit array for restaurants
      res.send(docsArr)
    }
  });
});

router.get('/cuisine', function(req, res, next) {
});


module.exports = router;
