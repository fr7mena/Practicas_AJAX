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
      fetch("GastosObtenerTodos.php")
        .then(response => {
            console.log(response);
            console.log("Estado HTTP: ", response.status);
            if (!response.ok) {
                throw new Error("Error HTTP: " + response.statusText);
            }
            return response.json(); //Convertir la respuesta a JSON
        })
           .then(data => {
               console.log("Datos recibidos: ", data);
               cargarSelect(data); // Llamar a cargarSelect cuando los datos estén listos
           })
           .catch(error => console.error("Ocurrió un error: ", error.message))
           .finally(() => console.log("Solicitud Finalizada."));
    });
    /*select.addEventListener("change", function(){
        opciones_seleccion
    })*/
}

function cargarSelect(data){
    //let body = document.getElementsByTagName("body")[0];
    if (document.querySelector("select")) { //OJOOOOOOO que este metodo devuelve el primer elemento que pones como String en el parametro
        let selectBorrar = document.querySelector("select");
        selectBorrar.remove();
    }
    select = document.createElement("select");
    select.multiple = true;
    console.log(arrayObjetos);
    arrayObjetos = data.map(gasto => new Gasto(
        gasto.Id,
        gasto.Ingreso_gasto,
        gasto.Valor,
        gasto.Descripcion,
        gasto.Fecha,
        gasto.Id_concepto
    ));
    arrayObjetos.forEach((gasto) => {
        let option = document.createElement("option");
        option.value = gasto.id;
        option.textContent = gasto.descripcion;
        select.appendChild(option);
    });
    document.body.appendChild(select);
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
