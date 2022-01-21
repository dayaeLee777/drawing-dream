import AppRouter from "components/Router";
import GlobalStyle from "theme/GlobalStyle";
import React from "react";
import { theme } from "theme/theme";
import { ThemeProvider } from "styled-components";

const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <AppRouter />
      </ThemeProvider>
    </>
  );
};

export default App;
