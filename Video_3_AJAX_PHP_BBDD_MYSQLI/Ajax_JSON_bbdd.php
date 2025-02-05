<?php
    header("Content-type: application/json; charset=utf-8");
    /*Me creo el objeto JSON proveniente del navegador/cliente*/
    $objeto = json_decode($_REQUEST["objeto"], false);
   /* $objeto = json_decode('{"tabla":"alumnos", "valor":111}');*/


    //Definimos los parametros de conexion de la base de datos:
    $servidor = "localhost";
    $usuario = "root";
    $password = "";
    $bd = "ada";
    $conexion = mysqli_connect($servidor, $usuario, $password, $bd); //También se podria hacer con PDO.
    //Comprobar la conexion:
    if ($conexion->connect_error) {
        die("Error en la conexión: " . $conexion->connect_error); //Simplemente para informar del error en especifico que se ha producido al intentar conectarse a la base de datos.
    } else {
        //Conexion correcta
        $sql = "SELECT * FROM $objeto->tabla WHERE puntuacion >= $objeto->valor";

        $resultado = $conexion->query($sql);

        $salida = array();
        $salida = $resultado->fetch_all(MYSQLI_ASSOC);

        echo json_encode($salida); //NO PODEMOS MANDAR NADA MAS QUE SEA UN JSON Y HAY QUE COMPROBAR QUE FUNCIONA CORRECTAMENTE EL PHP.
    }
    $conexion->close();






?>