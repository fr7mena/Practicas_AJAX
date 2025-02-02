// Esperar a que la página cargue antes de ejecutar el script
window.addEventListener('load', function() {
    const boton = document.getElementsByTagName('button')[0]; // Obtener el único botón del HTML

    boton.addEventListener('click', function() {
        let xhr = new XMLHttpRequest(); // Crear objeto XMLHttpRequest

        xhr.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                document.getElementById("texto").innerHTML = this.responseText; // Actualizar contenido del div
            }
        };

        xhr.open("GET", "holamundo.txt", true); // Configurar la petición AJAX
        xhr.send(); // Enviar la petición
    });
});