const express = require('express')
const router = express.Router()
var mongo = require('mongoose');
const MongoClient = require('mongodb').MongoClient
const db_path = 'mongodb://localhost:27017/ilu'
const db_config = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}
var db= ""
MongoClient.connect(db_path,function(err,client){
    if(!err) {
        console.log('Connect Mongo!')
        db = client.db('ilu')
    }
    else console.log('Error mongo')
})



router.get('/',(req,res)=>{
    peliculas = db.collection("pelicula").find({en_cartelera: 1}).toArray(function(err, result) {
        if (err) throw err;
        res.render('index.html',{pelis: result})
      });
    
})


module.exports = router