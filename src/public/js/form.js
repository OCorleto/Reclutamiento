const { response } = require("express")

function comprar(pelicula,funcion,ip,asientos){
    if(document.getElementById("termsCheck").checked){
        console.log("Hice click en compra")
        data= {
            pelicula:pelicula,
            funcion:funcion,
            asientos:asientos.split(",")
        }
        let url = ip+"/reservar"
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
                "Content-Type" : "application/json"  }
            }).then(response => volverHome(ip))
            .catch(error => console.log('Error:', error))
            
    }else{alert('Para completar la compra debe estar de acuerdo con nuestros Terminos y Condiciones')}
}

function volverHome(ip){
    alert('Compra realizada con exito')
    window.location.href = ip
}