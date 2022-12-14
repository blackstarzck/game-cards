import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './assets/styles/global';
import theme from './assets/styles/theme';
import Database from './service/database';
import { BrowserRouter } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <BrowserRouter>
  {/* <React.StrictMode> */}
    <ThemeProvider theme={theme}>
      <App />
      <GlobalStyle />
    </ThemeProvider>
  {/* </React.StrictMode> */}
    </BrowserRouter>
  </>
);
