VENTANA_FLOTANTE_TIPO_WINDOWS.MARCO = ({
    ventana,
    titulo,
    mostrar_boton_cerrar,
    mostrar_boton_minimizar,
    mostrar_boton_maximizar,
}) => {
    let controlMarco = "control marco";


    let contenido = ventana.querySelector(".contenido");

    return {
        //---------------------------------------------------------
        mover: <Mover
            {...{
                controlMarco,
                contenido,
                ventana,
                eliminarEventosMarco,
                titulo,
                AgrupadorBotonesDeControlMarco
            }}
        />,
        //---------------------------------------------------------
        abajo: <div
            className={`
                ${controlMarco}
                abajo
            `}
            onMouseDown={marcoEvento({ abajo: true })}
        ></div>,
        //---------------------------------------------------------
        derecha: <div
            className={`
                ${controlMarco}
                derecha
            `}
            onMouseDown={marcoEvento({ derecha: true })}
        ></div>,
        //---------------------------------------------------------
        izquierda: <div
            className={`
                ${controlMarco}
                izquierda
            `}
            onMouseDown={marcoEvento({ izquierda: true })}
        ></div>,
        //---------------------------------------------------------
        izquierda_arriba: <div
            className={`
                ${controlMarco}
                diagonal
                izquierda
                arriba
            `}
            onMouseDown={marcoEvento({ izquierda: true, arriba: true })}
        ></div>,
        //---------------------------------------------------------
        izquierda_abajo: <div
            className={`
                ${controlMarco}
                diagonal
                izquierda
                abajo
            `}
            onMouseDown={marcoEvento({ izquierda: true, abajo: true })}
        ></div>,
        //---------------------------------------------------------
        derecha_arriba: <div
            className={`
                ${controlMarco}
                diagonal
                derecha
                arriba
            `}
            onMouseDown={marcoEvento({ derecha: true, arriba: true })}
        ></div>,
        //---------------------------------------------------------
        derecha_abajo: <div
            className={`
                ${controlMarco}
                diagonal
                derecha
                abajo
            `}
            onMouseDown={marcoEvento({ derecha: true, abajo: true })}
        ></div>,
    }

    function eliminarEventosMarco() {
        document.onmousemove = null;
        document.onmouseup = null;
        document.body.style.userSelect = "auto"; //Permite seleccionar texto
        contenido.classList.remove("sin-interaccion");
    };

    function marcoEvento({ arriba, derecha, abajo, izquierda }) {
        return (eventoCapturadoDeMarco) => {
            document.onmousemove = generar_evento_documento({ eventoCapturadoDeMarco, arriba, derecha, abajo, izquierda });
            document.onmouseup = eliminarEventosMarco;
        };

        function generar_evento_documento({ eventoCapturadoDeMarco, arriba, derecha, abajo, izquierda }) {/**
            * Genera el evento de movimiento de la ventana
            */
            let { offsetLeft: xi, offsetTop: yi, offsetWidth: wi, offsetHeight: hi } = ventana;
            let eX = eventoCapturadoDeMarco.clientX;
            if (eX < 0) {
                eX = 0;
            }
            let eY = eventoCapturadoDeMarco.clientY;
            if (eY < 0) {
                eY = 0;
            }

            return eventoCapturadoDeDocumento => {
                let { X: x, Y: y, W: w, H: h } = calcular_valores_movimiento_marco({ eX, eY, e2: eventoCapturadoDeDocumento, xi, yi, wi, hi, derecha, abajo });
                if (derecha) {
                    if (arriba) {
                        ventana.cambiar_forma({ y, w, h, yi, hi });
                    }
                    if (abajo) {
                        ventana.cambiar_forma({ w, h, wi, hi });
                    }
                    ventana.cambiar_forma({ w, wi });
                }
                if (izquierda) {
                    if (arriba) {
                        ventana.cambiar_forma({ x, y, w, h, xi, yi, wi, hi });
                    }
                    if (abajo) {
                        ventana.cambiar_forma({ x, w, h, xi, wi, hi });
                    }
                    ventana.cambiar_forma({ x, w, xi, wi });
                }
                if (arriba) {
                    ventana.cambiar_forma({ y, h, yi, hi });
                }
                if (abajo) {
                    ventana.cambiar_forma({ h, hi });
                }
            };

            function calcular_valores_movimiento_marco({ eX, eY, e2, xi, yi, wi, hi, abajo, derecha }) {
                let e2X = e2.clientX;
                if (e2X < 0) {
                    e2X = 0;
                }
                let e2Y = e2.clientY;
                if (e2Y < 0) {
                    e2Y = 0;
                }
                let Y = yi + (e2Y - eY);
                let X = xi + (e2X - eX);
                let W = wi + (e2X - eX) * (derecha ? 1 : -1);
                let H = hi + (e2Y - eY) * (abajo ? 1 : -1);
                return { X, Y, W, H };
            }
        }
    };

    function AgrupadorBotonesDeControlMarco() {
        return <div
            className="control btns"
        >
            {
                [
                    {
                        visibilidad: mostrar_boton_minimizar,
                        componente: <BotonMinimizar />
                    },
                    {
                        visibilidad: mostrar_boton_maximizar,
                        componente: <React.Fragment>
                            <BotonMaximizar />
                            <BotonDemaximizar />
                        </React.Fragment>
                    },
                    {
                        visibilidad: mostrar_boton_cerrar,
                        componente: <BotonCerrar />
                    }
                ]
                    .filter(({ visibilidad }) => visibilidad)
                    .map(({ componente }) => componente)
            }
        </div>;


        function BotonCerrar() {
            return <div
                className="btn cerrar"
                title="Cerrar"
                onMouseUp={() => {
                    ventana.cerrar();
                }}
            >
                <i className="fa-solid fa-xmark"></i>
            </div>;
        }

        function BotonMaximizar() {
            return <div
                className="btn maximizar"
                title="Maximizar"
                onMouseUp={() => {
                    ventana.maximizar();
                }}
            >
                &#9974;
            </div>
        }

        function BotonDemaximizar() {
            return <div
                className="btn maximizar2"
                title="Restaurar"
                onMouseUp={()=>{
                    ventana.demaximizar();
                }}
            >
                &#9950;
            </div>;
        }

        function BotonMinimizar() {
            return <label
                className={`
                    btn
                    minimizar
                `}
                title="Minimizar"
                onMouseUp={ventana.minimizar}
            >
                <span
                    className="false"
                >
                    &minus;
                </span>
                <span
                    className="true"
                >
                    &#9634;
                </span>
                <input
                    type="checkbox"
                    style={{ display: "none" }}
                    defaultChecked={false}
                />
            </label>
        }
    }

    function Mover({ controlMarco, contenido, ventana, eliminarEventosMarco, titulo, AgrupadorBotonesDeControlMarco }) {
        return <div
            className={`
                ${controlMarco}
                arriba
            `}
            onDrag={() => { 
                document.body.style.userSelect = "none";
                contenido.classList.add("sin-interaccion");
            }}
            onMouseDown={function (e) {
                if (ventana.estaMaximizado() || ventana.estaMinimizado()) {
                    return;
                }

                let { clientX: Xnav_inicial, clientY: Ynav_inicial } = e;
                let { offsetTop: Yventana, offsetLeft: Xventana } = ventana;

                document.onmousemove = function (e) {
                    let { clientX: Xnav_actual, clientY: Ynav_actual } = e;
                    let [Y, X] = [
                        Yventana + (Ynav_actual - Ynav_inicial),
                        Xventana + (Xnav_actual - Xnav_inicial)
                    ];
                    ventana.cambiar_posicion(X, Y);
                };

                document.onmouseup = eliminarEventosMarco;
            }}
            Title={titulo}
        >
            <div className="titulo">
                {titulo}
            </div>
            <AgrupadorBotonesDeControlMarco />
        </div>;
    }

}