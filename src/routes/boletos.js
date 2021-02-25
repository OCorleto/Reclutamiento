const express = require('express')
const router = express.Router()



var mongoUtil = require( './dbMongo' );
const dirip = mongoUtil.getIP(); 
var db = mongoUtil.getDb();

router.get('/boletos',(req,res)=>{
    var id_peli = parseInt(req.query.peli)
    var id_funcion = req.query.funcion
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
        res.render('sala.html',{peli: result,direccion:dirip,funcion:funcion});
      }
      else res.send("Película no encontrada")
    })
    .catch(err => res.send(`Failed to find document: ${err}`));
})

module.exports = router