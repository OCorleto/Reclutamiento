const MongoClient = require( 'mongodb' ).MongoClient;
const url = "mongodb://localhost:27017";
const config ={useNewUrlParser: true, useUnifiedTopology: true}
var _db;

module.exports = {
  connectToServer: function( callback ) {
    MongoClient.connect( url, config, { useNewUrlParser: true }, function( err, client ) {
      _db  = client.db('ilu');
      return callback( err );
    } );
  },

  getDb: function() {
    return _db
  }
};