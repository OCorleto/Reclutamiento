
let numboletos=0
let asientos = []

function newBoleto(id,precio,value){
    
    boton = document.getElementById(id)
    if(value == 0){
        boton.value=1
        boton.style.background="#008f39"
        asientos.push(id)
        numboletos++
    }else{
        boton.value=0
        boton.style.background="#9b9b9b"
        numboletos--
        asientos = removeid(id)
    }
    if(numboletos<0) numboletos=0
    console.log(asientos)
    document.getElementById('conttotal').innerHTML = "Q "+(numboletos*precio);
    document.getElementById('contboletos').innerHTML = (numboletos);
}

function removeid(id){
    array = asientos
    const index = array.indexOf(id);
    if (index > -1) {
        array.splice(index, 1);
    }
    return array
}

function enviarDatos(pelicula,funcion,ip){
    console.log("Hice click en compra")
    if(numboletos > 0){
        data= {
            pelicula:pelicula,
            funcion:funcion,
            asientos:asientos,
            numboletos:numboletos
        }
        let url = ip+"/compra"
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
                "Content-Type" : "application/json"  }
            })
            .catch(error => console.log('Error:', error))
            .then(res => window.location.href = ip+"/compra");
    }else alert('Debe seleccionar los boletos que desea comprar')
}