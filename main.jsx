Object.assign(window, window['MaterialUI'])

let localThemeName = localStorage.getItem('theme') || 'dark';

let typography = {
  fontSize: window["fontSizeMUI"] ?? 15,
  textTransform: 'none',
  button: {
    textTransform: 'none',
  },
};

const darkTheme = createTheme({
  typography,
  palette: {
    mode: 'dark',
    primary: {
      main: '#1e90ff',
    },
  },
});

const lightTheme = createTheme({
  typography,
  palette: {
    mode: 'light',
    primary: {
      main: '#1e90ff',
    },
  },
});

const themeSelected = localThemeName === 'dark' ? darkTheme : lightTheme;

function DOMFromReact(reactComponent) {
  if (Array.isArray(reactComponent)) {
    reactComponent = <React.Fragment>{reactComponent}</React.Fragment>;
  }
  const div = document.createElement('div');
  ReactDOM.render(reactComponent, div);
  if (div.children.length == 1) {
    return div.children[0];
  }
  return div;
}