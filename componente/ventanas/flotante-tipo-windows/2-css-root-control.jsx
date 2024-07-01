VENTANA_FLOTANTE_TIPO_WINDOWS.ID_ROOT_CSS = "ventana-flotante-tipo-windows";
VENTANA_FLOTANTE_TIPO_WINDOWS.ROOT_STYLE = document.createElement("style");
document.head.appendChild(VENTANA_FLOTANTE_TIPO_WINDOWS.ROOT_STYLE);

VENTANA_FLOTANTE_TIPO_WINDOWS.ROOT_PROPIEDADES = ({
    borderRadius = 5,
    transitionSeconds = 0.5,

    //-----------------------------
    //Marco de la ventana flotante
    //-----------------------------
    marcoDimDerecha = 5,
    marcoDimIzquierda = 5,
    marcoDimAbajo = 5,
    marcoDimArriba = 30,
    marcoTono = 207,
    marcoActivoSaturacion = 50,
    marcoActivoLuminosidad = 5,
    marcoDesactivadoSaturacion = 10,
    marcoDesactivadoLuminosidad = 0,

    //-----------------------------
    //Borde de la ventana flotante
    //-----------------------------
    bordeColor = "#252525",
    bordeGrosor = 2,
} = {}) => {
    crearEstilo({
        ":root": {
            //-----------------------------
            // Redondeado de la ventana flotante
            //-----------------------------
            [`--${VENTANA_FLOTANTE_TIPO_WINDOWS.ID_ROOT_CSS}-border-radius`]: borderRadius,
            //-----------------------------
            // Anchura de la ventana flotante cuando está minimizada
            //-----------------------------
            [`--${VENTANA_FLOTANTE_TIPO_WINDOWS.ID_ROOT_CSS}-width-minimize`]: `calc(var(--${VENTANA_FLOTANTE_TIPO_WINDOWS.ID_ROOT_CSS}-height-top) * 2 + 170px) !important`,
            //-----------------------------
            // Duración de las transiciones
            //-----------------------------
            [`--${VENTANA_FLOTANTE_TIPO_WINDOWS.ID_ROOT_CSS}-transition`]: `all ${transitionSeconds}s`,
            //-----------------------------
            // Grosor del borde de la ventana flotante
            //-----------------------------
            [`--${VENTANA_FLOTANTE_TIPO_WINDOWS.ID_ROOT_CSS}-borde-grosor`]: bordeGrosor, //Grosor del borde de la ventana flotante
            [`--${VENTANA_FLOTANTE_TIPO_WINDOWS.ID_ROOT_CSS}-marco-borde-color`]: bordeColor, //Color del borde del marco de la ventana flotante

            //-----------------------------
            // Dimensiones del marco de la ventana flotante
            //-----------------------------
            [`--${VENTANA_FLOTANTE_TIPO_WINDOWS.ID_ROOT_CSS}-width-right`]: marcoDimDerecha, //Ancho del borde del marco a la derecha de la ventana flotante
            [`--${VENTANA_FLOTANTE_TIPO_WINDOWS.ID_ROOT_CSS}-width-left`]: marcoDimIzquierda, //Ancho del borde del marco a la izquierda de la ventana flotante
            [`--${VENTANA_FLOTANTE_TIPO_WINDOWS.ID_ROOT_CSS}-height-bottom`]: marcoDimAbajo, //Alto del borde del marco en la parte inferior de la ventana flotante
            [`--${VENTANA_FLOTANTE_TIPO_WINDOWS.ID_ROOT_CSS}-height-top`]: marcoDimArriba, //Alto del borde del marco en la parte superior de la ventana flotante
            //-----------------------------
            // Colores del marco de la ventana flotante
            //-----------------------------
            [`--${VENTANA_FLOTANTE_TIPO_WINDOWS.ID_ROOT_CSS}-marco-tono`]: `${marcoTono}`, //Tono del color del marco de la ventana flotante
            //----------------------------- Valores del marco de la ventana flotante cuando está desactivado
            [`--${VENTANA_FLOTANTE_TIPO_WINDOWS.ID_ROOT_CSS}-marco-borde-desactivado-saturacion`]: `${marcoDesactivadoSaturacion}%`, //Saturación del color del borde del marco de la ventana flotante
            [`--${VENTANA_FLOTANTE_TIPO_WINDOWS.ID_ROOT_CSS}-marco-borde-luminosidad`]: `${marcoDesactivadoLuminosidad}%`, //Luminosidad del color del borde del marco de la ventana flotante
            [`--${VENTANA_FLOTANTE_TIPO_WINDOWS.ID_ROOT_CSS}-marco-borde-desactivado-color`]: `
                hsl(
                    var(--${VENTANA_FLOTANTE_TIPO_WINDOWS.ID_ROOT_CSS}-marco-tono), 
                    var(--${VENTANA_FLOTANTE_TIPO_WINDOWS.ID_ROOT_CSS}-marco-borde-desactivado-saturacion), 
                    var(--${VENTANA_FLOTANTE_TIPO_WINDOWS.ID_ROOT_CSS}-marco-borde-luminosidad)
                )
            `,
            //----------------------------- Valores del marco de la ventana flotante cuando está activada
            [`--${VENTANA_FLOTANTE_TIPO_WINDOWS.ID_ROOT_CSS}-marco-saturacion`]: `${marcoActivoSaturacion}%`, //Saturación del color del marco de la ventana flotante
            [`--${VENTANA_FLOTANTE_TIPO_WINDOWS.ID_ROOT_CSS}-marco-luminosidad`]: `${marcoActivoLuminosidad}%`, //Luminosidad del color del marco de la ventana flotante
            [`--${VENTANA_FLOTANTE_TIPO_WINDOWS.ID_ROOT_CSS}-marco-color`]: `
                hsl(
                    var(--${VENTANA_FLOTANTE_TIPO_WINDOWS.ID_ROOT_CSS}-marco-tono), 
                    var(--${VENTANA_FLOTANTE_TIPO_WINDOWS.ID_ROOT_CSS}-marco-saturacion), 
                    var(--${VENTANA_FLOTANTE_TIPO_WINDOWS.ID_ROOT_CSS}-marco-luminosidad)
                )
            `,
        }
    }, VENTANA_FLOTANTE_TIPO_WINDOWS.ROOT_STYLE);
}

VENTANA_FLOTANTE_TIPO_WINDOWS.ROOT_PROPIEDADES();