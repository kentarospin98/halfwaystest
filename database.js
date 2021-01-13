const mongoose = require('mongoose');

require('dotenv').config();

mongoose.connect(`mongodb+srv://${process.env.dbUser}:${process.env.dbPass}@cluster0.vuy0r.mongodb.net/sample_restaurants?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Database Connected.");
});

module.exports = db;
