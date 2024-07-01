
/**
 * ---------------------------------------------------------
 * Componente de ventana flotante tipo Windows
 * React
 * ---------------------------------------------------------
*/
VENTANA_FLOTANTE_TIPO_WINDOWS.CREAR = (props) => {

    let {
        titulo = "", //Titulo en la parte superior del marco de la ventana
        html, //Contenido de la ventana
        JSX, //Contenido de la ventana en JSX

        mostrar_boton_cerrar = true, //Visibilidad del botón de cerrar
        mostrar_boton_maximizar = true, //Visibilidad del botón de maximizar
        mostrar_boton_minimizar = true, //Visibilidad del botón de minimizar

        prevenirApertura = () => false, //Función que se ejecuta antes de abrir la ventana, si retorna verdadero no se abrirá la ventana

        //-------------------------
        // OPCIONALES
        //-------------------------
        //ancho_porcentaje_mediano,
        //alto_porcentaje_mediano,
        //ancho_minimo,
        //alto_minimo,
        //respetarLimitesVentana,
        //esMovible,
        //esRedimensionable,
        //evento_cerrar = () => { }, //Evento que se ejecuta al cerrar la ventana
    } = props;

    if (prevenirApertura()) {/**
            * Si la función "prevenirApertura" retorna verdadero
            * No se abrirá la ventana
             
                - Se pueden mostrar mensajes de error o advertencia dentro de la función "prevenirApertura"
         */
        return;
    }

    let retorno = DOMFromReact(<div
        className={`
            ventana-flotante-tipo-windows
            animacion-de-inicio
        `}
        onClick={e => {
            console.log("click en ventana flotante tipo windows");
        }}
    >
        <Contenido />
        <div className="marco"></div>
    </div>);

    retorno.addEventListener("click", () => {
        if (retorno.estaMinimizado()) {
            return;//No tiene sentido hacerlo principal si está minimizado
        }
        retorno.poner_de_primero();
    });

    retorno.idR = Math.random().toString().replace("0.", "");

    retorno.querySelector(".marco").replaceWith(DOMFromReact(Object.values(VENTANA_FLOTANTE_TIPO_WINDOWS.MARCO({
        ventana: retorno,
        titulo,
        mostrar_boton_cerrar,
        mostrar_boton_minimizar,
        mostrar_boton_maximizar,
    }))));

    VENTANA_FLOTANTE_TIPO_WINDOWS.CONTROL({
        ventana: retorno,
        ...props,
    });

    return retorno;

    function Contenido() {
        let retorno = <div
            className={`
                contenido
            `}
        >
            {(() => {
                if (JSX) {
                    return JSX;
                }
            })()}
        </div>;
        if (html) {
            retorno.innerHTML = html;
        }
        return retorno;
    }
}