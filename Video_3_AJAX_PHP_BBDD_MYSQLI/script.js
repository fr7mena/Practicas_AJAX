window.addEventListener("load", inicio);
function inicio() {
    let boton = document.getElementById("mostrar");
    boton.addEventListener("click", mostrar);

    function mostrar() {
        let xhr = new XMLHttpRequest();
        let puntos = document.getElementById("puntuacion").value; // Corregido
        let objeto = {
            "tabla": "alumnos",
            "valor": parseInt(puntos) // Convertir a número
        };

        xhr.onreadystatechange = function() { // Cambiar a función normal
            if (this.readyState == 4 && this.status == 200) {
                console.log(this.responseText);
                let array = JSON.parse(this.responseText);
                console.log(array);
                let txt = "";
                for (const alumno of array) {
                    txt += alumno.alumno + " : " + alumno.puntuacion + "<br/>";
                }
                let texto = document.getElementById("texto");
                texto.innerHTML = txt;
            }
        };

        let parametros = JSON.stringify(objeto); // Convertir el objeto a JSON
        console.log(parametros); //Simplemente para ver la estructura del parametro.
        xhr.open("GET", "Ajax_JSON_bbdd.php?objeto=" + parametros, true);
        xhr.send();
    }
}
/*window.addEventListener("load", incio);
function incio() {
    let boton = document.getElementById("mostrar");
    boton.addEventListener("click", mostrar);
    function mostrar() {
        let xhr = new XMLHttpRequest();
        let puntos = document.getElementById("puntuacion");
        let objeto = {
            "tabla" : "alumnos",
            "valor" : parseInt(puntos)
        };


        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                let txt = "";
                let array = JSON.parse(this.responseText);
                for (const x in array) {
                    txt += array[x].alumno + " : " + array[x].puntuacion + "<br/>";
                }
                let texto = document.getElementById("texto");
                texto.innerHTML = txt;

            }
        }
        let parametros = JSON.stringify(objeto);
        xhr.open("GET", "Ajax_JSON_bbdd.php?objeto=" + parametros, true);
        xhr.send();
    }
}*/
