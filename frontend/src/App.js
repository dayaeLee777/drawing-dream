import AppRouter from "components/Router";
import GlobalStyle from "theme/GlobalStyle";
import React from "react";
import { theme } from "theme/theme";
import { ThemeProvider } from "styled-components";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const { isDarkMode } = useSelector((state) => state.theme);
  return (
    <>
      <ThemeProvider theme={isDarkMode ? theme.darkTheme : theme.lightTheme}>
        <GlobalStyle />
        <AppRouter />
        <ToastContainer style={{ width: "350px" }} />
      </ThemeProvider>
    </>
  );
};

export default App;
