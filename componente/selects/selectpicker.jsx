let itemsPrueba = [
  { valor: "1", nombre: "Item de prueba 1" },
  { valor: "2", nombre: "Item de prueba 2" },
  { valor: "3", nombre: "Item de prueba 3" },
  { valor: "4", nombre: "Item de prueba 4" },
  { valor: "5", nombre: "Item de prueba 5" },
  { valor: "6", nombre: "Item de prueba 6" },
  { valor: "7", nombre: "Item de prueba 7" },
  { valor: "8", nombre: "Item de prueba 8" },
  { valor: "9", nombre: "Item de prueba 9" },
  { valor: "10", nombre: "Item de prueba 10" },
]

function ComponenteSelectPickerMultiple({
  items = itemsPrueba,
  itemsSelected = itemsPrueba,
  etiqueta = "Etiqueta de prueba",
  onChange = () => { console.log("onChange") },
  labelVarios = "varios",
  labelTodos = "todos",
  horizontal = "left",
  item_ta_horizontal = "ta-right",
  open_with_hover = false,
  close_when_unhover = false,
  className = "",
}) {
  let random = Math.random().toString().replace("0.", "");
  itemsSelected = items.filter(item => itemsSelected.includes(item));
  let actualInputsSelected = itemsSelected;

  let estadoDelPanelFlotante;
  let filtradoTextual;
  let panelFlotante;

  let pausarClick = false;

  return (
    <ThemeProvider theme={themeSelected}>
      <Paper
        elevation={3}
        className={`
          d-inline-block
          pad-15px
        `}
      >
        <div
          className={`
          componente-selectpicker
          multiple
          componente-selectpicker-multiple-${random}
          d-inline-block
          ${className}
        `}
          onKeyUp={(e) => {
            if (e.key == "Escape") {
              CerrarPanelFlotante();
            }
          }}
          onMouseEnter={() => {
            if (!open_with_hover) {
              return;
            }
            AbrirPanelFlotante();
          }}
          onMouseLeave={() => {
            if (!close_when_unhover) {
              return;
            }
            CerrarPanelFlotante();
          }}
          tabIndex={0}
          onBlur={(e) => {
            if (VerificarContención(e)) {
              return;
            }
            CerrarPanelFlotante();
            borrarFiltrado();
          }}
        >
          <ActivadorPanelFlotante />
          <PanelFlorante />
        </div>
      </Paper>
    </ThemeProvider>
  )

  function ready() {
    estadoDelPanelFlotante = document.querySelector(`.componente-selectpicker-multiple-${random} input[type="checkbox"]`);
    filtradoTextual = document.querySelector(`.componente-selectpicker-multiple-${random} .filtro input`);
    panelFlotante = document.querySelector(`.panel-flotante`);
  }

  function VerificarContención(e) {
    return document.querySelector(`.componente-selectpicker-multiple-${random}`).contains(e.relatedTarget);
  }

  function AbrirPanelFlotante() {
    pausarClick = true;
    estadoDelPanelFlotante.checked = true;
    panelFlotante.classList.remove("d-none");
    filtradoTextual.focus();
    panelFlotante.classList.add("panel-flotante-fadeIn");
    setTimeout(() => {
      panelFlotante.classList.remove("panel-flotante-fadeIn");
      pausarClick = false;
    }, 210);
  }

  function CerrarPanelFlotante() {
    pausarClick = true;
    panelFlotante.classList.add("panel-flotante-fadeOut");
    setTimeout(() => {
      panelFlotante.classList.add("d-none");
    }, 190);
    setTimeout(() => {
      estadoDelPanelFlotante.checked = false;
      panelFlotante.classList.remove("panel-flotante-fadeOut");
      pausarClick = false;
    }, 210);
  }

  function PanelFlorante() {
    return <Paper
      elevation={3}
      className={`
            panel-flotante
            ${horizontal}
          `}
      onClick={(e) => {
        actualInputsSelected = [...document.querySelectorAll(`.componente-selectpicker-multiple-${random} .contenedor-items .item input`)].filter(input => input.checked);
        let values = actualInputsSelected.map(input => input.dataset.valor).join(",");
        if (values !== document.querySelector(`.componente-selectpicker-multiple-${random} .value`).value) {
          if (onChange) {
            onChange();
          }
        }
        document.querySelector(`.componente-selectpicker-multiple-${random} .contenedor-items .value`).value = values;
        actualizarLabel();
      }}
    >
      <BotonCerrar />
      <br />
      <FiltradorTextual />
      <br />
      <br />
      {ControlesDeSeleccion()}
      <br />
      <div className="contenedor-items">
        <input type="text" className="value d-none" defaultValue={itemsSelected.map(item => item.valor).join(",")} />
        {items.map((item, index) => {
          return (
            <label
              key={index}
              className={`
                      item
                      ${item_ta_horizontal}
                    `}
              style={{ padding: 5, display: "block", cursor: "pointer" }}
              htmlFor={`item-${index}-${random}`}
            >
              <input
                type="checkbox"
                id={`item-${index}-${random}`}
                data-valor={item.valor}
                data-nombre={item.nombre}
                defaultChecked={itemsSelected.includes(item)}
                style={{ margin: 5 }} />
              {item.nombre}
            </label>
          );
        })}
      </div>
    </Paper>;

    function ControlesDeSeleccion() {
      return <div style={{ display: "flex", justifyContent: "space-between" }}>
        <SeleccionarTodo />
        &nbsp;
        <DeseleccionarTodo />
      </div>;

      function DeseleccionarTodo() {
        return <Button
          size="small"
          variant="contained"
          color="secondary"
          className={`
            rminw
            scale-80P
            transform-origin-0-0
            ml--25px
            white-space-nowarp
            btn-reestablecer
          `}
          onClick={Acción}
        >
          Deseleccionar todo
        </Button>;

        function Acción() {
          document.querySelectorAll(`.componente-selectpicker-multiple-${random} .contenedor-items input[type="checkbox"]`).forEach(input => {
            input.checked = false;
          });
        }
      }

      function SeleccionarTodo() {
        return <Button
          variant="contained"
          size="small"
          color="primary"
          className={`
            rminw
            scale-80P
            transform-origin-0-0
            white-space-nowarp
            btn-seleccionar-todo
          `}
          onClick={Acción}
        >
          Seleccionar todo
        </Button>;

        function Acción() {
          document.querySelectorAll(`.componente-selectpicker-multiple-${random} .contenedor-items input[type="checkbox"]`).forEach(input => {
            input.checked = true;
          });
        }
      }
    }

    function FiltradorTextual() {
      return <TextField id="standard-basic" label="Filtrar" variant="standard" fullWidth onChange={actualizarFiltrado}
        className="filtro"
        onKeyUp={(e) => {
          if (e.key === "Escape") {
            borrarFiltrado();
          }
        }} />;
    }

    function BotonCerrar() {
      return <label
        className={`
          c-tomato
          cerrar
        `}
        htmlFor={`selectpicker-multiple-${random}`}
        onClick={CerrarPanelFlotante}
      >
        &times;
      </label>;
    }
  }

  function ActivadorPanelFlotante() {
    return <div
      onClick={() => {
        ready();
        if (pausarClick) {
          return;
        }
        if (estadoDelPanelFlotante.checked) {
          return CerrarPanelFlotante();
        }
        AbrirPanelFlotante();
      }}
      className={`
        contenedor-activador-panel-flotante
        cursor-pointer
        user-select-none
      `}
    >
      <label
        htmlFor={`selectpicker-multiple-${random}`}
        className={`
          muestra
        `}
        style={{
          pointerEvents: "none",
        }}
      >
        <ValorLabel />
      </label>
      <span className={`
        white-space-nowarp
        etiqueta
      `}>
        {etiqueta}
      </span>
      <input type="checkbox" id={`selectpicker-multiple-${random}`} className="d-none activador-panel-flotante" />
    </div>;
  }

  function borrarFiltrado() {
    filtradoTextual.value = "";
    actualizarFiltrado({ target: { value: "" } });
  }

  function actualizarFiltrado(e) {
    let value = e.target.value;
    document.querySelectorAll(`.componente-selectpicker-multiple-${random} .contenedor-items .item`).forEach(item => {
      if (item.innerText.toLowerCase().includes(value.toLowerCase())) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  }

  function ValorLabel() {

    return (
      <span>
        {
          !actualInputsSelected.length ?
            "Sin selección" :
            "Selección: " + (
              items.length === actualInputsSelected.length ?
                labelTodos :
                actualInputsSelected.length === 1 ?
                  actualInputsSelected[0].dataset?.nombre ?? itemsSelected[0].nombre :
                  labelVarios + ` (${actualInputsSelected.length})`
            )

        }
      </span>
    )
  }

  function actualizarLabel() {
    ReactDOM.render(
      <ValorLabel />,
      document.querySelector(`.componente-selectpicker-multiple-${random} .muestra`)
    );
  }
}
