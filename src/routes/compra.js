const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser');


var mongoUtil = require( './dbMongo' );
const { query } = require('express');
const dirip = mongoUtil.getIP(); 
var db = mongoUtil.getDb();
router.use(bodyParser.json())

let datos = {}

router.post('/compra',(req,res)=>{
    datos = req.body
    res.sendStatus(200);
})

router.get('/compra',(req,res)=>{
    var id_peli = parseInt(datos.pelicula)
    var id_funcion = datos.funcion
    const query = { "id_peli": id_peli };
    var funcion = []
    db.collection("pelicula").findOne(query)
    .then(result => {
      if(result) {
        for(let element of result.funciones) {
            if(element.id_funcion==id_funcion){
                funcion = element
                break
            }
        }
        db.collection("menu").find({}).toArray(function(err, menu) {
            if (err) res.send(`Failed to find document: ${err}`)
            console.log(menu)
            res.render('compra.html',{peli: result,direccion:dirip,funcion:funcion,datos:datos,menu:menu});
        });
      }
      else res.send("Película no encontrada")
    })
    .catch(err => res.send(`Failed to find document: ${err}`));
})

router.post('/reservar',(req,res)=>{
    let pelicula = req.body.pelicula
    let funcion = req.body.funcion
    let asientos = req.body.asientos
    let query =   {
        "id_peli": pelicula,
        "funciones.id_funcion":funcion
    }
    asientos.forEach(element => {
        db.collection("pelicula").updateOne(query, {
            $push: { "funciones.$.ocupados": element }
        })
    });
    datos = {}
    res.sendStatus(200);
})



module.exports = router