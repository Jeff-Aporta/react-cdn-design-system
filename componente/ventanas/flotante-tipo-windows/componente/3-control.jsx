VENTANA_FLOTANTE_TIPO_WINDOWS.CONTROL = ({
    ventana,
    ancho_porcentaje_mediano = 0.4, //Ancho de la ventana en porcentaje de la ventana principal
    alto_porcentaje_mediano = 0.4, //Alto de la ventana en porcentaje de la ventana principal
    ancho_minimo = 300, //Ancho mínimo en pixeles de la ventana
    alto_minimo = 200, //Alto mínimo en pixeles de la ventana
    respetarLimitesVentana = true, /**
        - Si es verdadero, la ventana no se podrá mover o redimensionar fuera de los límites de la ventana principal del navegador
        - Si es falso, la ventana se podrá mover o redimensionar fuera de los límites de la ventana principal del navegador
    */
    esMovible = true,/**
        - Si es verdadero, la ventana se podrá mover
        - Si es falso, la ventana no se podrá mover
    */
    esRedimensionable = true, /**
        - Si es verdadero, la ventana se podrá redimensionar
        - Si es falso, la ventana no se podrá redimensionar
    */
    evento_cerrar = () => { }, //Evento que se ejecuta al cerrar la ventana
}) => {

    if (!ventana) {
        return;
    }

    ventana.formaRecordada = {};

    ventana.animar_contenido_como_primera_vez = () => {
        let contenido = ventana.querySelector(".contenido");
        contenido.classList.add("animacion-de-opacidad");
        setTimeout(() => {
            contenido.classList.remove("animacion-de-opacidad");
        }, 1000);
    };

    ventana.animar_contenido_como_primera_vez();

    ventana.activar_propiedades_CSS_transitivas = () => {
        ventana.classList.add("transitivo");
        setTimeout(() => {
            ventana.classList.remove("transitivo");
        }, 1000);
    };

    ventana.poner_de_primero = () => {
        if (ventana.classList.contains("is-firt-child")) {
            return;
        }

        primerZindex();

        AgregarElementoAlDOM();

        function AgregarElementoAlDOM() {
            if (!VENTANA_FLOTANTE_TIPO_WINDOWS.AGRUPAMIENTO.contains(ventana)) {
                VENTANA_FLOTANTE_TIPO_WINDOWS.AGRUPAMIENTO.prepend(ventana);
            }
        }

        function primerZindex() {
            VENTANA_FLOTANTE_TIPO_WINDOWS.AGRUPAMIENTO.eliminarFirstChild();

            ventana.classList.add("is-firt-child");

            let hermanos = [...VENTANA_FLOTANTE_TIPO_WINDOWS.AGRUPAMIENTO.querySelectorAll(".ventana-flotante-tipo-windows")].filter(hermano => hermano != ventana);
            hermanos.sort((a, b) => {
                return a.style.zIndex - b.style.zIndex;
            });
            hermanos.reverse();
            let cantidad_ventanas = hermanos.length + 1;
            ventana.style.zIndex = cantidad_ventanas;
            hermanos.forEach((hermano, i) => {
                hermano.style.zIndex = cantidad_ventanas - i - 1;
            });
        };
    }

    ventana.cambiar_esRedimensionable = (b) => {
        esRedimensionable = b;
    };

    ventana.cambiar_esMovible = (b) => {
        esMovible = b;
    };

    ventana.cambiar_forma_transitiva = ({
        x, y, w, h, xi, yi, wi, hi
    }) => {
        ventana.activar_propiedades_CSS_transitivas();
        ventana.cambiar_forma({ x, y, w, h, xi, yi, wi, hi });
    };

    ventana.cambiar_posicion_transitiva = (x, y) => {
        ventana.activar_propiedades_CSS_transitivas();
        ventana.cambiar_posicion(x, y);
    };

    ventana.cambiar_de_dimension_transitiva = (w, h) => {
        ventana.activar_propiedades_CSS_transitivas();
        ventana.cambiar_de_dimension(w, h);
    };

    ventana.cerrar = () => {
        if (ventana.estaEnAnimacion()) {
            return;
        }
        ventana.classList.remove("maximizado");
        ventana.mostrar_elementos_por_desmaximizacion();
        ventana.classList.add("animacion-de-cierre");
        ventana.querySelector(".control.arriba").classList.add("animacion-de-cierre");
        setTimeout(() => {
            ventana.remove();
            ventana.mostrar_elementos_por_desmaximizacion();
        }, 1000);
        evento_cerrar();
    };

    ventana.minimizar = () => {
        if (ventana.estaEnAnimacion()) {
            return;
        }
        ventana.classList.remove("maximizado");
        ventana.poner_de_primero();
        setTimeout(() => {
            let chk = ventana.querySelector(".control.btns .btn.minimizar input[type=checkbox]");
            chk.checked = !chk.checked;
            if (!chk.checked) {
                ventana.animar_contenido_como_primera_vez();
                ventana.classList.add("is-firt-child");
                ventana.activar_propiedades_CSS_transitivas();
            } else {
                ventana.classList.remove("is-firt-child");
            }
            ventana.poner_de_primero();
        }, 0);
        ventana.mostrar_elementos_por_desmaximizacion();
    };

    ventana.maximizar = () => {
        if (ventana.estaEnAnimacion()) {
            return;
        }
        ventana.capturar_propiedades_ventana();
        ventana.activar_propiedades_CSS_transitivas();
        ventana.cambiar_forma({
            x: 0,
            y: 0,
            w: window.innerWidth,
            h: window.innerHeight
        })
        ventana.classList.add("maximizado");
        ventana.parentNode.classList.add("maximizado");
        [...ventana.querySelectorAll("*")].forEach(elemento => {
            elemento.classList.add("maximizado");
        });

        ventana.poner_de_primero();

        ventana.ocultar_elementos_por_maximizacion();
    };

    ventana.demaximizar = () => {
        if (ventana.estaEnAnimacion()) {
            return;
        }
        ventana.activar_propiedades_CSS_transitivas();
        ventana.classList.remove("maximizado");
        if (
            !ventana.formaRecordada.width ||
            !ventana.formaRecordada.height ||
            !ventana.formaRecordada.top ||
            !ventana.formaRecordada.left
        ) {
            ventana.maximizar_medianamente();
            return;
        }
        ventana.cambiar_forma({
            x: ventana.formaRecordada.left,
            y: ventana.formaRecordada.top,
            w: ventana.formaRecordada.width,
            h: ventana.formaRecordada.height,
        });

        ventana.poner_de_primero();

        ventana.mostrar_elementos_por_desmaximizacion();
    };

    ventana.estaMaximizado = () => {
        return ventana.classList.contains("maximizado");
    };

    ventana.estaMinimizado = () => {
        return ventana.querySelector(`.control.btns .btn.minimizar input[type="checkbox`).checked;
    };

    ventana.estaEnAnimacion = () => {
        [
            "animacion-de-cierre",
            "animacion-de-apertura",
            "transitivo"
        ].some(clase => ventana.classList.contains(clase));
    };

    ventana.cambiar_forma = ({
        x, y, w, h, xi, yi, wi, hi
    }) => {

        let ancho_calculado;
        let alto_calculado;

        /**---------------------------------------------------------
         * Calculo de la dimensión de la ventana W y H
         * ---------------------------------------------------------
         */
        (() => {
            if (!esRedimensionable) {
                return;
            }
            if (w != undefined) {
                if (respetarLimitesVentana) {
                    ancho_calculado = Math.min(w, window.innerWidth - (x ?? ventana.offsetLeft));
                    w = ancho_calculado;
                    if (w < ancho_minimo) {
                        w = ancho_minimo;
                    }
                }
                ventana.style.width = w + "px";
            }
            if (h != undefined) {
                if (respetarLimitesVentana) {
                    alto_calculado = Math.min(h, window.innerHeight - (y ?? ventana.offsetTop));
                    h = alto_calculado;
                    if (h < alto_minimo) {
                        h = alto_minimo;
                    }
                }
                if (h >= alto_minimo) {
                    ventana.style.height = h + "px";
                }
            }
        })();
        /**
         * ---------------------------------------------------------
         * Calculo de la posición de la ventana X e Y
         * ---------------------------------------------------------
         */
        (() => {
            if (!esMovible) {
                return;
            }
            if (x != undefined) {
                if (respetarLimitesVentana) {
                    let izq = 0;
                    let der = window.innerWidth - (w ?? ventana.offsetWidth);
                    if (x < izq) {
                        x = izq;
                    }
                    if (x > der) {
                        x = der;
                    }
                }

                if (xi && wi && ancho_calculado < ancho_minimo) {
                    let limit_x = xi + wi - ancho_minimo;
                    if (x > limit_x) {
                        x = limit_x;
                    }
                }
                ventana.style.left = x + "px";
            }
            if (y != undefined) {
                if (respetarLimitesVentana) {
                    let sup = 0;
                    let inf = window.innerHeight - (h ?? ventana.offsetHeight);
                    if (y < sup) {
                        y = sup;
                    }
                    if (y > inf) {
                        y = inf;
                    }
                }
                if (yi && hi && alto_calculado < alto_minimo) {
                    let limit_y = yi + hi - alto_minimo;
                    if (y > limit_y) {
                        y = limit_y;
                    }
                }
                ventana.style.top = y + "px";
            }
        })();
    };

    ventana.cambiar_posicion = (x, y) => {

        verificarCambioDePosiciónParaEvento();

        ventana.cambiar_forma({ x, y });

        function verificarCambioDePosiciónParaEvento() {
            let { left: xi, top: yi } = ventana.style;
            xi = parseFloat(xi.replace("px", ""));
            yi = parseFloat(yi.replace("px", ""));
            if (xi != x || yi != y) { /**
                    * Si la posición de la ventana cambia
                    * Se desactiva la interacción con la ventana y se desactiva la selección de texto o elementos
                */
                let contenido = ventana.querySelector(".contenido");
                contenido.classList.add("sin-interaccion");
                document.body.style.userSelect = "none";

                ventana.poner_de_primero();

                if (ventana.eventoPosiciónCambiada) {
                    ventana.eventoPosiciónCambiada(xi, yi, x, y);
                }
            }
        }
    };

    ventana.cambiar_de_dimension = (w, h) => {
        ventana.cambiar_forma({ w, h });
    };


    ventana.maximizar_medianamente = () => {
        const top_percent = (1 - alto_porcentaje_mediano) / 2;
        const left_percent = (1 - ancho_porcentaje_mediano) / 2;

        Object.assign(ventana.style, {
            width: ancho_porcentaje_mediano * window.innerWidth + "px",
            height: alto_porcentaje_mediano * window.innerHeight + "px",
            top: top_percent * window.innerHeight + "px",
            left: left_percent * window.innerWidth + "px",
        });
        ventana.classList.remove("maximizado");
    };

    ventana.cambiar_titulo = (txt) => {
        ventana.querySelector(".control.arriba .titulo").innerHTML = txt;
    };

    ventana.centrar_ventana = () => {
        activar_propiedades_CSS_transitivas();
        ventana.style.top = (window.innerHeight - ventana.offsetHeight) / 2 + "px";
        ventana.style.left = (window.innerWidth - ventana.offsetWidth) / 2 + "px";
    };

    ventana.capturar_propiedades_ventana = () => {  /**
            * Captura las propiedades del rectángulo de la ventana
            * Se ejecuta antes de maximizar o minimizar la ventana
            * Tiene como finalidad recordar la forma de la ventana antes de maximizar o minimizar 
            * Para generar el efecto de restauración de la forma previa al maximizar o minimizar
        */
        if (ventana.estaMaximizado() || ventana.estaMinimizado()) {
            //No tiene sentido capturar las propiedades si ya está maximizado o minimizado
            return;
        }
        let { left, top, width, height } = ventana.style;
        ["left", "top", "width", "height"].forEach(propiedad => {
            let p = ventana.style[propiedad];
            ventana.formaRecordada[propiedad] = parseFloat(p.replace("px", ""));
        });
    };

    ventana.ocultar_elementos_por_maximizacion = () => {
        VENTANA_FLOTANTE_TIPO_WINDOWS.AGRUPAMIENTO.querySelectorAll(".ventana-flotante-tipo-windows").forEach(elemento => {
            if (!elemento.classList.contains("maximizado")) {
                elemento.classList.add("ocultar-por-maximizacion");
            }
        });
    };

    ventana.mostrar_elementos_por_desmaximizacion = () => {
        VENTANA_FLOTANTE_TIPO_WINDOWS.AGRUPAMIENTO.querySelectorAll(".ocultar-por-maximizacion").forEach(elemento => {
            elemento.classList.remove("ocultar-por-maximizacion");
        });
    };

}