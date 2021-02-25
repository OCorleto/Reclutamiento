const express = require('express')
const router = express.Router()



var mongoUtil = require( './dbMongo' );
const dirip = mongoUtil.getIP();
var db = mongoUtil.getDb();

router.get('/info/:id',(req,res)=>{
    var id = parseInt(req.params.id)
    const query = { "id_peli": id };
    db.collection("pelicula").findOne(query)
    .then(result => {
      if(result) {
            var today =getToday()
            var fechas = []
            result.funciones.forEach(element => {
                if(!(fechas.includes(element.fecha)) ){
                    var dateParts = element.fecha.split("/");
                    var fechafunc = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]); 
                    if(Date.parse(today) <= fechafunc) console.log('es nueva fecha')
                    fechas.push(element.fecha)
                }
            });
            fechas = OrdenarFechas(fechas)
            res.render('info.html',{peli: result,direccion:dirip,fechas:fechas});
      }
      else res.send("Película no encontrada")
    })
    .catch(err => res.send(`Failed to find document: ${err}`));
})


function getToday(){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;
    return today
}

function OrdenarFechas(fechas){
    return fechas.sort(function(a,b) {
        a = a.split('/').reverse().join('');
        b = b.split('/').reverse().join('');
        return a > b ? 1 : a < b ? -1 : 0;
    });
}

module.exports = router