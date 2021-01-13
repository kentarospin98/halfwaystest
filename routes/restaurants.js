const express = require('express');
const router = express.Router();
const db = require('../database.js');
const createError = require('http-errors');

/* GET resteraunts listing. */
router.get('/', async function(req, res, next) {
  // Default Limit is 20.
  let limit = parseInt(req.param("limit")) || 20;

  let docs = db.collection("restaurants").find({}, {limit: limit})
  if (docs) {
    const docsArr = await docs.toArray();
    // Uncomment to send the count
    // res.send({n: docsArr.length, restaurants: docsArr});

    // Respond with array for restaurants
    res.send(docsArr)
  } else {
    next(createError(500))
  }
});

router.get('/cuisine', async function(req, res, next) {
  let cuisine = req.param("cuisine");

  // Gets the names of restaurants with cuisine as specified
  //  Returns empty array if nothing matches
  // We could also use the find() function followed by toArray() to
  // return the full restaurant objects
  let resteraunts = await db.collection("restaurants").distinct("name", {cuisine: cuisine})

  res.send(resteraunts);
});


module.exports = router;
