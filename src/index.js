import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './assets/styles/global';
import theme from './assets/styles/theme';
import Database from './service/database';

const data = new Database();
// const job = data.getDatas("JOB_INFO").then((result) => console.log(result) );
// const card = data.getSingleData("CARDS_INFO", "F-NU1-9").then((result) => console.log(result) );

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
  {/* <React.StrictMode> */}
    <ThemeProvider theme={theme}>
      <App />
      <GlobalStyle />
    </ThemeProvider>
  {/* </React.StrictMode> */}
  </>
);
