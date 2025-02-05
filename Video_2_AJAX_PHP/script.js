window.addEventListener('load', inicio);
function inicio(){
    document.getElementById("nombre").addEventListener("keyup", mostrarNombre); //Este evento implica que cada vez que se pulse una tecla y se levante el dedo, es decir, que no mantenemos la tecla pulsada de una forma permanente se lanza el evento.
}
function mostrarNombre(e){
    let cadena = e.target.value; //Al capturar el evento podemos saber al input al que nos estamos refiriendo, Con esto nos devuelve el elemento imput, porque es al que se le ha asociado el evento y, además con value, accedemos al texto que se ha escrito en ese input de tipo texto.
    let sugerencia = document.getElementById("sugerencia");
    if (cadena.length == 0) { //Con esta validacion lo unico que estamos comprobando es que en el caso de que se borre la unica letra existente en la caja de texto y no quede nada en la caja lo podamos manejar
        sugerencia.innerHTML = "";
        return;
    } else {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                sugerencia.innerHTML = this.responseText; // Esto es un texto de respuesta simple porque viene del echo de php
            }
        };
        //Realmente la logica de programacion es exactamente la misma lo unico que al ser un metodo HTTP diferente, porque en ese caso es POST pues la forma de generar el open() es diferente y send() también
        xhr.open("POST", "arraynombres.php",true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send("nombre=" + cadena);
    }
}