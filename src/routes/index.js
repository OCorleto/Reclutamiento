const express = require('express')
const router = express.Router()
const dirip = "http://localhost:3000"

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
        res.render('index.html',{pelis: result,direccion:dirip})
    });
})

router.get('/info/:id',(req,res)=>{
    var id = parseInt(req.params.id)
    console.log("id de pelicula "+id)
    const query = { "id_peli": id };
    db.collection("pelicula").findOne(query)
    .then(result => {
      if(result) res.render('info.html',{peli: result,direccion:dirip});
      else res.send("Película no encontrada")
    })
    .catch(err => res.send(`Failed to find document: ${err}`));
})

module.exports = router