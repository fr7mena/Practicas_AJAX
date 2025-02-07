window.addEventListener("load", inicio);

function inicio(){
    const boton = document.getElementsByTagName("button")[0]; //Para recoger el unico boton
    let divPadre = document.getElementById("texto");
    boton.addEventListener("click", function(){
        let xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                let xml = this.responseXML;
                let table = document.createElement("table");
                if (!document.querySelector("table")) {
                    divPadre.appendChild(table);
                    let arrayCD = xml.getElementsByTagName("CD");
                    /*arrayCD = Array.from(arrayCD);*/ //consigo asegurarme de que es un array
                    let cabeceraTable = Array.from(arrayCD[0].children);
                    let trCabecera = document.createElement("tr");
                    cabeceraTable = cabeceraTable.map((elemento) => {
                        return elemento.tagName;
                    });
                    cabeceraTable.forEach(elemento => {
                        let td = document.createElement("th");
                        td.innerText = elemento;
                        trCabecera.appendChild(th);
                    });
                    table.appendChild(trCabecera);
                    arrayCD = Array.from(arrayCD);
                    arrayCD.forEach((elemento, index) => {
                        let tr = document.createElement("tr");
                        let arrayHijos = Array.from(arrayCD[index].children);
                        arrayHijos.forEach(elemento => {
                            let td = document.createElement("td");
                            td.innerText = elemento.textContent;
                            tr.appendChild(td);
                        });
                        table.appendChild(tr);
                    });
                    /*divPadre.appendChild(table);*/
                    /*console.log(cabeceraTable);*/
                } else {
                    document.querySelector("table").remove();
                }
            }
        }

        xhr.open("GET", "catalogo.xml", true);
        xhr.send();
    });
}