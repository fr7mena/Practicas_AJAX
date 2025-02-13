let arrayObjetos= [];
let select;

window.addEventListener('load', inicio);

class Gasto {
    constructor(id, ingreso_gasto, valor, descripcion, fecha, id_concepto) {
        this.id = id;
        this.ingreso_gasto = ingreso_gasto;
        this.valor = valor;
        this.descripcion = descripcion;
        this.fecha = fecha;
        this.id_concepto = id_concepto;
    }
}

function inicio(){
    let boton = document.getElementsByTagName("button")[0];
    boton.addEventListener("click", function(){
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200){
                cargarSelect(this, boton);
            }
        }
        xhr.open("GET", "GastosObtenerTodos.php", true);
        xhr.send();
    });
}

function cargarSelect(xhr, boton){

    //Deshabilito el boton para que solo se pueda crear una vez el select
    boton.disabled = true;

    let body = document.getElementsByTagName("body")[0];
    //Parseamos el array de JSON obtenidos desde el servidor php (SIEMPRE DEVUELVE UNA RESPUESTA DE TIPO TEXTO (responseText)):
    arrayObjetos = JSON.parse(xhr.responseText);
    console.log(xhr.responseText);
    //Creamos dinamicamente el select a traves de metodos del DOM
    select = document.createElement('select');
   /* arrayObjetos.forEach(element => {
        let gasto = new Gasto(element.Id, element.Ingreso_gasto, element.Valor, element.Descripcion, element.Fecha, element.Id_concepto);
        arrayObjetos.push(gasto);
    });*/
    //Transformamos el array de objetos JSON a objetos propios de una clase propia del a traves del .map()
    arrayObjetos = arrayObjetos.map((element) => {
        let gasto = new Gasto(element.Id, element.Ingreso_gasto, element.Valor, element.Descripcion, element.Fecha, element.Id_concepto);
        return gasto;
    });
    console.log(arrayObjetos); //Esta bien

    //Rellenar los diferentes id_concepto que exiten en los objetos gastos para crear los optGroup:
    let arrayId_concepto = [];
    arrayObjetos.forEach((gasto) => {
        if (!arrayId_concepto.includes(gasto.id_concepto)){
            arrayId_concepto.push(gasto.id_concepto);
        }
    });
    console.log(arrayId_concepto);

    //Cremos los optgroups y las options:
    arrayId_concepto.forEach( (id_concepto) => {
        let optGroup = document.createElement('optgroup');
        optGroup.value = id_concepto;
        optGroup.label = id_concepto; //EHHHHHHHH QUE HAY QUE PONER EL LABEL PARA QUE SE PUEDA VER EL OPTGROUP EN LA PANTALLAAAAA FABIOOOOOO ACUERDATEEEEEEEE, APRUEBAAAAS BROOOOOO SIUUUUUUUUUUUH
        arrayObjetos.forEach((gasto) => {
            if (id_concepto == gasto.id_concepto){
                let option = document.createElement('option');
                option.textContent = gasto.descripcion;
                option.value = gasto.id;
                optGroup.appendChild(option);
                select.appendChild(optGroup);
            }
        });
    } );
    body.appendChild(select);
    select.addEventListener("change", function(){
        let opcion_seleccionada = select.selectedOptions[0].value;
        let objeto_seleccionado = arrayObjetos.find(opcion => opcion.id == Number(opcion_seleccionada));
        if (objeto_seleccionado) {
            pintarTabla([objeto_seleccionado]);
        }
    });
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
