
function App() {
    return (
        <React.Fragment>
            <Paper elevation={6} style={{
                padding: '10px',
                display: 'flex',
                justifyContent: 'space-between',
            }}>
                <h1>
                    HebelUI
                </h1>
                <SwitchTheme />
            </Paper>
            <div style={{
                padding: '20px',
            }}>
                <h1>Selectpicker</h1>
                <ComponenteSelectPickerMultiple />
                <br />
                <h1>Ventana flotante tipo Windows</h1>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        VENTANA_FLOTANTE_TIPO_WINDOWS.AGRUPAMIENTO.Iframe({
                            url: "https://www.youtube.com/embed/videoseries?si=UsECENGQb6IpJ-ZS&amp;list=UULF1zgh-6xm_a-PI49zb6e5HA",
                            titulo: 'Ventana flotante tipo Windows',
                        });
                    }}
                >
                    Abrir ventana flotante
                </Button>
                <br />
                <h1>Reproductor</h1>
                <Reproductor_theme1 />
                {/* <br />
                <h1>Chat</h1>
                <ChatGPT /> */}
            </div>
        </React.Fragment>
    );
}

setTimeout(() => {
    ReactDOM.render(
        <ThemeProvider theme={themeSelected}>
            <CssBaseline />
            <App />
        </ThemeProvider>,
        document.querySelector('body .app')
    );
}, 0);