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


window.addEventListener('load', incio);

function incio(){
    let boton = document.getElementsByTagName('button')[0]; //Para coger el unico boton del HTML
    boton.addEventListener('click', function(){
        let xhr = new XMLHttpRequest();
        let checkboxes = document.querySelectorAll('input[type="checkbox"]'); //Con esto tengo un nodelist con todos los elementos de tipo checkbox
        console.log(checkboxes);
        let arrayPintar = [];
        let arrayDineroGastado = [];
        let cantidadGastado = 0;
        let cantidadIngresado = 0;
        let cantidadBeneficioGasto = 0;

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

                    if (checkbox.checked && checkbox.value == "dineroGastado") {
                        arrayObjetos.forEach((objeto) => {
                            if (objeto.Ingreso_gasto == "Gasto") {
                                cantidadGastado += objeto.Valor;
                            }
                        });
                        console.log(cantidadGastado);
                    }

                    if (checkbox.checked && checkbox.value == "dineroIngresado") {
                        arrayObjetos.forEach((objeto) => {
                            if (objeto.Ingreso_gasto == "Ingreso") {
                                cantidadIngresado += objeto.Valor;
                            }
                        });
                        console.log(cantidadIngresado);
                    }

                    if (checkbox.checked && checkbox.value == "perdidasBeneficios") {
                        arrayObjetos.forEach((objeto) => {
                            cantidadBeneficioGasto += objeto.Valor;
                        });
                        console.log(cantidadBeneficioGasto);
                    }

                });
            }
            console.log(arrayPintar);
            switch (true) {
                case cantidadBeneficioGasto != 0:
                    let arrayBeneficioGasto = [];
                    const BeneficioGasto = {
                        Valor: cantidadBeneficioGasto
                    };
                    arrayBeneficioGasto.push(BeneficioGasto);
                    pintarTabla(arrayBeneficioGasto);
                    checkboxes.forEach((checkbox) => {
                        if (checkbox.checked && checkbox.value != "perdidasBeneficios") {
                            checkbox.checked = false;
                        }
                    });
                    break;

                case cantidadIngresado != 0:
                let arrayDineroIngresado = [];
                const dineroIngresado = {
                    Valor: cantidadIngresado
                };
                arrayDineroIngresado.push(dineroIngresado);
                pintarTabla(arrayDineroIngresado);
                checkboxes.forEach((checkbox) => {
                    if (checkbox.checked && checkbox.value != "dineroIngresado") {
                        checkbox.checked = false;
                    }
                });
                break;

                case cantidadGastado != 0: //Importante poner el != 0 porque el ser un numero negativo parece ser que no funcionan bien los booleanos, porque debes de poner, debido a que es un switch true, obligatoriamente una expresion booleana que de como return un true o un false
                    let arrayDineroGastado = [];
                    const dineroGastado = {
                        Valor: cantidadGastado
                    };
                    arrayDineroGastado.push(dineroGastado);
                    pintarTabla(arrayDineroGastado);
                    checkboxes.forEach((checkbox) => { //Es una forma para que solo se pueda visualizar la tabla de la cantidad y no haya dudas, los ingresos y gastos son compatibles pero las cantidades NO.
                        if (checkbox.checked && checkbox.value != "dineroGastado") {
                            checkbox.checked = false;
                        }
                    });
                    break;

                default:
                    pintarTabla(arrayPintar);
                    break;
            }

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
    //Creacion de la cabecera:



    //Creacion de las filas que no pertenecen a la cabecera:

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
