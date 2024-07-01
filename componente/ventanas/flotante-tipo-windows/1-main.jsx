addLink(`${prefixLoad}/componente/ventanas/flotante-tipo-windows/index.css`);

//Objeto que agrupa todas las funciones y variables globales de las ventanas flotantes tipo Windows
const VENTANA_FLOTANTE_TIPO_WINDOWS = {};

//Elemento DOM que agrupa todas las ventanas flotantes tipo Windows
VENTANA_FLOTANTE_TIPO_WINDOWS.AGRUPAMIENTO = document.createElement("div");
VENTANA_FLOTANTE_TIPO_WINDOWS.AGRUPAMIENTO.classList.add(
    "minimizacion-ventana-flotante-tipo-windows",
    "frames-tipo-windows"
);

//Añadir el elemento DOM al body
document.body.appendChild(VENTANA_FLOTANTE_TIPO_WINDOWS.AGRUPAMIENTO);