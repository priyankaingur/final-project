import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./App";

import {Container, StyledEngineProvider, ThemeProvider} from '@mui/material'
import {BrowserRouter as Router} from "react-router-dom";
import theme from "./theme";
import backgroundImage from "./assets/background3.jpg";

ReactDOM.createRoot(document.getElementById('root')).render(<Container style={{
    fontFamily: theme.typography.fontFamily,
    backgroundImage: `url(${backgroundImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
}}> <StyledEngineProvider injectFirst>
    <ThemeProvider theme={theme}><Router><App/></Router></ThemeProvider></StyledEngineProvider> </Container>)

