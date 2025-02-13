
window.addEventListener('load', incio);

function incio(){
    let boton = document.getElementsByTagName('button')[0]; //Para coger el unico boton del HTML
    boton.addEventListener('click', function(){
        let xhr = new XMLHttpRequest();
        let checkboxes = document.querySelectorAll('input[type="checkbox"]'); //Con esto tengo un nodelist con todos los elementos de tipo checkbox
        console.log(checkboxes);
        let arrayPintar = [];
        xhr.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200){
                let arrayObjetos = JSON.parse(this.responseText);
                console.log(arrayObjetos);
                checkboxes.forEach((checkbox) => {
                    if (checkbox.checked && checkbox.value == "ingreso") {
                        arrayObjetos.forEach((objeto) => {
                            if (objeto.Ingreso_gasto == "Ingreso") {
                                arrayPintar.push(objeto);
                            }
                        });
                    }
                    if (checkbox.checked && checkbox.value == "gasto") {
                        arrayObjetos.forEach((objeto) => {
                            if (objeto.Ingreso_gasto == "Gasto") {
                                arrayPintar.push(objeto);
                            }
                        });
                    }
                });
            }
            console.log(arrayPintar);
            pintarTabla(arrayPintar);
        }
        xhr.open('GET', "GastosObtenerTodos.php", true);
        xhr.send();
    });
}

function pintarTabla(arrayPintar){
    let contenedor = document.getElementById('contenedor');
 // Eliminar tabla previa si existe
    let tablaAntigua = contenedor.querySelector('table');
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
    contenedor.appendChild(table); //Insertamos la tabla en el div o main(etiqueta) correspondiente al contenedor.
}

/*window.addEventListener('load', inicio);

function inicio() {
    let boton = document.getElementsByTagName('button')[0]; //Para coger el único botón del HTML
    boton.addEventListener('click', function() {
        let xhr = new XMLHttpRequest();
        let checkboxes = document.querySelectorAll('input[type="checkbox"]'); //Ahora selecciona todos los checkboxes
        let arrayPintar = [];

        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                let arrayObjetos = JSON.parse(this.responseText);
                console.log(arrayObjetos);

                checkboxes.forEach((checkbox) => {
                    if (checkbox.checked && checkbox.value === "ingreso") {
                        arrayObjetos.forEach((objeto) => {
                            if (objeto.Ingreso_gasto === "Ingreso") {
                                arrayPintar.push(objeto);
                            }
                        });
                    }

                    if (checkbox.checked && checkbox.value === "gasto") {
                        arrayObjetos.forEach((objeto) => {
                            if (objeto.Ingreso_gasto === "Gasto") {
                                arrayPintar.push(objeto);
                            }
                        });
                    }
                });

                console.log(arrayPintar);
                pintarTabla(arrayPintar); // Ahora sí tiene los datos correctos
            }
        };

        xhr.open('GET', "GastosObtenerTodos.php", true);
        xhr.send();
    });
}

function pintarTabla(arrayPintar) {
    let contenedor = document.getElementById('contenedor');

    // Eliminar tabla previa si existe
    let tablaAntigua = contenedor.querySelector('table');
    if (tablaAntigua) {
        tablaAntigua.remove();
    }

    let table = document.createElement('table');

    if (arrayPintar.length > 0) {
        let encabezado = table.insertRow();
        let arrayCabecera = arrayPintar[0];

        for (const key in arrayCabecera) {
            let celda = encabezado.insertCell();
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

    contenedor.appendChild(table);
}*/