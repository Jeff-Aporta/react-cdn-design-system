VENTANA_FLOTANTE_TIPO_WINDOWS.AGRUPAMIENTO.eliminarFirstChild = () => {/**
        * Remueve la clase "is-firt-child" de todos los elementos con la clase "ventana-flotante-tipo-windows"
        * Con la finalidad de ser una función auxiliar, para asegurar que solo un elemento tenga la clase "is-firt-child"
    */
    let ventanas = [...VENTANA_FLOTANTE_TIPO_WINDOWS.AGRUPAMIENTO.querySelectorAll(".ventana-flotante-tipo-windows")];
    ventanas.forEach(ventana => ventana.classList.remove("is-firt-child"));
};

VENTANA_FLOTANTE_TIPO_WINDOWS.AGRUPAMIENTO.distribuir_ventanas_en_sistema_de_cuadricula = (columnas, filas) => {/**
        * Distribuye las ventanas flotantes tipo Windows en un sistema de cuadrícula
    */
    let ventanas = [...VENTANA_FLOTANTE_TIPO_WINDOWS.AGRUPAMIENTO.querySelectorAll(".ventana-flotante-tipo-windows")];
    let ancho = 100 / columnas;
    let alto = 100 / filas;
    for (let fila = 0; fila < filas; fila++) {
        for (let columna = 0; columna < columnas; columna++) {
            let ventana = ventanas.shift();
            if (ventana) {
                Object.assign(ventana.style, {
                    width: `${ancho}%`,
                    height: `${alto}%`,
                    left: `${ancho * columna}%`,
                    top: `${alto * fila}%`,
                });
            }
        }
    }
}

VENTANA_FLOTANTE_TIPO_WINDOWS.AGRUPAMIENTO.nuevaVentana = (props) => {/**
        * Crea una nueva ventana flotante tipo Windows
    */
    let ventana = VENTANA_FLOTANTE_TIPO_WINDOWS.CREAR(props);
    
    ventana.maximizar_medianamente();
    ventana.poner_de_primero();
    setTimeout(() => {
        ventana.classList.remove("animacion-de-inicio");
    }, 1000);
};