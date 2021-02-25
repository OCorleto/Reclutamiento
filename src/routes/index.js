const express = require('express')
const router = express.Router()



var mongoUtil = require( './dbMongo' );
const dirip = mongoUtil.getIP();
var db = mongoUtil.getDb();

router.get('/',(req,res)=>{
    peliculas = db.collection("pelicula").find({en_cartelera: 1}).toArray(function(err, result) {
        if (err) throw err;
        res.render('index.html',{pelis: result,direccion:dirip})
    });
})
module.exports = router