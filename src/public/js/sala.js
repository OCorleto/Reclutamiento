
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