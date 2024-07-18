crearEstilo({
    ".video-player": {
        display: "inline-block",
        verticalAlign: "top",
        background: "black",
        position: "relative",

        "& hr": {
            width: "100%",
            margin: "5px",
            background: "rgba(128,128,128,0.5)",
            border: "0",
            height: "1px",
        },

        ".boton-con-menu-contextual-hover-1-player-theme1": {
            ".menu-contextual": {
                animation: "salida 0.5s forwards",
            },
            "&:has(:where(.menu-contextual-input:checked, .elemento-añadido:hover)), &:hover": {
                ">.menu-contextual": {
                    animation: "entrada 0.5s forwards",
                }
            }
        },

        ".btnZoom": {
            transition: "all 0.25s",

            "&:hover": {
                transform: "scale(1.5)",
            }
        },

        ".video-controls": {
            position: "absolute",
            background: "rgba(0,0,0,0.5)",
            width: "100%",

            bottom: "0",

            ".propiedades": {

                ".filtro": {
                    "&:hover": {
                        background: "rgba(255,255,255,0.05)",
                    },
                    ".contenedor-slider": {
                        display: "none",
                    },
                    "&:has(input[type='radio']:checked)": {
                        ".contenedor-slider": {
                            display: "flex",
                        }
                    }
                },

                ".velocidad-de-reproduccion": {
                    ".estado-selecto": {
                        background: "rgba(255,255,255,0.25) !important",
                        color: "black !important",
                    }
                },

                ".contenedor-control-volumen": {
                    cursor: "pointer",

                    ".volume-bar-svg": {
                        width: "0",
                        transition: "all 0.25s",
                    },

                    "&:has(.volume-bar-modificando:checked), &:hover": {
                        ".volume-bar-svg": {
                            width: "60px",
                        }
                    }
                }
            }
        },

        ".animacion-entrada": {
            animation: "entrada 0.5s forwards",
        },

        ".animacion-salida": {
            animation: "salida 0.5s forwards",
        },
    },
    "@keyframes salida": {
        from: {
            opacity: "1",
        },
        to: {
            opacity: "0",
            display: "none",
        }
    },

    "@keyframes entrada": {
        from: {
            opacity: "0",
        },
        to: {
            opacity: "1",
        }
    }
})

const TraducciónFiltrosVideo = {
    invert: "Invertir",
    grayscale: "Escala de Grises",
    sepia: "Sepia",
    contrast: "Contraste",
    brightness: "Brillo",
    blur: "Desenfoque",
    "hue-rotate": "Rotación de Tono",
    saturate: "Saturación",
};


function Reproductor_theme1({
    src = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    width = 500,
    height = 300,
}) {

    const idR = Math.random().toString().replace("0.", "idR-");
    const LIMITE_FILTROS = 5;

    let btnStyle = {
        margin: "0",
        color: "white",
        whiteSpace: "nowrap",
        justifyContent: "flex-start",
    };

    let btnStyle_menuContextual = {
        ...btnStyle,
        fontSize: "10px",
        color: themeSelected == darkTheme ? "white" : "black",
        width: "100%",
        textTransform: "none",
    }

    let retornoSVG;

    return (
        <div
            className={`
                video-player
                ${idR}
            `}

            onLoadStart={() => {
                let video = document.querySelector(`.${idR}`);
                let svg = document.querySelector(`.${idR} .seek-bar-svg`);

                video.addEventListener("resize", () => {
                    resize();
                });
                video.addEventListener("fullscreenchange", () => {
                    resize();
                });

                function resize() {
                    let w = svg.getBoundingClientRect().width;
                    svg.setAttribute("viewBox", `0 0 ${w} 50`);
                }
            }}

            style={{
                width: width + "px",
                height: height + "px",
            }}
        >
            <div
                className="contenedor-video"
                style={{
                    overflow: "hidden"
                }}
            >
                <video
                    className="video"
                    width="100%"
                    height="100%"
                    onTimeUpdate={() => {
                        let video = document.querySelector(`.${idR} .video`);
                        if (video.paused) {
                            return;
                        }
                        let t = (video.currentTime / video.duration);
                        retornoSVG.moverPorcentaje(t, false);
                    }}
                    style={{
                        objectFit: "cover",
                    }}
                >
                    <source src={src} type="video/mp4" />
                </video>
            </div>
            <div className="video-controls">
                <BarraDeReproducción />
                <div
                    className="propiedades"
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        flexDirection: "row",
                        padding: "0 10px",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <BotónDePlayPause />
                        <SeparadorVertical />
                        <ControlDeVolumen />
                    </div>

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Configuración />
                        <VelocidadDeReproducción />
                        <SeparadorVertical />
                        &nbsp;
                        &nbsp;
                        <PictureInPicture />
                        &nbsp;
                        <PantallaCompleta />
                    </div>
                </div>
            </div>
        </div>
    )

    function Configuración() {


        return botonConMenuContextualHover1({
            className: "configuracion",
            orientacion: "vertical",
            right: "0",
            contenido: [
                {
                    ReactDOM: botonConMenuContextualHover1({
                        className: "modo-de-video",
                        orientacion: "vertical",
                        right: "100%",
                        bottom: "0",
                        contenido: [
                            {
                                icono: <i class="fa-brands fa-flipboard"></i>,
                                onClick: () => {
                                    let video = document.querySelector(`.${idR} .video`);
                                    video.style.objectFit = "contain";
                                },
                                lbl: "Video Ajustado",
                            },
                            {
                                icono: <i class="fa-brands fa-flipboard"></i>,
                                onClick: () => {
                                    let video = document.querySelector(`.${idR} .video`);
                                    video.style.objectFit = "cover";
                                },
                                lbl: "Video Relleno",
                            },
                            {
                                icono: <i class="fa-brands fa-flipboard"></i>,
                                onClick: () => {
                                    let video = document.querySelector(`.${idR} .video`);
                                    video.style.objectFit = "fill";
                                },
                                lbl: "Video Estirado",
                            },
                        ],
                        botonPrincipal: {
                            size: "small",
                            style: {
                                ...btnStyle_menuContextual,
                            },
                            icono: <i className="fa-solid fa-caret-left"></i>,
                            label: "Modo de Video",
                        },
                    })
                },
                {
                    ReactDOM: botonConMenuContextualHover1({
                        titulo: "Filtros",
                        className: "filtros",
                        style: {
                            padding: "20px",
                            minHeight: "200px",
                            minWidth: "220px",
                            justifyContent: "space-between",
                            padding: "10px",
                        },
                        orientacion: "vertical",
                        right: "100%",
                        bottom: "0",
                        contenido: [
                            {
                                ReactDOM: <Paper
                                    className="selector-filtro"
                                    style={{
                                        display: "none",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignItems: "center",

                                        padding: "20px",

                                        position: "absolute",
                                        top: "0",
                                        left: "0",
                                        width: "100%",
                                        height: "100%",
                                        zIndex: "20",
                                    }}
                                >
                                    {
                                        Object.keys(TraducciónFiltrosVideo).map((e) => {
                                            return <Button
                                                style={{
                                                    ...btnStyle_menuContextual,
                                                    margin: 0,
                                                    padding: 0,
                                                    minWidth: "1px",
                                                }}
                                                onClick={() => {
                                                    let contenidoFiltros = document.querySelector(
                                                        `.${idR} .filtros .menu-contextual .contenido`
                                                    );
                                                    let div = document.createElement("div");
                                                    ReactDOM.render(nuevoFiltro({
                                                        tipo: e,
                                                    }), div);
                                                    contenidoFiltros.append(div);
                                                    let selector = document.querySelector(`.${idR} .selector-filtro`);
                                                    selector.style.display = "none";
                                                }}
                                            >
                                                {TraducciónFiltrosVideo[e]}
                                            </Button>
                                        })
                                    }
                                    <hr />
                                    <Button
                                        size="small"
                                        variant="contained"
                                        style={{
                                            ...btnStyle_menuContextual,
                                            background: "tomato",
                                        }}
                                        startIcon={<i class="fa-solid fa-times"></i>}
                                        onClick={() => {
                                            let selector = document.querySelector(`.${idR} .selector-filtro`);
                                            selector.style.display = "none";
                                        }}
                                    >
                                        Cancelar
                                    </Button>
                                </Paper>
                            },
                        ],
                        contenidoFooter: [
                            {
                                ReactDOM: <hr />
                            },
                            {
                                icono: <i class="fa-solid fa-circle-plus"></i>,
                                variant: "contained",
                                className: "agregar-filtro",
                                onClick: () => {
                                    let selector = document.querySelector(`.${idR} .selector-filtro`);
                                    selector.style.display = "flex";
                                },
                                lbl: "Agregar Filtro",
                            },
                        ],
                        botonPrincipal: {
                            size: "small",
                            style: {
                                ...btnStyle_menuContextual,
                            },
                            icono: <i className="fa-solid fa-caret-left"></i>,
                            label: "Filtros",
                        },
                    })
                }
            ],
            botonPrincipal: {
                icono: <i className="fa-solid fa-cog"></i>,
                Title: "Configuración",
                style: {
                    justifyContent: "center",
                    minWidth: "30px",
                }
            },
        });
    }

    function cerrarTodosLosActivadoresDeSlider() {
        [...document.querySelectorAll(`.${idR} .filtro .activador-slider`)].forEach((e) => {
            e.checked = false;
        });
    }

    function nuevoFiltro({
        tipo,
        filtros,
    }) {
        if (!tipo) {
            return;
        }
        if (filtros) {
            filtros.push({
                tipo,
                valor: 0,
            });
        }
        let idF = Math.random().toString().replace("0.", "idF-");

        setTimeout(() => {
            calcularFiltrosVideo();
            cerrarTodosLosActivadoresDeSlider();
        }, 0);

        return <div
            className={`
                filtro
                ${idF}
                ${tipo}
                elemento-añadido
            `}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                }}
            >
                <Button
                    style={{
                        ...btnStyle_menuContextual,
                        fontSize: "10px",
                    }}
                    startIcon={<i class="fa-solid fa-palette"></i>}
                    onClick={() => {
                        let input = document.querySelector(`.${idR} .filtro.${idF} .activador-slider`);
                        input.checked = !input.checked;
                    }}
                >
                    {(() => {
                        return TraducciónFiltrosVideo[tipo];
                    })()} &nbsp; <span className="valorTXT">(0%)</span>
                </Button>
                <SeparadorVertical />
                <Button
                    className="eliminar-filtro"
                    style={{
                        ...btnStyle,
                        minWidth: "20px",
                        color: "red",

                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                    onClick={() => {
                        let filtro = document.querySelector(`.${idR} .filtro.${idF}`);
                        filtro.remove();
                        calcularFiltrosVideo();
                    }}
                    Title="Eliminar Filtro"
                >
                    &times;
                </Button>
                <SeparadorVertical />
                <Button
                    className="movedorY"
                    style={{
                        ...btnStyle,
                        cursor: "grab",
                        minWidth: "20px",
                        opacity: 0.3,
                    }}
                    onMouseDown={(e) => {
                        let contenedor = document.querySelector(`.${idR} .filtros`);
                        let filtro = document.querySelector(`.${idR} .filtro.${idF}`).parentElement;
                        let movedorY = document.querySelector(`.${idR} .filtro.${idF} .movedorY`);

                        document.body.style.userSelect = "none";
                        document.addEventListener("mousemove", eventoMouseMove);
                        document.addEventListener("mouseup", eventoMouseUp);

                        function eventoMouseMove(e) {
                            let y = contenedor.getBoundingClientRect().bottom - e.clientY;
                            let top = contenedor.getBoundingClientRect().bottom - filtro.getBoundingClientRect().top;
                            let bottom = contenedor.getBoundingClientRect().bottom - filtro.getBoundingClientRect().bottom;

                            document.body.style.cursor = "grabbing";
                            movedorY.style.cursor = "grabbing";

                            let elementoAnterior = filtro.previousElementSibling;
                            let elementoSiguiente = filtro.nextElementSibling;

                            console.log({ y, top, bottom, elementoAnterior, elementoSiguiente });

                            if (elementoAnterior && y > top) {
                                elementoAnterior.before(filtro);
                                calcularFiltrosVideo();
                            }
                            if (elementoSiguiente && y < bottom) {
                                elementoSiguiente.after(filtro);
                                calcularFiltrosVideo();
                            }
                        }

                        function eventoMouseUp() {
                            movedorY.style.cursor = "grab";
                            document.body.style.userSelect = "";
                            document.removeEventListener("mousemove", eventoMouseMove);
                            document.removeEventListener("mouseup", eventoMouseUp);
                        }
                    }}
                >
                    <i class="fa-solid fa-grip-vertical"></i>
                </Button>
            </div>

            <input
                className="activador-slider"
                type="radio"
                name="filtro"
                defaultChecked={false}
                style={{
                    display: "none",
                }}
            />
            <div
                className="contenedor-slider"
                style={{
                    justifyContent: "space-evenly",
                    alignItems: "center",
                }}
            >
                &nbsp;
                <PrettoSlider
                    className="slider"
                    valueLabelDisplay="auto"
                    aria-label="pretto slider"
                    marks={(() => {
                        switch (tipo) {
                            case "blur":
                                return [
                                    { value: 0, label: "0px" },
                                    { value: 5, label: "5px" },
                                    { value: 10, label: "10px" },
                                ];
                            case "hue-rotate":
                                return [
                                    { value: 0, label: "0°" },
                                    { value: 180, label: "180°" },
                                    { value: 360, label: "360°" },
                                ];
                            case "contrast":
                                return [
                                    { value: 0, label: "0%" },
                                    { value: 100, label: "100%" },
                                    { value: 200, label: "200%" },
                                ];
                            case "brightness":
                                return [
                                    { value: 0, label: "0" },
                                    { value: 1, label: "1" },
                                    { value: 2, label: "2" },
                                ];
                            default:
                                return [
                                    { value: 0, label: "0%" },
                                    { value: 50, label: "50%" },
                                    { value: 100, label: "100%" },
                                ];
                        }
                    })()}
                    min={0}
                    max={(() => {
                        switch (tipo) {
                            case "blur":
                                return 10;
                            case "hue-rotate":
                                return 360;
                            case "contrast":
                                return 200;
                            case "brightness":
                                return 2;
                        }
                        return 100;
                    })()}
                    step={(() => {
                        switch (tipo) {
                            case "blur":
                                return 0.1;
                            case "hue-rotate":
                            case "contrast":
                            default:
                                return 1;
                            case "brightness":
                                return 0.01;
                        }
                    })()}
                    defaultValue={(() => {
                        switch (tipo) {
                            case "blur":
                                return 0;
                            case "hue-rotate":
                                return 0;
                            case "contrast":
                                return 100;
                            case "brightness":
                                return 1;
                        }
                        return 0;
                    })()}
                    style={{
                        width: "60%",
                    }}
                    onChange={(e, v) => {
                        calcularFiltrosVideo();
                    }}
                />
                <SeparadorVertical />
                <Button
                    style={{
                        ...btnStyle,
                        color: "green",
                        minWidth: "1px",
                    }}
                    Title="Listo"
                    onClick={() => {
                        let input = document.querySelector(`.${idR} .filtro.${idF} .activador-slider`);
                        input.checked = false;
                    }}
                >
                    <div>
                        <i class="fa-solid fa-check"></i>
                        <br />
                        <span
                            style={{
                                fontSize: "10px",
                            }}
                        >
                            Listo
                        </span>
                    </div>
                </Button>
            </div>
        </div>
    }

    function calcularFiltrosVideo() {
        let cantidadDeFiltros = document.querySelectorAll(`.${idR} .filtro`).length;
        let botonAgregarFiltro = document.querySelector(`.${idR} .agregar-filtro`);
        if (cantidadDeFiltros >= LIMITE_FILTROS) {
            botonAgregarFiltro.style.display = "none";
        } else {
            botonAgregarFiltro.style.display = "flex";
        }
        let filtros = document.querySelectorAll(`.${idR} .filtro`);
        let video = document.querySelector(`.${idR} .video`);
        let filtrosAplicados = [];
        filtros.forEach((filtro) => {
            let tipo = Object.keys(TraducciónFiltrosVideo).find((e) => filtro.classList.contains(e));
            let valor = filtro.querySelector(".slider input").value;
            let U = "%";
            switch (tipo) {
                case "blur":
                    U = "px";
                    break;
                case "hue-rotate":
                    U = "deg";
                    break;
                case "brightness":
                    U = "";
                    break;
            }
            filtrosAplicados.push(`${tipo}(${valor}${U})`);
            filtro.querySelector(".valorTXT").innerHTML = `(${valor}${U})`;
        });
        video.style.filter = filtrosAplicados.join(" ");
    }

    function PictureInPicture() {
        if (!document.pictureInPictureEnabled) {
            return null;
        }
        return <Button
            size="small"
            className="picture-in-picture"
            style={{
                ...btnStyle,
                minWidth: "30px",
                justifyContent: "center",
            }}
            Title="Reproducción Flotante"
            onClick={() => {
                let video = document.querySelector(`.${idR} .video`);
                video.requestPictureInPicture();
            }}
        >
            <i class="fa-solid fa-film"></i>
        </Button>;
    }

    function PantallaCompleta() {
        return <IconButton
            size="small"
            className="btnZoom"
            onClick={() => {
                let video = document.querySelector(`.${idR}`);

                if (video.requestFullscreen) {
                    video.requestFullscreen();
                } else if (video.mozRequestFullScreen) {
                    video.mozRequestFullScreen();
                } else if (video.webkitRequestFullscreen) {
                    video.webkitRequestFullscreen();
                }
            }}
            style={btnStyle}
            Title="Pantalla Completa"
        >
            <i className="fa-solid fa-expand"></i>
        </IconButton>;
    }

    function ControlDeVolumen() {
        return <div
            className={`
                contenedor-control-volumen
            `}

            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <IconButton
                size="small"
                className={`
                    mute
                    btnZoom
                `}
                onClick={() => {
                    let video = document.querySelector(`.${idR} .video`);
                    let muteButton = document.querySelector(`.${idR} .mute`);
                    let volumeBar = document.querySelector(`.${idR} .volume-bar`);
                    if (video.muted == false) {
                        video.muted = true;
                        ReactDOM.render(<i className="fa-solid fa-volume-mute"></i>, muteButton);
                    } else {
                        video.muted = false;
                        ReactDOM.render(<IconoDinamicoVolumen />, muteButton);
                    }
                }}
                style={{
                    ...btnStyle,
                    display: "inline-block",
                    cursor: "pointer",
                    padding: "0 10px",
                    width: "30px",
                }}
            >
                <IconoDinamicoVolumen />
            </IconButton>
            &nbsp;
            <svg
                className="volume-bar-svg"
                width="60"
                height="26"
                viewBox="0 0 60 26"
                onMouseUp={(e) => {
                    e.absolute = true;
                    eventoMouseSVGVolumen(e);
                }}
                onMouseDown={() => {
                    document.body.style.userSelect = "none";
                    document.addEventListener("mousemove", eventoMouseSVGVolumen);

                    document.querySelector(`.${idR} .volume-bar-modificando`).checked = true;

                    document.addEventListener("mouseup", () => {
                        document.body.style.userSelect = "";
                        document.removeEventListener("mousemove", eventoMouseSVGVolumen);
                        document.querySelector(`.${idR} .volume-bar-modificando`).checked = false;
                    });
                }}
            >
                <rect
                    fill="rgba(0,0,0,0.01)"
                    width="100%"
                    height="100%" />
                <g
                    fill="red"
                    transform={`
                                translate(0 7.5)
                            `}
                >
                    <polygon
                        fill="rgba(0,0,0,0.25)"
                        points="0,5 60,10 60,0" />
                    <polygon
                        className="volume-bar-svg-polygon"
                        fill="white"
                        points="0,5 60,10 60,0" />
                </g>
            </svg>
            <input
                className="volume-bar"
                type="range"
                min="0"
                max="100"
                step="1"
                defaultValue="100"
                style={{
                    display: "none",
                }}
            />
            <input
                type="checkbox"
                className="volume-bar-modificando"
                style={{
                    display: "none",
                }}
            />
        </div>;
    }

    function SeparadorVertical() {
        return <div
            style={{
                borderRight: "2px solid rgba(255,255,255,0.15)",
            }}
        >
            &#8203;
        </div>;
    }


    function botonConMenuContextualHover1({
        titulo,
        className,
        style,
        orientacion,
        right,
        left,
        centrarX,
        bottom,
        textAlign,
        contenido,
        contenidoFooter = [],
        botonPrincipal,
    }) {
        return <div
            className={`
                boton-con-menu-contextual-hover-1-player-theme1
                ${className}
            `}

            onMouseEnter={() => {
                let input = document.querySelector(`.${idR} .${className} .menu-contextual-input`);
                input.checked = true;
            }}

            onMouseLeave={() => {
                let input = document.querySelector(`.${idR} .${className} .menu-contextual-input`);
                input.checked = false;
            }}

            style={{
                position: "relative",
            }}
        >
            <Button
                size={botonPrincipal.size ?? "normal"}
                className={`
                    ${botonPrincipal.className}
                `}
                startIcon={(() => {
                    if (botonPrincipal.icono && botonPrincipal.label) {
                        return botonPrincipal.icono;
                    }
                })()}
                onClick={botonPrincipal.onClick}
                style={{
                    ...btnStyle,
                    ...botonPrincipal.style,
                }}
                title={botonPrincipal.Title}
            >
                {(() => {
                    if (botonPrincipal.label) {
                        return botonPrincipal.label;
                    } else {
                        return botonPrincipal.icono;
                    }
                })()}
            </Button>
            <input /**
                 * Este input regula la visibilidad del menú contextual, si está checked, se muestra, si no, se oculta.
                 * 
                 * Lo activamos con onMouseEnter y lo desactivamos con onMouseLeave del contenedor.
                 */
                type="radio"
                name={className}
                className="menu-contextual-input" style={{ display: "none" }}
            />
            <Paper
                elevation={6}
                className="menu-contextual"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    position: "absolute",
                    bottom: "100%",
                    padding: "5px",
                    ...(() => {
                        let retorno = {};
                        if (left) {
                            retorno.left = left;
                        }
                        if (right) {
                            retorno.right = right;
                        }
                        if (bottom) {
                            retorno.bottom = bottom;
                        }
                        if (centrarX) {
                            retorno.transform = "translateX(-50%)";
                            retorno.left = "50%";
                        }
                        return retorno;
                    })(),
                    ...style,
                }}
            >
                {(() => {
                    if (!titulo) {
                        return;
                    }
                    return <center>
                        <small>
                            {titulo}
                        </small>
                        <hr />
                    </center>
                })()}
                <div
                    className="contenido"
                    style={{
                        display: "flex",
                        flexDirection: `${orientacion == "vertical" ? "column" : "row"}`,
                        alignItems: "stretch",
                    }}
                >
                    {contenido.map((e, i) => {
                        if (e.hasOwnProperty("ReactDOM")) {
                            return e.ReactDOM;
                        }
                        return generarBoton(i, e)
                    })}
                </div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "stretch",
                    }}
                >
                    {contenidoFooter.map((e, i) => {
                        if (e.hasOwnProperty("ReactDOM")) {
                            return e.ReactDOM;
                        }
                        return generarBoton(i, e)
                    })}
                </div>
            </Paper>
        </div>;


        function generarBoton(i, e) {
            let style = {
                ...btnStyle_menuContextual,
                minWidth: "30px",
                width: "100%",
                justifyContent: textAlign == "center" ? "center" : "flex-start",
            };
            if (e.variant) {
                delete style.color;
            }
            return <Button
                key={i}
                size="small"
                className={e.className ?? ""}
                startIcon={(() => {
                    if (e.hasOwnProperty("icono")) {
                        return e.icono;
                    }
                })()}
                variant={e.variant ?? ""}
                style={style}
                onClick={e.onClick}
            >
                {e.lbl}
            </Button>;
        }
    }

    function VelocidadDeReproducción() {
        return botonConMenuContextualHover1({
            className: "velocidad-de-reproduccion",
            orientacion: "horizontal",
            textAlign: "center",
            centrarX: true,
            contenido: Array.from({ length: 4 }, (_, i) => (i + 1) * 0.5).map((e) => {
                let className = `estado-${e.toString().replace(".", "-")}x`;
                return {
                    className: className + ` ${e == 1 ? "estado-selecto" : ""}`,
                    onClick: () => {
                        let video = document.querySelector(`.${idR} .video`);
                        video.playbackRate = e;

                        let velocidadBoton = document.querySelector(`.${idR} .velocidad`);
                        ReactDOM.render(e + "×", velocidadBoton);

                        [...document.querySelectorAll(`.${idR} .velocidad-de-reproduccion .estado-selecto`)].forEach((element) => {
                            element.classList.remove("estado-selecto")
                        });
                        let esteBoton = document.querySelector(`.${idR} .velocidad-de-reproduccion .${className}`);
                        esteBoton.classList.add("estado-selecto");
                    },
                    lbl: e + "×",
                }
            }),
            botonPrincipal: {
                size: "small",
                icono: "1x",
                className: "velocidad",
                Title: "Velocidad de Reproducción",
                style: {
                    fontSize: "15px",
                    minWidth: "30px",
                },
                onClick: () => {
                    let video = document.querySelector(`.${idR} .video`);
                    let v = video.playbackRate;
                    if (v == 2) {
                        v = 0.5;
                    } else {
                        v += 0.5;
                    }
                    let esteBoton = document.querySelector(`.${idR} .velocidad-de-reproduccion .estado-${v.toString().replace(".", "-")}x`);
                    esteBoton.click();
                },
            },
        });
    }

    function BotónDePlayPause() {
        return botonConMenuContextualHover1({
            className: "contenedor-play-pause",
            orientacion: "vertical",
            contenido: [
                {
                    icono: <i className="fa-solid fa-rotate-left"></i>,
                    className: "reanudar",
                    onClick: () => {
                        let video = document.querySelector(`.${idR} .video`);
                        video.currentTime += 1 / 25;
                        retornoSVG.moverPorcentaje(video.currentTime / video.duration);
                    },
                    lbl: "Reanudar",
                },
                {
                    ReactDOM: <hr />
                },
                {
                    icono: <i className="fa-regular fa-square-caret-right"></i>,
                    className: "fotograma",
                    onClick: () => {
                        let video = document.querySelector(`.${idR} .video`);
                        video.currentTime += 1 / 25;
                        retornoSVG.moverPorcentaje(video.currentTime / video.duration);
                    },
                    lbl: "Fotograma Siguiente",
                },
                {
                    icono: <i className="fa-regular fa-square-caret-left"></i>,
                    className: "fotograma",
                    onClick: () => {
                        let video = document.querySelector(`.${idR} .video`);
                        video.currentTime -= 1 / 25;
                        retornoSVG.moverPorcentaje(video.currentTime / video.duration);
                    },
                    lbl: "Fotograma Anterior",
                },
            ],
            botonPrincipal: {
                size: "large",
                icono: <i className="fa-solid fa-play"></i>,
                className: "play-pause",
                Title: "Reproducir",
                style: {
                    minWidth: "30px",
                    fontSize: "150%",
                },
                onClick: () => {
                    let video = document.querySelector(`.${idR} .video`);
                    let playButton = document.querySelector(`.${idR} .play-pause`);
                    let controlFotograma = [...document.querySelectorAll(`
                        .${idR}
                        .boton-con-menu-contextual-hover-1-player-theme1
                        .fotograma
                    `)];
                    if (video.paused === true) {
                        video.play();
                        ReactDOM.render(<i className="fa-solid fa-pause"></i>, playButton);
                        playButton.title = "Pausar";
                        controlFotograma.forEach((e) => e.style.display = "none");
                    } else {
                        video.pause();
                        ReactDOM.render(<i className="fa-solid fa-play"></i>, playButton);
                        playButton.title = "Reproducir";
                        controlFotograma.forEach((e) => e.style.display = "flex");
                    }
                },
            },
        });
    }

    function BarraDeReproducción() {

        crearEstilo({
            ".seek-bar-svg": {
                cursor: "pointer",

                "*": {
                    //transition: "all 0.25s",
                },
            }
        });

        let tiempoMouseOver = 0;

        let h = 50;
        let hb = 10;

        retornoSVG = <svg
            width="100%"
            height={h}
            viewBox={`
                0 0 ${width} ${h}
            `}
            className="seek-bar-svg"

            onMouseMove={(e) => {
                let seekBarCursorPrevMod = document.querySelector(`.${idR} .tiempo-prev-mod`);
                let seekBarCursorPrevModTexto = document.querySelector(`.${idR} .tiempo-prev-mod .texto`);
                let video = document.querySelector(`.${idR} .video`);

                e.elementoAEvaluar = document.querySelector(`.${idR} .seek-bar-svg`);
                let t = determinarPorcentajeWDeCursorX(e);

                seekBarCursorPrevMod.setAttribute("x", `${t * 100}%`);

                let tiempo = video.duration * t;

                let horas = Math.floor(tiempo / 3600);
                let minutos = Math.floor(tiempo / 60);
                let segundos = Math.floor(tiempo % 60);
                let etiqueta = (
                    horas == 0 ?
                        [minutos, segundos] :
                        [horas, minutos, segundos]
                ).map((e) => e.toString().padStart(2, "0")).join(":");

                seekBarCursorPrevModTexto.innerHTML = etiqueta;

                actualizarEstado();

                function actualizarEstado() {
                    let seekBarCursorPrevMod = document.querySelector(`.${idR} .tiempo-prev-mod`);
                    let seekBarCursorTiempoActual = document.querySelector(`.${idR} .tiempo-actual`);
                    let seekBarInputActivado = document.querySelector(`.${idR} .seek-bar-svg-activado`);
                    let seekBarCursorCirculo = document.querySelector(`.${idR} .camino-seek-bar-recorrido-cursor`);

                    activar();

                    tiempoMouseOver = Date.now();
                    setTimeout(() => {
                        if (Date.now() - tiempoMouseOver > 1000) {
                            seekBarCursorPrevMod.classList.remove("animacion-entrada");
                            seekBarCursorPrevMod.classList.add("animacion-salida");

                            setTimeout(() => {
                                if (Date.now() - tiempoMouseOver > 1500) {
                                    seekBarCursorTiempoActual.classList.remove("animacion-entrada");
                                    seekBarCursorTiempoActual.classList.add("animacion-salida");

                                    seekBarInputActivado.checked = false;
                                    setTimeout(() => {
                                        if (Date.now() - tiempoMouseOver > 2000) {
                                            seekBarCursorCirculo.setAttribute("r", "5");
                                        }
                                    }, 500);
                                }
                            }, 500);
                        }
                    }, 1000);

                    function activar() {
                        seekBarInputActivado.checked = true;
                        seekBarCursorPrevMod.classList.remove("animacion-salida");
                        seekBarCursorPrevMod.classList.add("animacion-entrada");
                        seekBarCursorTiempoActual.classList.remove("animacion-salida");
                        seekBarCursorTiempoActual.classList.add("animacion-entrada");
                        seekBarCursorCirculo.setAttribute("r", "7");
                    }
                }
            }}

            onMouseUp={(e) => {
                if (!document.querySelector(`.${idR} .seek-bar-svg-modificando`).checked) {
                    return;
                }
                e.absolute = true;
                retornoSVG.eventoMouseSVGReproduccion(e);
            }}

            onMouseDown={(e) => {
                retornoSVG.modificando();
            }}

        >
            <rect
                fill="red"
                width="100%"
                height="100%"
            />
            <rect
                className={`
                    camino-seek-bar
                `}
                fill="rgb(255, 255, 255, 0.6)"
                width="100%"
                height="5"
                y={h - hb}
            />
            <rect
                className={`
                    camino-seek-bar-recorrido
                `}
                fill="white"
                width="50%"
                height="5"
                y={h - hb}
            />

            {CursorDeTiempo()}
            {CursorDeTiempo({
                classID: "tiempo-prev-mod",
                colorbg: "rgba(255,255,255,0.5)",
                colorTexto: "black",
                flecha: false,
                scale: 0.8,
            })}


            <circle
                className={`
                    camino-seek-bar-recorrido-cursor
                `}
                fill="white"
                cx="50%"
                cy={h - hb + 2.5}
                r="5"
            />
        </svg>;

        let retorno = (
            <React.Fragment>
                {retornoSVG}
                <input
                    className="seek-bar-svg-modificando"
                    type="checkbox"
                    style={{
                        display: "none",
                    }}
                />
                <input
                    className="seek-bar-svg-activado"
                    type="checkbox"
                    style={{
                        display: "none",
                    }}
                />
            </React.Fragment>
        );

        retornoSVG.modificando = () => {
            document.body.style.userSelect = "none";
            document.addEventListener("mousemove", eventoMouseSVGReproduccion);

            document.querySelector(`.${idR} .seek-bar-svg-modificando`).checked = true;

            document.addEventListener("mouseup", () => {
                setTimeout(() => {
                    document.body.style.userSelect = "";
                    document.removeEventListener("mousemove", eventoMouseSVGReproduccion);
                    document.querySelector(`.${idR} .seek-bar-svg-modificando`).checked = false;
                }, 100);
            });
        }

        retornoSVG.moverPorcentaje = (t, moverVideo = true) => {
            let video = document.querySelector(`.${idR} .video`);

            if (moverVideo) {
                video.currentTime = video.duration * t;
            }

            let seekBarCamino = document.querySelector(`.${idR} .camino-seek-bar-recorrido`);
            seekBarCamino.setAttribute("width", `${t * 100}%`);

            actualizarTextoActual();

            actualizarPorcentajeSeekBarVideoSVG();

            function actualizarTextoActual() {
                let seekBarCursorContenedor = document.querySelector(`.${idR} .tiempo-actual`);

                let seekBarCursorTexto = document.querySelector(`.${idR} .tiempo-actual .texto`);

                seekBarCursorContenedor.setAttribute("x", `${t * 100}%`);

                let horas = Math.floor(video.currentTime / 3600);
                let minutos = Math.floor(video.currentTime / 60);
                let segundos = Math.floor(video.currentTime % 60);
                let etiqueta = (
                    horas == 0 ?
                        [minutos, segundos] :
                        [horas, minutos, segundos]
                ).map((e) => e.toString().padStart(2, "0")).join(":");

                seekBarCursorTexto.innerHTML = etiqueta;
            }

            function actualizarPorcentajeSeekBarVideoSVG() {
                let CaminoSeekBarRecorrido = document.querySelector(`.${idR} .camino-seek-bar-recorrido`);
                let CaminoSeekBarRecorridoCursor = document.querySelector(`.${idR} .camino-seek-bar-recorrido-cursor`);
                CaminoSeekBarRecorrido.setAttribute("width", `${t * 100}%`);
                CaminoSeekBarRecorridoCursor.setAttribute("cx", `${t * 100}%`);
            }
        }

        retornoSVG.eventoMouseSVGReproduccion = eventoMouseSVGReproduccion;

        function eventoMouseSVGReproduccion(e) {
            let svg = document.querySelector(`.${idR} .seek-bar-svg`);
            e.elementoAEvaluar = svg;
            let t = determinarPorcentajeWDeCursorX(e);
            retornoSVG.moverPorcentaje(t);
        }

        return retorno;

        function CursorDeTiempo({ classID = "tiempo-actual", colorbg = "black", colorTexto = "white", flecha = true, scale = 1 } = {}) {
            return <foreignObject
                className={classID}
                x="-999999"
                y={(30 - 5) / 2 - 10}
                width={60 * scale}
                height={h - hb + 2.5 - 20}
                style={{
                    transform: `translate(-${30 * scale}px, 0)`,
                    userSelect: "none",
                    pointerEvents: "none",
                    overflow: "visible",
                }}
            >
                <div
                    className="texto"
                    style={{
                        color: colorTexto,
                        background: colorbg,
                        fontSize: 12 * scale + "px",
                        textAlign: "center",
                        borderRadius: "10px",
                        padding: "3px",
                    }}
                >
                    0:00
                </div>

                {(() => {
                    if (flecha) {
                        return <svg
                            width="10"
                            height="10"
                            viewBox="0 0 10 10"
                            style={{
                                position: "absolute",
                                left: "50%",
                                transform: "translate(-5px, 0)",
                            }}
                        >
                            <polygon
                                fill="black"
                                points="0,0 10,0 5,10" />
                        </svg>
                    }
                })()}

            </foreignObject>;
        }
    }

    function determinarPorcentajeWDeCursorX(e) {
        let elementoEvaluador = e.elementoAEvaluar;
        let clientRect = elementoEvaluador.getBoundingClientRect();
        let x = e.clientX - clientRect.left;
        if (e.absolute) {
            x = e.nativeEvent.offsetX;
        }
        let w = elementoEvaluador.getBoundingClientRect().width;
        let t = x / w;
        if (t < 0) {
            t = 0;
        }
        if (t > 1) {
            t = 1;
        }
        return t;
    }

    function eventoMouseSVGVolumen(e) {
        let svg = document.querySelector(`.${idR} .volume-bar-svg`);
        e.elementoAEvaluar = svg;
        let t = determinarPorcentajeWDeCursorX(e);
        let videoBar = document.querySelector(`.${idR} .volume-bar`);
        videoBar.value = t * 100;
        actualizarControlInput();
        actualizarSVGVolumeBar();
    }

    function actualizarControlInput() {
        let video = document.querySelector(`.${idR} .video`);
        let volumeBar = document.querySelector(`.${idR} .volume-bar`);
        let muteButton = document.querySelector(`.${idR} .mute`);
        actualizarSVGVolumeBar();
        video.volume = volumeBar.value / 100;
        video.muted = false;

        ReactDOM.render(<IconoDinamicoVolumen />, muteButton);
    }

    function actualizarSVGVolumeBar() {
        let volumeBar = document.querySelector(`.${idR} .volume-bar`);
        let volumeBarSvg = document.querySelector(`.${idR} .volume-bar-svg-polygon`);
        let t = volumeBar.value / 100;
        volumeBarSvg.style.opacity = t ** 2;
        volumeBarSvg.setAttribute(
            "points",
            `
                0,5 
                ${t * 60},${5 * (1 - t)}
                ${t * 60},${-5 * (1 - t) + 10}
            `
        );
    }

    function IconoDinamicoVolumen() {
        let volumen = (document.querySelector(`.${idR} .volume-bar`)?.value ?? 100);
        if (volumen == 0) {
            return <i className="fa-solid fa-volume-mute"></i>;
        }
        if (volumen > 66) {
            return <i className="fa-solid fa-volume-high"></i>
        } else if (volumen > 33) {
            return <i className="fa-solid fa-volume-down"></i>;
        }
        return <i className="fa-solid fa-volume-off"></i>;
    }
}