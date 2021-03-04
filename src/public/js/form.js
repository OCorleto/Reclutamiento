

function comprar(pelicula,funcion,ip,asientos,totalboletos){
    if(document.getElementById("termsCheck").checked){
        var totalmenu = parseFloat(document.getElementById('totalmenu').textContent)
        var total = totalboletos + totalmenu
        var resumen = "Total boletos: Q"+ totalboletos +"\nTotal menu: Q"+totalmenu+"\nTOTAL COMPRA: Q"+total
        if(verificarDatos()){
            if(confirm(resumen)){
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
            }
        }else {alert('Debe completar los datos para registrar su compra')}
    }else{alert('Para completar la compra debe estar de acuerdo con nuestros Terminos y Condiciones')}
}

function volverHome(ip){
    alert('Compra realizada con exito')
    window.location.href = ip
}


function masProducto(id,precio){
    var boton = document.getElementById(id)
    var id_prod = boton.id.split('_')[1]
    var id_total = "totalprod_"+id_prod
    var cant_producto = parseInt(document.getElementById(id_total).textContent)
    cant_producto ++

    var totalmenu = parseFloat(document.getElementById('totalmenu').textContent)
    totalmenu += precio

    document.getElementById('totalmenu').innerHTML = totalmenu;
    document.getElementById(id_total).innerHTML = cant_producto;
}


function verificarDatos(){
    if (document.getElementById("nombreInput").value == "") return false
    if (document.getElementById("emailInput").value == "") return false
    if (document.getElementById("tarjetaInput").value == "") return false
    if (document.getElementById("monthInput").value == "") return false
    if (document.getElementById("yearInput").value == "") return false
    if (document.getElementById("cvvInput").value == "") return false
    return true
}

function menosProducto(id,precio){
    var boton = document.getElementById(id)
    var id_prod = boton.id.split('_')[1]
    var id_total = "totalprod_"+id_prod
    var cant_producto = parseInt(document.getElementById(id_total).textContent)
    var totalmenu = parseFloat(document.getElementById('totalmenu').textContent)

    if(cant_producto > 0){
        totalmenu -= precio
        cant_producto --
    } 
    if(totalmenu < 0) totalmenu = 0

    document.getElementById('totalmenu').innerHTML = totalmenu;
    document.getElementById(id_total).innerHTML = cant_producto;
}