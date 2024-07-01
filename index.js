//------------------------
// Eventos
//------------------------

window.addEventListener("load", () => {
  /**
   * Se eliminan los elementos que tengan el atributo data-tmpDeleteOnload.
   */
  document.querySelectorAll("[data-tmpDeleteOnload]").forEach((element) => {
    element.remove();
  });
});

//------------------------
// Funciones de adición de recursos
//------------------------

const addScript = (args) => {
  if (typeof args == "string") {
    // Si el argumento es un string, se infiere que es la URL del recurso.
    return addScript({ src: args });
  }
  let { src, src_offline, onload, type = "text/javascript" } = args; 
  if (!src && !src_offline) {
    // Si no se define ninguna URL, se detiene la ejecución de la función.
    return;
  }

  let script = document.createElement("script"); // Se crea un elemento script para el DOM.
  script.setAttribute("type", type); // Se establece el tipo de script.
  if (src_offline && !navigator.onLine) {
    // Si la URL offline está definida y el navegador no está conectado a internet.
    script.setAttribute("src", src_offline);
  } else if (src) {
    // Si la URL está definida.
    script.setAttribute("src", src);
  }

  script.onload = onload; // Se añade el evento onload al script.

  document.head.appendChild(script); // Se añade el script al head del documento.

  console.log("addScript", src); // Se imprime en consola la URL del recurso añadido.
};

const addLink = (args) => {
  if (typeof args == "string") {
    // Si el argumento es un string, se infiere que es la URL del recurso.
    return addLink({ href: args }); // Se llama a la función recursivamente con un objeto que contenga la URL.
  }
  let { href, href_offline } = args; // Se extraen las propiedades href y href_offline del objeto args.

  let link = document.createElement("link"); // Se crea un elemento link para el DOM.

  if (href_offline && !navigator.onLine) {
    // Si la URL offline está definida y el navegador no está conectado a internet.
    link.setAttribute("href", href_offline);
  } else if (href) {
    // Si la URL está definida.
    link.setAttribute("href", href);
  }

  link.setAttribute("rel", "stylesheet"); // Se establece que la regla del link es para hojas de estilo CSS.

  document.head.appendChild(link); // Se añade el link al head del documento.

  console.log("addLink", href); // Se imprime en consola la URL del recurso añadido.
};

//------------------------
// Funciones de estilo CSS
//------------------------

function JS2CSS(estilo) {
  /**
   * Convierte un objeto de estilo en formato JS a CSS.
   */
  const estiloConvertido = {};

  for (const [key, value] of Object.entries(estilo)) {
    const kebabCaseKey = key.replace(
      /**
       * ¿Qué hace con kebab-case?
       * Convierte las propiedades de camelCase a kebab-case.
       */
      /[A-Z]/g,
      (match) => `-${match.toLowerCase()}`
    );
    estiloConvertido[kebabCaseKey] =
      typeof value === "object"
        ? JS2CSS(value)
        : typeof value === "number" && kebabCaseKey != "z-index"
        ? `${value}px`
        : /**
           * ¿Qué hace con los números?
           * Convierte los números a pixeles (px).
           */
          value;
  }

  return estiloConvertido;
}

function crearEstilo(estilo, style) {
  /**
   * Crea un estilo CSS en el head del documento.
   */
  let estiloCSS = JSON.stringify(JS2CSS(estilo), null, "\t") // Convierte el objeto JSON a un string con formato de tabulación.
    .replaceAll("},", "}") // Elimina las comas al final de los objetos de JSON para que no genere errores en CSS.
    .replace(/,\n/g, ";\n") // Reemplaza las comas al final de las líneas por punto y coma.
    .replaceAll(":{", "{") // Elimina los dos puntos antes de las llaves.
    .replaceAll(": {", "{") // Elimina los dos puntos antes de las llaves, pero que tengan un espacio.
    .replaceAll('"', "") // Elimina las comillas dobles.
    .replaceAll("\\n", ""); // Elimina los saltos de línea.

  estiloCSS = estiloCSS.substring(1, estiloCSS.length - 1); // Elimina las llaves del principio y del final del objeto JSON.

  if (!style) {
    /**
     * Si no se ha creado un estilo, se crea.
     */
    style = document.createElement("style");
    document.head.appendChild(style);
  }
  style.innerHTML = estiloCSS; // Se añade el estilo CSS al elemento style.

  return estiloCSS; // Se retorna el estilo CSS generado a partir del objeto JSON.
}

//------------------------
// Librerias escenciales para cualquier proyecto de Jeffrey Agudelo
//------------------------

(() => {
  //SweetAlert2
  addScript({
    src: "https://cdn.jsdelivr.net/npm/sweetalert2@11.7.27/dist/sweetalert2.all.min.js",
    src_offline: "/dependencias/sweetalert2.all.min.js",
  });
  //SweetAlert2 Theme Dark
  addLink({
    href: "https://cdn.jsdelivr.net/npm/@sweetalert2/theme-dark/dark.css",
    href_offline: "/dependencias/sweetalert2.dark.css",
  });
  //Bootstrap Icons
  addLink({
    href: "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css",
  });
  //Font Awesome Icons
  addLink({
    href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css",
  });
})();
