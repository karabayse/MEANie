// requires
// node modules
var express = require( 'express' );
var app = express();
var path = require( 'path' );
var bodyParser = require( 'body-parser' );
var mongoose = require('mongoose');

// uses
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use( bodyParser.json() );

// 27017 is default mongo port
mongoose.connect( 'localhost:27017/meanie' );

// create Schema
var ourSchema = mongoose.Schema({
  name: String,
  location: String
});

// global variable
var port = process.env.Port || 8080;

// asking mongoose to take our Schema and make a collection
var ourModels = mongoose.model( 'ourModels', ourSchema );

// get route for html
app.get( '/', function( req, res ){
  console.log('base url hit', path.resolve ('public/index.html'));
  res.sendFile( path.resolve( 'public/index.html' ) );
});

app.get( '/getRecords', function( req, res ){
    console.log('get records');
    // get and send back all the things
    ourModels.find().then( function( data ){
      res.send( data );
    }); // end get to find records
}); // end server get to get records

//
app.post( '/getRecords', function( req, res ){
  console.log( 'req.body.name: ' + req.body.name );
// retrieved the req.body

// putting it into an object to be saved in the db
var recordToAdd = {
  name:req.body.name,
  location:req.body.location
};

// create new record
var newRecord = ourModels( recordToAdd );
  newRecord.save();
});

app.delete('/deleteRecords/:id', function(req, res){
  ourModels.remove({_id:req.params.id}).then(function(){
    res.send(200);
  });
});

app.listen(port, function(){
  console.log( 'listening on 8080 ->', port);
});
