window.addEventListener('load', inicio);
let objetosArray = [];
function inicio(){
    let boton = document.getElementsByTagName('button')[0]; //Para coger el unico boton del ejercicio.
    let select = document.getElementsByTagName('select')[0]; //Para coger el unico select
    let primeraOption = document.getElementsByTagName('option')[0];
    boton.addEventListener('click', function(){
        boton.disabled = true;
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200) {
                cargarSelect(this, select);

            }
        }
        xhr.open("GET", "ObjetosJson.txt", true);
        xhr.send();
    });

    select.addEventListener('change', function(){
        objetosArray.forEach((objeto) => {
            let persona = new Persona(objeto.ID, objeto.NOMBRE, objeto.APELLIDOS, objeto.TELEFONO, objeto.ESTRELLA, objeto.IDCATEGORIA);
            console.log(persona);
            let option = select.selectedOptions[0];
            if (option.textContent == persona.nombre) {
                pintarTabla([persona]);
            }
        });
    });
}

function cargarSelect(xhr, select){
    objetosArray = JSON.parse(xhr.responseText);
    console.log(objetosArray);
    /*let optGroupArray = new Array();*/
    let categorias = new Array();

    //Para rellenar lo optGroups:
    objetosArray.forEach(element => {
        let persona = new Persona(element.ID, element.NOMBRE, element.APELLIDOS, element.TELEFONO, element.ESTRELLA, element.IDCATEGORIA);

        if (!categorias.includes(persona.idCategoria)) { //Para comprobar si esta un tipo de categoria ya añadido al select o no
            let optGroup = document.createElement('optgroup');
            optGroup.label = persona.idCategoria;
            select.appendChild(optGroup);
            categorias.push(persona.idCategoria);
        }
    });

    console.log(categorias);

    //Meter las opciones dentro del optGroup:
        objetosArray.forEach(element => {
            let optGroupArray = Array.from(select.getElementsByTagName('optgroup'));
            let persona = new Persona(element.ID, element.NOMBRE, element.APELLIDOS, element.TELEFONO, element.ESTRELLA, element.IDCATEGORIA);

            optGroupArray.forEach(optGroup => {
                if (optGroup.label == persona.idCategoria) {
                    let option = document.createElement('option');
                    option.value = persona.id;
                    option.textContent = persona.nombre;
                    optGroup.appendChild(option);
                }
            });
        });
}

class Persona{
    constructor(id, nombre, apellidos, telefono, estrella, idCategoria) {
        this.id = id;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.telefono = telefono;
        this.estrella = estrella;
        this.idCategoria = idCategoria;
    }
}

function pintarTabla(arrayPintar){
    let body = document.getElementsByTagName('body')[0];
    // Eliminar tabla previa si existe
    let tablaAntigua = body.querySelector('table');
    if (tablaAntigua) {
        tablaAntigua.remove();
    }

    let table = document.createElement('table');
    if (arrayPintar.length > 0) {
        let encabezado = table.insertRow(); //Este metodo insertRow() implicitamente hace el appendChild a la tabla
        let arrayCabecera = arrayPintar[0]; //Cogemos el primer objeto del array de objetos

        for (const key in arrayCabecera) {
            let celda = encabezado.insertCell(); //Este metodo insertCell() implicitamente hace el appendChild a la tabla
            celda.textContent = key;
        }
        table.appendChild(encabezado);

        arrayPintar.forEach(element => {
            let row = table.insertRow();
            for (const key in element) {
                let celda = row.insertCell();
                celda.textContent = element[key];
            }
            table.appendChild(row);
        });
    }
    body.appendChild(table); //Insertamos la tabla en el div o main(etiqueta) correspondiente al contenedor.
}
/*

{
    "ID": 1,
    "NOMBRE": "Ana",
    "APELLIDOS": "López",
    "TELEFONO": 612345678,
    "ESTRELLA": true,
    "IDCATEGORIA": 1
},*/
