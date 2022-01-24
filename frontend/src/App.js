import AppRouter from "components/Router";
import GlobalStyle from "theme/GlobalStyle";
import React from "react";
import { theme } from "theme/theme";
import { ThemeProvider } from "styled-components";
import { useSelector } from "react-redux";

const App = () => {
  const { isDarkMode } = useSelector((state) => state.theme);
  return (
    <>
      <ThemeProvider theme={isDarkMode ? theme.darkTheme : theme.lightTheme}>
        <GlobalStyle />
        <AppRouter />
      </ThemeProvider>
    </>
  );
};

export default App;
