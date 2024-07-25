/*
https://cdn.jsdelivr.net/npm/sweetalert2@11.7.27/dist/sweetalert2.all.min.js
https://cdn.jsdelivr.net/npm/@sweetalert2/theme-dark/dark.css
https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css
https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css
*/

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