<?php
    $arrayNombres = array("Sara", "Imanol", "Dani", "Antonio", "David", "Igor", "Naroa", "Christian", "Joseba", "Angel", "Alex", "Dumitru", "Mikel", "Ivan", "Martin");
    $nombre = $_REQUEST["nombre"];
    $sugerencia = "";

    if ($nombre !== "") {
        $nombre = strtolower($nombre);
        $longitud = strlen($nombre);

        foreach ($arrayNombres as $nombreCompleto) {
            if (stristr($nombre, substr($nombreCompleto, 0, $longitud)  )) {
                if ($sugerencia === "") {
                    $sugerencia = $nombreCompleto;

                } else {
                    $sugerencia = $sugerencia . "," . $nombreCompleto;
                }

            }
        }

    }
    if ($sugerencia == "") {
        echo "NO hay sugerencias";
    } else {
        echo $sugerencia;
    }
?>
