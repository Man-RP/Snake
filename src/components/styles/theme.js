import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#335C67',
            light: '#00283d',
            contrastText: '#eae2b7'
        },
        secondary: {
            main: '#E09F3E',
            contrastText: '#eae2b7'
        },
    },
});

export default theme;