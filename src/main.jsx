import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import theme from './siteConfig/theme';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <Router>
                <AppRoutes />
            </Router>
        </ThemeProvider>
    </React.StrictMode>,
);
