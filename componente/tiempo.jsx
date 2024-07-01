addLink(`${prefixLoad}/componente/tiempo.css`)

function ComponenteTiempo({ horaPorDefecto, etiqueta, className, onChange }) {
  let modo = "hora";
  let [hora, minutos, segundos] = horaPorDefecto.split(":").map((e) => parseInt(e) || 0);
  let random = Math.random().toString().replace("0.", "");

  function RellenoModo() {
    return (
      <div>
        {
          Array(modo == "hora" ? 24 : 12).fill().map((_, i) => {
            return (
              <div key={i}
                className="relleno-modo"
                onClick={() => {
                  switch (modo) {
                    case "hora":
                      modo = "minutos";
                      hora = i;
                      break;
                    case "minutos":
                      modo = "hora";
                      document.querySelector(`.componente-tiempo-hora-${random} input[type="checkbox"]`).checked = false;
                      minutos = i * 5;
                      break;
                  }
                  let lbl = document.querySelector(`.componente-tiempo.hora-matriz.componente-tiempo-hora-${random} label`);
                  let valor = document.querySelector(`.componente-tiempo.hora-matriz.componente-tiempo-hora-${random} input[type="text"]`);
                  let tiempo = [hora, minutos, segundos].map((e) => e.toString().padStart(2, "0")).join(":");
                  lbl.innerHTML = tiempo;
                  valor.value = tiempo;
                  rellenar();
                  if (onChange) {
                    onChange();
                  }
                }}
              >
                {
                  modo == "hora" ? i : i * 5
                }
              </div>
            )
          })
        }
      </div>
    )
  }

  function rellenar() {
    let opciones_relleno = document.querySelector(`.componente-tiempo-hora-${random} .opciones-relleno`);
    let titulo = document.querySelector(`.componente-tiempo-hora-${random} .titulo`);
    ReactDOM.createRoot(opciones_relleno).render(<RellenoModo />);
    titulo.innerHTML = modo;
  }

  return (
    <div
      className={`componente-tiempo hora-matriz componente-tiempo-hora-${random} d-inline-block`}
      style={{ position: "relative" }}
      tabIndex={0}
      onBlur={(e) => {
        document.querySelector(`.componente-tiempo-hora-${random} input[type="checkbox"]`).checked = false;
      }}
    >
      <label
        htmlFor={`hora-${random}`}
        onClick={(e) => {
          modo = "hora";
          rellenar();
        }}
        className="muestra"
      >
        {
          horaPorDefecto ?? "00:00:00"
        }
      </label>
      <input type="text" defaultValue={horaPorDefecto ?? "00:00:00"} className={`
                                ${className ?? ""}
                                d-none
                        `} />
      <span className="etiqueta">
        {
          etiqueta
        }
      </span>
      <input type="checkbox" id={`hora-${random}`} className="d-none" />
      <Paper className="panel-flotante">
        <label className="cerrar" htmlFor={`hora-${random}`}>
          &times;
        </label>
        <span className="titulo"></span>
        <div className="opciones-relleno">
        </div>
      </Paper>
    </div>
  )
}
function ComponenteTiempoRadial({ horaPorDefecto, className }) {
  let random = Math.random().toString().replace("0.", "");
  let LADO = 200;
  let DIAMETRO = LADO * 0.7;
  let modo = "hora";
  let [hora, minutos, segundos] = horaPorDefecto.split(":").map((e) => parseInt(e) || 0);


  const interaccionMouse = (e) => {
    if (e.buttons != 1) {
      return;
    }
    if (!modo) {
      return;
    }
    let dx = e.clientX - e.target.getBoundingClientRect().left - DIAMETRO / 2;
    let dy = e.clientY - e.target.getBoundingClientRect().top - DIAMETRO / 2;
    let x = -dy;
    let y = dx;
    let angulo = Math.atan2(y, x);
    if (angulo < 0) {
      angulo = 2 * Math.PI + angulo;
    }
    angulo = angulo / (2 * Math.PI);

    let hora = angulo * 12;
    let minutos = angulo * 60;
    let segundos = angulo * 60;
    let vlr = modo === "hora" ? hora : modo === "minutos" ? minutos : segundos;

    if (modo === "hora") {
      angulo = (Math.floor(angulo * 12) % 12) / 12;
    } else {
      angulo = (Math.floor(angulo * 60) % 60) / 60;
    }

    ["hora", "minutos", "segundos"].forEach((modo) => {
      document.querySelector(`.componente-tiempo-hora-${random} .${modo} input`).classList.remove("editando");
    });
    switch (modo) {
      case "hora":
        vlr = Math.floor(vlr < 1 ? 12 : vlr)
        document.querySelector(`.componente-tiempo-hora-${random} .${modo} input`).classList.add("editando");
        document.querySelector(`.componente-tiempo-hora-${random} .${modo} input`).value = vlr;
        break;
      case "minutos":
        vlr = Math.floor(vlr);
        document.querySelector(`.componente-tiempo-hora-${random} .${modo} input`).classList.add("editando");
        document.querySelector(`.componente-tiempo-hora-${random} .${modo} input`).value = vlr;
        break;
      case "segundos":
        vlr = Math.floor(vlr);
        document.querySelector(`.componente-tiempo-hora-${random} .${modo} input`).classList.add("editando");
        document.querySelector(`.componente-tiempo-hora-${random} .${modo} input`).value = vlr;
        break;
    }
    document.querySelector(`.componente-tiempo-hora-${random} .previsualizacion`).innerHTML = vlr;
    document.querySelector(`.componente-tiempo-hora-${random} .manecilla-guia`).style.transform = `translate(${DIAMETRO / 2}px, ${DIAMETRO / 2}px) rotate(${(angulo * 360)}deg) rotate(-90deg)`;
    let marcadorMin;
    let d_min = Number.MAX_VALUE;
    document.querySelectorAll(`.componente-tiempo-hora-${random} .marcador`).forEach((e) => {
      e.style.background = "steelblue";
      let valor = parseInt(e.dataset.valor) - 90;
      let x = Math.cos(valor * Math.PI / 180);
      let y = Math.sin(valor * Math.PI / 180);
      let x2 = Math.cos(angulo * 2 * Math.PI);
      let y2 = Math.sin(angulo * 2 * Math.PI);
      let d = 1 - ((x - x2) ** 2 + (y - y2) ** 2) ** 0.5;
      if (d < d_min) {
        d_min = d;
        marcadorMin = e;
      }
      e.style.transform = `translate(-50%, -50%) scale(${1 - d * 0.2})`;
    });
    marcadorMin.style.background = "dodgerblue";
  };

  return (
    <div className={`componente-tiempo hora-radial componente-tiempo-hora-${random} d-inline-block`} style={{ position: "relative", width: "200px" }}>
      <label htmlFor="">
        {
          horaPorDefecto ?? "00:00:00"
        }
      </label>
      <input type="checkbox" id={`hora-${random}`} className="d-none" />
      <input type="text" className={`
                                ${className ?? ""}
                                d-none       
                        `} readOnly />
      <Paper style={{
        position: "absolute",
        top: "100%",
        left: 0,
        width: LADO,
        height: LADO * 1.2,
        zIndex: 1000,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}>
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
          className="seleccionador"
        >
          <span className="hora">
            <input type="number" defaultValue={hora} min={1} max={12} step={1} onClick={(e) => {
              modo = "hora";
              document.querySelector(`.componente-tiempo-hora-${random} .previsualizacion`).innerHTML = document.querySelector(`.componente-tiempo-hora-${random} .${modo} input`).value;
            }} />
          </span>
          :
          <span className="minutos">
            <input type="number" defaultValue={minutos} min={0} max={59} step={1} />
          </span>
          :
          <span className="segundos">
            <input type="number" defaultValue={segundos} min={0} max={59} step={1} />
          </span>
          &nbsp;
          &nbsp;
          <span style={{ display: "flex", flexDirection: "column" }} className="ampm">
            <input type="checkbox" id={`ampm-${random}`} className="d-none" />
            <label className="am" htmlFor={`ampm-${random}`}>
              AM
            </label>
            <label className="pm" htmlFor={`ampm-${random}`}>
              PM
            </label>
          </span>
        </div>
        <br />
        <div style={{
          position: "relative",
          border: "1px solid steelblue",
          width: DIAMETRO,
          height: DIAMETRO,
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: 25,
          cursor: "pointer",
        }}
          onMouseMove={interaccionMouse}
          onMouseDown={interaccionMouse}
          onMouseUp={(e) => {
            switch (modo) {
              case "hora":
                modo = "minutos";
                break;
              case "minutos":
                modo = "segundos";
                break;
              case "segundos":
                modo = "";
                break;
            }
          }}
          className="seleccionador-grafico"
        >
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            transform: `translate(${DIAMETRO / 2}px, ${DIAMETRO / 2}px) rotate(${(hora / 12) * 360 - 90}deg)`,
            transformOrigin: "top left",
            width: DIAMETRO * 0.4,
            borderRadius: 10,
            height: 5,
            background: "steelblue",
            pointerEvents: "none",
            zIndex: -1,
          }} className="manecilla-guia"
          ></div>
          {
            Array(12).fill().map((_, i) => {
              return (
                <div key={i} style={{
                  position: "absolute",
                  top: DIAMETRO / 2 + (DIAMETRO / 2 * Math.sin((i * 30) * Math.PI / 180)),
                  left: DIAMETRO / 2 + (DIAMETRO / 2 * Math.cos((i * 30) * Math.PI / 180)),
                  transform: `translate(-50%, -50%)`,
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  transformOrigin: "top",
                  background: "steelblue",
                  pointerEvents: "none",
                }}
                  className="marcador"
                  data-valor={i * 30}
                ></div>
              )
            })
          }
          <span
            className="previsualizacion"
            style={{
              background: "rgba(255, 255, 255, 0.5)",
            }}
          >
            Listo
          </span>
        </div>
      </Paper>
    </div>
  )
}