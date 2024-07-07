import { createTheme } from '@mui/material/styles';

// Define your custom theme
const theme = createTheme({
    palette: {
        primary: {
            main: '#00ff00', // Change this to customize primary color
        },
        secondary: {
            main: '#dc004e', // Change this to customize secondary color
        },
    },
    typography: {
        fontFamily: 'Roboto, sans-serif', // Specify default font family
    },
});

export default theme;
