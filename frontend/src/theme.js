import {createTheme} from '@material-ui/core/styles';
import {green, grey} from '@mui/material/colors';

const theme = createTheme({
    components: {
        MuiModal: {
            styleOverrides: {
                root: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                },
                paper: {
                    position: 'absolute',
                    width: '60%',
                    backgroundColor: '#ffffff',
                    border: '2px solid #000',
                    boxShadow: 24,
                    padding: 4,
                    outline: 'none',
                },
            },
        },
    },
    typography: {
        fontFamily: [
            'Roboto',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    }, palette: {
        primary: {
            main: grey[300]
        },
        secondary: {
            main: grey[600]
        },
        primaryLight: {
            main: grey[50]
        }, secondaryLight: {
            main: grey[500]
        },
        paper:grey[40]
    }, h1: {
        fontSize: '2rem',
        fontWeight: 'bold',
        marginBottom: '1rem',
    },
    body1: {
        fontSize: '1rem',
        lineHeight: '1.5',
        marginBottom: '1rem',
    },
    button: {
        textTransform: 'none',
        fontSize: '1rem',
        padding: '0.5rem 1rem',
    },
    spacing: 8
});

export default theme