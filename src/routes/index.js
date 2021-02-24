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
      if(result) {
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();
            

            today = mm + '/' + dd + '/' + yyyy;
            var fechas = []
            result.funciones.forEach(element => {
                if(!(fechas.includes(element.fecha)) ){
                    var dateParts = element.fecha.split("/");
                    var fechafunc = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]); 
                    if(Date.parse(today) <= fechafunc) console.log('es nueva fecha')
                    fechas.push(element.fecha)
                }
            });
            fechas.sort(function(a,b) {
                a = a.split('/').reverse().join('');
                b = b.split('/').reverse().join('');
                return a > b ? 1 : a < b ? -1 : 0;
                // return a.localeCompare(b);         // <-- alternative 
              });
            res.render('info.html',{peli: result,direccion:dirip,fechas:fechas});
      }
      else res.send("Película no encontrada")
    })
    .catch(err => res.send(`Failed to find document: ${err}`));
})

router.get('/boletos',(req,res)=>{
    var id_peli = req.query.peli
    var id_funcion = req.query.funcion
    res.send("peli> "+id_peli+" funcion> "+id_funcion)
})

module.exports = router