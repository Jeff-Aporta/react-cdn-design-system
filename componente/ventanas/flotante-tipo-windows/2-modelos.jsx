
VENTANA_FLOTANTE_TIPO_WINDOWS.AGRUPAMIENTO.Iframe = ({ url, titulo }) => {/**
    * Abre una ventana flotante con un iframe de forma rápida
*/
    VENTANA_FLOTANTE_TIPO_WINDOWS.AGRUPAMIENTO.nuevaVentana({
        titulo,
        JSX: <iframe src={url} style={{
            width: '100%',
            height: '100%',
            border: 'none',
        }}
        ></iframe>
    })
}