addScript({
    src: "/componente/IA/GPT/chat.js",
    type: "module",
})

let Mensajes = [];

function agregarMensaje (role, content) {
    Mensajes.push({
        role,
        content,
    });
}


function ChatGPT() {
    let idR = Math.random().toString().replace("0.", "idR-")
    return (
        <Paper
            elevation={6}
            className={`
                ${idR}
                chat-gpt
            `}
            style={{
                display: "inline-block",
                minWidth: '300px',
                minHeight: '300px',
                position: 'relative',
                borderRadius: '10px',
            }}
        >
            <div
                className="screen-overlay-progress"
                style={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: '1000',
                    backgroundColor: 'rgba(0, 0, 0, 0.75)',
                }}
            >
                <CircularProgress />
                <br />
                <br />
                <span
                    className="progress-text"
                >
                </span>
            </div>

            <div
                className="chat-container"
                style={{
                    position: 'absolute',
                    left: '0',
                    top: '0',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'stretch',
                    height: '100%',
                    width: '100%',
                    overflow: 'auto',
                }}
            >
                <div
                    className="chat-messages"
                    style={{
                        flex: '1',
                        padding: '10px',
                        overflow: 'auto',
                    }}
                >
                    &nbsp;
                </div>
                <div
                    className="chat-input"
                    style={{
                        display: 'flex',
                        width: '100%',
                        justifyContent: 'space-between',
                    }}
                >
                    <EmptyTextarea
                        variant="outlined"
                        fullWidth
                        placeholder="Escribe un mensaje..."
                        onKeyUp={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                document.querySelector(`.${idR} .chat-send`).click();
                            }
                        }}
                    />
                    <Button
                        className="chat-send"
                        variant="contained"
                        color="primary"
                        onClick={async () => {
                            let charSend = document.querySelector(`.${idR} .chat-send`);
                            charSend.disabled = true;
                            const textarea = document.querySelector(`.${idR} .chat-input textarea`);
                            const content = textarea.value.trim();
                            if (content) {
                                agregarMensaje('user', content);
                                textarea.value = '';
                                const chatMessages = document.querySelector(`.${idR} .chat-messages`);
                                chatMessages.appendChild(DOMFromReact(
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'flex-end',
                                        }}
                                    >
                                        <Chip
                                            className="chat-message user"
                                            label={content}
                                            color="primary"
                                        />
                                    </div>
                                ));
                                chatMessages.appendChild(DOMFromReact(
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'flex-end',
                                        }}
                                    >
                                        <Chip
                                            className="chat-message bot"
                                            label={content}
                                            color="primary"
                                            style={{
                                                whiteSpace: 'normal',
                                                padding: '10px',
                                                height: 'auto',
                                            }}
                                        />
                                    </div>
                                ));
                                chatMessages.scrollTop = chatMessages.scrollHeight;

                                const chunks = await window["GPTengine"].chat.completions.create({
                                    temperature:1,
                                    max_tokens:100,
                                    messages: Mensajes,
                                    stream: true
                                })

                                let reply = ""

                                const botMessage = document.querySelector(`.${idR} .chat-messages .chat-message.bot:last-child`);

                                for await (const chunk of chunks) {
                                    const choice = chunk.choices[0]
                                    const content = choice?.delta?.content ?? ""
                                    reply += content
                                    botMessage.textContent = reply
                                }

                                charSend.removeAttribute('disabled');

                                agregarMensaje('assistant', reply);

                                chatMessages.scrollTop = chatMessages.scrollHeight;
                            }
                        }}
                    >
                        Enviar
                    </Button>
                </div>
            </div>
        </Paper >
    )
}

function EmptyTextarea({
    onKeyUp,
}) {

    const grey = {
        50: '#F3F6F9',
        100: '#E5EAF2',
        200: '#DAE2ED',
        300: '#C7D0DD',
        400: '#B0B8C4',
        500: '#9DA8B7',
        600: '#6B7A90',
        700: '#434D5B',
        800: '#303740',
        900: '#1C2025',
    };

    const Textarea = styled(TextareaAutosize)(
        ({ theme }) => `
            box-sizing: border-box;
            font-family: 'IBM Plex Sans', sans-serif;
            font-size: 0.875rem;
            font-weight: 400;
            line-height: 1.5;
            padding: 12px;
            width: 100%;
            color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
            background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
            border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
            box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
        
            &:hover {
                outline: none;
            }
        
            &:focus {
                outline: none;
            }
        
            // firefox
            &:focus-visible {
                outline: none;
            }
        `,
    );

    return <Textarea
        aria-label="empty textarea"
        placeholder="Escibe un mensaje..."
        maxRows={6}
        style={{
            resize: 'none',
        }}
        onKeyUp={onKeyUp}
    />;
}